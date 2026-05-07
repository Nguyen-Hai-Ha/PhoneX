export default defineEventHandler(async (event) => {
    const data = await validateBody(event, productSchema)
    const id = getRouterParam(event, 'id')
    const { tagIds, ...productData } = data
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                ...productData,
                tags: {
                    set: tagIds.map((id: number) => ({ id }))
                }
            },
            include: { tags: true }
        })
        return {
            status: true,
            message: "Cập nhật sản phẩm thành công",
            data: updatedProduct,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi cập nhật sản phẩm",
        })
    }
})
