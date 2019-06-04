<template>
<div id="footer">
    <ul>
        <li class="list"><router-link to="/TodoList" class="router-link"><i class="tiny material-icons">check_circle</i>To-Do's</router-link></li>
        <li class="list"><router-link to="/Habits" class="router-link" @click="$emit('habits')"><i class="tiny material-icons">sync</i>Habits</router-link></li>
        <li class="list"><router-link to="/Dailies" class="router-link"><i class="tiny material-icons">date_range</i>Dailies</router-link></li>
        <li class="list"><router-link to="/CompletedTasks" class="router-link"><i class="tiny material-icons">thumb_up</i>Completed</router-link></li>
        <li class="list"><router-link to ="/Login" class="router-link"><i class="tiny material-icons">menu</i>Menu</router-link></li>
    </ul>
</div>
</template>

<script>
export default {
    name: "DynamicFooter",
}
</script>

<style>
#footer {
    width: 100%;
    border: 1px solid black;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-color: whitesmoke;
}
.list {
    display: inline;
    text-decoration: none;
    padding: 10px;
}
.router-link {
    color: black;
}
</style>