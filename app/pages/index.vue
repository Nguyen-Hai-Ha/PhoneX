<script setup>
import { useProductStore } from '~/stores/product'
import { storeToRefs } from 'pinia'

const store = useProductStore()
const { products } = storeToRefs(store)

await store.fetchProducts()

// Group products by category (max 10 products per category)
const groupedProducts = computed(() => {
    const groups = {}
    products.value.forEach(product => {
        const categoryName = product.category?.name || 'Khác'
        if (!groups[categoryName]) {
            groups[categoryName] = []
        }

        if (groups[categoryName].length < 10) {
            groups[categoryName].push(product)
        }
    })
    return groups
})

// SEO Meta
useSeoMeta({
    title: 'PhoneX - Cửa hàng điện thoại uy tín',
    description: 'PhoneX - Cửa hàng điện thoại uy tín, chất lượng, giá rẻ',
    ogTitle: 'PhoneX - Cửa hàng điện thoại uy tín',
    ogDescription: 'PhoneX - Cửa hàng điện thoại uy tín, chất lượng, giá rẻ',
    ogImage: '/images/logo/logo.jpg',
    ogUrl: 'https://hhpas.asia',
    ogType: 'website',
})
</script>

<template>
    <main>
        <!-- Hero Section -->
        <section class="hero glass-bottom">
            <div class="container hero-content">
                <div class="hero-text">
                    <h1 class="fade-in">PHONEX <br />ULTIMATE.</h1>
                    <p class="fade-in-delayed">Experience the peak of mobile engineering. Sleek, powerful, and
                        undeniably premium.</p>
                    <div class="hero-actions fade-in-delayed">
                        <NuxtLink to="/" class="btn btn-primary">Shop Now</NuxtLink>
                        <NuxtLink to="/" class="btn btn-outline">Learn More</NuxtLink>
                    </div>
                </div>
                <div class="hero-image-container">
                    <NuxtImg src="/images/products/iphone17banner.webp" alt="PhoneX Ultimate" class="hero-image" format="webp" loading="eager" width="500" height="300" fetchpriority="high"/>
                </div>
            </div>
        </section>

        <!-- Dynamic Category Sections -->
        <section v-for="(categoryProducts, categoryName) in groupedProducts" :key="categoryName"
            class="section-padding">
            <div class="container">
                <div class="section-header">
                    <h2>{{ categoryName }}</h2>
                    <NuxtLink to="/" class="view-all">Xem tất cả
                        <Icon name="lucide:arrow-right" />
                    </NuxtLink>
                </div>

                <ProductCarousel :products="categoryProducts" />
            </div>
        </section>
    </main>
</template>