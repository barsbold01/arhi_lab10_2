// ============================================================
//  INFRASTRUCTURE LAYER  —  src/infrastructure/repositories.ts
//  IBookRepository, IMemberRepository, ILoanRepository-ийн
//  in-memory хэрэгжилт
// ============================================================

import { Book, Member, Loan } from "../domain/models";
import {
  IBookRepository,
  IMemberRepository,
  ILoanRepository,
} from "../domain/interfaces";

export class InMemoryBookRepository implements IBookRepository {
  private books: Map<number, Book> = new Map();

  findAll(): Book[] {
    return Array.from(this.books.values());
  }

  findById(id: number): Book | undefined {
    return this.books.get(id);
  }

  findByQuery(query: string): Book[] {
    const q = query.toLowerCase();
    return this.findAll().filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }

  save(book: Book): void {
    this.books.set(book.id, book);
  }

  delete(id: number): void {
    this.books.delete(id);
  }
}

export class InMemoryMemberRepository implements IMemberRepository {
  private members: Map<number, Member> = new Map();

  findAll(): Member[] {
    return Array.from(this.members.values());
  }

  findById(id: number): Member | undefined {
    return this.members.get(id);
  }

  save(member: Member): void {
    this.members.set(member.id, member);
  }
}

export class InMemoryLoanRepository implements ILoanRepository {
  private loans: Map<number, Loan> = new Map();

  findAll(): Loan[] {
    return Array.from(this.loans.values());
  }

  findById(id: number): Loan | undefined {
    return this.loans.get(id);
  }

  findActive(): Loan[] {
    return this.findAll().filter((l) => l.returnedAt === null);
  }

  findOverdue(): Loan[] {
    return this.findActive().filter((l) => l.isOverdue());
  }

  save(loan: Loan): void {
    this.loans.set(loan.id, loan);
  }
}
