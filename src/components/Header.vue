<template>
<div>

  <nav class="nav-extended">
    <div class="nav-wrapper header-color1">
      <a href="#" class="brand-logo">RPG List</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#">Battle</a></li>
        <li><a href="#">Inventory</a></li>
        <li><a href="#">Store</a></li>
      </ul>
    </div>
    <div class="nav-content header-color">
      <ul class="tabs tabs-transparent">
        <li class="tab"><router-link class="active" to="/TodoList">Todos</router-link></li>
        <li class="tab"><router-link to="/Dailies">Dailies</router-link></li>
        <li class="tab"><router-link to="/Habits">Habits</router-link></li>
        <li class="tab"><router-link to="/CompletedTasks">Completed</router-link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="#">Battle</a></li>
    <li><a href="#">Inventory</a></li>
    <li><a href="#">Store</a></li>
  </ul>

</div>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>
.header-color{
    background-color: #ee6e73;
}
.header-color1{
    background-color: rgb(51,51,51,0.08);
}
</style>