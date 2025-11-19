export class Payment {
  constructor(
    public readonly idPayment: string,
    public readonly amount: number,
    public readonly date: Date
  ) {}
}
