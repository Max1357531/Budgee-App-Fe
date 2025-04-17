<script setup>
import Body from './components/Body.vue';
import Header from './components/Header.vue';


</script>

<template>

    <div>
        <Header />
    </div>
    <div class="mainContentDiv">
        
        <Body />
    </div>
</template>

<style scoped>
#mainContentDiv{
  display: inline-flex;

}
</style>
