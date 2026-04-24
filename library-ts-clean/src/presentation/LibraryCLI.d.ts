import { LibraryService } from "../application/LibraryService";
export declare class LibraryCLI {
    private readonly service;
    constructor(service: LibraryService);
    showSearch(query: string): void;
    showBorrow(bookId: number, memberId: number): void;
    showReturn(loanId: number): void;
    showAdminAddBook(title: string, author: string, categoryId: number): void;
    showAdminDeleteBook(bookId: number): void;
    showAdminCategorize(bookId: number, categoryId: number): void;
    showCategories(): void;
    showActiveLoans(): void;
    showDailyReport(): void;
}
//# sourceMappingURL=LibraryCLI.d.ts.map