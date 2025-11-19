import moment from "moment";
import type { Output } from "../../application/usecase/generate-invoices";
import type { Presenter } from "../../application/presenter/presenter";

export class JsonPresenter implements Presenter {
  present<T extends unknown>(output: Output[]): T {
    return output.map((invoice) => ({
      date: moment(invoice.date).format("YYYY-MM-DD"),
      amount: invoice.amount,
    })) as T;
  }
}
