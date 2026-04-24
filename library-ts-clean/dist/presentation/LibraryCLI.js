"use strict";
// ============================================================
//  PRESENTATION LAYER  —  src/presentation/LibraryCLI.ts
//  Шаардлага 1, 9, 10
//  Хэрэглэгчтэй харилцах CLI интерфейс
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryCLI = void 0;
const models_1 = require("../domain/models");
class LibraryCLI {
    constructor(service) {
        this.service = service;
    }
    // ── Шаардлага 1: Ном хайх харагдац
    showSearch(query) {
        console.log("\n НОМ ХАЙХ");
        console.log("─".repeat(50));
        const result = this.service.searchBooks(query);
        if (result.total === 0) {
            console.log(`  "${query}" хайлтаар ном олдсонгүй.`);
            return;
        }
        console.log(`  Нийт ${result.total} ном олдлоо:\n`);
        result.books.forEach((book, i) => {
            const status = book.isAvailable ? " Боломжтой" : " Зээлэгдсэн";
            console.log(`  ${i + 1}. [${book.id}] "${book.title}" — ${book.author}`);
            console.log(`     Төлөв: ${status}`);
        });
    }
    // ── Шаардлага 1: Ном захиалах харагдац
    showBorrow(bookId, memberId) {
        console.log("\n НОМ ЗАХИАЛАХ");
        console.log("─".repeat(50));
        const result = this.service.borrowBook(bookId, memberId);
        if (result.ok) {
            console.log(`   ${result.message}`);
            if (result.data) {
                console.log(`  Зээлийн ID: #${result.data.id}`);
                console.log(`  Буцаах огноо: ${result.data.dueDate.toLocaleDateString("mn-MN")}`);
            }
        }
        else {
            console.log(`   Алдаа: ${result.message}`);
        }
    }
    // ── Шаардлага 1: Ном буцаах харагдац
    // ── Шаардлага 5: Торгуулийн мэдэгдэл
    showReturn(loanId) {
        console.log("\n НОМ БУЦААХ");
        console.log("─".repeat(50));
        const result = this.service.returnBook(loanId);
        if (result.ok) {
            console.log(`   ${result.message}`);
            if (result.data?.fine) {
                const fine = result.data.fine;
                console.log(`\n   ТОРГУУЛИЙН МЭДЭГДЭЛ (Шаардлага 5)`);
                console.log(`  Хожимдсон хоног : ${fine.overdueDays} өдөр`);
                console.log(`  Торгуулийн дүн  : ${fine.amount.toLocaleString()}₮`);
                console.log(`  Торгуулийн ID   : #${fine.loanId} зээлд холбоотой (1:1)`);
            }
        }
        else {
            console.log(`  Алдаа: ${result.message}`);
        }
    }
    // ── Шаардлага 9: Админ — ном нэмэх харагдац
    showAdminAddBook(title, author, categoryId) {
        console.log("\n АДМИН: НОМ НЭМЭХ (Шаардлага 9)");
        console.log("─".repeat(50));
        const result = this.service.addBook(title, author, categoryId);
        console.log(result.ok ? `  ${result.message}` : `  ${result.message}`);
    }
    // ── Шаардлага 9: Админ — ном устгах харагдац
    showAdminDeleteBook(bookId) {
        console.log("\n  АДМИН: НОМ УСТГАХ (Шаардлага 9)");
        console.log("─".repeat(50));
        const result = this.service.deleteBook(bookId);
        console.log(result.ok ? `   ${result.message}` : `   ${result.message}`);
    }
    // ── Шаардлага 9: Админ — ангилах харагдац
    showAdminCategorize(bookId, categoryId) {
        console.log("\n  АДМИН: АНГИЛАХ (Шаардлага 9)");
        const result = this.service.categorizeBook(bookId, categoryId);
        console.log(result.ok ? `   ${result.message}` : `   ${result.message}`);
    }
    // ── Шаардлага 9 & 8: Ангилалуудыг харуулах (BookCategory aggregation)
    showCategories() {
        console.log("\n НОМЫН АНГИЛАЛУУД (Шаардлага 8 · Aggregation)");
        console.log("─".repeat(50));
        const categories = this.service.getCategories();
        const allBooks = this.service.searchBooks("").books;
        categories.forEach((cat) => {
            const booksInCat = allBooks.filter((b) => b.categoryId === cat.id);
            console.log(`\n  ${cat.name} (${booksInCat.length} ном)`);
            booksInCat.forEach((b) => {
                const status = b.isAvailable ? "Байгаа" : "Зээлэгдсэн";
                console.log(`     ${status} [${b.id}] "${b.title}" — ${b.author}`);
            });
        });
    }
    // ── Шаардлага 6: Зээлийн жагсаалт (Member ↔ Loan association)
    showActiveLoans() {
        console.log("\nИДЭВХТЭЙ ЗЭЭЛҮҮД (Шаардлага 6 · Member↔Loan association)");
        console.log("─".repeat(50));
        console.log(`  ${"ID".padEnd(6)} ${"НОМ".padEnd(28)} ${"ГИШҮҮН".padEnd(16)} ${"БУЦААХ".padEnd(12)} ТӨЛӨВ`);
        console.log("  " + "─".repeat(75));
        const loans = this.service.getActiveLoans();
        if (loans.length === 0) {
            console.log("  Идэвхтэй зээл байхгүй байна.");
            return;
        }
        loans.forEach((loan) => {
            const due = loan.dueDate.toLocaleDateString("mn-MN");
            const status = loan.isOverdue()
                ? `+${loan.getOverdueDays()}ᠢ хожимдсон`
                : "Хугацаанд";
            const id = `#${loan.id}`.padEnd(6);
            const title = loan.bookTitle.substring(0, 26).padEnd(28);
            const member = loan.memberName.padEnd(16);
            console.log(`  ${id} ${title} ${member} ${due.padEnd(12)} ${status}`);
        });
        console.log(`\n  Нийт: ${loans.length} зээл`);
        console.log(`  Шаардлага 2: Буцаах хугацаа = ${models_1.Loan.RETURN_DAYS} хоног`);
        console.log(`  Шаардлага 5: Торгууль = ${models_1.Loan.FINE_PER_DAY.toLocaleString()}₮/өдөр`);
    }
    // ── Шаардлага 10: Өдрийн тайлан
    showDailyReport() {
        console.log("\n ӨДРИЙН ТАЙЛАН (Шаардлага 10)");
        const report = this.service.getDailyReport();
        const d = report.date.toLocaleDateString("mn-MN");
        console.log(`  Огноо              : ${d}`);
        console.log(`  Захиалсан          : ${report.totalBorrows} ном`);
        console.log(`  Буцаасан           : ${report.totalReturns} ном`);
        console.log(`  Цуглуулсан торгууль: ${report.finesCollected.toLocaleString()}₮`);
        console.log(`  Нийт идэвхтэй зээл : ${report.activeLoans}`);
        console.log(`  Хугацаа хэтэрсэн   : ${report.overdueLoans}`);
        if (report.transactions.length > 0) {
            console.log("\n  Өнөөдрийн гүйлгээнүүд:");
            report.transactions.forEach((tx) => {
                const time = tx.timestamp.toLocaleTimeString("mn-MN");
                const type = tx.type === "borrow" ? "ЗЭЭЛ"
                    : tx.type === "return" ? "БУЦААЛТ"
                        : tx.type === "add" ? "НЭМСЭН"
                            : "УСТГАСАН";
                const fine = tx.fineAmount ? `  [${tx.fineAmount.toLocaleString()}₮ торгууль]` : "";
                console.log(`  ${time}  ${type.padEnd(12)} "${tx.bookTitle}" ${tx.memberName ?? ""}${fine}`);
            });
        }
    }
}
exports.LibraryCLI = LibraryCLI;
