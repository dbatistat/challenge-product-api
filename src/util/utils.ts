import { createHmac } from 'crypto'

export function encryptPassword(password: string): string {
  const result = createHmac('sha256', process.env.PASSWORD_SECRET)
    .update(password)
    .digest('hex')
  return result
}
