<script setup>
import { ref, computed } from 'vue'
import CategoryList from './CategoryList.vue'
import { useStore } from './assets/stores/currentBudgetData'
import Nav from './Nav.vue'



let budgetStore = useStore()



const categories = budgetStore.getCategories

const newCategoryName = ref('')
const isAdding = ref(false)


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
    <div>

    <!-- List -->
    <CategoryList
      :categories="categories"
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

    </div>
</template>

<style scoped></style>