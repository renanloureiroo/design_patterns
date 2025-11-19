import { AccrualBasisStrategy } from "./acrrual-basis-strategy";
import { CashBasisStrategy } from "./cash-basis-strategy";

export class InvoiceGenerationFactory {
  static create(type: string) {
    if (type === "cash") {
      return new CashBasisStrategy();
    }
    if (type === "accrual") {
      return new AccrualBasisStrategy();
    }

    throw new Error("Invalid type");
  }
}
