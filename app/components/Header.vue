<template>
    <header class="header-mono glass">
        <div class="container header-wrap">
            <NuxtLink to="/" class="logo-mono">
                <NuxtImg src="/images/logo/logo-rb.png" alt="Logo" width="80" height="80" />
            </NuxtLink>

            <nav class="nav-mono">
                <NuxtLink to="/">HOME</NuxtLink>
                <NuxtLink to="/products">SHOP</NuxtLink>
                <!-- <NuxtLink to="/">INFO</NuxtLink> -->
            </nav>

            <div class="actions-mono">
                <button class="icon-btn-mono" aria-label="Tìm kiếm">
                    <Icon name="lucide:search" />
                </button>
                <NuxtLink to="/cart" class="icon-btn-mono relative" aria-label="Giỏ hàng">
                    <Icon name="lucide:shopping-bag" />
                    <span class="badge-mono" v-if="cartStore.cartCount > 0">{{ cartStore.cartCount }}</span>
                </NuxtLink>
                <!-- <button class="icon-btn-mono theme-toggle" @click="toggleTheme">
                    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" />
                </button> -->
            </div>
        </div>
    </header>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const isDark = ref(false)

onMounted(() => {
    // Sync with existing attribute if any
    isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
})

const toggleTheme = () => {
    isDark.value = !isDark.value
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}
</script>