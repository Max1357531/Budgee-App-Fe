<script setup>
import { ref, computed, onMounted } from 'vue'
import CategoryList from './CategoryList.vue'
import { useCategoryStore } from './assets/stores/categoryStore'


// Call the function to get actual store instance
const categoryStore = useCategoryStore()

// Call action to load categories when component mounts
onMounted(() => {
  console.log('Mounted - calling loadCategories')
  categoryStore.loadCategories()
})

//Get processed categories for the UI
const categories = categoryStore.getProcessedCategories

// Currency dropdown setup
const selectedCurrency = ref('GBP')
const newCategoryName = ref('')
const isAdding = ref(false)

const currencyLocales = {
  GBP: 'en-GB',
  USD: 'en-US',
  EUR: 'de-DE',
  JPY: 'ja-JP',
}

//computed property — a core Vue feature that creates reactive derived state
const selectedLocale = computed(() => currencyLocales[selectedCurrency.value])

</script>

<template>
    <p> Expenses </p>
     <!-- Currency dropdown -->
    <div>
      <label for="currency">Currency</label>
      <select id="currency" v-model="selectedCurrency">
        <option value="GBP">GBP (£)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="JPY">JPY (¥)</option>
      </select>
    </div>
    <!-- List -->
    <CategoryList
      :categories="categories"
      :currency="selectedCurrency"
      :locale="selectedLocale"
    />
    <!-- Add category input or button -->
     <div v-if="isAdding">
      <input
        v-model="newCategoryName"
        @keyup.enter="confirmAddCategory"
        placeholder="Enter category name"
      />

      <button @click="confirmAddCategory">Save</button>
     </div>
        

</template>

<style scoped></style>