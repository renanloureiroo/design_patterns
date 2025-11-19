import type { Contract } from "./contract";
import type { Invoice } from "./invoice";

export interface InvoiceGenerationStrategy {
  generate(contract: Contract, month: number, year: number): Invoice[];
}
