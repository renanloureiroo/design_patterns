import type { HttpServer } from "./http-server";
import express, { type Request } from "express";

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "options"
  | "head";

export class ExpressHttpServerAdapter implements HttpServer {
  app: express.Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: HttpMethod, url: string, callback: Function): void {
    const methodMap: Record<string, HttpMethod> = {
      get: "get",
      post: "post",
      put: "put",
      patch: "patch",
      delete: "delete",
      options: "options",
      head: "head",
    };

    const httpMethod = methodMap[method.toLowerCase()] || "get";
    this.app[httpMethod](url, async (req: Request, res: express.Response) => {
      const output = await callback(req.params, req.body, req.headers);
      res.json(output);
    });
  }
  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
