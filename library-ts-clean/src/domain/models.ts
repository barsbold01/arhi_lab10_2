// ============================================================
//  DOMAIN LAYER  —  src/domain/models.ts
//  Шаардлага 3, 4, 6, 7, 8
// ============================================================

// ── Шаардлага 8: BookCategory нь Book-ийг aggregation байдлаар бүлэглэнэ
// Aggregation: BookCategory устсан ч Book объект амьдарч чадна
export class BookCategory {
  readonly id: number;
  readonly name: string;
  private bookIds: number[] = [];   // Book-ийн ID-ийг хадгална (weak reference)

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  addBook(bookId: number): void {
    if (!this.bookIds.includes(bookId)) {
      this.bookIds.push(bookId);
    }
  }

  removeBook(bookId: number): void {
    this.bookIds = this.bookIds.filter((id) => id !== bookId);
  }

  getBookIds(): number[] {
    return [...this.bookIds];
  }
}

// ── Шаардлага 3: Book домайн анги
export class Book {
  readonly id: number;
  title: string;
  author: string;
  categoryId: number;
  isAvailable: boolean;

  constructor(id: number, title: string, author: string, categoryId: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.categoryId = categoryId;
    this.isAvailable = true;
  }
}

// ── Шаардлага 3, 6: Member домайн анги
// Шаардлага 6: Member ба Loan нь association холбоотой
// Association: Member устсан ч Loan тусдаа оршино
export class Member {
  readonly id: number;
  readonly name: string;
  private loanIds: number[] = [];   // association: Loan-уудтай сул холбоо

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  addLoan(loanId: number): void {
    this.loanIds.push(loanId);
  }

  removeLoan(loanId: number): void {
    this.loanIds = this.loanIds.filter((id) => id !== loanId);
  }

  getLoanIds(): number[] {
    return [...this.loanIds];
  }
}

// ── Шаардлага 7: Fine анги нь Loan объекттой 1:1 харьцаатай байна
export class Fine {
  readonly loanId: number;
  readonly overdueDays: number;
  readonly amount: number;      // Торгуулийн дүн (төгрөгөөр)
  isPaid: boolean;

  constructor(loanId: number, overdueDays: number, amount: number) {
    this.loanId = loanId;
    this.overdueDays = overdueDays;
    this.amount = amount;
    this.isPaid = false;
  }
}

// ── Шаардлага 3, 4: Loan домайн анги
// Шаардлага 4: Book ба Loan нь composition холбоотой
//   Composition: Loan дотор bookTitle-г хуулж хадгална
//   → Loan устсан ч номын бичлэг (bookTitle) хадгалагдана
// Шаардлага 2: 14 хоногийн дотор буцаах ёстой (domain rule)
// Шаардлага 7: Fine нь Loan-тай 1:1 → loan.fine нэг Fine эсвэл null
export class Loan {
  static readonly RETURN_DAYS = 14;               // Шаардлага 2
  static readonly FINE_PER_DAY = 500;             // Торгууль: 500₮/өдөр

  readonly id: number;
  readonly bookId: number;
  readonly bookTitle: string;                     // composition: хуулж хадгална
  readonly memberId: number;
  readonly memberName: string;
  readonly borrowedAt: Date;
  readonly dueDate: Date;
  returnedAt: Date | null = null;
  fine: Fine | null = null;                       // Шаардлага 7: 1:1

  constructor(
    id: number,
    bookId: number,
    bookTitle: string,
    memberId: number,
    memberName: string,
    borrowedAt: Date = new Date()
  ) {
    this.id = id;
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.memberId = memberId;
    this.memberName = memberName;
    this.borrowedAt = borrowedAt;
    this.dueDate = new Date(
      borrowedAt.getTime() + Loan.RETURN_DAYS * 24 * 60 * 60 * 1000
    );
  }

  isOverdue(): boolean {
    return this.returnedAt === null && new Date() > this.dueDate;
  }

  getOverdueDays(): number {
    if (!this.isOverdue()) return 0;
    return Math.floor((Date.now() - this.dueDate.getTime()) / (24 * 60 * 60 * 1000));
  }
}
