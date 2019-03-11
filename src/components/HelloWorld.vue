<template>
  <!--
    v-model="fields.textBoxValue" may still be needed, placeholder may not have cross browser support.
  -->
  <div id="page">

    <h1 style="text-align: center;">Tasks</h1>
    <section class="form-container">
      <div class="task-form">
        <h2>To-Do</h2>

        <form @submit.prevent="submitForm">
          <input v-model="fields.textBoxValue" placeholder="e.g. Water the gnomes" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div class="task-form">
        <h2>Dailies</h2>

        <form @submit.prevent="submitForm1">
          <input v-model="fields1.textBoxValue" placeholder="e.g. Water the gnomes" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>

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
            v-for="(task, i) in tasks"
            @click="handleClickForItem(task, i);"
          >
            <!-- TASK INFO -->
            {{ `${task.name} - ${task.difficulty} - ${task.created}` }}
            
            <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="!task.difficulty">
              <button type="easy" @click.stop="setDifficulty(i, 1);">Easy</button>
              <button type="medium" @click.stop="setDifficulty(i, 2);">Medium</button>
              <button type="hard" @click.stop="setDifficulty(i, 3);">Hard</button>
            </div>
          </li>
        </ul>
      </div>

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

      <div class="task-list">
        <ul>
          <li
            :key="i"
            v-for="(task, i) in repeatTasks1"
            @click="handleClickForItem2(task, i);"
          >
            <!-- TASK INFO -->
            {{  `${task.name} - ${task.difficulty} - ${task.created}`}}

          <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="!task.difficulty">
              <button type="easy" @click.stop="setDifficulty2(i, 1);">Easy</button>
              <button type="medium" @click.stop="setDifficulty2(i, 2);">Medium</button>
              <button type="hard" @click.stop="setDifficulty2(i, 3);">Hard</button>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <button type="sortDate" @click="sortDate();">Date</button>
    <div></div>
  <div>
    <router-link to="/Dailies">Dailies</router-link>
    <router-link to="/Habits">Habits</router-link>
    <router-link to="/TodoList">Todo-List</router-link>
  </div>
  <router-view></router-view>
  </div>

</template>

<script>
//let taskString = JSON.stringify(tasks);
/*const Foo = { template: '<div>foo</div>' }
export default {
  name: "Foo"
}*/

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      //Needs optimized
      fields: {
        textBoxValue: ""
      },
      fields1: {
        textBoxValue: ""
      },
      fields2: {
        textBoxValue: ""
      },
      //Objects connected to: finished, finishedTimes, difficulty
      tasks: [],
      repeatTasks: [],
      repeatTasks1: [],
      completedTasks: []
    };
  },
  created(){
   //console.log(localStorage.getItem("tasks"));
    let tasks = localStorage.getItem('tasks');
    let repeatTasks = localStorage.getItem('repeatTasks');
    let repeatTasks1 = localStorage.getItem('repeatTasks1');
    let completedTasks = localStorage.getItem('completedTasks');
    if(tasks){
      let parsedTasks = JSON.parse(tasks);
      //console.log(tasks);
      this.tasks = parsedTasks;
      //console.log(this.tasks);
    }
    if (repeatTasks) {
      let parsedRepeatTasks = JSON.parse(repeatTasks);
      //console.log('RepeatTasks var in created function: ' + repeatTasks);
      this.repeatTasks = parsedRepeatTasks;
      //console.log('RepeatTasks Lists, post Parsed: ' + this.repeatTasks);
    }
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
    tasks: function(val) {
      if(val){
        console.log('SAVING:', JSON.stringify(val));
        localStorage.setItem('tasks', JSON.stringify(val));
      }
    },
    repeatTasks: function(val) {
      if(val) {
        console.log('SAVING REPEAT TASKS: ', JSON.stringify(val));
        localStorage.setItem('repeatTasks', JSON.stringify(val));
      }
    },
    repeatTasks1: function(val) {
      console.log('SAVING REPEAT TASKS 1: ', JSON.stringify(val));
      localStorage.setItem('repeatTasks1', JSON.stringify(val));
    }
  },
  methods: {
    saveTasks(){
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
    },
    saveRepeatTasks(){
      localStorage.setItem('repeatTasks', JSON.stringify(this.repeatTasks));
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
    },
    saveRepeatTasks1(){
      localStorage.setItem('repeatTasks1', JSON.stringify(this.repeatTasks1));
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
    },
    //Needs optimized
    //On submit button click
    submitForm(evt, val) {
      if (!this.fields.textBoxValue || this.fields.textBoxValue === "") {
        console.warn('User tried to submit empty task.');
      } else {
        const taskName = this.fields.textBoxValue;
        const task = createTaskFromValues(taskName);

        this.tasks.push(task);
        this.fields.textBoxValue = "";
      }
    },
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
      this.tasks.reverse();
      this.repeatTasks.reverse();
    },
    //Allows user to choose difficulty.  This will need optimized..
    setDifficulty(index, difficulty) {
      // 0 - easy
      // 1 - medium
      // 2 - hard
      this.tasks[index].difficulty = difficulty;
      this.saveTasks();
    },
    setDifficulty1(index, difficulty) {
      // 0 - easy
      // 1 - medium
      // 2 - hard
      this.repeatTasks[index].difficulty = difficulty;
      this.saveRepeatTasks();
    },
    setDifficulty2(index, difficulty) {
      // 0 - easy
      // 1 - medium
      // 2 - hard
      this.repeatTasks1[index].difficulty = difficulty;
      this.saveRepeatTasks1();
    },
    //Needs optimized
    handleClickForItem(task, i) {
      console.log("task in function: " + task.name);
      var clickedItem = task;
      if (clickedItem.difficulty > 0 && clickedItem.finished === false) {
        clickedItem.finished = true;
        this.completedTasks.push(clickedItem);
        this.saveTasks(task, i);
      } else if (clickedItem.difficulty < 1) {
        alert("Please select a difficulty before finishing!");
      } else if(clickedItem.finished === true) {
        alert("You've already finished this task");
      }
    },
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
    },
    handleClickForItem2(task, i) {
      var clickedItem = task;
      if (clickedItem.difficulty > 0 && clickedItem.finished === false) {
        clickedItem.finished = true;
        this.completedTasks.push(clickedItem);
        this.saveRepeatTasks1(task, i);
        //clickedItem.finishedTimes++;
        console.log('Here is all the finished tasks: ', this.completedTasks);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
