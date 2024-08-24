import { describe, expect, test } from "vitest";
import { uploadCloudinary } from "./feetch";
import "../mocks/setuptest";

describe("feetch", () => {
  test("should upload cloudinary", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const urlExample =
      "https://res.cloudinary.com/demo/image/upload/example.png";
    const result = await uploadCloudinary(file);
    expect(result).toStrictEqual({
      secure_url: urlExample,
    });
  }, 20000);
});
