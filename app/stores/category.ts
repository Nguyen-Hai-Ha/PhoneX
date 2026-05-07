import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [] as any[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchCategories() {
            this.loading = true
            try {
                const response = await $fetch<any>('/api/categories')
                if (response.status) {
                    this.categories = response.data
                }
            } catch (err: any) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        }
    }
})
