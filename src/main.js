import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router';
import HelloWorld from "./components/HelloWorld";
import Dailies from "./components/Dailies";
import Habits from "./components/Habits";
import TodoList from "./components/TodoList";


const routes = [
  { path: '/foo', component: HelloWorld },
  { path: '/Dailies', component: Dailies},
  { path: '/Habits', component: Habits},
  { path: '/TodoList', component: TodoList}
]

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

const app = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");