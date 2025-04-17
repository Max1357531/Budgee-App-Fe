<script setup>

import { ref, toRaw } from 'vue';
import PieChartComponent from './PieChartComponent.vue';
import { useStore } from './assets/stores/currentBudgetData';

let budgetStore = useStore()


budgetStore.addExpense()

const categoryData = budgetStore.getCategories





function incrementCount() {
  const newChartData = structuredClone(toRaw(chartData.value))

  newChartData.datasets[0].data[0] += 100

  chartData.value = newChartData

  

}
</script>

<template>

  <div id="pieChartDiv">
    <PieChartComponent :chartData="budgetStore.getCatPieData" />
    <button @click="incrementCount">+100 to books</button>
  </div>

</template>

<style scoped>
#pieChartDiv {
  height: 40vh;
  border: solid white;


}

#pieChart {
  width: 100%;
}
</style>