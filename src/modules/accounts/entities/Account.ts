import { v4 as uuidv4 } from 'uuid'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
class Account {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  balance: number

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Account }
