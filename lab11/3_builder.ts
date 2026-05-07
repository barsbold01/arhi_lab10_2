// ============================================================
// 3. BUILDER PATTERN — House
// ============================================================

class House {
  windows: number = 0;
  doors: number = 0;
  roof: string = "";
  garage: boolean = false;

  display(): void {
    console.log(
      `  Цонх: ${this.windows}, Хаалга: ${this.doors}, Үс: ${this.roof}, Гараж: ${this.garage}`
    );
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

// ============================================================
// TEST
// ============================================================
const director = new HouseDirector();

const modernHouse = director.buildModernHouse(new ModernHouseBuilder());
console.log("Орчин үеийн гэр:");
modernHouse.display();

const luxuryHouse = director.buildLuxuryHouse(new LuxuryHouseBuilder());
console.log("Тансаг гэр:");
luxuryHouse.display();
