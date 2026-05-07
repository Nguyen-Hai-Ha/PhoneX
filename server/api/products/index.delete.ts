export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        return {
            status: true,
            message: "Xóa sản phẩm thành công",
            data: deletedProduct,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi xóa sản phẩm",
        })
    }  
})