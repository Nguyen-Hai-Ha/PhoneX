<template>
    <div class="shop-product-card">
        <NuxtLink :to="`/products/${product.slug}`" class="card-link">
            <!-- Discount Badge (Mocked if needed, but keeping simple for now) -->
            <div v-if="discountPercent" class="badge discount-badge">-{{ discountPercent }}%</div>

            <!-- Brand Logo (Authorized Reseller Style) -->
            <div class="brand-auth">
                <!-- Ideally this logo would also come from DB or be derived from brand name -->
                <img :src="product.category.image_url" :alt="product.category.name"
                    class="auth-logo" />
            </div>

            <div class="image-section">
                <img :src="product.image_url" :alt="product.name" class="main-image" />
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
.shop-product-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #f2f2f2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    position: relative;
}

.shop-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
}

.card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 15px;
    text-decoration: none;
    color: inherit;
}

/* Badge & Auth */
.badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #d70018;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    z-index: 2;
}

.brand-auth {
    position: absolute;
    top: 10px;
    right: 10px;
    text-align: right;
    z-index: 2;
}

.auth-logo {
    height: 12px;
    display: block;
    margin-left: auto;
    margin-bottom: 2px;
}

.auth-text {
    font-size: 9px;
    color: #888;
}

.image-section {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
}

.main-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
}

.info-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.product-name {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.4;
    color: #333;
    min-height: 2.8em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Banner */
.promo-banner {
    background: #d70018;
    color: #fff;
    padding: 5px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.promo-item {
    text-align: center;
}

.promo-label {
    font-size: 0.55rem;
    display: block;
    opacity: 0.8;
}

.promo-value {
    font-size: 0.85rem;
    font-weight: 800;
}

.promo-divider {
    font-size: 1.2rem;
    opacity: 0.4;
}

/* Prices */
.price-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.tag-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.current-price {
    color: #d70018;
    font-size: 1.15rem;
    font-weight: 700;
}

.old-price {
    font-size: 0.8rem;
    text-decoration: line-through;
    color: #999;
}

.prepaid {
    font-size: 0.8rem;
    color: #666;
}

.prepaid span {
    color: #d70018;
    font-weight: 600;
}

.rating-row {
    margin-top: auto;
}

.star-icon {
    font-size: 0.8rem;
    color: #f59e0b;
}
</style>
