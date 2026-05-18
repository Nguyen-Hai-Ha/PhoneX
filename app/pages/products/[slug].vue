<script setup lang="ts">
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from '#imports'
const cartStore = useCartStore()


const route = useRoute()
const slug = route.params.slug as string
const fullPath = route.params.slug

const productStore = useProductStore()
const { product, loading, storageOptions,
    selectedStorage, selectedColor, availableColors,
    currentVariant, relatedProducts} = storeToRefs(productStore)

await productStore.fetchProduct(slug)
await productStore.fetchRelatedProducts()

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

// Handle thumbnail click
const selectThumbnail = (imageUrl: string) => {
    currentImage.value = imageUrl
}


// SEO Meta
useSeoMeta({
    title: () => product.value?.name,
    description: () => product.value?.description,
    ogTitle: () => product.value?.name,
    ogDescription: () => product.value?.description,
    ogImage: () => product.value?.image_url,
    ogType: 'website',
    ogUrl: () => `https://hhpas.asia/products/${fullPath}`,
})

useHead({
    script: [
        // Schema 1: Product structured data
        {
            type: 'application/ld+json',
            innerHTML: computed(() => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: product.value?.name,
                description: product.value?.description,
                image: product.value?.image_url,
                brand: {
                    '@type': 'Brand',
                    name: product.value?.brand,
                },
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'VND',
                    price: currentVariant.value?.price,
                    availability: product.value?.status === 'ACTIVE'
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                    url: `https://hhpas.asia/products/${fullPath}`,
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    reviewCount: '140',
                }
            }))
        },
        // Schema 2: Breadcrumb structured data
        {
            type: 'application/ld+json',
            innerHTML: computed(() => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Trang chủ',
                        item: 'https://hhpas.asia',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Điện thoại',
                        item: 'https://hhpas.asia/products',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: product.value?.category?.name,
                    },
                    {
                        '@type': 'ListItem',
                        position: 4,
                        name: product.value?.name,
                        item: `https://hhpas.asia/products/${fullPath}`,
                    },
                ]
            }))
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: `https://hhpas.asia/products/${fullPath}`,
        },
    ],
})

</script>

<template>
    <div class="cellphones-layout">
        <div v-if="loading" class="loader-screen">
            <div class="spinner-cs"></div>
        </div>

        <div v-else-if="!product" class="error-screen">
            <h1>Sản phẩm không tồn tại</h1>
            <NuxtLink to="/" class="btn-back" aria-label="quay lại trang chủ">Quay lại trang chủ</NuxtLink>
        </div>

        <div v-else class="cs-container">
            <!-- Breadcrumbs -->
            <nav class="cs-breadcrumb">
                <NuxtLink to="/" aria-label="trang chủ">Trang chủ</NuxtLink> /
                <NuxtLink to="/products" aria-label="điện thoại">Điện thoại</NuxtLink> /
                <NuxtLink :to="`/products/category/${product.category?.id}`" aria-label="danh mục sản phẩm">{{ product.category?.name }}</NuxtLink> /
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
                            <NuxtImg :src="currentImage || product.image_url" :alt="product.name" loading="eager" format="webp" fetchpriority="high" width="200" height="200"/>
                            <!-- <button class="nav-arrow nav-right">›</button> -->
                        </div>

                        <!-- Thumbnails Carousel -->
                        <div class="cs-thumbs-wrapper">
                            <button class="thumb-scroll-btn scroll-left" @click="scrollCarousel('left')" aria-label="cuộn sang trái">‹</button>

                            <div ref="thumbsCarousel" class="cs-thumbs-carousel">
                                <!-- Featured Thumbnail -->
                                <!-- <button class="thumb-item featured">
                                    <Icon name="lucide:star" class="star-icon" />
                                    <span class="featured-text">Tính năng<br />nổi bật</span>
                                </button> -->

                                <!-- Product Images - Show ALL -->
                                <div v-for="(img, index) in product.images" :key="img.id" class="thumb-item"
                                    :class="{ active: currentImage === img.url }"
                                    @click="selectThumbnail(img.url)">
                                    <NuxtImg :src="img.url" :alt="img.alt" loading="eager" format="webp" fetchpriority="high" width="80" height="80"/>
                                </div>
                            </div>

                            <button class="thumb-scroll-btn scroll-right" @click="scrollCarousel('right')" aria-label="cuộn sang phải">›</button>
                        </div>
                    </div>

                    <!-- Commitment Cards -->
                    <div class="cs-commitment-section">
                        <h4 class="section-label">Cam kết sản phẩm</h4>
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
                        <h4 class="section-label">Thông số kỹ thuật</h4>
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
                                :class="{ active: selectedStorage === v }" @click="selectedStorage = v" :aria-label="'chọn phiên bản ' + v">
                                {{ v }}
                            </button>
                        </div>
                    </div>

                    <!-- Color Selector -->
                    <div class="cs-selector-section">
                        <h4 class="selector-label">Màu sắc</h4>
                        <div class="color-options">
                            <button v-for="c in availableColors" :key="c.id"
                                :class="{ active: selectedColor === c.color }" @click="selectedColor = c.color; selectThumbnail(c.image_url)"
                                class="color-options-btn" :aria-label="'chọn màu ' + c.color">

                                <div class="color-preview">
                                    <NuxtImg :src="c.image_url" :alt="c.color" loading="eager" format="webp" fetchpriority="high" width="40" height="40"/>
                                </div>
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
                        <button class="btn-buy-now" aria-label="mua ngay">MUA NGAY</button>
                        <button class="btn-add-cart" @click="handleAddToCart" aria-label="thêm vào giỏ">
                            <Icon name="mdi:cart" /> Thêm vào giỏ
                        </button>
                    </div>

                    <div v-if="relatedProducts && relatedProducts.length > 0" class="cs-related-products">
                        <h4 class="related-products-title">Sản phẩm tương tự</h4>
                        <div class="related-products-list">
                            <NuxtLink v-for="p in relatedProducts" :key="p.id" :to="`/products/${p.slug}`" class="related-product-item">
                                <NuxtImg :src="p.image_url" :alt="p.name" loading="lazy" format="webp" width="100" height="100"/>
                                <div class="related-product-info">
                                    <h5 class="related-product-name">{{ p.name }}</h5>
                                    <p class="related-product-price">{{ formatPrice(p.variants?.[0]?.price || 0) }}</p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rating Product -->
            <div class="cs-rating-section">
                <div class="cs-rating-card">
                    <h4 class="cs-rating-title">Đánh giá {{ product.name }}</h4>
                    
                    <div class="cs-rating-summary-grid">
                        <!-- Score & Button -->
                        <div class="cs-rating-score-block">
                            <div class="score-main">
                                <span class="score-num">4.5</span><span class="score-total">/5</span>
                            </div>
                            <div class="score-stars">
                                ★★★★★
                            </div>
                            <p class="score-count">2 lượt đánh giá</p>
                            <button class="btn-write-review">Viết đánh giá</button>
                        </div>

                        <!-- Progress Bars -->
                        <div class="cs-rating-bars-block">
                            <div v-for="i in [5,4,3,2,1]" :key="i" class="rating-bar-item">
                                <span class="bar-label">{{ i }} <p class="star-label">★</p> </span>
                                <div class="bar-bg">
                                    <div class="bar-fill" :style="{ width: i >= 4 ? (i === 5 ? '60%' : '40%') : '0%' }"></div>
                                </div>
                                <span class="bar-count">{{ i >= 4 ? '1' : '0' }} đánh giá</span>
                            </div>
                        </div>

                        <!-- Experience Rating -->
                        <!-- <div class="cs-experience-rating">
                            <h5 class="exp-title">Đánh giá theo trải nghiệm</h5>
                            <div class="exp-item">
                                <span>Hiệu năng</span>
                                <div class="exp-stars">
                                    <span class="stars-active">★★★★★</span>
                                    <span class="exp-score">4.5/5</span>
                                    <span class="exp-count">(2 đánh giá)</span>
                                </div>
                            </div>
                            <div class="exp-item">
                                <span>Thời lượng pin</span>
                                <div class="exp-stars">
                                    <span class="stars-active">★★★★★</span>
                                    <span class="exp-score">4.5/5</span>
                                    <span class="exp-count">(2 đánh giá)</span>
                                </div>
                            </div>
                            <div class="exp-item">
                                <span>Chất lượng camera</span>
                                <div class="exp-stars">
                                    <span class="stars-active">★★★★★</span>
                                    <span class="exp-score">4.5/5</span>
                                    <span class="exp-count">(2 đánh giá)</span>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>

                <!-- Filters -->
                <div class="cs-review-filters">
                    <h5 class="filter-label">Lọc đánh giá theo</h5>
                    <div class="filter-chips">
                        <button class="chip active">Tất cả</button>
                        <button class="chip">Có hình ảnh</button>
                        <button class="chip">Đã mua hàng</button>
                        <button class="chip">5 sao</button>
                        <button class="chip">4 sao</button>
                        <button class="chip">3 sao</button>
                        <button class="chip">2 sao</button>
                        <button class="chip">1 sao</button>
                    </div>
                </div>

                <!-- Review List -->
                <div class="cs-review-list">
                    <div class="review-item">
                        <div class="review-user">
                            <div class="user-avatar">L</div>
                            <span class="user-name">Lê Hoàng Phương</span>
                        </div>
                        <div class="review-content">
                            <div class="content-header">
                                <span class="stars">★★★★☆</span>
                                <span class="sentiment">Tốt</span>
                            </div>
                            <div class="verified-badge">
                                <Icon name="lucide:check-circle" /> Đã mua tại PhoneX
                            </div>
                            <!-- <div class="review-tags">
                                <span class="tag">Hiệu năng Mạnh mẽ</span>
                                <span class="tag">Thời lượng pin Khủng</span>
                                <span class="tag">Chất lượng camera Chụp đẹp</span>
                            </div> -->
                            <p class="comment">mới mua nhưng mà cũng không mượt lắm</p>
                            <span class="time">🕒 Đánh giá đã đăng vào 1 tháng trước</span>
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-user">
                            <div class="user-avatar primary">T</div>
                            <span class="user-name">Trần Thức Kiệt</span>
                        </div>
                        <div class="review-content">
                            <div class="content-header">
                                <span class="stars">★★★★★</span>
                                <span class="sentiment">Tuyệt vời</span>
                            </div>
                            <div class="verified-badge">
                                <Icon name="lucide:check-circle" /> Đã mua tại PhoneX
                            </div>
                            <!-- <div class="review-tags">
                                <span class="tag">Hiệu năng Siêu mạnh mẽ</span>
                                <span class="tag">Thời lượng pin Cực khủng</span>
                                <span class="tag">Chất lượng camera Chụp đẹp, chuyên nghiệp</span>
                            </div> -->
                            <p class="comment">đẹp sản phẩm tốt</p>
                            <span class="time">🕒 Đánh giá đã đăng vào 1 tháng trước</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Q&A -->
                <div class="cs-qa-section">
                    <h4 class="cs-rating-title">Hỏi và đáp</h4>
                    
                    <div class="cs-qa-header-card">
                        <div class="cs-qa-mascot">
                            <!-- Placeholder for Mascot. In a real app, use the actual image URL -->
                            <Icon name="fluent-emoji:robot" class="mascot-icon" />
                        </div>
                        <div class="cs-qa-input-area">
                            <h5 class="qa-input-title">Hãy đặt câu hỏi cho chúng tôi</h5>
                            <p class="qa-input-desc">PhoneX sẽ phản hồi trong vòng 1 giờ. Nếu Quý khách gửi câu hỏi sau 22h, chúng tôi sẽ trả lời vào sáng hôm sau. Thông tin có thể thay đổi theo thời gian, vui lòng đặt câu hỏi để nhận được cập nhật mới nhất!</p>
                            <div class="qa-input-group">
                                <input type="text" placeholder="Viết câu hỏi của bạn tại đây" class="qa-input" />
                                <button class="btn-send-question">
                                    Gửi câu hỏi <Icon name="lucide:send" class="icon-send" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="cs-qa-list">
                        <!-- Q&A Thread 1 -->
                        <div class="qa-thread">
                            <!-- Question -->
                            <div class="qa-question">
                                <div class="review-user">
                                    <div class="user-avatar" style="background: #1e8b74">D</div>
                                    <span class="user-name">Dũng Lê</span>
                                    <span class="time">🕒 2 tuần trước</span>
                                </div>
                                <div class="qa-content">
                                    <p class="comment">Làm sao để biết máy cũ đã thay thế sửa chữa linh kiện gì ạ</p>
                                    <div class="qa-actions">
                                        <button class="btn-reply"><Icon name="lucide:message-square" /> Phản hồi</button>
                                        <button class="btn-collapse">Thu gọn phản hồi ∧</button>
                                    </div>
                                </div>
                                <!-- Answer -->
                                <div class="qa-answer">
                                    <div class="review-user">
                                        <div class="user-avatar admin">P</div>
                                        <span class="user-name">Quản Trị Viên <span class="admin-badge">QTV</span></span>
                                        <span class="time">🕒 2 tuần trước</span>
                                    </div>
                                    <div class="qa-content">
                                        <div class="comment">
                                            Xin chào Anh Dũng ạ!<br/>
                                            Dạ mình đến mua hàng bạn nhân viên sẽ báo mình chính xác nhé<br/>
                                            APPLE IPHONE 15 PLUS 128GB HỒNG CŨ - ĐẸP giá giảm hiện tại 15.790.000<br/>
                                            Hiện sản phẩm còn hàng tại chi nhánh 369 Nguyễn Văn Linh, Thạc Gián, Thanh Khê, TP Đà Nẵng<br/>
                                            *****468 Dạ do sản phẩm còn ít và giá có thể thay đổi nên em xin giữ hàng giữ giá qua SĐT này trong 24h để mình tiện tham khảo được không ạ<br/>
                                            Sản phẩm thu lại từ khách hàng không còn nhu cầu (Một số sản phẩm có thể đã qua bảo hành hãng hoặc sửa chữa thay thế linh kiện, hiệu suất pin không bằng hàng mới), nguồn gốc rõ ràng, xuất hoá đơn eVAT ạ<br/>
                                            Thân mến!
                                        </div>
                                        <div class="qa-actions">
                                            <button class="btn-reply"><Icon name="lucide:message-square" /> Phản hồi</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/css/detail.css";
</style>