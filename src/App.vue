<template>
  <div id="app">
    <DynamicHeader /> 
    <Player />
    <Index />
    <DynamicFooter />
    <Modal v-if="checkModal()" @close="closeModal()">
    
    <h5 slot="header">Create a Task:</h5>

    <!-- Task Creation is handled below -->

    <div slot="body">
<form @submit.prevent="submitTask" id="createTask">

<div class="input-field inline">
  <input v-model="fields.textBoxValue" id="email_inline" type="text" placeholder="e.g. Water the gnomes">
</div>

<label for="task-select">Choose a Task Type:</label>

<select id="task-select">
    <option value="">--Please choose an option--</option>
    <option value="Todo">To-Do</option>
    <option value="Daily">Daily</option>
    <option value="Habit">Habit</option>
</select>

<label for="task-difficulty">Choose a Difficulty:</label>

<select id="task-difficulty">
    <option value="">--Please choose an option--</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
</select>

</form>
</div>
  </Modal>
  <DynamicHeader @showModalHandler="showModal()" />
  <DynamicFooter @habits="display()" />
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
import Modal from "./components/Modal";
import Test from "./components/Test";
import VueRouter from 'vue-router';
import Vuex from 'vuex';

export default {
  name: "App",
  components: {
    Index,
    DynamicHeader,
    DynamicFooter,
    Player,
    Modal
  },
  data(){
    return {
      fields: {
        textBoxValue: ""
      }
    };
  },
  /*computed: {
    showModal() {
      this.$store.commit('displayModal', true);
    },
    checkModal() {
      return this.$store.state.showModal.boolean
    },
    closeModal() {
      this.$store.commit('displayModal', false);
    }
  },*/
    methods: {
    showModal() {
      this.$store.commit('displayModal', true);
    },
    checkModal() {
      return this.$store.state.showModal.boolean;
    },
    closeModal() {
      this.$store.commit('displayModal', false);
    },
    display() {
      console.log("Made it to display()");
      this.$store.commit('display', "Habits");
    },
    /*reloadPage() {
      window.location.reload(true);
    },*/
    submitTask(evt, val, val1) {
      var taskSelect = document.getElementById("task-select");
      var taskDifficulty = document.getElementById("task-difficulty");

      if(taskSelect.value === "" || taskDifficulty.value === "" || this.fields.textBoxValue === "") {
        alert("Please select a valid option!");
      } else if(taskSelect.value === "Habit") {
        var data = {
          "habittasks": {"task":`${this.fields.textBoxValue}`,"difficulty":`${taskDifficulty.value}`,"completed":false}
        }
          fetch("http://localhost:4000/api/habits/", {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

      } else if(taskSelect.value === "Todo") {
        var data = {
          "todotasks": {"task":`${this.fields.textBoxValue}`,"difficulty":`${taskDifficulty.value}`,"completed":false}
        }
          fetch("http://localhost:4000/api/todos/", {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

          //this.reloadPage();

          /*this.$store.commit('createTask', {

          type: "Todo",
          name: this.fields.textBoxValue,
          created: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
          finished: false,
          difficulty: taskDifficulty.value*/
      };
      this.fields.textBoxValue = "";
    }
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
select {
  display: block;
}
</style>
