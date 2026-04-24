"use strict";
// ============================================================
//  INFRASTRUCTURE LAYER  —  src/infrastructure/repositories.ts
//  IBookRepository, IMemberRepository, ILoanRepository-ийн
//  in-memory хэрэгжилт
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLoanRepository = exports.InMemoryMemberRepository = exports.InMemoryBookRepository = void 0;
class InMemoryBookRepository {
    constructor() {
        this.books = new Map();
    }
    findAll() {
        return Array.from(this.books.values());
    }
    findById(id) {
        return this.books.get(id);
    }
    findByQuery(query) {
        const q = query.toLowerCase();
        return this.findAll().filter((b) => b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q));
    }
    save(book) {
        this.books.set(book.id, book);
    }
    delete(id) {
        this.books.delete(id);
    }
}
exports.InMemoryBookRepository = InMemoryBookRepository;
class InMemoryMemberRepository {
    constructor() {
        this.members = new Map();
    }
    findAll() {
        return Array.from(this.members.values());
    }
    findById(id) {
        return this.members.get(id);
    }
    save(member) {
        this.members.set(member.id, member);
    }
}
exports.InMemoryMemberRepository = InMemoryMemberRepository;
class InMemoryLoanRepository {
    constructor() {
        this.loans = new Map();
    }
    findAll() {
        return Array.from(this.loans.values());
    }
    findById(id) {
        return this.loans.get(id);
    }
    findActive() {
        return this.findAll().filter((l) => l.returnedAt === null);
    }
    findOverdue() {
        return this.findActive().filter((l) => l.isOverdue());
    }
    save(loan) {
        this.loans.set(loan.id, loan);
    }
}
exports.InMemoryLoanRepository = InMemoryLoanRepository;
//# sourceMappingURL=repositories.js.map