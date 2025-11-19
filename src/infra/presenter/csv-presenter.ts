import moment from "moment";
import type { Output } from "../../application/usecase/generate-invoices";
import type { Presenter } from "../../application/presenter/presenter";

export class CsvPresenter implements Presenter {
  present<T extends unknown>(output: Output[]): T {
    const lines: string[] = [];
    for (const invoice of output) {
      const line: string[] = [];
      line.push(moment(invoice.date).format("YYYY-MM-DD"));
      line.push(String(invoice.amount));
      lines.push(line.join(";"));
    }
    return lines.join("\n") as T;
  }
}
