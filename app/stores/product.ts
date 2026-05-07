import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const loading = ref(false)
    const product = ref()

    const fetchProducts = async () => {
        loading.value = true
        try {
            const { data } = await useFetch('/api/products')
            products.value = data.value?.data || []
        } finally {
            loading.value = false
        }
    }

    const fetchProduct = async (slug: string) => {
        loading.value = true
        try {
            const { data } = await useFetch(`/api/products/${slug}`)
            product.value = data.value?.data || []

            // Auto-select first storage and color after fetching
            if (product.value && product.value.variants?.length > 0) {
                const allStorages = product.value.variants.map(v => v.storage)
                const uniqueStorages = [...new Set(allStorages)]
                selectedStorage.value = uniqueStorages[0]

                // Auto-select first color for the selected storage
                const firstColorVariant = product.value.variants.find(v => v.storage === selectedStorage.value)
                if (firstColorVariant) {
                    selectedColor.value = firstColorVariant.color
                }
            }
        } finally {
            loading.value = false
        }
    }

    // 1. Lấy danh sách Dung lượng duy nhất (Unique Storage)
    const storageOptions = computed(() => {
        if (!product.value) return []
        // Lấy tất cả storage, sau đó dùng Set để loại bỏ trùng lặp
        const allStorages = product.value.variants.map(v => v.storage)
        return [...new Set(allStorages)]
    })

    // 2. State để lưu lựa chọn hiện tại của người dùng
    const selectedStorage = ref(storageOptions.value[0]) // Mặc định chọn cái đầu tiên
    const selectedColor = ref(null)

    // 3. Lọc ra các màu tương ứng với dung lượng đang chọn
    const availableColors = computed(() => {
        if (!product.value || !selectedStorage.value) return []
        return product.value.variants.filter(v => v.storage === selectedStorage.value)
    })

    // 4. Tìm biến thể (Variant) cuối cùng để lấy GIÁ
    const currentVariant = computed(() => {
        return product.value.variants.find(
            v => v.storage === selectedStorage.value && v.color === selectedColor.value
        )
    })

    return {
        products,
        loading,
        product,
        storageOptions,
        selectedStorage,
        selectedColor,
        availableColors,
        currentVariant,
        fetchProducts,
        fetchProduct
    }
})