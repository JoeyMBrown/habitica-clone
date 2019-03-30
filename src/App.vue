<template>
  <div id="app">
    <DynamicHeader /> 
    <Player />
    <Index />
    <DynamicFooter />
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
import Footer from "./components/Footer";
import Player from "./components/Player";
import DynamicHeader from "./components/DynamicHeader";
import DynamicFooter from "./components/DynamicFooter";
import VueRouter from 'vue-router';
import Vuex from 'vuex';

export default {
  name: "App",
  components: {
    Index,
    DynamicHeader,
    DynamicFooter,
    Player
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
html, body {
  overflow-x: hidden;
  background-color: #f5f5f5;
  margin: 0;
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
