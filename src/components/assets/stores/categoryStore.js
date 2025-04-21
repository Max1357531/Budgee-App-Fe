import { getCategories } from "@/api/requests";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categoryStore", {
    state: () => ({
        // State to hold all categories fetched from the backend
        categories: []
    }),

    actions: {
        // Loads category data from API and saves it to the store
        loadCategories() {
            console.log('Initiating category load from API')
            return getCategories()
                .then(categoriesFromApi => {
                    console.log('Raw categories received from API:', categoriesFromApi)
                    // Normalize categories by assigning category_id for compatibility
                    const mapped = categoriesFromApi.mao(cat => ({
                        ...cat,
                        category_id: cat._id
                    }))
                    console.log('Normalized categories with category_id:', mapped)
                    // Update store state
                    this.categories = mapped
                    console.log('state updated with categories')
                })
                .catch(error => {
                    console.error('Failed to load categories:', error)

                })
        }
    },

    getters: {
        // Processes categories to calculate amounts and percentages
        getProcessedCategories: (state) => {
            console.log('[Getter] Raw categories from state:', state.categories)
            // Make a new array of processed category objects
            const processed = state.categories.map(cat => {
                const newCat = { ...cat }
                newCat.amount = cat.total_amount || 0
                return newCat
            })
        }
    }
})