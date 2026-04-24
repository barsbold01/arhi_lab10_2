// ============================================================
//  APPLICATION / SERVICE LAYER  —  src/application/LibraryService.ts
//  Шаардлага 1, 5, 9, 10
//  Бизнесийн логик, use case-уудыг орчуулна
// ============================================================

import { Book, BookCategory, Member, Loan, Fine } from "../domain/models";
import {
  Result,
  SearchResult,
  DailyReport,
  Transaction,
  IBookRepository,
  IMemberRepository,
  ILoanRepository,
} from "../domain/interfaces";

export class LibraryService {
  private transactions: Transaction[] = [];
  private idCounter = 1000;

  constructor(
    private readonly bookRepo: IBookRepository,
    private readonly memberRepo: IMemberRepository,
    private readonly loanRepo: ILoanRepository,
    private readonly categories: BookCategory[]
  ) {}

  // ── Шаардлага 1: Ном хайх
  searchBooks(query: string): SearchResult {
    const books = query.trim()
      ? this.bookRepo.findByQuery(query)
      : this.bookRepo.findAll();
    return { books, total: books.length };
  }

  // ── Шаардлага 1: Ном захиалах (зээлэх)
  borrowBook(bookId: number, memberId: number): Result<Loan> {
    const book = this.bookRepo.findById(bookId);
    if (!book) return { ok: false, message: "Ном олдсонгүй" };

    const member = this.memberRepo.findById(memberId);
    if (!member) return { ok: false, message: "Гишүүн олдсонгүй" };

    if (!book.isAvailable) {
      return { ok: false, message: `"${book.title}" одоогоор зээлэгдсэн байна` };
    }

    // Шаардлага 4: Loan дотор bookTitle-г хуулж хадгална (composition)
    const loan = new Loan(
      ++this.idCounter,
      book.id,
      book.title,       // ← book-ийн гарчгийг хуулж хадгална
      member.id,
      member.name
    );

    book.isAvailable = false;
    member.addLoan(loan.id);
    this.loanRepo.save(loan);
    this.bookRepo.save(book);

    this.transactions.push({
      type: "borrow",
      bookTitle: book.title,
      memberName: member.name,
      timestamp: new Date(),
    });

    return {
      ok: true,
      message: `"${book.title}" амжилттай захиалагдлаа. ${Loan.RETURN_DAYS} хоногийн дотор буцаана уу.`,
      data: loan,
    };
  }

  // ── Шаардлага 1: Ном буцаах
  // ── Шаардлага 5: Хугацаа хэтэрсэн бол автоматаар торгууль тооцно
  returnBook(loanId: number): Result<{ loan: Loan; fine: Fine | null }> {
    const loan = this.loanRepo.findById(loanId);
    if (!loan || loan.returnedAt) {
      return { ok: false, message: "Зээл олдсонгүй эсвэл аль хэдийн буцаасан" };
    }

    loan.returnedAt = new Date();

    // Шаардлага 5: автоматаар торгууль тооцоолно
    const fine = this.calculateFine(loan);
    if (fine) {
      loan.fine = fine;   // Шаардлага 7: Fine нь Loan-тай 1:1
    }

    const book = this.bookRepo.findById(loan.bookId);
    if (book) {
      book.isAvailable = true;
      this.bookRepo.save(book);
    }

    const member = this.memberRepo.findById(loan.memberId);
    if (member) {
      member.removeLoan(loanId);
    }

    this.loanRepo.save(loan);

    this.transactions.push({
      type: "return",
      bookTitle: loan.bookTitle,
      memberName: loan.memberName,
      fineAmount: fine?.amount ?? 0,
      timestamp: new Date(),
    });

    const msg = fine
      ? `"${loan.bookTitle}" буцаагдлаа. Хожимдлын торгууль: ${fine.amount.toLocaleString()}₮`
      : `"${loan.bookTitle}" цаг тухайд буцаагдлаа. Баярлалаа!`;

    return { ok: true, message: msg, data: { loan, fine } };
  }

  // ── Шаардлага 5: Автомат торгуулийн тооцоолол (private helper)
  private calculateFine(loan: Loan): Fine | null {
    if (!loan.isOverdue()) return null;
    const days = loan.getOverdueDays();
    const amount = days * Loan.FINE_PER_DAY;
    return new Fine(loan.id, days, amount);
  }

  // ── Шаардлага 9: Админ — шинэ ном нэмэх
  addBook(
    title: string,
    author: string,
    categoryId: number
  ): Result<Book> {
    if (!title.trim()) {
      return { ok: false, message: "Номын нэр оруулна уу" };
    }

    const category = this.categories.find((c) => c.id === categoryId);
    if (!category) {
      return { ok: false, message: "Ангилал олдсонгүй" };
    }

    const book = new Book(++this.idCounter, title.trim(), author.trim() || "Тодорхойгүй", categoryId);
    this.bookRepo.save(book);
    category.addBook(book.id);   // Шаардлага 8: aggregation

    this.transactions.push({
      type: "add",
      bookTitle: book.title,
      timestamp: new Date(),
    });

    return { ok: true, message: `"${book.title}" амжилттай нэмэгдлээ`, data: book };
  }

  // ── Шаардлага 9: Админ — ном устгах
  deleteBook(bookId: number): Result {
    const book = this.bookRepo.findById(bookId);
    if (!book) return { ok: false, message: "Ном олдсонгүй" };

    if (!book.isAvailable) {
      return { ok: false, message: "Одоогоор зээлэгдсэн номыг устгах боломжгүй" };
    }

    this.categories.forEach((c) => c.removeBook(bookId));
    this.bookRepo.delete(bookId);

    this.transactions.push({
      type: "delete",
      bookTitle: book.title,
      timestamp: new Date(),
    });

    return { ok: true, message: `"${book.title}" амжилттай устгагдлаа` };
  }

  // ── Шаардлага 9: Админ — номыг ангилалд оруулах
  categorizeBook(bookId: number, categoryId: number): Result {
    const book = this.bookRepo.findById(bookId);
    if (!book) return { ok: false, message: "Ном олдсонгүй" };

    const newCategory = this.categories.find((c) => c.id === categoryId);
    if (!newCategory) return { ok: false, message: "Ангилал олдсонгүй" };

    // Хуучин ангилалаас хасах
    this.categories.forEach((c) => c.removeBook(bookId));

    // Шинэ ангилалд нэмэх (aggregation)
    book.categoryId = categoryId;
    newCategory.addBook(bookId);
    this.bookRepo.save(book);

    return {
      ok: true,
      message: `"${book.title}" номыг "${newCategory.name}" ангилалд оруулав`,
    };
  }

  // ── Шаардлага 10: Өдрийн тайлан гаргах
  getDailyReport(): DailyReport {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTx = this.transactions.filter((tx) => {
      const d = new Date(tx.timestamp);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    const activeLoans = this.loanRepo.findActive();
    const overdueLoans = this.loanRepo.findOverdue();

    return {
      date: new Date(),
      totalBorrows:      todayTx.filter((t) => t.type === "borrow").length,
      totalReturns:      todayTx.filter((t) => t.type === "return").length,
      finesCollected:    todayTx.reduce((sum, t) => sum + (t.fineAmount ?? 0), 0),
      activeLoans:       activeLoans.length,
      overdueLoans:      overdueLoans.length,
      transactions:      todayTx,
    };
  }

  // Нэмэлт getter-ууд Presentation layer-т зориулсан
  getAllLoans(): Loan[]        { return this.loanRepo.findAll(); }
  getActiveLoans(): Loan[]    { return this.loanRepo.findActive(); }
  getOverdueLoans(): Loan[]   { return this.loanRepo.findOverdue(); }
  getCategories(): BookCategory[] { return [...this.categories]; }
  getAllMembers(): Member[]    { return this.memberRepo.findAll(); }
}
