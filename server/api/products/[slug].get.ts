export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    try {
        const product = await prisma.product.findUnique({
            where: {
                slug: slug,
            },
            include: {
                category: true,
                tags: true,
                images: true,
                variants: true,

            },
        })

        if (!product) {
            throw createError({
                statusCode: 404,
                statusMessage: "Không tìm thấy sản phẩm",
            })
        }

        return {
            status: true,
            message: "Lấy chi tiết sản phẩm thành công",
            data: product,
        }
    } catch (error: any) {
        if (error.statusCode === 404) throw error

        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi lấy chi tiết sản phẩm",
        })
    }
})
