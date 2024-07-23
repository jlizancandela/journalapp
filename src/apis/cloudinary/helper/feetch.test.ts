import { describe, expect, test, vi } from "vitest";
import { uploadCloudinary } from "./feetch";

vi.mock("./feetch", () => ({
  uploadCloudinary: vi.fn(),
}));

describe("feetch", () => {
  test("should upload cloudinary", async () => {
    const mockresult = "https://example.com/example.png";

    vi.mocked(uploadCloudinary).mockResolvedValue(mockresult);

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const result = await uploadCloudinary(file);
    expect(result).toBe(mockresult);
  }, 20000);
});
