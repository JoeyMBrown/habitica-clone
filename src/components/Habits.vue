<template>
<div>
    <section class="form-container">
         <div class="task-form">
        <h2>Habits</h2>

  <form @submit.prevent="submitForm2">
    <div class="row">
        <div class="col s12">
          Create a Habit:
          <div class="input-field inline">
            <input v-model="fields2.textBoxValue" id="email_inline" type="text" placeholder="e.g. Water the gnomes">
          </div>
          <button type="submit" class="waves-effect waves-light btn-small difficultyButtons">submit</button>
        </div>
      </div>
    </form>
    </div>
    </section>

    <section class="task-list-container">
        <div class="task-list z-depth-2">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in repeatTasks1"
            @click="handleClickForItem2(task, i);" v-bind:id="i" :class="`${task.difficulty} z-depth-2`"
          >
            <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created} - ${task.finishedTimes}`}}

          <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="task.difficulty === 'notSet'">
              <button type="easy" class="waves-effect waves-light btn-small difficultyButtons" @click.stop="setDifficulty2(i, 'easy');">Easy</button>
              <button type="medium" class="waves-effect waves-light btn-small difficultyButtons" @click.stop="setDifficulty2(i, 'medium');">Medium</button>
              <button type="hard" class="waves-effect waves-light btn-small difficultyButtons" @click.stop="setDifficulty2(i, 'hard');">Hard</button>
            </div>

            <div class="delete-container" v-if="task.difficulty !== 'notSet'">
                <button class="waves-effect waves-light btn-small" type="delete" @click.stop="deleteTask(i);"><i class="tiny material-icons">clear</i></button>
            </div>

          </li>
        </ul>
      </div>
    </section>
    <button class="waves-effect waves-light btn-small" type="sortDate" @click="sortDate();"><i class="tiny material-icons">list</i></button>
    <button class="waves-effect waves-light btn-small" type="reorder" @click="reorderTask();"><i class="tiny material-icons">expand_less</i></button>
</div>
</template>


<script>
export default {
  name: "Habits",
  props: {
    msg: String
  },
  data() {
    return {
      //Needs optimized
      fields2: {
        textBoxValue: ""
      },
      //Objects connected to: finished, finishedTimes, difficulty
      repeatTasks1: [],
      completedTasks: []
    };
  },
  created(){
   //console.log(localStorage.getItem("tasks"));
    let repeatTasks1 = localStorage.getItem('repeatTasks1');
    let completedTasks = localStorage.getItem('completedTasks');
    if(repeatTasks1) {
      let parsedRepeatTasks1 = JSON.parse(repeatTasks1);
      //console.log('RepeatTasks1 var in created function: ' + repeatTasks1);
      this.repeatTasks1 = parsedRepeatTasks1;
    }
      //console.log('RepeatTasks1 Lists, post Parsed: ' + this.repeatTasks1);
    if(completedTasks) {
      let parsedCompletedTasks = JSON.parse(completedTasks);
      this.completedTasks = parsedCompletedTasks;
    }
  },
  watch: {
    repeatTasks1: function(val) {
      console.log('SAVING REPEAT TASKS 1: ', JSON.stringify(val));
      localStorage.setItem('repeatTasks1', JSON.stringify(val));
    }
  },
  methods: {
    saveRepeatTasks1(){
      localStorage.setItem('repeatTasks1', JSON.stringify(this.repeatTasks1));
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
    },
    deleteTask(i){
        this.repeatTasks1.splice(i, 1);
        console.log(this.repeatTasks1);//Removes at element i, 1 index is removed
    },
    reorderTask(){
    var x = this.repeatTasks1.shift();
    this.repeatTasks1.push(x);
    this.saveRepeatTasks1();
},
    //Needs optimized
    //On submit button click
    submitForm2(evt, val) {
      if (!this.fields2.textBoxValue || this.fields2.textBoxValue === "") {
        console.warn('User tried to submit empty task.');
      } else {
        const taskName = this.fields2.textBoxValue;
        const task = createTaskFromValues(taskName);

        this.repeatTasks1.push(task);
        this.fields2.textBoxValue = "";
      }
    }, //May work, check for optimization
    sortDate() {
        this.repeatTasks1.reverse();
    },
      // 1 - easy
      // 2 - medium
      // 3 - hard
    setDifficulty2(index, difficulty) {
      this.repeatTasks1[index].difficulty = difficulty;
      var list = document.getElementById(index);
      if (difficulty === 'easy'){
          list.className = "easy";
      } else if (difficulty === 'medium') {
          list.className = "medium";
      } else if (difficulty === 'hard') {
          list.className = "hard";
      }
      this.saveRepeatTasks1();
    },
    //Needs optimized
    handleClickForItem2(task, i) {
      if (task.difficulty !== 'notSet') {
        task.finishedTimes++;
        this.completedTasks.push(task);
        this.handleEXP(task);
        this.saveRepeatTasks1(task, i);
        //console.log('Here is all the finished tasks: ', this.completedTasks);
      } else if (task.difficulty === 'notSet') {
        alert("Please select a difficulty before finishing!");
      } 
    },
    handleEXP(task) {
      if (task.difficulty === "easy") {
        this.$store.commit('easyReward', {
          gold: 20,
          exp: 10
          });
        console.log(this.$store.state.player);
        console.log("Easy task " + this.$store.state.player.exp);
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
      console.log('level when using store levelup:' + this.$store.state.player.level); 
    }
  }
};

function createTaskFromValues(name) {
  const now = new Date();

  return {
    name,
    created: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
    finishedTimes: 0,
    difficulty: 'notSet'
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