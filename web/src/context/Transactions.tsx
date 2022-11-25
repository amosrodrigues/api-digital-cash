import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services'
import { Account } from './Auth'
import { Keys } from '../constants'

type Query = {
  startDate?: Date
  endDate?: Date
  type?: 'debited' | 'credited' | 'all'
}

export interface Transaction {
  type: string
  value: number
  createdAt: Date
}

export interface TransactionsContextData {
  transactions: Transaction[]
  isLoading: boolean
  onGetTransactions: (query: Query) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactios] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetTransactions = async (data: Query) => {
    try {
      setIsLoading(true)
      const response = await api.post<Transaction[]>('/transactions/list', {
        ...data,
      })

      setTransactios(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError
        if (err.response?.status === 400) {
          toast.error('Error ao tentar listar as transações!', {
            theme: 'dark',
          })
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  console.log(transactions)

  const data = useMemo(
    () => ({ transactions, isLoading, onGetTransactions }),
    [isLoading, transactions],
  )

  useEffect(() => {
    const { [Keys.TOKEN]: token } = parseCookies()

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`
      ;(async () => {
        await onGetTransactions({})
      })()
    }
  }, [])

  return (
    <TransactionsContext.Provider value={data}>
      {children}
    </TransactionsContext.Provider>
  )
}
