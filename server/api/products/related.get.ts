export default defineEventHandler(async (event) => {
  try {
    const { id, exclude } = getQuery(event)
    const relatedProducts = await prisma.product.findMany({
      take: 6,
      include: {
        category: true,
        variants: {
          orderBy: {
            storage: 'asc',
          },
        }
      },
      where: {
        status: 'ACTIVE',
        categoryId: Number(id),
        NOT: {
          id: exclude ? Number(exclude) : undefined
        }
      }
    })
    return {
      status: true,
      message: "Lấy sản phẩm tương tự thành công",
      data: relatedProducts,
    }
  } catch (error) {
    console.error("API Error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Lỗi khi lấy sản phẩm",
    })
  }
})
