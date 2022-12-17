"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccount1668976291942 = void 0;
const typeorm_1 = require("typeorm");
class CreateAccount1668976291942 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'accounts',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'balance',
                    type: 'numeric',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('accounts');
    }
}
exports.CreateAccount1668976291942 = CreateAccount1668976291942;
