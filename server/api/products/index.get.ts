export default defineEventHandler(async (event) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                variants: true
            }
        })
        return {
            status: true,
            message: "Lấy sản phẩm thành công",
            data: products,
        }
    } catch (error) {
        console.error("API Error:", error)
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi lấy sản phẩm",
        })
    }
})