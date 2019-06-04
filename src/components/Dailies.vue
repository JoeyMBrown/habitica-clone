<template>
  <div>
    <section class="task-list-container row">
      <div class="task-list z-depth-2 col s12">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in dailies"
            @click="handleClickForItem(task, i);" v-bind:id="i" :class="`${task.difficulty} z-depth-2`"
          >
          <!-- TASK INFO -->
            {{  `${task.task} - ${task.difficulty} - ${task.inserted_at}`}} <!--<sub>13</sub>-->

          </li>
        </ul>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: "Dailies",
  props: {
    msg: String
  },
  data() {
    return {
      //Objects connected to: finished, finishedTimes, difficulty
      dailyTasks: []
    }
  },
  created: function(){
    this.getTasks('http://localhost:4000/api/dailies/')
  },
  computed: {
    dailies() {
      return this.$store.state.tasks.dailies;
    }
  },
  methods: {
    getTasks(url) {
      fetch(url)
        .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
        .then(res => {this.dailyTasks = res.data.reverse(), this.getDates(), this.updateTasks() })
      },
    getDates(){
      for(var i = 0; i < this.dailyTasks.length; i++) {
        var fixedDate = this.dailyTasks[i].inserted_at.slice(5, 10)
        this.dailyTasks[i].inserted_at = fixedDate;
      }
    },
    updateTasks() {
      this.$store.commit('updateDailiesArr', this.dailyTasks);
    },
    addCompletedTask(task) {
      var data = {"completedtasks": {"completed": true,"difficulty": task.difficulty,"task": `${task.task}`}};
      fetch("http://localhost:4000/api/completedtasks", {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    },
    deleteTask(i){
        this.dailyTasks.splice(i, 1);
    },
    reorderTask(){
        var x = this.repeatTasks.shift();
        this.repeatTasks.push(x);
        this.saveRepeatTasks();
},
 //May work, check for optimization
    sortDate() {
      this.repeatTasks.reverse();
    },
    //Needs optimized
    handleClickForItem(task, i) {
        //task.finishedTimes++;
        this.addCompletedTask(task);
        this.handleEXP(task);
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

function createTaskFromValues(name) {
  const now = new Date();

  return {
    name,
    created: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
    finishedTimes: 0,
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
.task-list-container{
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