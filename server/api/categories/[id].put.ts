export default defineEventHandler(async (event) => {
    const { name, slug } = await readBody(event)
    const id = getRouterParam(event, 'id')
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                slug
            }
        })
        return {
            status: true,
            message: "Cập nhật danh mục thành công",
            data: updatedCategory,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi cập nhật danh mục",
        })
    }  
})
