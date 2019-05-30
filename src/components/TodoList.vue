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
      todoTasks: []
    }
  },
  created: function(){
    this.getTasks('http://localhost:4000/api/todos/')
  },
  methods: {
    getTasks(url) {
      fetch(url)
        .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
        .then(res => {this.todoTasks = res.data.reverse(), console.log(this.todoTasks[0]), this.getDates() })
      },
      getDates(){
        for(var i = 0; i < this.todoTasks.length; i++) {
          var fixedDate = this.todoTasks[i].inserted_at.slice(5, 10)
          this.todoTasks[i].inserted_at = fixedDate;
        }
      },
    deleteTask(id, index) {
        fetch("http://localhost:4000/api/todos/" + `${id}`, {
            method: 'DELETE',
        });
          this.todoTasks.splice(index, 1);
          console.log("index to delete: " + index);
    },
    addCompletedTask(task) {
            var data = {"completedtasks": {"completed": `${task.completed}`,"difficulty": task.difficulty,"task": `${task.task}`}};
        fetch("http://localhost:4000/api/completedtasks/create", {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
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
        //this.$store.commit('finishtoDos', i);
        this.handleEXP(task);
        this.deleteTask(task.id, this.findTaskIndex(task, this.todoTasks));
        this.addCompletedTask(task);
    },
    findTaskIndex(task, array) {
      var taskIndex;
      var index = array.forEach( function (value, index, array) {
        if (value.id === task.id) {
          taskIndex = index;
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
    },
    toDos() {
      return this.$store.state.tasks.toDos;
    },
    reorderTask() {
      var x = this.$store.state.tasks.toDos.shift();
      this.$store.state.tasks.toDos.push(x);
    },
    sortDate() {
      this.$store.state.tasks.toDos.reverse();
    },
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