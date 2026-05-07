// ============================================================
// LAB 11 - Design Patterns (TypeScript)
// ============================================================

// ============================================================
// 1. SINGLETON PATTERN — ConfigManager
// ============================================================

class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, string>;

  private constructor() {
    this.config = new Map<string, string>();
    // Default config values
    this.config.set("API_ENDPOINT", "https://api.example.com");
    this.config.set("PORT", "3000");
    this.config.set("DB_HOST", "localhost");
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get(key: string): string | undefined {
    return this.config.get(key);
  }

  public set(key: string, value: string): void {
    this.config.set(key, value);
  }

  public display(): void {
    console.log("--- ConfigManager тохиргоонууд ---");
    this.config.forEach((value, key) => {
      console.log(`  ${key} = ${value}`);
    });
  }
}

// Test
console.log("========== 1. SINGLETON ==========");
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();
console.log("Ижил объект мөн үү?", config1 === config2); // true

config1.display();
config1.set("PORT", "8080");
console.log("PORT шинэчилсний дараа:", config2.get("PORT")); // 8080 (same instance)


// ============================================================
// 2. PROTOTYPE PATTERN — Student
// ============================================================

interface Prototype<T> {
  clone(): T;
}

class Student implements Prototype<Student> {
  name: string;
  age: number;
  major: string;

  constructor(name: string, age: number, major: string) {
    this.name = name;
    this.age = age;
    this.major = major;
  }

  clone(): Student {
    return new Student(this.name, this.age, this.major);
  }

  display(): void {
    console.log(`  Нэр: ${this.name}, Нас: ${this.age}, Мэргэжил: ${this.major}`);
  }
}

// Test
console.log("\n========== 2. PROTOTYPE ==========");
const originalStudent = new Student("Batsaikhan", 21, "Computer Science");
const clonedStudent = originalStudent.clone();

console.log("Эх объект:");
originalStudent.display();
console.log("Хуулбар объект:");
clonedStudent.display();

console.log("Ижил объект мөн үү?", originalStudent === clonedStudent); // false

// Modify clone — should not affect original
clonedStudent.name = "Munkhbat";
clonedStudent.major = "Software Engineering";
console.log("Хуулбарыг өөрчилсний дараа эх объект:");
originalStudent.display();
console.log("Өөрчилсөн хуулбар:");
clonedStudent.display();


// ============================================================
// 3. BUILDER PATTERN — House
// ============================================================

class House {
  windows: number = 0;
  doors: number = 0;
  roof: string = "";
  garage: boolean = false;

  display(): void {
    console.log(`  Цонх: ${this.windows}, Хаалга: ${this.doors}, Үс: ${this.roof}, Гараж: ${this.garage}`);
  }
}

interface HouseBuilder {
  setWindows(count: number): HouseBuilder;
  setDoors(count: number): HouseBuilder;
  setRoof(type: string): HouseBuilder;
  setGarage(has: boolean): HouseBuilder;
  build(): House;
}

class ModernHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  setWindows(count: number): HouseBuilder {
    this.house.windows = count;
    return this;
  }

  setDoors(count: number): HouseBuilder {
    this.house.doors = count;
    return this;
  }

  setRoof(type: string): HouseBuilder {
    this.house.roof = type;
    return this;
  }

  setGarage(has: boolean): HouseBuilder {
    this.house.garage = has;
    return this;
  }

  build(): House {
    return this.house;
  }
}

class LuxuryHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  setWindows(count: number): HouseBuilder {
    this.house.windows = count;
    return this;
  }

  setDoors(count: number): HouseBuilder {
    this.house.doors = count;
    return this;
  }

  setRoof(type: string): HouseBuilder {
    this.house.roof = type;
    return this;
  }

  setGarage(has: boolean): HouseBuilder {
    this.house.garage = has;
    return this;
  }

  build(): House {
    return this.house;
  }
}

class HouseDirector {
  buildModernHouse(builder: HouseBuilder): House {
    return builder
      .setWindows(6)
      .setDoors(2)
      .setRoof("Flat roof")
      .setGarage(false)
      .build();
  }

  buildLuxuryHouse(builder: HouseBuilder): House {
    return builder
      .setWindows(12)
      .setDoors(4)
      .setRoof("Gabled roof")
      .setGarage(true)
      .build();
  }
}

// Test
console.log("\n========== 3. BUILDER ==========");
const director = new HouseDirector();

const modernHouse = director.buildModernHouse(new ModernHouseBuilder());
console.log("Орчин үеийн гэр:");
modernHouse.display();

const luxuryHouse = director.buildLuxuryHouse(new LuxuryHouseBuilder());
console.log("Тансаг гэр:");
luxuryHouse.display();


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

// Test
console.log("\n========== 4. FACTORY ==========");
const payments: Array<"credit" | "paypal" | "bank"> = ["credit", "paypal", "bank"];
for (const type of payments) {
  const payment = PaymentFactory.create(type);
  payment.validate();
  payment.pay(50000);
}


// ============================================================
// 5. ABSTRACT FACTORY PATTERN — GUI (Button + Checkbox + Slider)
// ============================================================

interface Button {
  render(): void;
}

interface Checkbox {
  render(): void;
}

interface Slider {
  render(): void;
}

// Windows implementations
class WindowsButton implements Button {
  render(): void {
    console.log("  Windows товчлуурыг дүрслэв");
  }
}

class WindowsCheckbox implements Checkbox {
  render(): void {
    console.log("  Windows checkbox-ийг дүрслэв");
  }
}

class WindowsSlider implements Slider {
  render(): void {
    console.log("  Windows слайдерыг дүрслэв");
  }
}

// Mac implementations
class MacButton implements Button {
  render(): void {
    console.log("  Mac товчлуурыг дүрслэв");
  }
}

class MacCheckbox implements Checkbox {
  render(): void {
    console.log("  Mac checkbox-ийг дүрслэв");
  }
}

class MacSlider implements Slider {
  render(): void {
    console.log("  Mac слайдерыг дүрслэв");
  }
}

// Abstract Factory Interface
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createSlider(): Slider;
}

// Concrete Factories
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
  createSlider(): Slider {
    return new WindowsSlider();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
  createSlider(): Slider {
    return new MacSlider();
  }
}

// Client
function renderUI(factory: GUIFactory): void {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  const slider = factory.createSlider();

  button.render();
  checkbox.render();
  slider.render();
}

// Test
console.log("\n========== 5. ABSTRACT FACTORY ==========");
console.log("Windows UI:");
renderUI(new WindowsFactory());

console.log("Mac UI:");
renderUI(new MacFactory());