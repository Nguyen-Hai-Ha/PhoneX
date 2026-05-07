export default defineEventHandler(async (event) => {
    const data = await validateBody(event, categorySchema)
    try {
        const newCategory = await prisma.category.create({data})
        return {
            status: true,
            message: "Tạo danh mục thành công",
            data: newCategory,
        }
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw createError({
                statusCode: 400,
                statusMessage: "Tên danh mục hoặc Slug đã tồn tại",
            })
        }
        throw createError({
            statusCode: 500,
            statusMessage: "Lỗi khi tạo danh mục",
        })
    }
})