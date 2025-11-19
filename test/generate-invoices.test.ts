import { ContractDatabaseRepository } from "../src/infra/repository/contract-database-repository";
import type { ContractRepository } from "../src/application/repository/contract-respository";
import type { DatabaseConnection } from "../src/infra/database/database-connnection";
import { GenerateInvoices } from "../src/application/usecase/generate-invoices";
import { PgPromiseAdapter } from "../src/infra/database/pg-promise-adapter";
import { CsvPresenter } from "../src/infra/presenter/csv-presenter";

let connection: DatabaseConnection;
let contractRepository: ContractRepository;
let sut: GenerateInvoices;

// Integração
describe("GenerateInvoices", () => {
  beforeEach(() => {
    connection = new PgPromiseAdapter();
    contractRepository = new ContractDatabaseRepository(connection);
    sut = new GenerateInvoices(contractRepository);
  });

  afterEach(async () => {
    await connection.close();
  });

  test("Deve gerar as notas fiscais por regime de caixa", async () => {
    const input = {
      month: 1,
      year: 2025,
      type: "cash",
    };
    const output = await sut.execute(input);
    expect(output.at(0)?.date).toBe("2025-01-05");
    expect(output.at(0)?.amount).toBe(6000);
  });

  test("Deve gerar as notas fiscais por regime de competência", async () => {
    const input = {
      month: 1,
      year: 2025,
      type: "accrual",
    };
    const output = await sut.execute(input);
    expect(output.at(0)?.date).toBe("2025-01-01");
    expect(output.at(0)?.amount).toBe(500);
  });

  test("Deve gerar as notas fiscais por regime de competência", async () => {
    const input = {
      month: 2,
      year: 2025,
      type: "accrual",
    };
    const output = await sut.execute(input);
    expect(output.at(0)?.date).toBe("2025-02-01");
    expect(output.at(0)?.amount).toBe(500);
  });

  test("Deve gerar as notas por regime de competência em CSV", async () => {
    const input = {
      month: 1,
      year: 2025,
      type: "accrual",
    };
    const presenter = new CsvPresenter();
    sut = new GenerateInvoices(contractRepository, presenter);
    const output = await sut.execute(input);
    expect(output).toBe("2025-01-01;500");
  });
});
