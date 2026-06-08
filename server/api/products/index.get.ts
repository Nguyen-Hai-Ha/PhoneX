import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                variants: {
                    orderBy: {
                        storage: 'asc',
                    },
                }
            }
        })
        return {
            status: true,
            message: "Lấy sản phẩm thành công",
            data: products,
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021') {
            console.warn('Product table is missing, returning an empty product list for now.')
            return {
                status: true,
                message: "Lấy sản phẩm thành công",
                data: [],
            }
        }

        console.error("API Error:", error)
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi lấy sản phẩm",
        })
    }
})