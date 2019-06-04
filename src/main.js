import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from 'vue-router';
import HelloWorld from "./components/HelloWorld";
import Dailies from "./components/Dailies";
import Habits from "./components/Habits";
import TodoList from "./components/TodoList";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CompletedTasks from "./components/CompletedTasks";
import 'materialize-css';


const routes = [
  { path: '/foo', component: HelloWorld },
  { path: '/Dailies', component: Dailies},
  { path: '/Habits', component: Habits},
  { path: '/TodoList', component: TodoList},
  { path: '/CompletedTasks', component: CompletedTasks},
  { path: '/Signup', component: Signup},
  { path: '/Login', component: Login}
]

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    player: {
        name: '',
        hp: 25,
        mana: 25,
        maxhp: 25,
        maxmana: 25,
        level: 1,
        exp: 0,
        expneeded: 100,
        gold: 100
    },
    showModal: {
      boolean: false
    },
    tasks: {
      playerArr: [],
      todos: [],
      habits: [],
      dailies: []
    },
    display: {
      taskList: ""
    }
  },
    mutations: {
      updatePlayerArr (state, player0) {
        state.tasks.playerArr[0] = player0;
      },
      updatePlayer (state, payload) {
      state.player.exp = payload.exp;
      state.player.expneeded = payload.expneeded;
      state.player.maxhp = payload.maxhp;
      state.player.maxmana = payload.maxmana;
      state.player.level = payload.level;
      state.player.gold = payload.gold;
      state.player.mana = payload.mana;
      state.player.hp = payload.hp;
      state.player.name = payload.name;
      },
      levelUp (state) {
          if(state.player.exp >= state.player.expneeded) {
        state.player.exp = 0;
        state.player.expneeded = Math.floor(state.player.expneeded * 1.2);
        state.player.maxhp = state.player.maxhp + 5;
        state.player.maxmana = state.player.maxmana + 5;
        state.player.level++
        }
          state.tasks.playerArr[0] = state.player;

          var data = { "player": state.tasks.playerArr[0] } 

          fetch("http://localhost:4000/api/player/1", {
            method: 'PUT',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(res => console.log(res))
          .catch(error => console.error('Error:', error));
      },
      easyReward (state, payload) {
        state.player.gold += payload.gold;
        state.player.exp += payload.exp;
      },
      mediumReward (state, payload) {
        state.player.gold += payload.gold;
        state.player.exp += payload.exp;
      },
      hardReward (state, payload) {
        state.player.gold += payload.gold;
        state.player.exp += payload.exp;
      },
      updateTodosArr (state, todosArr) {
        state.tasks.todos = todosArr;
      },
      addTodoTask (state, task) {
        state.tasks.todos.unshift(task);
      },
      updateHabitsArr (state, habitsArr) {
        state.tasks.habits = habitsArr;
      },
      addHabitTask (state, task) {
        state.tasks.habits.unshift(task);
      },
      displayModal(state, boolean) {
        state.showModal.boolean = boolean;
      },
      deleteTask(state, i) {
        state.tasks.toDos.splice(i, 1);
      },
      display(state, value) {
        state.display.taskList = value;
      }
    }
})

Vue.use(VueRouter)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");