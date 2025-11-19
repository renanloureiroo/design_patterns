import type { UseCase } from "../usecase/use-case";

export class LoggerDecorator implements UseCase<unknown, unknown> {
  constructor(private readonly useCase: UseCase<unknown, unknown>) {}
  async execute(input: unknown & { userAgent: string }): Promise<unknown> {
    console.log(input.userAgent);
    return this.useCase.execute(input);
  }
}
