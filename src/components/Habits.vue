<template>
<div>
    <section class="form-container">
         <div class="task-form">
        <h2>Habits</h2>

        <form @submit.prevent="submitForm2">
          <input v-model="fields2.textBoxValue" placeholder="e.g. Water the gnomes" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>

    <section class="task-list-container">
        <div class="task-list">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in repeatTasks1"
            @click="handleClickForItem2(task, i);"
          >
            <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created} - ${task.finishedTimes}`}}

          <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="!task.difficulty">
              <button type="easy" @click.stop="setDifficulty2(i, 1);">Easy</button>
              <button type="medium" @click.stop="setDifficulty2(i, 2);">Medium</button>
              <button type="hard" @click.stop="setDifficulty2(i, 3);">Hard</button>
            </div>

            <div class="delete-container" v-if="task.difficulty">
                <button type="delete" @click.stop="deleteTask(i);">X</button>
            </div>

          </li>
        </ul>
      </div>
    </section>
    <button type="sortDate" @click="sortDate();">Date</button>
    <button type="reorder" @click="reorderTask();">^</button>
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
      //console.log('RepeatTasks1 Lists, post Parsed: ' + this.repeatTasks1);
    }
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
    //Allows user to choose difficulty.  This will need optimized..
    setDifficulty2(index, difficulty) {
      // 0 - easy
      // 1 - medium
      // 2 - hard
      this.repeatTasks1[index].difficulty = difficulty;
      this.saveRepeatTasks1();
    },
    //Needs optimized
    handleClickForItem2(task, i) {
      if (task.difficulty > 0) {
        task.finishedTimes++;
        this.completedTasks.push(task);
        this.saveRepeatTasks1(task, i);
        console.log('Here is all the finished tasks: ', this.completedTasks);
      } else if (task.difficulty < 1) {
        alert("Please select a difficulty before finishing!");
      } else if(task.finished === true) {
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
    finishedTimes: 0,
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