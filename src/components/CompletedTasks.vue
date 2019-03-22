<template>
<div>
<section class="form-container">
    <div class="task-form">
        <h2>Completed Tasks</h2>
      </div>
</section>

<section class="task-list-container">
<div class="task-list z-depth-2">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in completedTasks" class="z-depth-2">
          <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created}`}}
          </li>
        </ul>
      </div>
</section>

<button class="waves-effect waves-light btn-small" id="sort" type="sortDate" @click="sortDate();"><i class="tiny material-icons">list</i></button>

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
  background-color: #1de9b6;
}
#sort {
margin-top: 10px;
}
</style>