<template>
<div>
<section class="form-container">
    <div class="task-form">
        <h2>Dailies</h2>

  <form @submit.prevent="submitForm1">
    <div class="row">
        <div class="col s12">
          Create a Daily Task:
          <div class="input-field inline">
            <input v-model="fields1.textBoxValue" id="email_inline" type="text" placeholder="e.g. Water the gnomes">
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
            v-for="(task, i) in repeatTasks"
            @click="handleClickForItem1(task, i);" v-bind:id="i" :class="`${task.difficulty} z-depth-2`"
          >
          <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created} - ${task.finishedTimes}`}}

          <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="task.difficulty === 'notSet'">
              <button type="easy" class="waves-effect waves-light btn-small difficultyButtons" @click.stop="setDifficulty1(i, 'easy');">Easy</button>
              <button type="medium" class="waves-effect waves-light btn-small difficultyButtons" @click.stop="setDifficulty1(i, 'medium');">Medium</button>
              <button type="hard" class="waves-effect waves-light btn-small difficultyButtons" @click.stop="setDifficulty1(i, 'hard');">Hard</button>
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
  name: "Dailies",
  props: {
    msg: String
  },
  data() {
    return {
      //Needs optimized
      fields1: {
        textBoxValue: ""
      },
      //Objects connected to: finished, finishedTimes, difficulty
      repeatTasks: [],
      completedTasks: []
    };
  },
  created(){
    let repeatTasks = localStorage.getItem('repeatTasks');
    let completedTasks = localStorage.getItem('completedTasks');
    if (repeatTasks) {
      let parsedRepeatTasks = JSON.parse(repeatTasks);
      //console.log('RepeatTasks var in created function: ' + repeatTasks);
      this.repeatTasks = parsedRepeatTasks;
      //console.log('RepeatTasks Lists, post Parsed: ' + this.repeatTasks);
    }
    if(completedTasks) {
      let parsedCompletedTasks = JSON.parse(completedTasks);
      this.completedTasks = parsedCompletedTasks;
    }
  },
  watch: {
    repeatTasks: function(val) {
      if(val) {
        console.log('SAVING REPEAT TASKS: ', JSON.stringify(val));
        localStorage.setItem('repeatTasks', JSON.stringify(val));
      }
    }
},
  methods: {
    saveRepeatTasks(){
      localStorage.setItem('repeatTasks', JSON.stringify(this.repeatTasks));
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
    },
    deleteTask(i){
        this.repeatTasks.splice(i, 1);
        console.log(this.repeatTasks);//Removes at element i, 1 index is removed
    },
    reorderTask(){
        var x = this.repeatTasks.shift();
        this.repeatTasks.push(x);
        this.saveRepeatTasks();
},
    //Needs optimized
    //On submit button click
    submitForm1(evt, val) {
      if (!this.fields1.textBoxValue || this.fields1.textBoxValue === "") {
        console.warn('User tried to submit empty task.');
      } else {
        const taskName = this.fields1.textBoxValue;
        const task = createTaskFromValues(taskName);

        this.repeatTasks.push(task);
        this.fields1.textBoxValue = "";
      }
    },
 //May work, check for optimization
    sortDate() {
      this.repeatTasks.reverse();
    },
      // 1 - easy
      // 2 - medium
      // 3 - hard
    setDifficulty1(index, difficulty) {
      this.repeatTasks[index].difficulty = difficulty;
      this.saveRepeatTasks();
      var list = document.getElementById(index);
      if (difficulty === 'easy') {
        list.className ="easy";
      } else if (difficulty === 'medium') {
          list.className = "medium";
      } else if (difficulty === 'hard') {
          list.className = "hard";
      }
    },
    //Needs optimized
    handleClickForItem1(task, i) {
      console.log(this.repeatTasks);
      if (task.difficulty !== 'notSet') {
        task.finishedTimes++;
        this.completedTasks.push(task);
        this.saveRepeatTasks(task, i);
      } else if (task.difficulty === 'notSet') {
        alert("Please select a difficulty before finishing!");
      }
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
  background-color: #e57373;
}
.difficultyButtons {
  margin: 0px 10px 0px 0px;
}
</style>