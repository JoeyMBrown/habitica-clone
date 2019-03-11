<template>
  <div id="app">
    <Index />
  <!--<HelloWorld />-->
    <!-- route outlet -->
  <!-- component matched by the route will render here 
  <router-view></router-view>-->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Dailies from "./components/Dailies";
import TodoList from "./components/TodoList";
import Habits from "./components/Habits";
import Index from "./components/Index";
import VueRouter from 'vue-router';

export default {
  name: "App",
  components: {
    Index
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html, body {
  overflow-x: hidden;
}
</style>
