<template>
  <div>

    <section class="task-list-container row">
      <div class="task-list z-depth-2 col s12">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in todoTasks"
            @click="handleClickForItem(task, i);" v-bind:id="i" :class="`${task.difficulty} z-depth-2`"
          >
            <!-- TASK INFO -->
            {{ `${task.task} - ${task.difficulty} - ${task.inserted_at}` }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: "TodoList",
  props: {
    msg: String
  },
  data() {
    return {
      //Objects connected to: finished, finishedTimes, difficulty
      todoTasks: [],
      completedTasks: []
    }
  },
  created: function(){
    this.getTasks('http://localhost:4000/api/todos/')
  },
  methods: {
    getTasks(url) {
      fetch(url)
        .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
        .then(res => {this.todoTasks = res.data, console.log(this.todoTasks[0]), this.getDates() })
      },
      getDates(){
        for(var i = 0; i < this.todoTasks.length; i++) {
          var fixedDate = this.todoTasks[i].inserted_at.slice(5, 10)
          this.todoTasks[i].inserted_at = fixedDate;
        }
      },
    // When called:
    //1. item at index is removed. (1) specifies how many indexes to remove.
    deleteTask(i) {
      this.$store.state.tasks.toDos.splice(i, 1);
    },
    reorderTask() {
      var x = this.$store.state.tasks.toDos.shift();
      this.$store.state.tasks.toDos.push(x);
    },
    sortDate() {
      this.$store.state.tasks.toDos.reverse();
    },

    //When <li> is clicked:
    //1. finished = true in task object
    //2. Run finishTask which unshifts a task to completedTasks array
    //3. Reward based on difficulty
    //4. Delete task
    handleClickForItem(task, i) {
        task.finished = true;
        this.$store.commit('finishtoDos', i);
        this.handleEXP(task);
        this.deleteTask(i);
    },
    handleEXP(task) {
      if (task.difficulty === "Easy") {
        this.$store.commit('easyReward', {
          gold: 20,
          exp: 10
          });
      } else if (task.difficulty === "Medium") {
        this.$store.commit('mediumReward', {
          gold: 30,
          exp: 20
          });
      } else if (task.difficulty === "Hard") {
        this.$store.commit('hardReward', {
          gold: 40,
          exp: 30
          });
      }
      this.$store.commit('levelUp');
    },
    toDos() {
      return this.$store.state.tasks.toDos;
    }
  }
};
</script>


<style scoped>
.task-list-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.task-list {
  width: 50%;
  background-color: #cfd8dc;
  border-radius: 15px;
  overflow-y: auto;
  height: 464px;
}
.task-list ul {
  list-style: none;
  padding-left: 0;
}
.task-list li {
  padding: 20px;
  padding-left: 7px;
  margin: 10px;
}
.easy {
  padding: 20px;
  font-size: 20px;
  background-color: #81c784;
}
.medium {
  padding: 20px;
  font-size: 20px;
  background-color: #dce775;
}
.hard {
  padding: 20px;
  font-size: 20px;
  background-color: #d50000;
}
</style>