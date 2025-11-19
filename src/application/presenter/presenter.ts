import type { Output } from "../usecase/generate-invoices";

export interface Presenter {
  present<T extends unknown>(output: Output[]): T;
}
