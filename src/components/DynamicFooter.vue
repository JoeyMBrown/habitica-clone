<template>
<div id="footer">
    <ul>
        <li id="list"><router-link to="/TodoList"><i class="tiny material-icons">check_circle</i>To-Do's</router-link></li>
        <li id="list"><router-link to="/Habits"><i class="tiny material-icons">sync</i>Habits</router-link></li>
        <li id="list"><router-link to="/Dailies"><i class="tiny material-icons">date_range</i>Dailies</router-link></li>
        <li id="list"><router-link to="#"><i class="tiny material-icons">security</i>Rewards</router-link></li>
        <li id="list"><router-link to ="#"><i class="tiny material-icons">menu</i>Menu</router-link></li>
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
#list {
    display: inline;
    text-decoration: none;
    padding: 10px;
}
</style>