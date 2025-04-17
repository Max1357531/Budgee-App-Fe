<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

import { useRouter } from 'vue-router';

const router = useRouter();

const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: function (event,elements) {
        const currPath = router.currentRoute._rawValue.fullPath;

        router.push(`/expenses/${elements[0].index}`)
       //console.log(elements[0].index)
        console.log(this)
        
    }
  }


const props = defineProps({
chartData: {
  type: Object,
  required: true,
  default: {labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: []
    }
  ]},
}



});




ChartJS.register(ArcElement, Tooltip, Legend)

</script>

<template>
    <Doughnut :data="chartData" :options="options" />
</template>
  
 