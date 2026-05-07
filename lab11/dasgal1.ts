class Order {
  private orderLine: OrderLine;
  private customer: Customer;

  constructor() {
    this.orderLine = new OrderLine();
    this.customer = new Customer();
  }

  public calculatePrice(): void {
    const quantity = this.orderLine.getQuantity();

    const product = this.orderLine.getProduct();

    const pricingDetails = product.getPricingDetails();

    const basePrice = this.calculateBasePrice(quantity, pricingDetails);

    const discount = this.calculateDiscounts();

    const finalPrice = basePrice - discount;

    console.log("Final price:", finalPrice);
  }
  private calculateBasePrice(quantity: number, pricing: any): number {
    return quantity * pricing.price;
  }
  private calculateDiscounts(): number {
 
    const discountInfo = this.customer.getDiscountInfo();
    return discountInfo.discountAmount;
  }
}

class OrderLine {
  public getQuantity(): number {
    return 2;
  }

  public getProduct(): Product {
    return new Product();
  }
}

class Product {
  public getPricingDetails(): any {
    return { price: 100 };
  }
}

class Customer {
  public getDiscountInfo(): any {
    return { discountAmount: 10 };
  }
}

const order = new Order();
order.calculatePrice();