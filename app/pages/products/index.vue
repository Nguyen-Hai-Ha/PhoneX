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

useSeoMeta({
    title: 'Tat ca san pham - PhoneX',
    description: 'Kham pha hang tram mau dien thoai chinh hang tai PhoneX.',
    ogTitle: 'Tat ca san pham - PhoneX',
    ogDescription: 'Kham pha hang tram mau dien thoai chinh hang tai PhoneX.',
    ogUrl: 'https://hhpas.asia/products',
    ogType: 'website',
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
                        <NuxtImg v-if="cat.image_url" :src="cat.image_url" :alt="cat.name" class="cat-logo" loading="eager" format="webp" fetchpriority="high" width="auto" height="auto" />
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
                        <button class="btn-action" aria-label="bộ lọc">
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
                <button class="btn btn-primary btn-sm mt-3" @click="selectedCategoryId = null; search = ''" aria-label="xem tất cả">Xem tất cả</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/css/products.css';
</style>