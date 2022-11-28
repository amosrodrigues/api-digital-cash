import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { User } from '../modules/accounts/entities/User'
import { Account } from '../modules/accounts/entities/Account'
import { Transaction } from '../modules/transactions/entities/Transactions'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URI,
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Account, Transaction],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  subscribers: [],
})

// `${__dirname}/**/entities/*.{ts, js}` "entities"
// ./src/database/migrations/*.ts

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
