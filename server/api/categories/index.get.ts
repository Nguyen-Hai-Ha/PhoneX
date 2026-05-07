export default defineEventHandler(async (event) => {
    try {
        const categories = await prisma.category.findMany()
        return {
            status: true,
            message: "Lấy danh mục thành công",
            data: categories,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi lấy danh mục",
        })

    }
})