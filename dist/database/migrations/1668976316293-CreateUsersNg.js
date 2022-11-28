"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersNg1668976316293 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersNg1668976316293 {
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
exports.CreateUsersNg1668976316293 = CreateUsersNg1668976316293;
