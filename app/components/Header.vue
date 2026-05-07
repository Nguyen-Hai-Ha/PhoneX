<template>
    <header class="header-mono glass">
        <div class="container header-wrap">
            <NuxtLink to="/" class="logo-mono">PHONEX</NuxtLink>

            <nav class="nav-mono">
                <NuxtLink to="/">HOME</NuxtLink>
                <NuxtLink to="/products">SHOP</NuxtLink>
                <!-- <NuxtLink to="/">INFO</NuxtLink> -->
            </nav>

            <div class="actions-mono">
                <button class="icon-btn-mono">
                    <Icon name="lucide:search" />
                </button>
                <NuxtLink to="/cart" class="icon-btn-mono relative">
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

<style scoped>
.header-mono {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    z-index: 1000;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.logo-mono {
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: 0.2em;
}

.nav-mono {
    display: flex;
    gap: 40px;
}

.nav-mono a {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    opacity: 0.6;
}

.nav-mono a:hover {
    opacity: 1;
}

.actions-mono {
    display: flex;
    gap: 20px;
    align-items: center;
}

.icon-btn-mono {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--text-color);
    transition: 0.3s;
}

.icon-btn-mono:hover {
    transform: translateY(-2px);
    opacity: 0.7;
}

.badge-mono {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--text-color);
    color: var(--bg-color);
    font-size: 0.55rem;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
}

@media (max-width: 768px) {
    .nav-mono {
        display: none;
    }
}
</style>
