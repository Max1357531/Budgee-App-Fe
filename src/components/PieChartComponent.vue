<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs'
import { changeHSL, shadeColor } from '@/utils/chartData';
import { useRouter } from 'vue-router';
import CustomChart from './assets/stores/CustomChart.vue';

const router = useRouter();


const props = defineProps({
  chartData: {
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
  periodRatio: {
    type: Number,
    required: true,
    default: 0
  }
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  lineTension: 100,
  cutout: 45,
  layout: {
            padding: 10
        },
  onClick: function (event, elements) {
    if (elements.length > 0) {
      const currPath = router.currentRoute._rawValue.fullPath;

      const noCats = this._sortedMetasets[0].data.length - 1

      if (currPath === "/") {
        if (elements[0].index !== noCats)
          router.push(`/expenses`)
      }
      if (currPath.startsWith("/expenses")) {
        if (currPath === `/expenses/${elements[0].index}`){
          router.push(`/expenses`)
        }
        else{
          router.push(`/expenses/${elements[0].index}`)
        }
      }

    }


  }
}

const chartDataUpdated = computed(() => {


  const noCats = Math.max(props.chartData.labels.length - 1, 0)
  const newChartData = structuredClone(props.chartData)

  if (router.currentRoute.value.fullPath === "/") {


    newChartData.datasets[0].borderWidth = Array(noCats).fill(2);
    newChartData.datasets[0].borderWidth.push(2)

    // console.log(newChartData.datasets[0].backgroundColor)

    newChartData.datasets[0].backgroundColor = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      (index < noCats)
        ? changeHSL(bgColor,{s:100,l:80})
        : bgColor)
    // console.log(newChartData.datasets[0].backgroundColor)

    newChartData.datasets[0].cutouts = Array(noCats).fill(5);
    newChartData.datasets[0].cutouts.push(0)
    
    return newChartData
  }
  else if (router.currentRoute.value.fullPath === "/expenses" || router.currentRoute.value.fullPath === "/expenses/") {

    newChartData.datasets[0].backgroundColor = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      changeHSL(bgColor,{s:100,l:80}))

    newChartData.datasets[0].cutouts = Array(noCats).fill(0)

    return {
      labels: newChartData.labels.splice(0, noCats),
      datasets: [
        {
          backgroundColor: newChartData.datasets[0].backgroundColor.splice(0, noCats),
          data: newChartData.datasets[0].data.splice(0,noCats),
          cutouts: newChartData.datasets[0].cutouts.splice(0, noCats),
          budgetInfo: newChartData.datasets[0].budgetInfo
        }
      ]
    }
  }

  else {
    console.log("yes")
    newChartData.datasets[0].backgroundColor = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1) == index
        ?
        bgColor
        :
        changeHSL(bgColor,{s:100,l:80})
    )
    
    newChartData.datasets[0].cutouts = Array(noCats).fill(0).map((bgColor, index) =>
      router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1) == index
        ?
        -5
        :
        0
    )

    const newChartData_ = {
      labels: newChartData.labels.splice(0, noCats),
      datasets: [
        {
          backgroundColor: newChartData.datasets[0].backgroundColor.splice(0, noCats),
          data: newChartData.datasets[0].data.splice(0, noCats),
          cutouts: newChartData.datasets[0].cutouts.splice(0, noCats),
          budgetInfo: newChartData.datasets[0].budgetInfo
        }
      ]
    }
    return newChartData_
  }

})




ChartJS.register(ArcElement)
// ChartJS.register(ArcElement, Tooltip, Legend)


</script>

<template>
  <CustomChart :data="chartDataUpdated" :options="options" :periodRatio="periodRatio"></CustomChart>
</template>

<style scoped>

@import "tailwindcss";



</style>