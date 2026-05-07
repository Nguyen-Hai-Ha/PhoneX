export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const category = await prisma.category.findUnique({
        where: {
            id: Number(id)
        }
    })
    if (!category) {
        throw createError({
            statusCode: 404,
            statusMessage: "Không tìm thấy danh mục",
        })
    }
    return {
        status: true,
        message: "Lấy danh mục thành công",
        data: category,
    }
})