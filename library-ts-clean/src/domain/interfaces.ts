// ============================================================
//  DOMAIN LAYER  —  src/domain/interfaces.ts
//  Domain-д хэрэглэгдэх интерфейс, type тодорхойлолтууд
// ============================================================

import { Book, Member, Loan, Fine } from "./models";

// Үр дүнгийн ерөнхий төрөл
export interface Result<T = void> {
  ok: boolean;
  message: string;
  data?: T;
}

// Хайлтын үр дүн
export interface SearchResult {
  books: Book[];
  total: number;
}

// Өдрийн тайлангийн бүтэц — Шаардлага 10
export interface DailyReport {
  date: Date;
  totalBorrows: number;
  totalReturns: number;
  finesCollected: number;
  activeLoans: number;
  overdueLoans: number;
  transactions: Transaction[];
}

// Гүйлгээний бичлэг
export interface Transaction {
  type: "borrow" | "return" | "add" | "delete";
  bookTitle: string;
  memberName?: string;
  fineAmount?: number;
  timestamp: Date;
}

// Repository интерфейсүүд (Domain Layer-ийн хэрэгцээ тодорхойлно)
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
