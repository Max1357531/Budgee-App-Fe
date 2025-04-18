<script setup>
// declare the props 
const {name, amount, percentage, currency, locale} = defineProps({
  name: String,
  amount: Number,
  percentage: Number,
  currency: {
    type: String,
    default: 'GBP',
  },
  locale: {
    type: String,
    default: 'en-GB',
  }
})

// Intl.NumberFormat is a built-in JavaScript object 
// which formats numbers according to a specific locale and style
const formatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency
})

const formattedAmount = formatter.format(amount)
</script>

<template>
    <div>
        <div>
            <span>{{ name }}</span>
            <span>{{ percentage }}%</span>
        </div>
        <span>{{ formattedAmount }}</span>
    </div>
</template>