<template>
<div class="page">
  <div class="title"><h1>RPG List</h1></div>
  <div class="playerData">
    <div id="playerImage">
      <p> square </p>
  </div>
    <p id="data">Character Data PlaceHolder</p>
  </div>
  <div id="taskList">
    <router-link to="/TodoList" class="router-link">Todo-List</router-link>
    <router-link to="/Dailies" class="router-link">Dailies</router-link>
    <router-link to="/Habits" class="router-link">Habits</router-link>
    <router-link to="/CompletedTasks" class="router-link">Completed</router-link>
  </div>
  <div id="router">
    <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "Index",
}
</script>


<style scoped>
#router{
  border: 1px solid black;
}
.router-link {
text-decoration: none;
padding-left: 20px;
padding-right: 20px;
border: 1px solid black;
}
#taskList{
  border: solid black 1px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.playerData{
  border: solid black 1px;
  width: 100%;
  max-width: 1200px;
}
#playerImage{
  border: solid black 1px;
  max-width: 64px;
  max-height: 64px;
  width: 100%;
  text-align: center;
  position: relative;
  float: left;
}
#data {
  border: solid black 1px;
}
.page{
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background-color: #f5f5f5;
}
.title{
  border: solid black 1px;
  background-color: #d39000;
  border-top: 0px;
  margin: 0 auto;
  color: white;
}
</style>