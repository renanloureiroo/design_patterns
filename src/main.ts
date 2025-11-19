import { ContractDatabaseRepository } from "./infra/repository/contract-database-repository";
import { ExpressHttpServerAdapter } from "./infra/http/express-http-server-adapter";
import { GenerateInvoices } from "./application/usecase/generate-invoices";
import { LoggerDecorator } from "./application/decorator/logger-decorator";
import { MainController } from "./infra/http/main-controller";
import { PgPromiseAdapter } from "./infra/database/pg-promise-adapter";
import { Mediator } from "./infra/mediator/mediator";
import { JsonPresenter } from "./infra/presenter/json-presenter";
import { SendEmail } from "./application/usecase/send-email";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const mediator = new Mediator();
const sendEmail = new SendEmail();
const generateInvoices = new LoggerDecorator(
  new GenerateInvoices(contractRepository, new JsonPresenter(), mediator)
);

mediator.on("invoices-generated", async (data: unknown) => {
  await sendEmail.execute(data);
});
const httpServer = new ExpressHttpServerAdapter();
new MainController(httpServer, generateInvoices);

httpServer.listen(3000);
