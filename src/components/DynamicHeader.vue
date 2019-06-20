<template>  
  <nav  id="fixed">
    <!-- FILTER -->
    <div class="nav-wrapper" style="display: flex;">
      <div id="nav-filter">
        <router-link to="/Signup">Filter</router-link>
      </div>

      <!-- LOGO TEXT -->
      <div style="flex-grow: 1; text-align: center;">Task RPG</div>

      <!-- ADD -->
      <div
        id="show-modal"
        @click="$emit('showModalHandler')"
      >
        <i class="large material-icons">add</i>
      </div>
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