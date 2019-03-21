<template>
  <div id="app">
    <div id="header">
      <Header />
    </div>
    <Index />
  </div>
</template>

<script>
import CompletedTasks from './components/CompletedTasks';
import HelloWorld from "./components/HelloWorld";
import Dailies from "./components/Dailies";
import TodoList from "./components/TodoList";
import Habits from "./components/Habits";
import Index from "./components/Index";
import Header from "./components/Header";
import VueRouter from 'vue-router';

export default {
  name: "App",
  components: {
    Index,
    Header
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
}
#header {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  overflow-x: hidden;
  background-color: #f5f5f5;
  margin: 0;
}
</style>
