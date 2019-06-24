<template>
  <ul style="display: flex; flex-direction: column; margin: 0; min-height: 100vh;">
    <li
      :key="i"
      :id="i"
      v-for="(task, i) in dailies"
      :class="['task-container', `task--${task.difficulty}`]"
    >

      <div class="task-button" @click="handleClickForItem(task, i);">
        <div class="button-circle">
          +
        </div>
      </div>

      <!-- TASK INFO -->
      <div class="task-summary">
        {{  `${task.task} - ${task.inserted_at}`}}
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
  name: "Dailies",
  props: {
    msg: String
  },
  data() {
    return {
      dailyTasks: []
    }
  },
  created: function(){
    this.getTasks(`${window.config.apiBase}dailies/`);
    this.$store.dispatch('updateCurrentList', {
      list: "Daily"
    });
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
    //Needs optimized
    handleClickForItem(task, i) {
        //task.finishedTimes++;
        this.addCompletedTask(task);
        this.$store.dispatch('handleTaskCompletion', {
          task
        })
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