import { http, HttpResponse } from "msw";
import { url } from "../cloudinary";

export const handlers = [
  http.post(url, () => {
    return HttpResponse.json({
      secure_url: "https://res.cloudinary.com/demo/image/upload/example.png",
    });
  }),
];
