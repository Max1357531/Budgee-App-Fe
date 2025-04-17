<script setup>
import { useRouter } from 'vue-router';
import ExpenseCard from './ExpenseCard.vue';
import { useStore } from './assets/stores/currentBudgetData';
import { computed } from 'vue';

const router = useRouter()
let budgetStore = useStore()

const expensesShown = computed(()=>budgetStore.categories[Number(router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1))].expenses)


</script>

<template>
    <li v-for="expense in expensesShown">
    <ExpenseCard :expense="expense"></ExpenseCard>
    </li>
</template>

<style scoped></style>