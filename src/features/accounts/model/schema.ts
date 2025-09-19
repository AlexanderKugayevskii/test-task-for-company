import { z } from 'zod'

export const accountTypeSchema = z.enum(['local', 'ldap'])

export const accountRowSchema = z
  .object({
    id: z.string(),
    labels: z.string().optional().nullable().default(''),
    type: accountTypeSchema,
    login: z.string().min(1, 'Укажите логин'),
    password: z.string().max(100).optional().nullable().default(''),
  })
  .superRefine((value, context) => {
    if (value.type === 'local') {
      const password = (value.password ?? '').trim()

      if (!password) {
        context.addIssue({
          path: ['password'],
          code: 'custom',
          message: 'Пароль обязаетелен для локальной учетной записи',
        })
      } else if (password.length < 6) {
        context.addIssue({
          path: ['password'],
          code: 'custom',
          message: 'Пароль должен быть не менее 6 символов',
        })
      }
    }
  })

export const accountsFormSchema = z.object({
  accounts: z.array(accountRowSchema).min(1, 'Добавьте хотя бы одну учетную запись'),
})

export type AccountRowInput = z.infer<typeof accountRowSchema>
export type AccountsFormInput = z.infer<typeof accountsFormSchema>
