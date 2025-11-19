import type pg from "pg-promise/typescript/pg-subset";
import type { DatabaseConnection } from "./database-connnection";
import pgp from "pg-promise";

export class PgPromiseAdapter implements DatabaseConnection {
  constructor() {
    this.connection = pgp()(
      "postgres://postgres:postgres@localhost:5432/postgres"
    );
  }
  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }
  close(): Promise<void> {
    return this.connection.$pool.end();
  }
  connection: pgp.IDatabase<{}, pg.IClient>;
}
