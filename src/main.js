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
    },
    notifications: []
  },
  actions: {
    addNotification({commit}, notification) {
      commit('addNotification', notification);
      setTimeout(() => commit('removeNotification'), 3000);
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} task
     * @param {string} task.task.difficulty - easy, medium, or hard
     */
    handleTaskCompletion({commit}, task) {
      const { difficulty } = task.task;
      console.log("THIS IS THE TASK: " + JSON.stringify(task));
      console.log(task.task.difficulty);

      // Default, easy reward
      let gold = 20,
        exp = 10;

      if(difficulty === 'medium') {
        gold = 40;
        exp = 20;
      }else if(difficulty === 'hard'){
        gold = 60;
        exp = 40;
      }

      commit('addReward', {
        gold,
        exp
      })

      commit('levelUp');

      store.dispatch('addNotification', {
        id: Math.random(),
        message: `+ ${gold} 💰 + ${exp} ✨`
      })
    }
  },
    mutations: {
      addNotification(state, notifcation) {
        state.notifications.push(notifcation);
      },
      removeNotification(state) {
        state.notifications.shift();
      },
      //
      //
      //
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

          fetch(`${window.config.apiBase}player/1`, {
            method: 'PUT',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(res => console.log(res))
          .catch(error => console.error('Error:', error));
      },
      addReward (state, payload) {
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
      updateDailiesArr (state, dailiesArr) {
        state.tasks.dailies = dailiesArr;
      },
      addDailyTask (state, task) {
        state.tasks.dailies.unshift(task);
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