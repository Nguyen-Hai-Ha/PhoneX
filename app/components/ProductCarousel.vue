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
.horizontal-scroll-container {
    display: flex;
    overflow-x: auto;
    gap: 24px;
    padding: 10px 20px 30px 20px;
    /* More padding for a cleaner look */
    scroll-behavior: auto;
    /* Use auto for JS-controlled smooth scrolling */
    scrollbar-width: none;
    /* Hide for Firefox */
    -ms-overflow-style: none;
    /* Hide for IE/Edge */
}

/* Hide scrollbar for Chrome/Safari/Opera */
.horizontal-scroll-container::-webkit-scrollbar {
    height: 3px;
    /* Very thin and modern */
}

.horizontal-scroll-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    margin: 0 25%;
    /* Heavily inset for a centered 'floating' look */
}

.horizontal-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    transition: background 0.3s ease;
}

.horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.8);
}

.scroll-item {
    min-width: 300px;
    /* Slightly wider cards for better breathing room */
    max-width: 300px;
    flex-shrink: 0;
}

/* Smooth fade effect on edges */
.horizontal-scroll-wrapper::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 60px;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(to left, var(--bg-color, #000), transparent);
}
</style>
