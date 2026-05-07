// server/utils/validator.ts
import { ZodSchema } from 'zod'

export const validateBody = async (event: any, schema: ZodSchema) => {
  const body = await readBody(event)
  const result = schema.safeParse(body)
  
  if (!result.success) {
    throw createError({
      statusCode: 400,
      data: result.error.flatten().fieldErrors
    })
  }
  
  return result.data
}