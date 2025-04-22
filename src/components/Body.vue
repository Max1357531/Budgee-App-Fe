<script setup>
import PieChart from './PieChart.vue';
import { useColourStore } from './assets/stores/colourStore';

import { useStore } from './assets/stores/currentBudgetData';
import { generateCategoryData, generateColorData, generateCurrentBudget, generateExpenseData } from '@/utils/testData';



let categoryData = []
let budgetStore = useStore()
let colorStore = useColourStore()
let colorData = [];


generateColorData(6)
.then((colorData)=>{
    colorData = colorData;
    colorStore.$patch({colourPalette:colorData})
    return generateCurrentBudget()
})
.then((budgetData) => {
    budgetStore.$patch({budget:budgetData})
    return generateCategoryData(5)
})
.then((res) => {
    categoryData = res
    return generateExpenseData(categoryData, 13)
})
.then((expensesData) => {

    const category_ids = categoryData.map((cat) => cat.category_id)
    categoryData.forEach((cat) => cat.expenses = [])
    
    for (let expense of expensesData) {
        const index = category_ids.indexOf(expense.category_id)
        if (index === -1) {
            return Promise.reject()
        }

        categoryData[index].expenses.push(expense)
    }
    budgetStore.$patch({categories:categoryData})
    })
    .then(() => {


    })
    .catch((err) => {
        console.log(err)
    })



</script>

<template>
    <div id="bodyDiv">
        <PieChart />
        <router-view id="routedComponent"></router-view>
        
    </div>
</template>

<style scoped>
#bodyDiv {
    display: flex;
    align-items: center;
    flex-direction: column;


}
#routedComponent {

    overflow: scroll;
    height: 200px;
    width: 100%;

}

</style>