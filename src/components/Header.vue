<script setup>
// function toggleDark () {
//   const element
// }
</script>

<template>
  <div class="header">

    <header>
      <div class="app-header">
        <img
          src="../assets/budgee-logo.png"
          alt="Budgee logo"
          class="app-logo" />
        <h1>Budgee</h1>
      </div>
    </header>

    <button @click="toggle - theme" class="header-button">toggle</button>

  </div>
</template>

<style scoped>
.header {
  padding: 1.5rem 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  font-weight: bold;
  color: #73d622;
}

.app-logo {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.header-button {
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
  background-color: #86d021;
  color: black;
  padding: 0.2rem 1.2rem;
  font-size: 0.5rem;
  border: none;
  border-radius: 60%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
  cursor: pointer;
}

.header-button:hover {
  background-color: #74b31c;
  transform: translateY(-2px);
}

.header-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>

