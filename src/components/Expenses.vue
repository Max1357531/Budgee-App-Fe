<script setup>
import { ref, computed, onMounted, reactive, nextTick } from 'vue'
import CategoryList from './CategoryList.vue'

import { useStore } from './assets/stores/currentBudgetData'
import { changeHSL } from '@/utils/chartData'
import { useColourStore } from './assets/stores/colourStore'
import { postCategory } from '@/api/requests'
import ColourPreview from './ColourPreview.vue'


let budgetStore = useStore()
let colorStore = useColourStore()

const newCategoryName = ref('')

const isAdding = ref(false)




function confirmAddCategory(){

  if(newCategoryName.value.trim()){
    const catName = newCategoryName.value
    newCategoryName.value = ''
    isAdding.value = false
    const tempID = String(Math.round(Math.random()*10**10))
    budgetStore.addCategory(catName.trim(),"",tempID,"6807a6f405a38051dee4978c")
    console.log(budgetStore.categories)
    return postCategory(catName.trim(),"--","6807a6f405a38051dee4978c").then((response)=>{
        budgetStore.confirmCategory(tempID)
    }).catch((err)=>{
      console.log(err,"err")
    })
 }
 else{
  newCategoryName.value = ''
  isAdding.value = false
 }
}

const selectedCurrency = ref(0)

const currencyLocales = {
  GBP: 'en-GB',
  USD: 'en-US',
  EUR: 'de-DE',
  JPY: 'ja-JP',
}

const selectedLocale = computed(() => currencyLocales[selectedCurrency.value])

async function startAdding(){
  isAdding.value = true
  newCategoryName.value = ''
  await nextTick();
  document.getElementById('addCategoryNameInput').focus()
}

const styleObject = reactive({
  color: changeHSL("#000000"),
  backgroundColor: changeHSL("#BBBBBB"),
  "border-style": "solid",
  "border-color": changeHSL("#000000"),
  "border-width" :"2px",
})

</script>

<template>
    <div>

    <!-- List -->
    <CategoryList

      :categories="budgetStore.getCategories"
    />
    
    <button v-if="!isAdding" class="addCategoryButton" :style="styleObject" @click="startAdding">
     +
    </button>

    <div v-if="isAdding" class="addCategoryCard" :style="styleObject">
      <input
        v-model="newCategoryName"
        @keyup.enter="confirmAddCategory"
        placeholder="Enter category name"
        id="addCategoryNameInput"
      />

      <button @click="confirmAddCategory">Save</button>
     </div>


  
        
    </div>
<ColourPreview/>

</template>

<style scoped>
#addCategoryNameInput{
  text-align: center;
  width: 50%;
  align-items: center;
  margin: auto;
  outline:none;
}
</style>