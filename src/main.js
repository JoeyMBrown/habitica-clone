import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from 'vue-router';
import HelloWorld from "./components/HelloWorld";
import Dailies from "./components/Dailies";
import Habits from "./components/Habits";
import TodoList from "./components/TodoList";
import CompletedTasks from "./components/CompletedTasks";
import 'materialize-css';


const routes = [
  { path: '/foo', component: HelloWorld },
  { path: '/Dailies', component: Dailies},
  { path: '/Habits', component: Habits},
  { path: '/TodoList', component: TodoList},
  { path: '/CompletedTasks', component: CompletedTasks}
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
        expNeeded: 100,
        gold: 100,
        inventory: [],
        equipped: [],
        stats: {
            strength: 1,
            dexterity: 1,
            intelligence: 1
      }
    },
    showModal: {
      boolean: false
    },
    tasks: {
      completedTasks: [],
      toDos: [],
      dailies: [],
      habits: []
    },
    display: {
      taskList: ""
    }
  },
    mutations: {
      levelUp (state) {
          if(state.player.exp >= state.player.expNeeded) {
        state.player.exp = 0;
        state.player.expNeeded = state.player.expNeeded * 1.2;
        state.player.maxhp = state.player.maxhp + 5;
        state.player.maxmana = state.player.maxmana + 5;
        state.player.stats.strength++;
        state.player.stats.dexterity++;
        state.player.stats.intelligence++;
        state.player.level++
        console.log("I made it to levelup")
        } else {
            console.log('get more exp nerd');
        }
      },
      createPlayer (state, name) {
        state.player.name = name;
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
      displayModal(state, boolean) {
        state.showModal.boolean = boolean;
      },
      createTask(state, payload) {
        if(payload.type === "Habit") {
          state.tasks.habits.unshift({
            
            type: payload.type,
            name: payload.name,
            created: payload.created,
            finishedTimes: payload.finishedTimes,
            difficulty: payload.difficulty
          })
        } else if (payload.type === "Todo") {
          state.tasks.toDos.unshift({

            type: payload.type,
            name: payload.name,
            created: payload.created,
            finished: payload.finished,
            difficulty: payload.difficulty
          })
        }
      },
      finishHabit(state, i) {
        state.tasks.completedTasks.unshift(state.tasks.habits[i]);
      },
      finishtoDos(state, i) {
        state.tasks.completedTasks.unshift(state.tasks.toDos[i]);
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