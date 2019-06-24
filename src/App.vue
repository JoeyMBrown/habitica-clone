<template>
  <div id="app">

    <DynamicHeader @showModalHandler="showModal()" />
      <Player />
      <Index />
    <DynamicFooter @habits="display()" />

    <ul class="toast-container">
      <li
        class="toast-item"
        :key="notification.id"
        v-for="notification in notifications"
      >
        {{ notification.message }}
      </li>
    </ul>

    <!-- MODAL -->
    <Modal v-if="checkModal()" @close="closeModal()">
      <h5 slot="header">Create a Task:</h5>

      <!-- MODAL BODY -->
      <div slot="body">
        <form @submit.prevent="submitTask" id="createTask">

        <div class="input-field inline">
          <input v-model="fields.textBoxValue" id="email_inline" type="text" placeholder="e.g. Water the gnomes">
        </div>

        <label for="la">Choose a Cost:</label>

        <div class="input-field inline">
          <input v-if="this.$store.state.currentList.list === 'Rewards'" v-model="fields.textBoxValueCost" id="la" type="text" placeholder="100">
        </div>


        <label v-if="this.$store.state.currentList.list !== 'Rewards'" for="task-difficulty">Choose a Difficulty:</label>

        <select v-if="this.$store.state.currentList.list !== 'Rewards'" id="task-difficulty">
            <option value="">--Please choose an option--</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>

        </form>
      </div>
    </Modal>

    <!-- LOGIN -->
    <div
      v-if="!isAuthenticated"
      style="height: 100vh; width: 100vw; overflow: hidden; background-color: dodgerblue; z-index: 9999; position: fixed; top: 0; left: 0;"
    >
      <button @click.prevent="isAuthenticated = true;">AUTH</button>
    </div>
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
import Signup from "./components/Signup";
import Login from "./components/Login";
import Modal from "./components/Modal";
import Test from "./components/Test";
import Rewards from "./components/Rewards";
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
        textBoxValue: "",
        textBoxValueCost: ""
      },
      isAuthenticated: false
    };
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  },
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
      //console.log("Made it to display()");
      this.$store.commit('display', "Habits");
    },
    getDate(task){
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        return {"task": `${task.task}`,"difficulty":`${task.difficulty}`,"inserted_at":`0${month}-0${day}`};
  },
    submitTask(evt, val, val1) {

    console.log("val " + val)
    console.log("val1 " + val1)

    if (this.$store.state.currentList.list !== "Rewards") {
      var taskSelect = document.getElementById("task-select");
      var taskDifficulty = document.getElementById("task-difficulty");

      if(taskDifficulty.value === "" || this.fields.textBoxValue === "") {
        alert("Please select a valid option!");
      } else if(this.$store.state.currentList.list === "Habit") {
        var data = {
          "habittasks": {"task":`${this.fields.textBoxValue}`,"difficulty":`${taskDifficulty.value}`,"completed":false}
        }
          fetch(`${window.config.apiBase}habits/`, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

          var task = this.getDate(data.habittasks);

          this.$store.commit('addHabitTask', task);


      } else if(this.$store.state.currentList.list === "Todo") {
        var data = {
          "todotasks": {"task":`${this.fields.textBoxValue}`,"difficulty":`${taskDifficulty.value}`,"completed":false}
        }
          fetch(`${window.config.apiBase}todos/`, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

          var task = this.getDate(data.todotasks);

          this.$store.commit('addTodoTask', task);

      } else if(this.$store.state.currentList.list === "Daily") {
        var data = {
          "dailytasks": {"task":`${this.fields.textBoxValue}`,"difficulty":`${taskDifficulty.value}`,"completed":false}
        }
          fetch(`${window.config.apiBase}dailies/`, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

          var task = this.getDate(data.dailytasks);

          this.$store.commit('addDailyTask', task);
        }
      } else {
        var data = {
          "rewards": {"name":`${this.fields.textBoxValue}`,"cost":`${this.fields.textBoxValueCost}`}
        }
          fetch(`${window.config.apiBase}rewards/`, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

          var reward = data

          this.$store.commit('addRewardTask', reward);


      }
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
  /* Materialize overrides */
  nav {
    box-shadow: none;
  }

  .toast-container {
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
    margin: 0;
    padding: 0;
    position: fixed;
    display: flex;
    flex-direction: column-reverse;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .toast-item {
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    text-align: center;
    background-color: dodgerblue;
    margin: 3px auto;
    pointer-events: none;
  }
</style>
