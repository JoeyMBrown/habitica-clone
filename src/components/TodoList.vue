<template>
  <div>
    <section class="form-container">
      <div class="task-form">
        <h2>To-Do</h2>

        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col s12">Create a Task:
              <div class="input-field inline">
                <input
                  v-model="fields.textBoxValue"
                  id="email_inline"
                  type="text"
                  placeholder="e.g. Water the gnomes"
                >
              </div>
              <button
                type="submit"
                class="waves-effect waves-light btn-small difficultyButtons"
              >submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section class="task-list-container">
      <div class="task-list z-depth-2">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in tasks"
            @click="handleClickForItem(task, i);"
            v-bind:id="i"
            :class="`${task.difficulty} z-depth-2`"
          >
            <!-- TASK INFO -->
            {{ `${task.name} - ${task.difficulty} - ${task.created}` }}
            <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="task.difficulty === 'notSet'">
              <button
                type="easy"
                class="waves-effect waves-light btn-small difficultyButtons"
                @click.stop="setDifficulty(i, 'easy');"
              >Easy</button>
              <button
                type="medium"
                class="waves-effect waves-light btn-small difficultyButtons"
                @click.stop="setDifficulty(i, 'medium');"
              >Medium</button>
              <button
                type="hard"
                class="waves-effect waves-light btn-small difficultyButtons"
                @click.stop="setDifficulty(i, 'hard');"
              >Hard</button>
            </div>

            <div class="delete-container" v-if="task.difficulty !== 'notSet'">
              <button
                class="waves-effect waves-light btn-small"
                type="delete"
                @click.stop="deleteTask(i);"
              >
                <i class="tiny material-icons">clear</i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <button class="waves-effect waves-light btn-small" type="sortDate" @click="sortDate();">
      <i class="tiny material-icons">list</i>
    </button>
    <button class="waves-effect waves-light btn-small" type="reorder" @click="reorderTask();">
      <i class="tiny material-icons">expand_less</i>
    </button>
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
      fields: {
        textBoxValue: ""
      },
      //Objects connected to: finished, finishedTimes, difficulty
      tasks: [],
      completedTasks: []
    };
  },
  created() {
    //console.log(localStorage.getItem("tasks"));
    let tasks = localStorage.getItem("tasks");
    let completedTasks = localStorage.getItem("completedTasks");
    if (tasks) {
      let parsedTasks = JSON.parse(tasks);
      //console.log(tasks);
      this.tasks = parsedTasks;
      //console.log(this.tasks);
    }
    if (completedTasks) {
      let parsedCompletedTasks = JSON.parse(completedTasks);
      this.completedTasks = parsedCompletedTasks;
    }
  },
  watch: {
    tasks: function(val) {
      if (val) {
        console.log("SAVING:", JSON.stringify(val));
        localStorage.setItem("tasks", JSON.stringify(val));
      }
    }
  },
  methods: {
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(this.completedTasks)
      );
    },
    deleteTask(i) {
      this.tasks.splice(i, 1);
      console.log(this.tasks); //Removes at element i, 1 index is removed
    },
    reorderTask() {
      var x = this.tasks.shift();
      this.tasks.push(x);
      this.saveTasks();
    },
    //On submit button click
    submitForm(evt, val) {
      if (!this.fields.textBoxValue || this.fields.textBoxValue === "") {
        console.warn("User tried to submit empty task.");
      } else {
        const taskName = this.fields.textBoxValue;
        const task = createTaskFromValues(taskName);

        this.tasks.push(task);
        this.fields.textBoxValue = "";
      }
    },
    //May work, check for optimization
    sortDate() {
      this.tasks.reverse();
    },
    // 1 - easy
    // 2 - medium
    // 3 - hard
    setDifficulty(index, difficulty) {
      this.tasks[index].difficulty = difficulty;
      this.saveTasks();
      var list = document.getElementById(index);
      if (difficulty === "easy") {
        list.className = "easy";
      } else if (difficulty === "medium") {
        list.className = "medium";
      } else if (difficulty === "hard") {
        list.className = "hard";
      }
    },
    //Needs optimized
    handleClickForItem(task, i) {
      console.log("task in function: " + task.name);
      if (task.difficulty !== "notSet" && task.finished === false) {
        task.finished = true;
        this.completedTasks.push(task);
        this.handleEXP(task);
        this.deleteTask(i);
        this.saveTasks(task, i);
      } else if (task.difficulty === "notSet") {
        alert("Please select a difficulty before finishing!");
      } else if (task.finished === true) {
        alert("You've already finished this task");
      }
    },
    handleEXP(task) {
      if (task.difficulty === "easy") {
        this.$store.commit('easyReward', {
          gold: 20,
          exp: 10
          });
        //console.log(this.$store.state.player);
        //console.log("Easy task " + this.$store.state.player.exp);
      } else if (task.difficulty === "medium") {
        this.$store.commit('mediumReward', {
          gold: 30,
          exp: 20
          });
      } else if (task.difficulty === "hard") {
        this.$store.commit('hardReward', {
          gold: 40,
          exp: 30
          });
      }
      this.$store.commit('levelUp');
      //console.log('level when using store levelup:' + this.$store.state.player.level);
    },
  }
};

function createTaskFromValues(name) {
  const now = new Date();

  return {
    name,
    created: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
    finished: false,
    difficulty: "notSet"
  };
}
</script>


<style scoped>
.form-container {
  display: flex;
}
.task-form {
  flex-grow: 1;
}
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
.notSet {
  padding: 20px;
  font-size: 20px;
  background-color: #607d8b;
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
.difficultyButtons {
  margin: 0px 10px 0px 0px;
}
</style>