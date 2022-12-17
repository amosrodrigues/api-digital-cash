"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1668976316293 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsers1668976316293 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'account_id',
                    type: 'uuid',
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_users_acount',
                    columnNames: ['account_id'],
                    referencedTableName: 'accounts',
                    referencedColumnNames: ['id'],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsers1668976316293 = CreateUsers1668976316293;
