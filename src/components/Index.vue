<template>
<div>
<p>Welcome to Habitica-Clone.</p>
    <router-link to="/TodoList">Todo-List</router-link>
    <router-link to="/Dailies">Dailies</router-link>
    <router-link to="/Habits">Habits</router-link>
    <p><router-view></router-view></p>
  </div>
</template>


<script>
export default {
  name: "Index",
}
</script>


<style scoped>
</style>