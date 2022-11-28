import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Account } from '../../accounts/entities/Account'

@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  value: number

  @Column({ name: 'debited_account_id', nullable: true })
  debitedAccountId: string

  @Column({ name: 'credited_account_id', nullable: true })
  creditedAccountId: string

  @ManyToOne(() => Account)
  @JoinColumn([{ name: 'credited_account_id' }, { name: 'debited_account_id' }])
  account: Account

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Transaction }
