<script setup>
import {useStore} from "./currentBudgetData";

let budgetStore = useStore();

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
    },
  },
  options: {
    type: Object,
    required: true,
    default: {},
  },
  periodRatio: {
    type: Number,
    required: true,
    default: 0,
  },
});

import {Chart, DoughnutController} from "chart.js";

import {createTypedChart} from "vue-chartjs";



import { Chart, DoughnutController } from 'chart.js'



import { createTypedChart } from 'vue-chartjs'



class Custom extends DoughnutController{

  updateElement(arc, i, properties, mode) {
    // console.log(this.getDataset())

    const outerRadius = properties.outerRadius;
    const innerRadius = properties.innerRadius;
    properties.innerRadius = innerRadius + this.getDataset().cutouts[i] || 0;
    properties.outerRadius = outerRadius - this.getDataset().cutouts[i] || 0;

    // console.log(properties.innerRadius, new Date())

    super.updateElement(arc, i, properties, mode);
  }
  draw() {
    super.draw(arguments);

    // console.log(props.periodRatio)
    // const ctx = this.chart.ctx;

    // const center = [ctx.canvas.width/4,ctx.canvas.height/4]

    // ctx.font = "48px serif";

    // ctx.fillText(this.getDataset().budgetInfo[0], center[0], center[1])
  }
}
Custom.id = "customDoughnut";
Custom.defaults = DoughnutController.defaults;
Chart.register(Custom);

const CustomChart = createTypedChart("customDoughnut", Custom);
</script>

<template>
  <div class="donut-container">
    <div class="donut-chart">
      <CustomChart :data="data" :options="options"></CustomChart>
    </div>

    <div class="budget-overlay">
      <p class="initial-budget">£{{ budgetStore.budget.budget.toFixed(2) }}</p>
      <p
        :class="[
          'remaining-budget',
          budgetStore.getSpendingLeft >= 0 ? 'positive' : 'negative',
        ]">
        left £{{ budgetStore.getSpendingLeft.toFixed(2) }}
      </p>
    </div>

  </div>
</template>

<style scoped>
.donut-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: auto;
}

.donut-chart {
  width: 100%;
  height: 100%;
}

.budget-overlay {
  position: absolute;
  top: 50%;
  left: 50.5%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  font-weight: bold;

  font-size: 0.8rem;
  pointer-events: none;
}

.initial-budget {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;

  font-size: 0.7rem;
  pointer-events: none; 

}

.remaining-budget.positive {
  color: #73d622;
}

.remaining-budget.negative {
  color: #dc2626;
}
</style>

