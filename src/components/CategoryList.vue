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
    <div class="categoryList">
        <CategoryCard
        v-for="(category, index) in categories"
        :key="index"
        :id="category.category_id"
        :name="category.name"
        :amount="category.amount"
        :percentage="category.percentage"
        :hex_code="category.hex_code"
        />
    </div>
</template>