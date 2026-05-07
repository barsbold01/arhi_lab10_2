// ============================================================
// 1. SINGLETON PATTERN — ConfigManager
// ============================================================

class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, string>;

  private constructor() {
    this.config = new Map<string, string>();
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

// ============================================================   r
// TEST
// ============================================================
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

console.log("Ижил объект мөн үү?", config1 === config2); // true

config1.display();

config1.set("PORT", "8080");
console.log("PORT шинэчилсний дараа:", config2.get("PORT")); // 8080
