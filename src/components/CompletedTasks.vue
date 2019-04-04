<template>
<div>

<section class="task-list-container row">
<div class="task-list z-depth-2 col s12">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in completedTasks()" class="z-depth-2">
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
    methods: {
        sortDate() {
        this.$store.state.tasks.completedTasks.reverse();
        },
        completedTasks() {
          return this.$store.state.tasks.completedTasks;
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