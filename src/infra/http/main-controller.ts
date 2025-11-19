import type { HttpServer } from "./http-server";
import type { UseCase } from "../../application/usecase/use-case";

export class MainController {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCase: UseCase<unknown, unknown>
  ) {
    httpServer.on(
      "post",
      "/generate_invoices",
      async (
        params: Record<string, any>,
        body: Record<string, any>,
        headers: Record<string, any>
      ) => {
        const input = body;
        input.userAgent = headers["user-agent"];
        input.host = headers["host"];
        const output = await useCase.execute(input);
        return output;
      }
    );
  }
}
