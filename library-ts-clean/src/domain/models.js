"use strict";
// ============================================================
//  DOMAIN LAYER  —  src/domain/models.ts
//  Шаардлага 3, 4, 6, 7, 8
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = exports.Fine = exports.Member = exports.Book = exports.BookCategory = void 0;
// ── Шаардлага 8: BookCategory нь Book-ийг aggregation байдлаар бүлэглэнэ
// Aggregation: BookCategory устсан ч Book объект амьдарч чадна
class BookCategory {
    constructor(id, name) {
        this.bookIds = []; // Book-ийн ID-ийг хадгална (weak reference)
        this.id = id;
        this.name = name;
    }
    addBook(bookId) {
        if (!this.bookIds.includes(bookId)) {
            this.bookIds.push(bookId);
        }
    }
    removeBook(bookId) {
        this.bookIds = this.bookIds.filter((id) => id !== bookId);
    }
    getBookIds() {
        return [...this.bookIds];
    }
}
exports.BookCategory = BookCategory;
// ── Шаардлага 3: Book домайн анги
class Book {
    constructor(id, title, author, categoryId) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.categoryId = categoryId;
        this.isAvailable = true;
    }
}
exports.Book = Book;
// ── Шаардлага 3, 6: Member домайн анги
// Шаардлага 6: Member ба Loan нь association холбоотой
// Association: Member устсан ч Loan тусдаа оршино
class Member {
    constructor(id, name) {
        this.loanIds = []; // association: Loan-уудтай сул холбоо
        this.id = id;
        this.name = name;
    }
    addLoan(loanId) {
        this.loanIds.push(loanId);
    }
    removeLoan(loanId) {
        this.loanIds = this.loanIds.filter((id) => id !== loanId);
    }
    getLoanIds() {
        return [...this.loanIds];
    }
}
exports.Member = Member;
// ── Шаардлага 7: Fine анги нь Loan объекттой 1:1 харьцаатай байна
class Fine {
    constructor(loanId, overdueDays, amount) {
        this.loanId = loanId;
        this.overdueDays = overdueDays;
        this.amount = amount;
        this.isPaid = false;
    }
}
exports.Fine = Fine;
// ── Шаардлага 3, 4: Loan домайн анги
// Шаардлага 4: Book ба Loan нь composition холбоотой
//   Composition: Loan дотор bookTitle-г хуулж хадгална
//   → Loan устсан ч номын бичлэг (bookTitle) хадгалагдана
// Шаардлага 2: 14 хоногийн дотор буцаах ёстой (domain rule)
// Шаардлага 7: Fine нь Loan-тай 1:1 → loan.fine нэг Fine эсвэл null
class Loan {
    constructor(id, bookId, bookTitle, memberId, memberName, borrowedAt = new Date()) {
        this.returnedAt = null;
        this.fine = null; // Шаардлага 7: 1:1
        this.id = id;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.memberId = memberId;
        this.memberName = memberName;
        this.borrowedAt = borrowedAt;
        this.dueDate = new Date(borrowedAt.getTime() + Loan.RETURN_DAYS * 24 * 60 * 60 * 1000);
    }
    isOverdue() {
        return this.returnedAt === null && new Date() > this.dueDate;
    }
    getOverdueDays() {
        if (!this.isOverdue())
            return 0;
        return Math.floor((Date.now() - this.dueDate.getTime()) / (24 * 60 * 60 * 1000));
    }
}
exports.Loan = Loan;
Loan.RETURN_DAYS = 14; // Шаардлага 2
Loan.FINE_PER_DAY = 500; // Торгууль: 500₮/өдөр
//# sourceMappingURL=models.js.map