<template>
<div>
<section class="form-container">
    <div class="task-form">
        <h2>Completed Tasks</h2>
      </div>
</section>

<button type="sortDate" @click="sortDate();">Date</button>

<section class="task-list-container">
<div class="task-list">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in completedTasks">
          <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created}`}}
          </li>
        </ul>
      </div>
</section>

</div>
</template>


<script>
export default {
  name: "CompletedTasks",
  props: {
    msg: String
  },
  data() {
    return {
      //Objects connected to: finished, finishedTimes, difficulty
      completedTasks: []
    };
  },
  created(){
    let completedTasks = localStorage.getItem('completedTasks');
    if(completedTasks) {
      let parsedCompletedTasks = JSON.parse(completedTasks);
      this.completedTasks = parsedCompletedTasks;
    }
  },
  watch: {
    completedTasks: function(val) {
      if(val) {
        console.log('SAVING COMPLETED TASKS: ', JSON.stringify(val));
        localStorage.setItem('completedTasks', JSON.stringify(val));
            }
        }
    },
    methods: {
        sortDate() {
        this.completedTasks.reverse();
        }
    }
};
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
}
.task-list {
  width: 50%;
  border: solid black 1px;
  border-radius: 15px;
}

.task-list ul {
  list-style: none;
  padding-left: 0;
}

.task-list li {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 7px;
    border-top: solid black 1px;
    border-bottom: solid black 1px;
    background-color: #15ff00;
    
}

#page {
  border: solid black 1px;
  margin: auto;
}
</style>