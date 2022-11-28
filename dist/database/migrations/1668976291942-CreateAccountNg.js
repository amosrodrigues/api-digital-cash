"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountNg1668976291942 = void 0;
const typeorm_1 = require("typeorm");
class CreateAccountNg1668976291942 {
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
exports.CreateAccountNg1668976291942 = CreateAccountNg1668976291942;
