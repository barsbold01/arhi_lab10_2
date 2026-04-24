// ============================================================
//  MAIN  —  src/main.ts
//  Системийг эхлүүлж, бүх шаардлагуудыг demo хийнэ
// ============================================================

import { Book, BookCategory, Member } from "./domain/models";
import { LibraryService }             from "./application/LibraryService";
import { LibraryCLI }                 from "./presentation/LibraryCLI";
import {
  InMemoryBookRepository,
  InMemoryMemberRepository,
  InMemoryLoanRepository,
} from "./infrastructure/repositories";

// ── Шаардлага 8: BookCategory (aggregation)
const categories: BookCategory[] = [
  new BookCategory(1, "Уран зохиол"),
  new BookCategory(2, "Технологи"),
  new BookCategory(3, "Шинжлэх ухаан"),
];

// ── Repository-үүдийг үүсгэж өгөгдөл дүүргэнэ
const bookRepo   = new InMemoryBookRepository();
const memberRepo = new InMemoryMemberRepository();
const loanRepo   = new InMemoryLoanRepository();

// ── Шаардлага 3: Домайн ангиудыг үүсгэнэ (Book)
const seedBooks = [
  new Book(1, "Нууцлаг Газар",   "Д.Нямаа",       1),
  new Book(2, "Python Guide",    "Т.Болд",          2),
  new Book(3, "Монголын түүх",   "Б.Лхамсүрэн",    3),
  new Book(4, "Clean Code",      "Robert Martin",   2),
  new Book(5, "Одны хот",        "Д.Урнаа",         1),
];
seedBooks.forEach((b) => {
  bookRepo.save(b);
  categories.find((c) => c.id === b.categoryId)?.addBook(b.id);
});

// ── Шаардлага 3: Домайн ангиудыг үүсгэнэ (Member)
const seedMembers = [
  new Member(1, "Батбаяр Д."),
  new Member(2, "Оюунцэцэг М."),
  new Member(3, "Гантулга Б."),
];
seedMembers.forEach((m) => memberRepo.save(m));

// ── Application layer болон Presentation layer-ийг холбоно
const service = new LibraryService(bookRepo, memberRepo, loanRepo, categories);
const cli     = new LibraryCLI(service);

// ============================================================
//  DEMO — бүх шаардлагуудыг дараалан туршина
// ============================================================

console.log("══════════════════════════════════════════════════════");
console.log("  НОМЫН САНГИЙН СИСТЕМ · TypeScript · 3-Давхаргат");
console.log("══════════════════════════════════════════════════════");

// 1. Шаардлага 8 · Шаардлага 3: Ангилалуудыг харна
cli.showCategories();

// 2. Шаардлага 1: Ном хайх
cli.showSearch("");           // Бүх ном
cli.showSearch("Python");     // Хайлтаар шүүх

// 3. Шаардлага 1, 4, 6: Ном захиалах (Батбаяр "Python Guide" авна)
cli.showBorrow(2, 1);         // Book#2 → Member#1

// 4. Шаардлага 6: Member ↔ Loan association харагдана
cli.showActiveLoans();

// 5. Шаардлага 9: Админ шинэ ном нэмнэ
cli.showAdminAddBook("TypeScript Handbook", "Anders Hejlsberg", 2);

// 6. Шаардлага 9: Ангилах
cli.showAdminCategorize(3, 1);  // "Монголын түүх" → Уран зохиол рүү

// 7. Шаардлага 1: Ном буцаах (торгуулигүй)
cli.showReturn(1001);         // Эхний зээл

// 8. Шаардлага 10: Өдрийн тайлан
cli.showDailyReport();

// 9. Шаардлага 9: Ном устгах оролдлого
cli.showAdminDeleteBook(1);   // Боломжтой ном → амжилттай
cli.showAdminDeleteBook(4);   // Байхгүй ном → алдаа

// 10. Шаардлага 8: Aggregation-ийн тайлбар
console.log("\nШААРДЛАГА 4 · Composition тайлбар:");
console.log("─".repeat(50));
console.log("  Loan устсан ч bookTitle хадгалагдсан хэвээр байна.");
const loans = service.getAllLoans();
loans.forEach((l) => {
  console.log(`  Loan#${l.id}: bookTitle="${l.bookTitle}" ← composition`);
  if (l.fine) {
    console.log(`    Fine: ${l.fine.amount}₮, loanId=${l.fine.loanId} ← 1:1 (Шаардлага 7)`);
  }
});

console.log("\n══════════════════════════════════════════════════════");
console.log("  Demo дууслаа. Бүх 10 шаардлага туршигдлаа.");
console.log("══════════════════════════════════════════════════════\n");
