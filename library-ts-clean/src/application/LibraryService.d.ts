import { Book, BookCategory, Member, Loan, Fine } from "../domain/models";
import { Result, SearchResult, DailyReport, IBookRepository, IMemberRepository, ILoanRepository } from "../domain/interfaces";
export declare class LibraryService {
    private readonly bookRepo;
    private readonly memberRepo;
    private readonly loanRepo;
    private readonly categories;
    private transactions;
    private idCounter;
    constructor(bookRepo: IBookRepository, memberRepo: IMemberRepository, loanRepo: ILoanRepository, categories: BookCategory[]);
    searchBooks(query: string): SearchResult;
    borrowBook(bookId: number, memberId: number): Result<Loan>;
    returnBook(loanId: number): Result<{
        loan: Loan;
        fine: Fine | null;
    }>;
    private calculateFine;
    addBook(title: string, author: string, categoryId: number): Result<Book>;
    deleteBook(bookId: number): Result;
    categorizeBook(bookId: number, categoryId: number): Result;
    getDailyReport(): DailyReport;
    getAllLoans(): Loan[];
    getActiveLoans(): Loan[];
    getOverdueLoans(): Loan[];
    getCategories(): BookCategory[];
    getAllMembers(): Member[];
}
//# sourceMappingURL=LibraryService.d.ts.map