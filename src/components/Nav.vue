<script setup></script>

<template>
  <section className="nav">
    <a className="nav-item" href="/"
      ><img class="nav-icon" src="../assets/house.jpg"
    /></a>
    <a className="nav-item" href="/expenses"
      ><img class="nav-icon" src="../assets/pie-chart.jpg"
    /></a>
    <a className="nav-item" href="/saving-goals"
      ><img class="nav-icon" src="../assets/fire.jpg"
    /></a>
  </section>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-item {
  padding: 0.5rem;
  margin: 2rem;
}
.nav-icon {
  height: 3rem;
}
</style>

