export type AccountType = 'local' | 'ldap'

export type AccountLabel = { text: string }

export type AccountRecord = {
  id: string
  labels: AccountLabel[]
  type: AccountType
  login: string
  password?: string | null
}
