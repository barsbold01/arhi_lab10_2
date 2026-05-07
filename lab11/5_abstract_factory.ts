// ============================================================
// 5. ABSTRACT FACTORY PATTERN — GUI Factory
// ============================================================

// Product interfaces
interface Button {
  render(): void;
}

interface Checkbox {
  render(): void;
}

interface Slider {
  render(): void;
}

// Abstract Factory interface
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createSlider(): Slider;
}

// ---- Windows concrete products ----
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

// ---- Mac concrete products ----
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

// ---- Concrete Factories ----
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

// Client function
function renderUI(factory: GUIFactory): void {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  const slider = factory.createSlider();

  button.render();
  checkbox.render();
  slider.render();
}

// ============================================================
// TEST
// ============================================================
console.log("Windows UI:");
renderUI(new WindowsFactory());

console.log("\nMac UI:");
renderUI(new MacFactory());
