<script setup>
import { changeHSL, shadeColor } from '@/utils/chartData'
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

// declare the props 
const {name, amount, percentage, hex_code} = defineProps({
  id:Number,
  name: String,
  amount: Number,
  percentage: Number,
  hex_code:String,

})

// Intl.NumberFormat is a built-in JavaScript object 
// which formats numbers according to a specific locale and style
const formatter = new Intl.NumberFormat("en-GB", {
  style: 'currency',
  currency: "GBP"
})

console.log(hex_code)
const styleObject = reactive({
  color: changeHSL(hex_code,{s:100,l:30}),
  backgroundColor: changeHSL(hex_code,{s:100,l:80}),
  "border-style": "solid",
  "border-color":changeHSL(hex_code,{s:100,l:30}),
  "border-width" :"2px",
})

const formattedAmount = formatter.format(amount)

</script>

<template>
    <RouterLink :to="/expenses/+id" class="categoryCard" :style="styleObject">

    
      <p class="category-card-name">{{ name }}</p>
      
      <p>{{ formattedAmount }}</p>
      <div >
        <p class="category-card-percentage" >{{ percentage }}%</p>
      </div>

  </RouterLink>
</template>


<style scoped>



</style>