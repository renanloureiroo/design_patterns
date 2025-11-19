import type { ContractRepository } from "../repository/contract-respository";
import type { Presenter } from "../presenter/presenter";
import { JsonPresenter } from "../../infra/presenter/json-presenter";
import type { UseCase } from "./use-case";
import { Mediator } from "../../infra/mediator/mediator";

export class GenerateInvoices implements UseCase<Input, Output[]> {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly presenter: Presenter = new JsonPresenter(),
    private readonly meadiator: Mediator = new Mediator()
  ) {}
  async execute(input: Input): Promise<Output[]> {
    const output: Output[] = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      const invoices = contract.generateInvoices(
        input.month,
        input.year,
        input.type
      );

      for (const invoice of invoices) {
        output.push({
          date: invoice.date,
          amount: invoice.amount,
        });
      }
    }
    const result = this.presenter.present<Output[]>(output);
    await this.meadiator.publish("invoices-generated", result);
    return result;
  }
}

type Input = {
  month: number;
  year: number;
  type: string;
};

export type Output = {
  date: Date;
  amount: number;
};
