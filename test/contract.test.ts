import { Contract } from "../src/domain/contract";
import { Payment } from "../src/domain/payment";

// Unidade
describe("Contract", () => {
  test("Deve calcular o saldo do contrato", () => {
    const contract = new Contract(
      "",
      "",
      12,
      6000,
      new Date("2025-01-01T00:00:00")
    );
    contract.addPayment(new Payment("", 2000, new Date("2025-01-01T10:00:00")));

    expect(contract.getBalance()).toBe(4000);
  });

  test("Deve gerar faturas de um contrato", () => {
    const contract = new Contract(
      "",
      "",
      12,
      6000,
      new Date("2025-01-01T00:00:00")
    );

    const invoices = contract.generateInvoices(1, 2025, "accrual");

    expect(invoices.at(0)?.date).toEqual(new Date("2025-01-01T03:00:00Z"));
    expect(invoices.at(0)?.amount).toBe(500);
  });
});
