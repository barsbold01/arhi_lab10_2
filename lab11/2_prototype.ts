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

// ============================================================
// TEST
// ============================================================
const originalStudent = new Student("Batsaikhan", 21, "Computer Science");
const clonedStudent = originalStudent.clone();

console.log("Эх объект:");
originalStudent.display();

console.log("Хуулбар объект:");
clonedStudent.display();

console.log("Ижил объект мөн үү?", originalStudent === clonedStudent); // false

// Хуулбарыг өөрчлөхөд эх объект өөрчлөгдөхгүй
clonedStudent.name = "Munkhbat";
clonedStudent.major = "Software Engineering";

console.log("\nХуулбарыг өөрчилсний дараа:");
console.log("Эх объект:");
originalStudent.display();
console.log("Хуулбар объект:");
clonedStudent.display();
