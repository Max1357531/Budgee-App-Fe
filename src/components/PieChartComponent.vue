<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs'
import { shadeColor } from '@/utils/chartData';
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
  cutout: 50,
  onClick: function (event, elements) {
    if (elements.length > 0) {
      const currPath = router.currentRoute._rawValue.fullPath;

      const noCats = this._sortedMetasets[0].data.length - 1

      if (currPath === "/") {
        if (elements[0].index !== noCats)
          router.push(`/expenses/`)
      }
      if (currPath.startsWith("/expenses/")) {
        router.push(`/expenses/${elements[0].index}`)
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

    console.log(newChartData.datasets[0].backgroundColor)

    newChartData.datasets[0].backgroundColor = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      (index < noCats)
        ? shadeColor(bgColor, 50)
        : bgColor)
    console.log(newChartData.datasets[0].backgroundColor)

    newChartData.datasets[0].cutouts = Array(noCats).fill(5);
    newChartData.datasets[0].cutouts.push(0)

    return newChartData
  }
  else if (router.currentRoute.value.fullPath === "/expenses/") {
    newChartData.datasets[0].backgroundColor = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      shadeColor(bgColor, 50))


    return {
      labels: newChartData.labels.splice(0, noCats),
      datasets: [
        {
          backgroundColor: newChartData.datasets[0].backgroundColor.splice(0, noCats),
          data: newChartData.datasets[0].data.splice(0, noCats),
        }
      ]
    }
  }

  else {
    newChartData.datasets[0].backgroundColor = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1) == index
        ?
        bgColor
        :
        shadeColor(bgColor, 50)
    )

    newChartData.datasets[0].cutouts = newChartData.datasets[0].backgroundColor.map((bgColor, index) =>
      router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1) == index
        ?
        50
        :
        0
    )


    return {
      labels: newChartData.labels.splice(0, noCats),
      datasets: [
        {
          backgroundColor: newChartData.datasets[0].backgroundColor.splice(0, noCats),
          data: newChartData.datasets[0].data.splice(0, noCats),
        }
      ]
    }
  }

})



ChartJS.register(ArcElement)
// ChartJS.register(ArcElement, Tooltip, Legend)


</script>

<template>
  <CustomChart :data="chartDataUpdated" :options="options" :periodRatio="periodRatio"></CustomChart>

</template>