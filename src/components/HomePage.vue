<script setup>

    import { ref } from 'vue'
    import Nav from './Nav.vue'
    import 'tailwindcss';
    import { useStore } from './assets/stores/currentBudgetData';
    import { computed } from 'vue';
    import ColourPreview from './ColourPreview.vue';
        

    let budgetStore = useStore()

    const userInput = ref(undefined)
    const newExpenseCategory = ref("")
    const newExpenseAmount = ref("")
    const optimisticMessage = ref("")
    const changeBudgetForm = ref(false)
    const addExpenseForm = ref(false)
        
    const budget = computed(() => {
        return budgetStore.budget.budget
    })
    
    const showChangeBudgetForm = () => {
        changeBudgetForm.value = !changeBudgetForm.value
    }

    const showExpenseForm = () => {
        addExpenseForm.value = !addExpenseForm.value
    }
    
    const updateTotalBudget = (newTotalBudget) => {
        budgetStore.changeBudget(Number(newTotalBudget))
        userInput.value = ""
        showChangeBudgetForm()
    }

    const addCategory = (userInput) => {
        budgetStore.addCategory(userInput)
    }

    const addNewExpense = (newExpenseCategory, newExpenseAmount, userInput) => {
        if (userInput) {
            addCategory(userInput)
            budgetStore.addExpense(newExpenseAmount, budgetStore.categories.length - 1)
            optimisticMessage.value = `£${newExpenseAmount} successfully added to ${userInput}!`
            userInput = undefined
            showExpenseForm()
        } else {       
        budgetStore.addExpense(newExpenseAmount, newExpenseCategory.key)
        optimisticMessage.value = `£${newExpenseAmount} successfully added to ${newExpenseCategory.item}!`
        showExpenseForm()
        
        }
    }

</script>


<template>
    <br><br>
    <!-- <ColourPreview/> -->
    <br><br/>



    <p class="budget">
        <span class="budget-block">
            £{{ budget }}
        </span>

        <span class="budget-block">
            left £{{ budgetStore.getSpendingLeft }}
        </span>

    </p>
    

    <section>
<div class="home-page-buttons">
    
            <!-- Add Expense Button -->
            <button class= "home-page-button" @click="showExpenseForm()">
                Add Expense
            </button>
    
            <!-- Change Budget Button-->
            <button class= "home-page-button" @click="showChangeBudgetForm()">
            Change budget
            </button><br><br>
</div>

        <!-- Add Expense Form -->
         <form class="max-w-md mx-auto" v-if="addExpenseForm" v-on:submit.prevent>
            <div class="relative z-0 w-full mb-5 group">
            <input input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  name="floting-input" v-model.number="newExpenseAmount" type="text" placeholder=" ">
            
            <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cost of Expense</label>
            </div>

            <p v-for="item, key in budgetStore.getCatNames">
                <input type="radio" v-model="newExpenseCategory" :value="{key, item}">
                <label for="category">{{ item }}</label><br>
            </p>
            <br>
            <div class="relative z-0 w-full mb-5 group">
            <input input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" name="floting-input" v-model="userInput" placeholder=" "></input>

            <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Category</label>

            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="addNewExpense(newExpenseCategory, newExpenseAmount, userInput)">Save</button>
        </form>

        <!-- Change Budget Form -->
        <form class="max-w-md mx-auto" v-if="changeBudgetForm" v-on:submit.prevent>
            <!-- New Total Budget -->
            <div class="relative z-0 w-full mb-5 group">
                <input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="floting-input" v-model.number="userInput" type="text" placeholder=" ">
                <label for="floating-input" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Total Budget</label>

            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="updateTotalBudget(userInput)">Save</button><br>

            <!-- Update Available Funds -->
             <br>
        </form>

        <p>{{ optimisticMessage }}</p>

    </section>

    <section>
        <br><br>
        <Nav />
    </section>

</template>

<style scoped>

.budget {
  z-index: 100;
  position: absolute;
  top: 26%;
  left: 38%;
}

.budget-block {
    display: block;
    text-align: center;
}

.home-page-buttons {
  display: flex;
  align-items: center;
}
.home-page-button {
    margin-left: 4rem;
    background-color: #0f87f7;
    color: white;
    font-weight: bold;
    padding: 0.5rem;
    border-radius: calc(infinity * 1px);
    text-align: center;
    justify-content: center;
}

.home-page-button:hover {
    background-color: #0c5eda;
}



/* "ml-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" */


</style>