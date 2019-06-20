<template>
  <ul style="display: flex; flex-direction: column; margin: 0; min-height: 100vh;">
    <li
      :key="i"
      :id="i"
      v-for="(task, i) in todos"
      @click="handleClickForItem(task, i);" 
      :class="`${task.difficulty} z-depth-2`"
    >
      <div class="finishArea">[Hi]</div>
      <!-- TASK INFO -->
      <div class="taskInfo">
        {{ `${task.task} - ${task.difficulty} - ${task.inserted_at}` }}
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
        this.deleteTask(task.id, this.findTaskIndex(task, this.todoTasks));
        this.addCompletedTask(task);
        console.log(task.id);
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
.easy {
  background-color: #81c784;
}
.medium {
  background-color: #dce775;
}
.hard {
  background-color: #d50000;
}
.finishArea {
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 20px;
}

.taskInfo {
  border: 1px solid black;
  width: 100%;
  margin: 0px;
  padding: 30px;
}
</style>