import { Book, Member, Loan } from "../domain/models";
import { IBookRepository, IMemberRepository, ILoanRepository } from "../domain/interfaces";
export declare class InMemoryBookRepository implements IBookRepository {
    private books;
    findAll(): Book[];
    findById(id: number): Book | undefined;
    findByQuery(query: string): Book[];
    save(book: Book): void;
    delete(id: number): void;
}
export declare class InMemoryMemberRepository implements IMemberRepository {
    private members;
    findAll(): Member[];
    findById(id: number): Member | undefined;
    save(member: Member): void;
}
export declare class InMemoryLoanRepository implements ILoanRepository {
    private loans;
    findAll(): Loan[];
    findById(id: number): Loan | undefined;
    findActive(): Loan[];
    findOverdue(): Loan[];
    save(loan: Loan): void;
}
//# sourceMappingURL=repositories.d.ts.map