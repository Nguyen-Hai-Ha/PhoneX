<script setup lang="ts">
import { useProductStore } from '~/stores/product'

const route = useRoute()
const slug = route.params.slug as string

const productStore = useProductStore()
const { product, loading, storageOptions,
    selectedStorage,
    selectedColor,
    availableColors,
    currentVariant, } = storeToRefs(productStore)

await productStore.fetchProduct(slug)

// Format price to VND
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

// Mock Specs Data
const specs = [
    { label: 'Kích thước màn hình', value: '6.9 inches' },
    { label: 'Công nghệ màn hình', value: 'Super Retina XDR' },
    { label: 'Camera sau', value: '48MP Main | 12MP Ultra | 12MP Tele' },
    { label: 'Camera trước', value: '12MP TrueDepth' },
    { label: 'Chipset', value: 'Apple A19 Pro' },
    { label: 'Dung lượng RAM', value: '8 GB' },
    { label: 'Bộ nhớ trong', value: '256 GB' },
    { label: 'Pin', value: '4,422 mAh' },
    { label: 'Hệ điều hành', value: 'iOS 26' },
]



// Carousel scroll functionality
const thumbsCarousel = ref<HTMLElement | null>(null)

const scrollCarousel = (direction: 'left' | 'right') => {
    if (!thumbsCarousel.value) return
    const scrollAmount = 300
    const scrollValue = direction === 'left' ? -scrollAmount : scrollAmount
    thumbsCarousel.value.scrollBy({ left: scrollValue, behavior: 'smooth' })
}

// Cart functionality
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()

const handleAddToCart = () => {
    if (!product.value) return

    // Determine which variant is selected
    const variantToAdd = currentVariant.value || {
        price: product.value.variants?.[0]?.price || 0,
        imageUrl: currentImage.value || product.value.image_url,
        storage: selectedStorage.value,
        color: selectedColor.value
    }

    cartStore.addToCart(product.value, variantToAdd)
}

// Current displayed image
const currentImage = ref('')
const selectedThumbIndex = ref(0)

// Initialize current image when product loads
watch(() => product.value, (newProduct) => {
    if (newProduct?.image_url) {
        currentImage.value = newProduct.image_url
    }
}, { immediate: true })

// Handle thumbnail click
const selectThumbnail = (imageUrl: string, index: number) => {
    currentImage.value = imageUrl
    selectedThumbIndex.value = index
}

// Watch color selection to update main image
watch(() => currentVariant.value, (newVariant) => {
    if (newVariant?.imageUrl) {
        currentImage.value = newVariant.imageUrl
    }
})

</script>

<template>
    <div class="cellphones-layout">
        <div v-if="loading" class="loader-screen">
            <div class="spinner-cs"></div>
        </div>

        <div v-else-if="!product" class="error-screen">
            <h1>Sản phẩm không tồn tại</h1>
            <NuxtLink to="/" class="btn-back">Quay lại trang chủ</NuxtLink>
        </div>

        <div v-else class="cs-container">
            <!-- Breadcrumbs -->
            <nav class="cs-breadcrumb">
                <NuxtLink to="/">Trang chủ</NuxtLink> /
                <NuxtLink to="/">Điện thoại</NuxtLink> /
                <NuxtLink to="/">{{ product.category?.name }}</NuxtLink> /
                <span>{{ product.name }}</span>
            </nav>

            <!-- Product Header -->
            <div class="cs-product-header">
                <h1 class="cs-product-title">{{ product.name }}</h1>
                <div class="cs-meta-row">
                    <div class="cs-rating">
                        <span class="stars">★★★★★</span>
                        <span class="rating-text">(140 đánh giá)</span>
                    </div>
                    <!-- <button class="cs-action-link">Yêu thích</button>
                    <button class="cs-action-link">Hỏi đáp</button>
                    <button class="cs-action-link">Thông số</button>
                    <button class="cs-action-link">So sánh</button> -->
                </div>
            </div>

            <!-- Main Grid -->
            <div class="cs-main-grid">
                <!-- LEFT SECTION -->
                <div class="cs-left">
                    <!-- Main Image -->
                    <div class="cs-image-block">
                        <div class="cs-main-image">
                            <!-- <button class="nav-arrow nav-left">‹</button> -->
                            <img :src="currentImage || product.image_url" :alt="product.name" />
                            <!-- <button class="nav-arrow nav-right">›</button> -->
                        </div>

                        <!-- Thumbnails Carousel -->
                        <div class="cs-thumbs-wrapper">
                            <button class="thumb-scroll-btn scroll-left" @click="scrollCarousel('left')">‹</button>

                            <div ref="thumbsCarousel" class="cs-thumbs-carousel">
                                <!-- Featured Thumbnail -->
                                <!-- <button class="thumb-item featured">
                                    <Icon name="lucide:star" class="star-icon" />
                                    <span class="featured-text">Tính năng<br />nổi bật</span>
                                </button> -->

                                <!-- Product Images - Show ALL -->
                                <div v-for="(img, index) in product.images" :key="img.id" class="thumb-item"
                                    :class="{ active: currentImage === img.url }"
                                    @click="selectThumbnail(img.url, index)">
                                    <img :src="img.url" :alt="img.alt" />
                                </div>
                            </div>

                            <button class="thumb-scroll-btn scroll-right" @click="scrollCarousel('right')">›</button>
                        </div>
                    </div>

                    <!-- Commitment Cards -->
                    <div class="cs-commitment-section">
                        <h3 class="section-label">Cam kết sản phẩm</h3>
                        <div class="commitment-grid">
                            <div class="commitment-card">
                                <div class="icon-badge">1</div>
                                <p>Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
                            </div>
                            <div class="commitment-card">
                                <div class="icon-badge">2</div>
                                <p>1 ĐỔI 1 TRONG 30 NGÀY nếu có lỗi từ nhà sản xuất</p>
                            </div>
                            <div class="commitment-card">
                                <div class="icon-badge">3</div>
                                <p>Máy, Sạch hướng dẫn, Cáp, Dây sim, Cáp Type C</p>
                            </div>
                            <div class="commitment-card">
                                <div class="icon-badge">4</div>
                                <p>Giá sản phẩm đã bao gồm thuế VAT</p>
                            </div>
                        </div>
                    </div>

                    <!-- Tech Specs -->
                    <div class="cs-specs-section">
                        <h3 class="section-label">Thông số kỹ thuật</h3>
                        <div class="specs-table">
                            <div v-for="(spec, i) in specs" :key="i" class="spec-row">
                                <div class="spec-key">{{ spec.label }}</div>
                                <div class="spec-value">{{ spec.value }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT SECTION -->
                <div class="cs-right">
                    <!-- Price Box -->
                    <div class="cs-price-box">
                        <div class="price-header">
                            <div class="price-col">
                                <span class="label">Giá sản phẩm</span>
                                <span class="price-main">{{ formatPrice(currentVariant?.price) }}</span>
                                <!-- <span class="price-old">42.000.000đ</span> -->
                            </div>
                            <div class="price-col">
                                <span class="label">Thu cũ lên đời chỉ từ</span>
                                <span class="price-promo">33.313.000đ</span>
                                <span class="promo-note">Trợ giá đến 2.000.000 <a href="#">Đặng gia ngay</a></span>
                            </div>
                        </div>
                    </div>

                    <!-- Flash Sale Banner -->
                    <!-- <div class="cs-flash-sale">
                        <div class="flash-header">
                            <span class="flash-icon">⚡ FLASH SALE</span>
                        </div>
                        <div class="flash-body">
                            <p class="flash-text">Bạn có tài khoản S-Member?</p>
                            <p class="flash-text">Đăng nhập để nhận giá FlashSale: 36.990.000đ</p>
                            <div class="flash-timer">
                                <span class="timer-unit">00</span>:
                                <span class="timer-unit">00</span>:
                                <span class="timer-unit">17</span>:
                                <span class="timer-unit">59</span>
                            </div>
                        </div>
                    </div> -->

                    <!-- Variant Selector -->
                    <div class="cs-selector-section">
                        <h4 class="selector-label">Phiên bản</h4>
                        <div class="variant-options">
                            <button v-for="v in storageOptions" :key="v" class="variant-btn"
                                :class="{ active: selectedStorage === v }" @click="selectedStorage = v">
                                {{ v }}
                            </button>
                        </div>
                    </div>

                    <!-- Color Selector -->
                    <div class="cs-selector-section">
                        <h4 class="selector-label">Màu sắc</h4>
                        <div class="color-options">
                            <button v-for="c in availableColors" :key="c.id"
                                :class="{ active: selectedColor === c.color }" @click="selectedColor = c.color"
                                class="color-btn">
                                <div class="color-preview"><img :src="c.imageUrl" :alt="c.color" /></div>
                                <div class="color-info">
                                    <span class="color-name">{{ c.color }}</span>
                                    <span class="color-price">{{ formatPrice(c.price) }}</span>
                                </div>
                                <div class="badge-hot">🔥</div>
                            </button>
                        </div>
                    </div>

                    <!-- Member Promo -->
                    <!-- <div class="cs-member-promo">
                        <Icon name="lucide:gift" class="mr-2" />
                        Tiết kiệm thêm đến 377.000₫ cho Smember
                        <a href="#" class="link-arrow">Kiểm tra giá cuối →</a>
                    </div> -->

                    <!-- Game Banner (Mockup) -->
                    <!-- <div class="cs-game-banner">
                        <div class="game-text">🎮 Chơi Game Trúng Lớn - Thử vận may ngay</div>
                    </div> -->

                    <!-- Shipping Info -->
                    <!-- <div class="cs-shipping-info">
                        <h4 class="info-title">📍 Thông tin vận chuyển</h4>
                        <div class="shipping-selector">
                            <select class="cs-select">
                                <option>Hồ Chí Minh</option>
                            </select>
                            <select class="cs-select">
                                <option>Quận 1</option>
                            </select>
                        </div>
                        <div class="store-list">
                            <div class="store-item">
                                <p class="store-address">558 Trần Quang Khải, P. Tân Định, Q.1, TP. HCM</p>
                                <a href="tel:0287683355" class="store-phone">📞 0287683355</a>
                                <button class="btn-map">🗺️ Bản đồ</button>
                            </div>
                        </div>
                    </div> -->

                    <!-- Promo Card -->
                    <div class="cs-promo-card">
                        <h4 class="promo-title">🎁 Khuyến mãi hấp dẫn</h4>
                        <ul class="promo-list">
                            <li>Trả góp 0% lãi suất, tối đa 12 tháng</li>
                            <li>Giảm thêm 10% cho Loa, Tai nghe, PC</li>
                            <li>Flash Sale cuối tuần từ 9:00-11:00 ngày 31/01</li>
                        </ul>
                    </div>

                    <!-- Action Buttons -->
                    <div class="cs-actions">
                        <button class="btn-buy-now">MUA NGAY</button>
                        <button class="btn-add-cart" @click="handleAddToCart">
                            <Icon name="mdi:cart" /> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cellphones-layout {
    --cs-bg: var(--bg-color);
    --cs-text: var(--text-color);
    --cs-border: rgba(143, 143, 143, 0.15);
    --cs-accent: #000000;

    font-family: system-ui, -apple-system, sans-serif;
    background: var(--cs-bg);
    color: var(--cs-text);
    min-height: 100vh;
    padding-top: 90px;
}

.cs-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
}

/* Breadcrumbs */
.cs-breadcrumb {
    font-size: 0.8rem;
    margin-bottom: 16px;
    opacity: 0.6;
}

.cs-breadcrumb a:hover {
    text-decoration: underline;
}

/* Product Header */
.cs-product-header {
    margin-bottom: 24px;
}

.cs-product-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 12px;
}

.cs-meta-row {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 0.85rem;
}

.cs-rating {
    display: flex;
    align-items: center;
    gap: 8px;
}

.stars {
    color: #ffd700;
    letter-spacing: 2px;
}

.rating-text {
    opacity: 0.6;
}

.cs-action-link {
    background: none;
    border: none;
    color: var(--cs-text);
    cursor: pointer;
    font-size: 0.85rem;
    opacity: 0.8;
}

.cs-action-link:hover {
    opacity: 1;
    text-decoration: underline;
}

/* Main Grid */
.cs-main-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px;
}

/* LEFT SECTION */
.cs-left {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.cs-image-block {
    background: white;
    border: 1px solid var(--cs-border);
    border-radius: 12px;
    padding: 16px;
}

.cs-main-image {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.cs-main-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

/* Navigation Arrows on Main Image */
.nav-arrow {
    position: absolute;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--cs-border);
    border-radius: 50%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: 0.3s;
}

[data-theme="dark"] .nav-arrow {
    background: rgba(0, 0, 0, 0.9);
    color: white;
}

.nav-arrow:hover {
    background: var(--cs-accent);
    color: var(--cs-bg);
    transform: scale(1.1);
}

.nav-left {
    left: 20px;
}

.nav-right {
    right: 20px;
}

/* Thumbnails Carousel Wrapper */
.cs-thumbs-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
}

/* Thumbnails Carousel */
.cs-thumbs-carousel {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 16px 0;
    scroll-behavior: smooth;
    flex: 1;
    max-width: 100%;
    scrollbar-width: none;
    /* Firefox */
}

.cs-thumbs-carousel::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari */
}

.thumb-item {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border: 2px solid var(--cs-border);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
}

.thumb-item:hover {
    border-color: var(--cs-accent);
}

.thumb-item.active {
    border-color: var(--cs-accent);
    border-width: 2px;
}

.thumb-item.featured {
    background: transparent;
    position: relative;
}

.star-icon {
    font-size: 1.5rem;
    margin-bottom: 4px;
}

.featured-text {
    font-size: 0.65rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
}

.thumb-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
}

.thumb-scroll-btn {
    width: 36px;
    height: 80px;
    flex-shrink: 0;
    background: white;
    border: 1px solid var(--cs-border);
    border-radius: 8px;
    font-size: 1.8rem;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.thumb-scroll-btn:hover {
    background: var(--cs-accent);
}

.thumb-scroll-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* Commitment */
.section-label {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 16px;
}

.commitment-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.commitment-card {
    border: 1px solid var(--cs-border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: start;
    gap: 12px;
    font-size: 0.85rem;
}

.icon-badge {
    width: 32px;
    height: 32px;
    background: var(--text-color);
    color: var(--cs-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: 700;
}

/* Specs */
.specs-table {
    border: 1px solid var(--cs-border);
    border-radius: 12px;
}

.spec-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    border-bottom: 1px solid var(--cs-border);
}

.spec-row:last-child {
    border-bottom: none;
}

.spec-key,
.spec-value {
    padding: 12px 16px;
    font-size: 0.9rem;
}

.spec-key {
    background: rgba(128, 128, 128, 0.05);
    font-weight: 600;
}

/* RIGHT SECTION */
.cs-right {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cs-price-box {
    border: 1px solid var(--text-color);
    border-radius: 12px;
    padding: 20px;
    font-weight: 100
}

.price-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.price-col {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.price-col .label {
    font-size: 0.75rem;
    opacity: 0.6;
    font-weight: 600;
}

.price-main {
    font-size: 1.75rem;
    font-weight: 900;
}

.price-old {
    font-size: 0.9rem;
    text-decoration: line-through;
    opacity: 0.4;
}

.price-promo {
    font-size: 1.5rem;
    font-weight: 900;
}

.promo-note {
    font-size: 0.7rem;
    opacity: 0.7;
}

.promo-note a {
    text-decoration: underline;
}

/* Flash Sale */
.cs-flash-sale {
    background: linear-gradient(135deg, #333 0%, #000 100%);
    color: white;
    padding: 20px;
}

[data-theme="dark"] .cs-flash-sale {
    background: linear-gradient(135deg, #fff 0%, #ccc 100%);
    color: black;
}

.flash-header {
    font-weight: 900;
    margin-bottom: 12px;
    font-size: 1.1rem;
}

.flash-text {
    font-size: 0.85rem;
    margin-bottom: 8px;
}

.flash-timer {
    display: flex;
    gap: 4px;
    font-size: 1.5rem;
    font-weight: 900;
    margin-top: 12px;
}

.timer-unit {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 4px;
}

/* Selectors */
.selector-label {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 12px;
}

.variant-options,
.color-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.variant-btn,
.color-btn {
    border: 2px solid var(--cs-border);
    border-radius: 12px;
    padding: 12px;
    font-weight: 700;
    font-size: 0.85rem;
    text-align: center;
    cursor: pointer;
}

.variant-btn:hover,
.color-btn:hover {
    border-color: var(--text-color);
}

.variant-btn.active {
    border-color: var(--text-color);
    background: var(--text-color);
    color: var(--cs-bg);
}

[data-theme="dark"] .variant-btn.active {
    color: black;
}

[data-theme="dark"] .variant-btn,
[data-theme="dark"] .color-btn {
    color: white;
}

.color-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
}

.color-btn.active {
    border-color: var(--text-color);
    background: var(--text-color);
    color: var(--cs-bg);
}

[data-theme="dark"] .color-btn.active {
    color: black;
}

.color-preview {
    width: 40px;
    height: 40px;
}

.color-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.color-name {
    font-size: 0.8rem;
    font-weight: 700;
}

.color-price {
    font-size: 0.75rem;
    opacity: 0.6;
}

.badge-hot {
    position: absolute;
    top: -8px;
    right: -8px;
}

/* Promo & Info */
.cs-member-promo,
.cs-game-banner,
.cs-shipping-info,
.cs-promo-card {
    border: 1px solid var(--cs-border);
    border-radius: 12px;
    padding: 16px;
    font-size: 0.85rem;
}

.cs-member-promo {
    display: flex;
    align-items: center;
}

.link-arrow {
    margin-left: auto;
    font-weight: 700;
}

.game-text {
    text-align: center;
    font-weight: 700;
}

.info-title,
.promo-title {
    font-weight: 700;
    margin-bottom: 12px;
}

.shipping-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
}

.cs-select {
    padding: 8px;
    border: 1px solid var(--cs-border);
    background: var(--cs-bg);
    color: var(--cs-text);
}

.store-item {
    border: 1px solid var(--cs-border);
    padding: 12px;
    font-size: 0.8rem;
}

.store-address {
    margin-bottom: 8px;
}

.store-phone {
    display: inline-block;
    margin-right: 12px;
    color: var(--cs-accent);
}

.promo-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.promo-list li:before {
    content: "✓ ";
    font-weight: 900;
}

/* Actions */
.cs-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.btn-installment,
.btn-buy-now,
.btn-add-cart {
    padding: 16px;
    font-weight: 900;
    font-size: 0.9rem;
    border: 1px solid var(--text-color);
    border-radius: 12px;
}

.btn-buy-now {
    background: var(--text-color);
    color: var(--cs-bg);
}

.btn-installment,
.btn-add-cart {
    background: transparent;
    color: var(--cs-text);
}

.btn-buy-now:hover {
    opacity: 0.85;
}

.btn-installment:hover,
.btn-add-cart:hover {
    background: var(--text-color);
    color: var(--cs-bg);
}


/* Responsive */
@media (max-width: 1024px) {
    .cs-main-grid {
        display: flex;
        flex-direction: column;
    }

    /* Flatten cs-left to allow reordering its children */
    .cs-left {
        display: contents;
    }

    /* Order: Image -> Price/Variants -> Commitment -> Specs -> Story */
    .cs-image-block {
        order: 1;
    }

    .cs-right {
        order: 2;
        margin-top: 24px;
    }

    .cs-commitment-section {
        order: 3;
        margin-top: 24px;
    }

    .cs-specs-section {
        order: 4;
    }

    .story-section {
        order: 5;
    }
}
</style>