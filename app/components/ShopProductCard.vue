<template>
    <div class="shop-product-card">
        <NuxtLink :to="`/products/${product.slug}`" class="card-link">
            <!-- Discount Badge (Mocked if needed, but keeping simple for now) -->
            <div v-if="discountPercent" class="badge discount-badge">-{{ discountPercent }}%</div>

            <!-- Brand Logo (Authorized Reseller Style) -->
            <div class="brand-auth">
                <!-- Ideally this logo would also come from DB or be derived from brand name -->
                <NuxtImg :src="product.category.image_url" :alt="product.category.name" loading="eager" format="webp" class="auth-logo" fetchpriority="high" width="auto" height="auto" />
            </div>

            <div class="image-section">
                <NuxtImg :src="product.image_url" :alt="product.name" class="main-image" loading="eager" format="webp" fetchpriority="high" width="180" height="180" />
            </div>

            <div class="info-section">
                <h3 class="product-name">{{ product.name }}</h3>

                <!-- Retail-style Promo Banner -->


                <div class="price-box">
                    <div class="tag-row">
                        <span class="current-price">{{ formatCurrency(getPrice) }}</span>
                        <span class="old-price">{{ formatCurrency(getPrice * 1.05) }}</span>
                    </div>
                    <div class="prepaid">Hoặc trả trước: <span>{{ formatCurrency(getPrice * 0.3) }}</span></div>
                </div>

                <!-- Rating Stars -->
                <!-- <div class="rating-row">
                    <div class="stars">
                        <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="star-icon" />
                    </div>
                </div> -->
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const getPrice = computed(() => props.product.variants?.[0]?.price || 0)
const discountPercent = ref(3) // Mocked for visual similarity to image

const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
    }).format(price) + '₫';
}
</script>

<style scoped>
@import '@/assets/css/shopProductCard.css';
</style>