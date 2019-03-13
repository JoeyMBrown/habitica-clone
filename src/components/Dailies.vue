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
            {{  `${task.name} - ${task.difficulty} - ${task.created} - ${task.finishedTimes}`}}

          <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="!task.difficulty">
              <button type="easy" @click.stop="setDifficulty1(i, 1);">Easy</button>
              <button type="medium" @click.stop="setDifficulty1(i, 2);">Medium</button>
              <button type="hard" @click.stop="setDifficulty1(i, 3);">Hard</button>
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
      if (task.difficulty > 0) {
        task.finishedTimes++;
        this.completedTasks.push(task);
        this.saveRepeatTasks(task, i);
      } else if (task.difficulty < 1) {
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