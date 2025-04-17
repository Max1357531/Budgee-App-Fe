<script setup>
const props = defineProps({
  expense: {
    type: Object,
    required: true,
    default: {
      
    },
  },
});


</script>




<template>
<p>{{props.expense.description + " " + props.expense.amount}}</p>
</template>