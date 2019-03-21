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
            @click="handleClickForItem(task, i);" v-bind:id="i" :class="`${task.difficulty}`"
          >
            <!-- TASK INFO -->
            {{ `${task.name} - ${task.difficulty} - ${task.created}` }}
            
            <!-- SET DIFFICULTY -->
            <div class="buttons-container" v-if="task.difficulty === 'notSet'">
              <button type="easy" @click.stop="setDifficulty(i, 'easy');">Easy</button>
              <button type="medium" @click.stop="setDifficulty(i, 'medium');">Medium</button>
              <button type="hard" @click.stop="setDifficulty(i, 'hard');">Hard</button>
            </div>

            <div class="delete-container" v-if="task.difficulty !== 'notSet'">
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
    deleteTask(i){
        this.tasks.splice(i, 1);
        console.log(this.tasks);//Removes at element i, 1 index is removed
    },
    reorderTask(){
    var x = this.tasks.shift();
    this.tasks.push(x);
    this.saveTasks();
},
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
      // 1 - easy
      // 2 - medium
      // 3 - hard
    setDifficulty(index, difficulty) {
      this.tasks[index].difficulty = difficulty;
      this.saveTasks();
      var list = document.getElementById(index);
      if (difficulty === 'easy'){
          list.className = "easy";
      } else if (difficulty === 'medium') {
          list.className = "medium";
      } else if (difficulty === 'hard') {
          list.className = "hard";
      }
    },
    //Needs optimized
    handleClickForItem(task, i) {
      console.log("task in function: " + task.name);
      if (task.difficulty !== 'notSet' && task.finished === false) {
        task.finished = true;
        this.completedTasks.push(task);
        this.deleteTask(i);
        this.saveTasks(task, i);
      } else if (task.difficulty === 'notSet') {
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
    finished: false,
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
}
.task-list {
  width: 50%;
  border: solid black 1px;
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
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
.notSet {
  background-color: yellow;
}
.easy {
    background-color: green;
}
.medium {
    background-color: blue;
}
.hard {
    background-color: purple;
}
.delete-container {
    position: relative;
    right: 0px;
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