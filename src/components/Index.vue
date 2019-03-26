<template>
<div class="page">
  <div id="router">
    <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "Index",
}
</script>


<style scoped>
#taskList{
  border: solid black 1px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.playerData{
  border: solid black 1px;
  width: 100%;
  max-width: 1200px;
}
#data {
  text-align: center;
}
.title{
  border: solid black 1px;
  background-color: #b71c1c;
  border-top: solid black .5px;
  margin: 0 auto;
  color: white;
}
</style>