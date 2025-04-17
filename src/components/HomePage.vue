<script setup>

    import { ref } from 'vue'
    import Nav from './Nav.vue'
    import 'tailwindcss';
    import { useStore } from './assets/stores/currentBudgetData';
    import { computed } from 'vue';
    

    let budgetStore = useStore()

    const availableFunds = budgetStore.getSpendingLeft
    const budget = computed(() => {
        return budgetStore.budget.budget
    })
    const changeBudgetForm = ref(false)
    const newTotalBudget = ref("")
    const newAvailableFunds = ref("")
    const addExpenseForm = ref(false)
    const existingCategories = budgetStore.getCatNames
    const expenseCategory = ref("")
    const expenseAmount = ref("")
    const newExpenseCategory = ref("")
    const newExpenseAmount = ref("")
    const addExpenseMessage = ref("")
    const newExpenseCategoryWithNewCategory = ref("")

    const showChangeBudgetForm = () => {
        changeBudgetForm.value = !changeBudgetForm.value
    }

    const updateTotalBudget = (newTotalBudget) => {

        budgetStore.changeBudget(Number(newTotalBudget))

    }

    const updateAvailableFunds = (newAvailableFunds) => {
        availableFunds.value = newAvailableFunds
    }

    const showExpenseForm = () => {
        addExpenseForm.value = !addExpenseForm.value
    }

    const addNewExpense = (newExpenseCategory, newExpenseAmount, newExpenseCategoryWithNewCategory) => {
        expenseAmount.value = newExpenseAmount
        if (newExpenseCategory) {
            expenseCategory.value = newExpenseCategory
            addExpenseMessage.value = `£${expenseAmount.value} successfully added to ${expenseCategory.value.item}!`

            budgetStore.addExpense(expenseAmount.value, 0)

        } else {
            expenseCategory.value = newExpenseCategoryWithNewCategory
            addExpenseMessage.value = `£${expenseAmount.value} successfully added to ${newExpenseCategoryWithNewCategory}!`
        }
    }

</script>


<template>
    <br><br>

    <p>£{{ availableFunds }} left of £{{ budget }}</p>

    <section>

        <!-- Add Expense Button -->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="showExpenseForm()">
            Add Expense
        </button>

        <!-- Change Budget Button-->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="showChangeBudgetForm()">
            Change Budget
        </button><br><br>

        <!-- Add Expense Form -->
         <form class="max-w-md mx-auto" v-if="addExpenseForm" v-on:submit.prevent>
            <div class="relative z-0 w-full mb-5 group">
            <input input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  name="floting-input" v-model.number="newExpenseAmount" type="text" placeholder=" ">
            
            <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cost of Expense</label>
            </div>

            <p v-for="item in existingCategories">
                <input type="radio" v-model="newExpenseCategory" :value="{item}">
                <label for="category">{{ item }}</label><br>
            </p>
            <br>
            <div class="relative z-0 w-full mb-5 group">
            <input input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" name="floting-input" v-model="newExpenseCategoryWithNewCategory" placeholder=" "></input>

            <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Category</label>

            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="addNewExpense(newExpenseCategory, newExpenseAmount, newExpenseCategoryWithNewCategory)">Save</button>
        </form>

        <!-- Change Budget Form -->
        <form class="max-w-md mx-auto" v-if="changeBudgetForm" v-on:submit.prevent>
            <!-- New Total Budget -->
            <div class="relative z-0 w-full mb-5 group">
                <input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="floting-input" v-model.number="newTotalBudget" type="text" placeholder=" ">
                <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Total Budget</label>

            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="updateTotalBudget(newTotalBudget)">Save</button><br>

            <!-- Update Available Funds -->
             <br>
            <div class="relative z-0 w-full mb-5 group">
                <input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="floting-input" v-model.number="newAvailableFunds" type="text" placeholder=" ">
                <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Update available funds</label>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="updateAvailableFunds(newAvailableFunds)">Save</button><br><br>
        </form>

        <p>{{ addExpenseMessage }}</p>

    </section>

    <section>
        <br><br>
        <Nav />
    </section>

</template>

<style scoped>


</style>