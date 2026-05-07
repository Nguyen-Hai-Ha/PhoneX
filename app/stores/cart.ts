import { defineStore } from 'pinia'

export interface CartItem {
    id: string // Unique ID for cart item (productID + variantID)
    productId: number
    name: string
    price: number
    image: string
    quantity: number
    slug: string
    storage?: string
    color?: string
}

export const useCartStore = defineStore('cart', () => {
    // State
    const items = ref<CartItem[]>([])

    // Initialize from local storage if client-side
    // We use onMounted to avoid hydration mismatch if using localStorage directly
    // Or utilize useLocalStorage from VueUse if available

    // Actions
    const addToCart = (product: any, variant: any) => {
        // Create a unique ID for the cart item based on product and variant
        const uniqueId = `${product.id}-${variant.storage}-${variant.color}`

        const existingItem = items.value.find(item => item.id === uniqueId)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            items.value.push({
                id: uniqueId,
                productId: product.id,
                name: product.name,
                price: variant.price,
                image: variant.imageUrl || product.image_url,
                quantity: 1,
                slug: product.slug,
                storage: variant.storage,
                color: variant.color
            })
        }

        saveCart()
    }

    const removeFromCart = (id: string) => {
        const index = items.value.findIndex(item => item.id === id)
        if (index > -1) {
            items.value.splice(index, 1)
            saveCart()
        }
    }

    const updateQuantity = (id: string, quantity: number) => {
        const item = items.value.find(item => item.id === id)
        if (item) {
            item.quantity = quantity
            if (item.quantity <= 0) {
                removeFromCart(id)
            } else {
                saveCart()
            }
        }
    }

    const clearCart = () => {
        items.value = []
        saveCart()
    }

    // Getters
    const cartCount = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotal = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    // Persistence
    const saveCart = () => {
        if (import.meta.client) {
            localStorage.setItem('cart', JSON.stringify(items.value))
        }
    }

    const loadCart = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('cart')
            if (saved) {
                try {
                    items.value = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to load cart', e)
                }
            }
        }
    }

    // Load on start
    if (import.meta.client) {
        loadCart()
    }

    return {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        loadCart
    }
})
