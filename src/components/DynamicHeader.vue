<template>  
  <nav  id="fixed">
    <div class="nav-wrapper">
      <a href="#" id="show-modal" class="right" @click="$emit('showModalHandler')"><i class="large material-icons">add</i></a>
      <a href="#" class="center">Habitica-Clone</a>
      <a href="#" id="nav-filter" class="left"><router-link to="/Dailies">Filter</router-link></a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "DynamicHeader",
  data() {
      return {
          fields: {
            selected: ''
          }
      }
  },
  computed: {
      playerName() {
        return this.$store.state.player.name;
      },
      display() {
          return this.$store.state.display.taskList; // Currently working on emmitting an event on click to update global var. to set title of task list.
      }
    }
}
</script>

<style scoped>
#nav-icon {
    position: relative;
    right: 20px;
}
#nav-filter {
    position: relative;
    left: 20px;
}
#fixed {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>