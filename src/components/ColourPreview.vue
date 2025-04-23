<script setup>
import { useColourStore } from './assets/stores/colourStore';

const colourStore = useColourStore()
console.log(colourStore.getPalette, '<<< colourPallete')
</script>

<template>
    <div>
      <h2>Current Selected Colour:</h2>
  
      <div v-if="colourStore.getSelectedColour">
        <p>{{ colourStore.getSelectedColour }}</p>
        <div
          :style="{
            backgroundColor: colourStore.getSelectedColour,
            width: '50px',
            height: '25px',
            border: '1px solid black',
            marginTop: '4px'
          }"
        ></div>
      </div>
      <p v-else>No colour selected</p>
  
      <h3>Pick a new colour:</h3>
      <ul>
        <li
          v-for="colour in colourStore.getPalette"
          :key="colour"
          @click="colourStore.setSelectedColour(colour)"
          style="cursor: pointer;"
        >
          {{ colour }}
        </li>
      </ul>
    </div>
  </template>