<template>
  <ul style="display: flex; flex-direction: column; margin: 0; min-height: 100vh;">
    <li
      :key="i"
      :id="i"
      v-for="(task, i) in todos"
      :class="['task-container', `task--${task.difficulty}`]"
    >
      <div class="task-button" @click="handleClickForItem(task, i);">
        <div class="button-circle">
          +
        </div>
      </div>

      <!-- TASK INFO -->
      <div class="task-summary">
        {{ `${task.task} - ${task.inserted_at}` }}
      </div>
      
      <div class="task-button">
        <div class="button-circle">
          -
        </div>
      </div>
    </li>
  </ul>
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
      todoTasks: []
    }
  },
  computed: {
    todos() {
      return this.$store.state.tasks.todos;
    }
  },
  created: function(){
    this.getTasks(`${window.config.apiBase}todos/`)
  },
  methods: {
    getTasks(url) {
      fetch(url)
        .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
        .then(res => {this.todoTasks = res.data.reverse(), this.getDates(), this.updateTasks() })
      },
      getDates(){
        for(var i = 0; i < this.todoTasks.length; i++) {
          var fixedDate = this.todoTasks[i].inserted_at.slice(5, 10)
          this.todoTasks[i].inserted_at = fixedDate;
        }
      },
    updateTasks() {
        this.$store.commit('updateTodosArr', this.todoTasks);
      },
    deleteTask(id, index) {
        fetch(`${window.config.apiBase}todos/${id}`, {
            method: 'DELETE',
        });
          this.todoTasks.splice(index, 1);
          console.log("index to delete: " + index);
    },
    addCompletedTask(task) {
            var data = {"completedtasks": {"completed": true,"difficulty": task.difficulty,"task": `${task.task}`}};
        fetch(`${window.config.apiBase}completedtasks`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));
      },
    //When <li> is clicked:
    //1. finished = true in task object
    //2. Run finishTask which unshifts a task to completedTasks array
    //3. Reward based on difficulty
    //4. Delete task
    handleClickForItem(task, i) {
        task.finished = true;
        this.handleEXP(task);
        // this.deleteTask(task.id, this.findTaskIndex(task, this.todoTasks));
        // this.addCompletedTask(task);

        this.$store.dispatch('addNotification', {
          id: Math.random(),
          message: '💰 100'
        })
        //M.toast({html: 'Task Completed!', classes: 'mobileScreen'});
    },
    findTaskIndex(task, array) {
      var taskIndex;
      var index = array.forEach( function (value, index, array) {
        if (value.id === task.id) {
          taskIndex = index;
          console.log(index);
        return index;
        } else {
          console.log("yo");
        }
      });
      return taskIndex;
    },
    handleEXP(task) {
      if (task.difficulty === "easy") {
        this.$store.commit('easyReward', {
          gold: 20,
          exp: 10
          });
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
    }
  }
};
</script>


<style scoped>

li {
  font-size: 20px;
  display: flex;
}

/* */
.task-button {
  color: #fff;
  text-align: center;
  font-weight: 300;
  width: 75px;
  /* center */
  justify-content: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  border-right: 1px solid rgba(0, 0, 0, .3);
  border-left: 1px solid rgba(0, 0, 0, .3);
}

.button-circle {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: rgba(0,0,0,.2);
  font-size: 33px;
  /* center */
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-summary {
  flex-grow: 1;
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
}

.task--easy .task-button {
  background-color: rgba(41, 206, 115, 1);
}

.task--medium .task-button {
  background-color: rgba(30, 204, 184, 1);
}

.task--hard .task-button {
  background-color: rgba(31, 173, 209, 1);
}
</style>