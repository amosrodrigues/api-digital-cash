type Account = {
  id: string
  balance: number
}

interface IUserDTO {
  id: string
  username: string
  accountId: string
  account: Account
}

export { IUserDTO }
