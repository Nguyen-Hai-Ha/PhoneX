export default defineEventHandler(async (event) => {
    const data = await validateBody(event, productSchema)
    const { tagIds, ...productData } = data
    try {
        const newProduct = await prisma.product.create({
            data: {
                ...productData,
                tags: {
                    connect: tagIds.map((id: number) => ({ id }))
                }
            },
            include: { tags: true }
        })
        return {
            status: true,
            message: "Thêm sản phẩm thành công",
            data: newProduct,
        }
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw createError({
                statusCode: 400,
                statusMessage: "Slug sản phẩm đã tồn tại",
            })
        }
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi lấy sản phẩm",
        })
    }
})