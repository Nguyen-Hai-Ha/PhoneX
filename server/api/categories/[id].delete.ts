export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        const deletedCategory = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        return {
            status: true,
            message: "Xóa danh mục thành công",
            data: deletedCategory,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi xóa danh mục",
        })
    }  
})