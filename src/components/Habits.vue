<template>
<div>
    <section class="task-list-container row">
        <div class="task-list z-depth-2 col s12">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in habits()"
            @click="handleClickForItem(task, i);" v-bind:id="i" :class="`${task.difficulty} z-depth-2`"
          >
            <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created} - ${task.finishedTimes}`}}
          </li>
        </ul>
      </div>
    </section>
</div>
</template>


<script>
export default {
  name: "Habits",
  props: {
    msg: String
  },
  methods: {
    // When called:
    //1. item at index is removed. (1) specifies how many indexes to remove.
    deleteTask(i){
        this.$store.state.tasks.habits.splice(i, 1);
    },
    reorderTask(){
    var x = this.$store.state.tasks.habits.shift();
    this.$store.state.tasks.habits.push(x);
    },
    sortDate() {
        this.$store.state.tasks.habits.reverse();
    },

    //When <li> is clicked:
    //1. ++ to times finished in task object
    //2. Run finishTask which unshifts a task to completedTasks array
    //3. Reward based on difficulty
    handleClickForItem(task, i) {
      console.log("task: " + task.difficulty + " i: " + i );
        task.finishedTimes++;
        this.$store.commit('finishTask', i);
        this.handleEXP(task);
    },
    handleEXP(task) {
      if (task.difficulty === "Easy") {
        this.$store.commit('easyReward', {
          gold: 20,
          exp: 10
          });
      } else if (task.difficulty === "Medium") {
        this.$store.commit('mediumReward', {
          gold: 30,
          exp: 20
          });
      } else if (task.difficulty === "Hard") {
        this.$store.commit('hardReward', {
          gold: 40,
          exp: 30
          });
      }
      this.$store.commit('levelUp');
    },
    habits () {
     return this.$store.state.tasks.habits;
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
}
.Easy {
  padding: 20px;
  font-size: 20px;
  background-color: #81c784;
}
.Medium {
  padding: 20px;
  font-size: 20px;
  background-color: #dce775;
}
.Hard {
  padding: 20px;
  font-size: 20px;
  background-color: #d50000;
}
</style>