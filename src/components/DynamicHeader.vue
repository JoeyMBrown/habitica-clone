<template>  
<div>
  <nav  id="fixed">
    <div class="nav-wrapper">
      <a href="#modal1" class="modal-trigger right"><i class="large material-icons">add</i></a>
      <a href="#" class="center">Habitica-Clone</a>
      <a href="#" id="nav-filter" class="left"><router-link to="/Dailies">Filter</router-link></a>
    </div>
  </nav>
  <!-- Modal Structure -->

  <div id="modal1" class="modal bottom-sheet">
    <div class="modal-content">
      <h4>Create a Habit, Task, or Daily!</h4>

    <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>

    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancel</a>  
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Add</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "DynamicHeader",
  data() {
      selected: ''
  },
  computed: {
      playerName() {
        return this.$store.state.player.name;
      }
    },
  methods: {
      onSubmitHandler () {

      }
    }
}
</script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const box = document.querySelector(".modal");
    M.Modal.init(box, {});
});

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