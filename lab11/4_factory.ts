// ============================================================
// 4. FACTORY PATTERN — PaymentMethod
// ============================================================

interface PaymentMethod {
  pay(amount: number): void;
  validate(): boolean;
}

class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`  Кредит картаар ${amount}₮ төлөгдлөө.`);
  }
  validate(): boolean {
    console.log("  Кредит карт баталгаажлаа.");
    return true;
  }
}

class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`  PayPal-аар ${amount}₮ төлөгдлөө.`);
  }
  validate(): boolean {
    console.log("  PayPal баталгаажлаа.");
    return true;
  }
}

class BankTransferPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`  Банкны шилжүүлгээр ${amount}₮ төлөгдлөө.`);
  }
  validate(): boolean {
    console.log("  Банкны данс баталгаажлаа.");
    return true;
  }
}

class PaymentFactory {
  static create(type: "credit" | "paypal" | "bank"): PaymentMethod {
    switch (type) {
      case "credit":
        return new CreditCardPayment();
      case "paypal":
        return new PayPalPayment();
      case "bank":
        return new BankTransferPayment();
      default:
        throw new Error(`Тодорхойгүй төлбөрийн арга: ${type}`);
    }
  }
}

// ============================================================
// TEST
// ============================================================
const types: Array<"credit" | "paypal" | "bank"> = ["credit", "paypal", "bank"];

for (const type of types) {
  const payment = PaymentFactory.create(type);
  payment.validate();
  payment.pay(50000);
  console.log();
}
