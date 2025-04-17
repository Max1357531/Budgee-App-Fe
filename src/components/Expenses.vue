<script setup>
import { ref, computed } from 'vue'
import CategoryList from './CategoryList.vue'
import { useStore } from './assets/stores/currentBudgetData'

let budgetStore = useStore()


// const categories = ref([
//   { name: 'Food', amount: 150, percentage: 30 },
//   { name: 'Transport', amount: 75, percentage: 15 },
//   { name: 'Clothes', amount: 200, percentage: 45 },
//   { name: 'Leisure', amount: 50, percentage: 10 },
// ])


const categories = budgetStore.getCategories

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

function startAdding(){
  isAdding.value = true
  newCategoryName.value = ''
}

function confirmAddCategory(){
  if(newCategoryName.value.trim()){
    categories.value.push({
      name: newCategoryName.value.trim(),
      amount: 0,
      percentage: 0,
    })
    newCategoryName.value = ''
    isAdding.value = false
  }
}

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
     <div v-else @click="startAdding">
      + Add new category
     </div>

</template>

<style scoped></style>