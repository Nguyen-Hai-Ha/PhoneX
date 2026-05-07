import { z } from 'zod'

export const categorySchema = z.object({
    name: z.string(),
    slug: z.string()
})

export const productSchema = z.object({
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    description: z.string(),
    content: z.string(),
    color: z.string(),
    image_url: z.string(),
    brand: z.string(),
    stock: z.number(),
    status: z.enum(["ACTIVE", "OUT_OF_STOCK", "HIDDEN", "COMING_SOON"]),
    categoryId: z.coerce.number().int().positive(),
    tagIds: z.array(z.number()).optional().default([]),
})

export const tagSchema = z.object({
    name: z.string(),
    slug: z.string()
})

export const imageSchema = z.object({
    url: z.string(),
    alt: z.string(),
    productId: z.coerce.number().int().positive()
})

export const wishlistSchema = z.object({
    productId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive()
})

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    roleID: z.coerce.number().int().positive()
})

export const roleSchema = z.object({
    name: z.string(),
    slug: z.string()
})

export const commentSchema = z.object({
    content: z.string(),
    productId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive()
})
