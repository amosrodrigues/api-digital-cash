"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactions1668976331873 = void 0;
const typeorm_1 = require("typeorm");
class CreateTransactions1668976331873 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'value',
                    type: 'numeric',
                },
                {
                    name: 'debited_account_id',
                    type: 'uuid',
                },
                {
                    name: 'credited_account_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_account_debited',
                    columnNames: ['debited_account_id'],
                    referencedTableName: 'accounts',
                    referencedColumnNames: ['id'],
                },
                {
                    name: 'fk_account_credited',
                    columnNames: ['credited_account_id'],
                    referencedTableName: 'accounts',
                    referencedColumnNames: ['id'],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('transactions');
    }
}
exports.CreateTransactions1668976331873 = CreateTransactions1668976331873;
