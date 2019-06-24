<template>
  <ul style="display: flex; flex-direction: column; margin: 0; min-height: 100vh;">
    <li
      :key="i"
      :id="i"
      v-for="(reward, i) in rewards"
      :class="['reward-container']"
    >

      <div class="reward-button" @click="handleClickForItem(reward, i);">
        <div class="button-circle">
          -
        </div>
      </div>

      <!-- TASK INFO  - ${task.finishedTimes} -->
      <div class="reward-summary">
        {{`${reward.name} - 💰${reward.cost}`}}
      </div>

    </li>
  </ul>
</template>


<script>
export default {
  name: "Rewards",
  data() {
    return {
      rewardsArr: []
    }
  },
  computed: {
    rewards() {
      return this.$store.state.tasks.rewards;
    }
  },
  created: function(){
    this.getRewards(`${window.config.apiBase}rewards/`);
    this.$store.dispatch('updateCurrentList', {
      list: "Rewards"
    });
  },
  methods: {
      getRewards(url) {
    fetch(url)
      .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
      .then(res => {this.rewardsArr = res.data.reverse(), this.updateRewards() })
    },
    updateRewards() {
      this.$store.commit('updateRewardsArr', this.rewardsArr);
    },
    //When <li> is clicked:
    //1. ++ to times finished in task object
    //2. Run finishTask which unshifts a task to completedTasks array
    //3. Reward based on difficulty
    handleClickForItem(reward, i) {
        this.$store.dispatch('handleTaskCompletion', {
          reward
        });
    }
  }
};
</script>


<style scoped>
li {
  font-size: 20px;
  display: flex;
}

/* */
.reward-button {
  color: #fff;
  text-align: center;
  font-weight: 300;
  width: 75px;
  /* center */
  justify-content: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  border-right: 1px solid rgba(0, 0, 0, .3);
  border-left: 1px solid rgba(0, 0, 0, .3);
}

.button-circle {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: rgba(0,0,0,.2);
  font-size: 33px;
  /* center */
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reward-summary {
  flex-grow: 1;
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  border-right: 1px solid rgba(0, 0, 0, .3);
}

.reward--easy .task-button {
  background-color: rgba(41, 206, 115, 1);
}

.task--medium .task-button {
  background-color: rgba(30, 204, 184, 1);
}

.task--hard .task-button {
  background-color: rgba(31, 173, 209, 1);
}
</style>