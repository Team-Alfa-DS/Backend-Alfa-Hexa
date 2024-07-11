import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";

export class TransactionHandlerMock implements ITransactionHandler {
    startTransaction(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    commitTransaction(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    rollbackTransaction(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}