<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const { items, cartTotal, cartCount } = storeToRefs(cartStore)
const { removeFromCart, updateQuantity } = cartStore

// Format price function
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>

<template>
    <div class="cart-page">
        <div class="container cs-container">
            <h1 class="page-title">Giỏ hàng của bạn <span class="count">({{ cartCount }} sản phẩm)</span></h1>

            <div v-if="items.length === 0" class="empty-cart">
                <Icon name="lucide:shopping-cart" class="empty-icon" />
                <p>Giỏ hàng của bạn đang trống</p>
                <NuxtLink to="/" class="btn-continue">Tiếp tục mua sắm</NuxtLink>
            </div>

            <div v-else class="cart-grid">
                <!-- Cart Items List -->
                <div class="cart-items">
                    <div v-for="item in items" :key="item.id" class="cart-item">
                        <div class="item-image">
                            <NuxtImg :src="item.image" :alt="item.name" loading="lazy" format="webp" />
                        </div>
                        <div class="item-info">
                            <h3 class="item-name">
                                <NuxtLink :to="`/products/${item.slug}`">{{ item.name }}</NuxtLink>
                            </h3>
                            <div class="item-meta">
                                <span v-if="item.storage">{{ item.storage }}</span>
                                <span v-if="item.color" class="separator">|</span>
                                <span v-if="item.color">{{ item.color }}</span>
                            </div>
                            <div class="item-price">{{ formatPrice(item.price) }}</div>
                        </div>

                        <div class="item-actions">
                            <div class="quantity-control">
                                <button @click="updateQuantity(item.id, item.quantity - 1)"
                                    :disabled="item.quantity <= 1" aria-label="giảm số lượng">-</button>
                                <input type="number" :value="item.quantity" readonly />
                                <button @click="updateQuantity(item.id, item.quantity + 1)" aria-label="tăng số lượng">+</button>
                            </div>
                            <button class="btn-remove" @click="removeFromCart(item.id)" aria-label="xóa sản phẩm">
                                <Icon name="lucide:trash-2" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="cart-summary">
                    <div class="summary-card">
                        <h3>Tóm tắt đơn hàng</h3>
                        <div class="summary-row">
                            <span>Tạm tính</span>
                            <span>{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Tổng cộng</span>
                            <span class="total-price">{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <p class="vat-note">(Đã bao gồm VAT nếu có)</p>
                        <button class="btn-checkout" aria-label="tiến hành thanh toán">Tiến hành thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-page {
    padding-top: 100px;
    padding-bottom: 50px;
    background: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;
}

.cs-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
}

.page-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 24px;
}

.page-title .count {
    font-weight: 400;
    font-size: 1.2rem;
    opacity: 0.7;
}

.empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    opacity: 0.6;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.5;
}

.btn-continue {
    margin-top: 20px;
    padding: 10px 24px;
    background: var(--text-color);
    color: var(--bg-color);
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
}

.cart-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
}

@media (max-width: 768px) {
    .cart-grid {
        grid-template-columns: 1fr;
    }
}

.cart-item {
    display: flex;
    gap: 16px;
    padding: 16px;
    border: 1px solid rgba(143, 143, 143, 0.15);
    border-radius: 12px;
    margin-bottom: 16px;
    background: var(--glass-bg);
    /* Should inherit glass style if global */
}

.item-image {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
}

.item-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.item-name a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 700;
}

.item-meta {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-top: 4px;
}

.separator {
    margin: 0 6px;
}

.item-price {
    margin-top: 8px;
    color: #e04040;
    /* Redish for price */
    font-weight: 700;
}

.item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
}

.quantity-control {
    display: flex;
    border: 1px solid rgba(143, 143, 143, 0.3);
    border-radius: 6px;
}

.quantity-control button {
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
}

.quantity-control input {
    width: 32px;
    text-align: center;
    border: none;
    background: none;
    color: var(--text-color);
    border-left: 1px solid rgba(143, 143, 143, 0.15);
    border-right: 1px solid rgba(143, 143, 143, 0.15);
    font-size: 0.9rem;
}

.btn-remove {
    background: none;
    border: none;
    color: var(--text-color);
    opacity: 0.5;
    cursor: pointer;
    font-size: 1.2rem;
}

.btn-remove:hover {
    color: #e04040;
    opacity: 1;
}

/* Summary Card */
.summary-card {
    border: 1px solid rgba(143, 143, 143, 0.15);
    border-radius: 12px;
    padding: 24px;
    position: sticky;
    top: 100px;
}

.summary-card h3 {
    margin-bottom: 20px;
    font-weight: 700;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 0.95rem;
}

.summary-row.total {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(143, 143, 143, 0.15);
    font-weight: 700;
    font-size: 1.1rem;
}

.total-price {
    color: #e04040;
}

.vat-note {
    font-size: 0.8rem;
    opacity: 0.6;
    text-align: right;
    margin-bottom: 24px;
}

.btn-checkout {
    width: 100%;
    padding: 14px;
    background: #e04040;
    /* Highlight color */
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.3s;
}

.btn-checkout:hover {
    opacity: 0.9;
}
</style>
