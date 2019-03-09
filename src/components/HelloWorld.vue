<template>
  <!--
    v-model="fields.textBoxValue" may still be needed, placeholder may not have cross browser support.
  -->

  <div id="page">
    <div id="todo">
      <h1>To-Do Tasks</h1>

      <form @submit.prevent="submitForm">
        <input v-model="fields.textBoxValue" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div id="dailies">
      <h1>Dailies</h1>

      <form @submit.prevent="submitForm1">
        <input v-model="fields1.textBoxValue" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div id="habits">
      <h1>Habits</h1>

      <form @submit.prevent="submitForm2">
        <input v-model="fields2.textBoxValue" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div id="todoList">
      <ul>
        <li
          :key="i"
          v-for="(item, i) in addedItems"
          @click="handleClickForItem(i);"
        >
          {{ item + " " + tasks[i].created }}
        </li>
        <p
          :key="i"
          v-for="(item, i) in addedItems"
          v-if="tasks[i].difficulty < 1"
        >
          {{ item + ": " }} <button type="easy" @click="easy(i);">Easy</button>
          <button type="medium" @click="medium(i);">Medium</button>
          <button type="hard" @click="hard(i);">Hard</button>
        </p>
      </ul>
    </div>

    <div id="dailiesList">
      <ul>
        <li
          :key="i"
          v-for="(item, i) in addedItems1"
          @click="handleClickForItem1(i);"
        >
          {{ item + " " + repeatTasks[i].created }}
        </li>
        <p
          :key="i"
          v-for="(item, i) in addedItems1"
          v-if="repeatTasks[i].difficulty < 1"
        >
          {{ item + ": " }}
          <button type="easy" @click="easy1(i);">Easy</button>
          <button type="medium" @click="medium1(i);">Medium</button>
          <button type="hard" @click="hard1(i);">Hard</button>
        </p>
      </ul>
    </div>

    <div id="habitsList">
      <ul>
        <li
          :key="i"
          v-for="(item, i) in addedItems2"
          @click="handleClickForItem2(i);"
        >
          {{ item + " " + repeatTasks1[i].created }}
        </li>
        <p
          :key="i"
          v-for="(item, i) in addedItems2"
          v-if="repeatTasks1[i].difficulty < 1"
        >
          {{ item + ": " }}
          <button type="easy" @click="easy2(i);">Easy</button>
          <button type="medium" @click="medium2(i);">Medium</button>
          <button type="hard" @click="hard2(i);">Hard</button>
        </p>
      </ul>
    </div>
    <button type="sortDate" @click="sortDate();">Date</button>
    <div></div>
  </div>
</template>

<script>
//let taskString = JSON.stringify(tasks);

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      //Needs optimized
      fields: {
        textBoxValue: "Enter Task"
      },
      fields1: {
        textBoxValue: "Enter Task"
      },
      fields2: {
        textBoxValue: "Enter Task"
      },
      //Needs optimized
      //Added Items is displayed by <li>
      addedItems: [],
      addedItems1: [],
      addedItems2: [],
      //Objects connected to: finished, finishedTimes, difficulty
      tasks: [],
      repeatTasks: [],
      repeatTasks1: []
    };
  },
  methods: {
    //Needs optimized
    //On submit button click
    submitForm(evt, val) {
      if (this.fields.textBoxValue === "Enter Task") {
        this.fields.textBoxValue = "";
        alert("Enter a valid task!");
      } else {
        this.tasks.push(new this.Task(this.fields.textBoxValue));
        this.addedItems.push(this.fields.textBoxValue);
        //this.tasks.push(new this.Task(this.fields.textBoxValue));
        this.fields.textBoxValue = "";
      }
    },
    submitForm1(evt, val) {
      if (this.fields1.textBoxValue === "Enter Task") {
        this.fields1.textBoxValue = "";
        alert("Enter a valid task!");
      } else {
        this.addedItems1.push(this.fields1.textBoxValue);
        this.repeatTasks.push(new this.RepeatTask(this.fields1.textBoxValue));
        this.fields1.textBoxValue = "";
      }
    },
    submitForm2(evt, val) {
      if (this.fields2.textBoxValue === "Enter Task") {
        this.fields2.textBoxValue = "";
        alert("Enter a valid task!");
      } else {
        this.addedItems2.push(this.fields2.textBoxValue);
        this.repeatTasks1.push(new this.RepeatTask(this.fields2.textBoxValue));
        this.fields2.textBoxValue = "";
      }
    }, //May work, check for optimization
    sortDate() {
      this.addedItems.reverse();
      this.addedItems1.reverse();
      this.addedItems2.reverse();
    },
    //Allows user to choose difficulty.  This will need optimized..
    easy(i) {
      this.tasks[i].difficulty = 1;
    },
    medium(i) {
      this.tasks[i].difficulty = 2;
    },
    hard(i) {
      this.tasks[i].difficulty = 3;
    },
    //Dailies
    easy1(i) {
      this.repeatTasks[i].difficulty = 1;
    },
    medium1(i) {
      this.repeatTasks[i].difficulty = 2;
    },
    hard1(i) {
      this.repeatTasks[i].difficulty = 3;
    },
    //Habits
    easy2(i) {
      this.repeatTasks1[i].difficulty = 1;
    },
    medium2(i) {
      this.repeatTasks1[i].difficulty = 2;
    },
    hard2(i) {
      this.repeatTasks1[i].difficulty = 3;
    },
    //Needs optimized
    handleClickForItem(i) {
      console.log(this.tasks);
      var clickedItem = this.tasks[i];
      if (clickedItem.difficulty > 0) {
        clickedItem.finished = true;
      } else if (clickedItem.difficulty < 1) {
        alert("Please select a difficulty before finishing!");
      }
    },
    handleClickForItem1(i) {
      console.log(this.repeatTasks);
      var clickedItem = this.repeatTasks[i];
      if (clickedItem.difficulty > 0) {
        clickedItem.finishedTimes++;
      } else if (clickedItem.difficulty < 1) {
        alert("Please select a difficulty before finishing!");
      }
    },
    handleClickForItem2(i) {
      console.log(this.repeatTasks);
      console.log(this.repeatTasks1);
      console.log(this.tasks);
      var clickedItem = this.repeatTasks1[i];
      if (clickedItem.difficulty > 0) {
        clickedItem.finishedTimes++;
      } else if (clickedItem.difficulty < 1) {
        alert("Please select a difficulty before finishing!");
      }
    }, //Potential optimization
    // Need to remove methods in order to store data.. hmm.
    Task(name) {
      this.name = name;
      this.date = new Date();
      this.created =
        Number(this.date.getMonth()) +
        1 +
        "/" +
        this.date.getDate() +
        "/" +
        this.date.getFullYear();
      this.finished = false;
      this.difficulty = 0;
      /*this.finish = function() {
        if (this.difficulty > 2) {
          this.finished = true;
        } else {
          alert("Select a difficulty before finishing!");
        }
      };*/
    },
    RepeatTask(name) {
      this.name = name;
      this.date = new Date();
      this.created =
        Number(this.date.getMonth()) +
        1 +
        "/" +
        this.date.getDate() +
        "/" +
        this.date.getFullYear();
      this.finishedTimes = 0;
      this.difficulty = 0;
      /*this.finish = function() {
        if (this.difficulty > 2) {
          this.finishedTimes++;
        } else {
          alert("Select a difficulty before finishing!");
        }
      };*/
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 7px;
  border: solid blue 0.1px;
}
#page {
  width: 900px;
  border: solid black 1px;
  margin: auto;
}
#todo {
  display: inline-block;
  position: relative;
  text-align: center;
  width: 300px;
  padding: 0px;
  top: 0px;
}
#todoList {
  border: solid black 1px;
  display: inline-block;
  position: relative;
  text-align: left;
  width: 297px;
  padding: 0px;
}
#dailies {
  display: inline-block;
  position: relative;
  text-align: center;
  width: 300px;
  padding: 0px;
  top: 0px;
}
#dailiesList {
  border: solid black 1px;
  display: inline-block;
  position: relative;
  text-align: left;
  width: 297px;
  padding: 0px;
  top: 0px;
}
#habits {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 300px;
  padding: 0px;
  top: 0px;
}
#habitsList {
  border: solid black 1px;
  position: relative;
  display: inline-block;
  text-align: left;
  width: 297px;
  padding: 0px;
  top: 0px;
}
</style>
