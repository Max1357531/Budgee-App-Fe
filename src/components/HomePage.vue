<script setup>

    import { ref } from 'vue'
    import 'tailwindcss';
    import { useStore } from './assets/stores/currentBudgetData';
    import { computed } from 'vue';
    import ColourPreview from './ColourPreview.vue';
    import Body from './Body.vue';   

    let budgetStore = useStore()

    
    const getInitialData = () => ({ costOfExpense: "", newCategory: "", existingCategory: undefined, newTotalBudget: "", budgetForm: false, expenseForm: false });
    
    const formData = ref(getInitialData())
    
    const optimisticMessage = ref("")

    const budget = computed(() => {
        return budgetStore.budget.budget
    })
    
    const showChangeBudgetForm = () => {
        optimisticMessage.value = ""
        if (formData.value.expenseForm) formData.value.expenseForm = !formData.value.expenseForm
        formData.value.budgetForm = !formData.value.budgetForm
    }

    const showExpenseForm = () => {
        if (formData.value.budgetForm) formData.value.budgetForm = !formData.value.budgetForm
        formData.value.expenseForm = !formData.value.expenseForm
    }
    
    const updateTotalBudget = (newTotalBudget) => {
        budgetStore.changeBudget(Number(newTotalBudget))
        formData.value.newTotalBudget = ""
        showChangeBudgetForm()
    }

    const addCategory = (newCategory) => {
        budgetStore.addCategory(newCategory)
    }

    const addNewExpense = (existingCategory, costOfExpense, newCategory) => {
        if (newCategory) {
            addCategory(newCategory)
            budgetStore.addExpense(costOfExpense, budgetStore.categories.length - 1)
            optimisticMessage.value = `£${costOfExpense} successfully added to ${newCategory}!`
            showExpenseForm()
            formData.value.costOfExpense = ""
            formData.value.newCategory = ""
        } else {       
        budgetStore.addExpense(costOfExpense, existingCategory.key)
        optimisticMessage.value = `£${costOfExpense} successfully added to ${existingCategory.item}!`
        showExpenseForm()
        formData.value.costOfExpense = ""
        formData.value.newCategory = ""
        formData.value.existingCategory = undefined
        }
    }


</script>


<template>
    <div>

    <section>
        <div class="home-page-buttons">
    
            <!-- Add Expense Button -->
            <button class= "home-page-button" @click="showExpenseForm()">
                Add Expense
            </button>
    
            <!-- Change Budget Button-->
            <button class= "home-page-button" @click="showChangeBudgetForm()">
                Change budget
            </button>
        </div>

        <!-- Add Expense Form -->
        <div class="form-scroll-container" v-if="formData.expenseForm" v-on:submit.prevent>
            <form class="form">
                <div class="form-div relative">
                    <input class="custom-input" name="floting-input" v-model.number="formData.costOfExpense" type="text" placeholder=" ">
                    <label for="floating-input" class="custom-label">Cost of Expense</label>
                </div><br>

                <p v-for="item, key in budgetStore.getCatNames">
                    <input type="radio" v-model="formData.existingCategory" :value="{key, item}">
                    <label for="category">{{ item }}</label><br>
                </p>
                
                <div class="form-div relative">
                    <input class="custom-input" type="text" name="floting-input" v-model="formData.newCategory" placeholder=" "></input>
                    <label for="floating-input" class="custom-label">New Category</label>
                </div>

                <div class="form-div relative">
                    <input class="custom-input" type="text" name="floting-input" placeholder=" ">
                    <label for="floating-input" class="custom-label">Category Colour</label>
                    <ColourPreview/>
                </div>
                <button class="home-page-button" v-on:click="addNewExpense(formData.existingCategory, formData.costOfExpense, formData.newCategory)">Save</button>
            </form>
        </div>

        <!-- Change Budget Form -->
        <div class="form-scroll-container" v-if="formData.budgetForm" v-on:submit.prevent>
            <form class="form">
                <!-- New Total Budget -->
                <div class="form-div relative">
                    <input class="custom-input" name="floating-input" v-model.number="formData.newTotalBudget" type="text" placeholder=" ">
                    <label for="floating-input" class="custom-label">New Total Budget</label>

                </div>
                <button class="home-page-button" v-on:click="updateTotalBudget(formData.newTotalBudget)">Save</button><br>

            </form>
        </div>

        <p class="opt-mes">{{ optimisticMessage }}</p>

    </section>
</div>
</template>

<style scoped>

@import "tailwindcss";



</style>