<template>
<div>
<section class="form-container">
    <div class="task-form">
        <h2>To-Do</h2>

        <form @submit.prevent="submitForm">
          <input v-model="fields.textBoxValue" placeholder="e.g. Water the gnomes" type="text" />
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
</section>

<button type="sortDate" @click="sortDate();">Date</button>

</div>
</template>


<script>
export default {
  name: "TodoList",
   props: {
    msg: String
  },
  data() {
    return {
      fields: {
        textBoxValue: ""
      },
      //Objects connected to: finished, finishedTimes, difficulty
      tasks: [],
      completedTasks: []
    };
  },
  created(){
   //console.log(localStorage.getItem("tasks"));
    let tasks = localStorage.getItem('tasks');
    let completedTasks = localStorage.getItem('completedTasks');
    if(tasks){
      let parsedTasks = JSON.parse(tasks);
      //console.log(tasks);
      this.tasks = parsedTasks;
      //console.log(this.tasks);
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
    }
  },
  methods: {
    saveTasks(){
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
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
//May work, check for optimization
    sortDate() {
      this.tasks.reverse();
    },
    //Allows user to choose difficulty.  This will need optimized..
    setDifficulty(index, difficulty) {
      // 0 - easy
      // 1 - medium
      // 2 - hard
      this.tasks[index].difficulty = difficulty;
      this.saveTasks();
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