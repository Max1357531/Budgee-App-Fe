
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: []
        }
      ]
    },
  },
  options: {
    type: Object,
    required: true,
    default: {}
  },
  periodRatio: {
    type: Number,
    required: true,
    default: 0
  }
});




import { Chart, DoughnutController } from 'chart.js'



import { createTypedChart } from 'vue-chartjs'



class Custom extends DoughnutController{
  updateElement(arc, i, properties, mode) {
    


    const outerRadius = properties.outerRadius
    const innerRadius = properties.innerRadius
    properties.innerRadius = innerRadius +this.getDataset().cutouts[i]|| 0
    properties.outerRadius = outerRadius -this.getDataset().cutouts[i]|| 0
    
    super.updateElement(arc, i, properties, mode)
  }
  draw(){
    super.draw(arguments)

    console.log(props.periodRatio)
    const ctx = this.chart.ctx;

    

    

  }
}
Custom.id = 'customDoughnut';
Custom.defaults = DoughnutController.defaults
Chart.register(Custom);




const CustomChart = createTypedChart("customDoughnut",Custom)

</script>

<template>
<CustomChart :data="data" :options="options"></CustomChart>

</template>

