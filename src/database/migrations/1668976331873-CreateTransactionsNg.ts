import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTransactionsNg1668976331873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
