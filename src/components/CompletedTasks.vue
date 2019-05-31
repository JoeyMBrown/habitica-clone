<template>
<div>

<section class="task-list-container row">
<div class="task-list z-depth-2 col s12">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in completedTasks" class="z-depth-2">
          <!-- TASK INFO -->
            {{  `${task.task} - ${task.difficulty} - ${task.inserted_at}`}}
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
    }
  },
  created: function(){
    this.getTasks('http://localhost:4000/api/completedtasks/');
  },
    methods: {
      getTasks(url) {
        fetch(url)
          .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
          .then(res => {this.completedTasks = res.data.reverse(), this.getDates() })
        },
      getDates(){
        for(var i = 0; i < this.completedTasks.length; i++) {
          var fixedDate = this.completedTasks[i].inserted_at.slice(5, 10)
          this.completedTasks[i].inserted_at = fixedDate;
        }
      },
        sortDate() {
          this.$store.state.tasks.completedTasks.reverse();
    }
  } 
};
</script>


<style scoped>
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
  background-color: #1de9b6;
}
</style>