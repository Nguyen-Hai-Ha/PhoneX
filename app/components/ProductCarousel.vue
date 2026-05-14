<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Props
defineProps({
    products: {
        type: Array as any,
        default: () => []
    }
})

const scrollContainer = ref<HTMLElement | null>(null)
let velocity = 0
let isAnimating = false

const animateScroll = () => {
    if (!scrollContainer.value || Math.abs(velocity) < 0.2) {
        velocity = 0
        isAnimating = false
        return
    }

    scrollContainer.value.scrollLeft += velocity
    velocity *= 0.90 // Deceleration factor
    requestAnimationFrame(animateScroll)
}

const handleWheel = (e: WheelEvent) => {
    if (!scrollContainer.value) return

    if (e.deltaY !== 0) {
        e.preventDefault()
        velocity += e.deltaY * 0.5 // Sensitivity

        if (!isAnimating) {
            isAnimating = true
            requestAnimationFrame(animateScroll)
        }
    }
}

onMounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('wheel', handleWheel, { passive: false })
    }
})

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('wheel', handleWheel)
    }
})
</script>

<template>
    <div class="horizontal-scroll-wrapper">
        <div class="horizontal-scroll-container" ref="scrollContainer">
            <ShopProductCard v-for="product in products" :key="(product as any).id" :product="product"
                class="scroll-item" />
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/css/shopProductCard.css';
</style>