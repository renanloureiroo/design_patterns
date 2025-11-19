import { Contract } from "../../domain/contract";
import type { ContractRepository } from "../../application/repository/contract-respository";
import type { DatabaseConnection } from "../database/database-connnection";
import { Payment } from "../../domain/payment";

export class ContractDatabaseRepository implements ContractRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}
  async list(): Promise<Contract[]> {
    const contracts: Contract[] = [];
    const contractsData = await this.databaseConnection.query(
      "SELECT * FROM renan.contract",
      []
    );
    for (const contractData of contractsData) {
      const contract = new Contract(
        contractData.id_contract,
        contractData.description,
        contractData.periods,
        parseFloat(contractData.amount),
        contractData.date
      );
      const payments = await this.databaseConnection.query(
        "SELECT * FROM renan.payment WHERE id_contract = $1",
        [contractData.id_contract]
      );
      for (const payment of payments) {
        contract.addPayment(
          new Payment(
            payment.id_payment,
            parseFloat(payment.amount),
            payment.date
          )
        );
      }
      contracts.push(contract);
    }
    return contracts;
  }
}
