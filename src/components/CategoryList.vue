<script setup>
import CategoryCard from './CategoryCard.vue';
defineProps({
    categories: {
        type: Array,
        required: true,
    },
    currency: {
        type: String,
        default: 'GBP',
    },
    locale: {
        type: String,
        default: 'en-GB'
    },
})


</script>


<template>
    <div>
        <CategoryCard
        v-for="(category, index) in categories"
        :key="index"
        :name="category.name"
        :amount="category.amount"
        :percentage="category.percentage"
        :currency="currency"
        :locale="locale"
        />
    </div>
</template>