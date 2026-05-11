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
                    <img src="/images/products/iphone17banner.png" alt="PhoneX Ultimate" class="hero-image" />
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

<style scoped>
.hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    background: var(--bg-color);
    padding-top: 70px;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 50px;
}

.hero-text h1 {
    margin-bottom: 20px;
}

.hero-text p {
    font-size: 1.2rem;
    margin-bottom: 40px;
    max-width: 500px;
}

.hero-actions {
    display: flex;
    gap: 20px;
}

.hero-image-container {
    position: relative;
    display: flex;
    justify-content: center;
}

.hero-image {
    max-width: 100%;
    transform: rotate(-5deg);
    filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.3));
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px) rotate(-5deg);
    }

    50% {
        transform: translateY(-20px) rotate(-2deg);
    }

    100% {
        transform: translateY(0px) rotate(-5deg);
    }
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 40px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
}

.view-all {
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.6;
}

.view-all:hover {
    opacity: 1;
    transform: translateX(5px);
}

.secondary-bg {
    background-color: var(--secondary-color);
}

.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}

.feature-icon {
    margin-bottom: 20px;
}

.fade-in {
    animation: fadeIn 1s ease-out;
}

.fade-in-delayed {
    animation: fadeIn 1s ease-out 0.5s both;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 1024px) {
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 80px 0;
    }

    .hero-text p {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-actions {
        justify-content: center;
    }

    .hero-image {
        max-width: 400px;
    }

    .grid-3 {
        grid-template-columns: 1fr;
    }
}

/* New Arrivals Section */
/* Circular category list styles removed */

/* Horizontal scroll styles removed and moved to ProductCarousel.vue */
</style>
