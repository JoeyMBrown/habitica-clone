<template>
<div>
<section class="form-container">
    <div class="task-form">
        <h2>Dailies</h2>

        <form @submit.prevent="submitForm1">
          <input v-model="fields1.textBoxValue" placeholder="e.g. Water the gnomes" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
</section>

<section class="task-list-container">
<div class="task-list">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in repeatTasks"
            @click="handleClickForItem1(task, i);"
          >
          <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created}`}}

          <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="!task.difficulty">
              <button type="easy" @click.stop="setDifficulty1(i, 1);">Easy</button>
              <button type="medium" @click.stop="setDifficulty1(i, 2);">Medium</button>
              <button type="hard" @click.stop="setDifficulty1(i, 3);">Hard</button>
            </div>
          </li>
        </ul>
      </div>
</section>

<button type="sortDate" @click="sortDate();">Date</button>

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
    //Allows user to choose difficulty.  This will need optimized..
    setDifficulty1(index, difficulty) {
      // 0 - easy
      // 1 - medium
      // 2 - hard
      this.repeatTasks[index].difficulty = difficulty;
      this.saveRepeatTasks();
    },
    //Needs optimized
    handleClickForItem1(task, i) {
      console.log(this.repeatTasks);
      var clickedItem = task;
      if (clickedItem.difficulty > 0 && clickedItem.finished === false) {
        clickedItem.finished = true;
        this.completedTasks.push(clickedItem);
        this.saveRepeatTasks(task, i);
        //clickedItem.finishedTimes++;
      } else if (clickedItem.difficulty < 1) {
        alert("Please select a difficulty before finishing!");
      } else if(clickedItem.finished === true) {
        alert("You've already finished this task");
      }
    }
  }
};

function createTaskFromValues(name) {
  const now = new Date();

  return {
    name,
    created: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
    finished: false,
    difficulty: 0
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
}
.task-list {
  flex-grow: 1;
  border: solid black 1px;
}

.task-list ul {
  list-style: none;
  padding-left: 0;
}


ul li {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 7px;
  border: solid blue 0.1px;
}
#page {
  border: solid black 1px;
  margin: auto;
}

#todoList {
  border: solid black 1px;
  display: inline-block;
  position: relative;
  text-align: left;
  width: 297px;
  padding: 0px;
}
</style>