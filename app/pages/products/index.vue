<script setup>
import { useProductStore } from '~/stores/product'
import { useCategoryStore } from '~/stores/category'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const { products } = storeToRefs(productStore)
const { categories } = storeToRefs(categoryStore)

// Fetch all live data from DB
await Promise.all([
    productStore.fetchProducts(),
    categoryStore.fetchCategories()
])

// Filtering State
const selectedCategoryId = ref(null)
const sortBy = ref('price-desc')
const search = ref('')

// Filter logic
const filteredProducts = computed(() => {
    let list = [...products.value]

    // Search
    if (search.value) {
        const query = search.value.toLowerCase()
        list = list.filter(p => p.name.toLowerCase().includes(query))
    }

    // Category
    if (selectedCategoryId.value) {
        list = list.filter(p => p.categoryId === selectedCategoryId.value)
    }

    // Sort
    if (sortBy.value === 'price-asc') {
        list.sort((a, b) => (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0))
    } else if (sortBy.value === 'price-desc') {
        list.sort((a, b) => (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0))
    }

    return list
})

const activeCategoryName = computed(() => {
    if (!selectedCategoryId.value) return "Tất cả sản phẩm"
    return categories.value.find(c => c.id === selectedCategoryId.value)?.name || "Danh mục"
})
</script>

<template>
    <div class="shop-page">
        <div class="container">
            <!-- Top Category Bar (Live Logos from DB) -->
            <div class="category-strip">
                <div v-for="cat in categories" :key="cat.id" class="cat-item"
                    :class="{ active: selectedCategoryId === cat.id }"
                    @click="selectedCategoryId = (selectedCategoryId === cat.id ? null : cat.id)">
                    <div class="cat-logo-wrapper">
                        <img v-if="cat.image_url" :src="cat.image_url" :alt="cat.name" class="cat-logo" />
                        <Icon v-else name="lucide:image-off" class="placeholder-icon" />
                    </div>
                </div>
            </div>

            <!-- Header and Filter Section -->
            <div class="shop-controls">
                <h1 class="page-title">{{ activeCategoryName }}</h1>

                <div class="filters">
                    <!-- Search Input -->
                    <div class="search-box">
                        <Icon name="lucide:search" class="search-icon" />
                        <input v-model="search" type="text" placeholder="Tìm kiếm sản phẩm..." />
                    </div>

                    <!-- Filter & Sort Buttons -->
                    <div class="action-buttons">
                        <button class="btn-action">
                            <Icon name="lucide:sliders-horizontal" />
                            Bộ lọc
                        </button>

                        <div class="sort-dropdown">
                            <select v-model="sortBy">
                                <option value="price-desc">Giá bán giảm dần</option>
                                <option value="price-asc">Giá bán tăng dần</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Display -->
            <div class="product-listing" v-if="filteredProducts.length > 0">
                <ShopProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
            </div>

            <!-- Empty State -->
            <div v-else class="no-results">
                <Icon name="lucide:box-select" class="empty-icon" />
                <p>Nội dung đang được cập nhật. Vui lòng quay lại sau!</p>
                <button class="btn btn-primary btn-sm mt-3" @click="selectedCategoryId = null; search = ''">Xem tất
                    cả</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shop-page {
    padding: 100px 0 60px;
    background-color: #fdfdfd;
    min-height: 100vh;
}

/* Category Strip */
.category-strip {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 10px 5px 25px;
    scrollbar-width: none;
    justify-content: center;
}

.category-strip::-webkit-scrollbar {
    display: none;
}

.cat-item {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    min-width: 100px;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.cat-item.active {
    border-color: #d70018;
    box-shadow: 0 0 0 1px #d70018;
}

.cat-logo-wrapper {
    height: 35px;
    display: flex;
    align-items: center;
}

.cat-logo {
    max-width: 70px;
    max-height: 100%;
    object-fit: contain;
}

.cat-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #444;
}

/* Controls */
.shop-controls {
    margin-top: 20px;
    padding-top: 25px;
    border-top: 1px solid #eee;
    margin-bottom: 30px;
}

.page-title {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 25px;
}

.filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    flex: 1;
    min-width: 250px;
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
}

.search-box input {
    width: 100%;
    padding: 12px 15px 12px 45px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 0.95rem;
    outline: none;
}

.action-buttons {
    display: flex;
    gap: 12px;
}

.btn-action {
    background: #fff;
    border: 1px solid #ddd;
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
}

.sort-dropdown select {
    background: #fff;
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    outline: none;
}

/* Listing */
.product-listing {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}

.no-results {
    padding: 100px 0;
    text-align: center;
    color: #999;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.4;
}

@media (max-width: 1200px) {
    .product-listing {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 900px) {
    .product-listing {
        grid-template-columns: repeat(3, 1fr);
    }

    .category-strip {
        justify-content: flex-start;
    }
}

@media (max-width: 650px) {
    .product-listing {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
