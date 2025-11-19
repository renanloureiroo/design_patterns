import { InvoiceGenerationFactory } from "./invoce-generation-factory";

import type { Payment } from "./payment";

export class Contract {
  private payments: Payment[];
  constructor(
    public readonly idContract: string,
    public readonly description: string,
    public readonly periods: number,
    public readonly amount: number,
    public readonly date: Date
  ) {
    this.payments = [];
  }

  addPayment(payment: Payment) {
    this.payments.push(payment);
  }

  getPayments() {
    return this.payments;
  }

  getBalance() {
    return (
      this.amount -
      this.payments.reduce((acc, payment) => acc + payment.amount, 0)
    );
  }

  generateInvoices(month: number, year: number, type: string) {
    return InvoiceGenerationFactory.create(type).generate(this, month, year);
  }
}
