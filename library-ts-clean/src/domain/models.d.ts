export declare class BookCategory {
    readonly id: number;
    readonly name: string;
    private bookIds;
    constructor(id: number, name: string);
    addBook(bookId: number): void;
    removeBook(bookId: number): void;
    getBookIds(): number[];
}
export declare class Book {
    readonly id: number;
    title: string;
    author: string;
    categoryId: number;
    isAvailable: boolean;
    constructor(id: number, title: string, author: string, categoryId: number);
}
export declare class Member {
    readonly id: number;
    readonly name: string;
    private loanIds;
    constructor(id: number, name: string);
    addLoan(loanId: number): void;
    removeLoan(loanId: number): void;
    getLoanIds(): number[];
}
export declare class Fine {
    readonly loanId: number;
    readonly overdueDays: number;
    readonly amount: number;
    isPaid: boolean;
    constructor(loanId: number, overdueDays: number, amount: number);
}
export declare class Loan {
    static readonly RETURN_DAYS = 14;
    static readonly FINE_PER_DAY = 500;
    readonly id: number;
    readonly bookId: number;
    readonly bookTitle: string;
    readonly memberId: number;
    readonly memberName: string;
    readonly borrowedAt: Date;
    readonly dueDate: Date;
    returnedAt: Date | null;
    fine: Fine | null;
    constructor(id: number, bookId: number, bookTitle: string, memberId: number, memberName: string, borrowedAt?: Date);
    isOverdue(): boolean;
    getOverdueDays(): number;
}
//# sourceMappingURL=models.d.ts.map