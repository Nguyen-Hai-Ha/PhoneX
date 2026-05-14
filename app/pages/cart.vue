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
                            <NuxtImg :src="item.image" :alt="item.name" loading="eager" format="webp" fetchpriority="high" width="100" height="100"/>
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
@import '@/assets/css/cart.css';
</style>