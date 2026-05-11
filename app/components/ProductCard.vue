<template>
  <div class="product-card">
    <NuxtLink :to="`/products/${product.slug}`">
      <div class="product-image-wrapper">
        <NuxtImg :src="product.image_url" :alt="product.name" class="product-image" loading="lazy" format="webp" />
      </div>
    </NuxtLink>
    <div class="product-info">
      <div class="product-category">{{ product.category?.name || 'Chưa phân loại' }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-price">{{ formatCurrency(product.variants[0].price) }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-image-wrapper {
  position: relative;
  aspect-ratio: 4/5;
  background-color: transparent;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  border-radius: 12px;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  text-align: left;
  padding: 0 4px;
}

.product-category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #888;
  margin-bottom: 6px;
  font-weight: 600;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text-color);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-color);
}
</style>
