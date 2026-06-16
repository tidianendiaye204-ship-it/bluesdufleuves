import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("Utils", () => {
  describe("cn (className utility)", () => {
    it("should merge class names correctly", () => {
      const result = cn("class1", "class2");
      expect(result).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      const shouldInclude = false;
      const result = cn("class1", shouldInclude ? "class2" : undefined, "class3");
      expect(result).toBe("class1 class3");
    });

    it("should handle undefined and null values", () => {
      const result = cn("class1", undefined, null, "class2");
      expect(result).toBe("class1 class2");
    });

    it("should handle Tailwind class conflicts", () => {
      const result = cn("px-4", "px-8");
      expect(result).toBe("px-8");
    });
  });
});
