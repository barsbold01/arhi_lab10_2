import { Book, Member, Loan } from "./models";
export interface Result<T = void> {
    ok: boolean;
    message: string;
    data?: T;
}
export interface SearchResult {
    books: Book[];
    total: number;
}
export interface DailyReport {
    date: Date;
    totalBorrows: number;
    totalReturns: number;
    finesCollected: number;
    activeLoans: number;
    overdueLoans: number;
    transactions: Transaction[];
}
export interface Transaction {
    type: "borrow" | "return" | "add" | "delete";
    bookTitle: string;
    memberName?: string;
    fineAmount?: number;
    timestamp: Date;
}
export interface IBookRepository {
    findAll(): Book[];
    findById(id: number): Book | undefined;
    findByQuery(query: string): Book[];
    save(book: Book): void;
    delete(id: number): void;
}
export interface IMemberRepository {
    findAll(): Member[];
    findById(id: number): Member | undefined;
    save(member: Member): void;
}
export interface ILoanRepository {
    findAll(): Loan[];
    findById(id: number): Loan | undefined;
    findActive(): Loan[];
    findOverdue(): Loan[];
    save(loan: Loan): void;
}
//# sourceMappingURL=interfaces.d.ts.map