<template>
<div id="footer">
    <div id="listContainer">
        <ul>
            <li class="listIcons"><router-link to="/TodoList" class="router-link"><i class="small material-icons">check_circle</i></router-link></li>
            <li class="listIcons"><router-link to="/Habits" class="router-link"><i class="small material-icons">sync</i></router-link></li>
            <li class="listIcons"><router-link to="/Dailies" class="router-link"><i class="small material-icons">date_range</i></router-link></li>
            <li class="listIcons"><router-link to="/CompletedTasks" class="router-link"><i class="small material-icons">thumb_up</i></router-link></li>
            <li class="listIcons"><router-link to ="/Login" class="router-link"><i class="small material-icons">menu</i></router-link></li>
            <br />
            <li class="list"><router-link to="/TodoList" class="router-link">To-Do's</router-link></li>
            <li class="list"><router-link to="/Habits" class="router-link" @click="$emit('habits')">Habits</router-link></li>
            <li class="list"><router-link to="/Dailies" class="router-link">Dailies</router-link></li>
            <li class="list"><router-link to="/CompletedTasks" class="router-link">Completed</router-link></li>
            <li class="list"><router-link to ="/Login" class="router-link">Menu</router-link></li>
        </ul>
    </div>
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
    border-top: 1px solid black;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    z-index: 2;
    background-color: whitesmoke;
}
#listContainer {
    display: flex;
    justify-content: space-evenly;
}
.list {
    display: inline-block;
    padding: 0px;
    width: 70px;
}
.listIcons {
    display: inline-block;
    padding: 0px 20px 0px 20px;
}
.router-link {
    color: black;
}
.router-link-exact-active {
    color: #ee6e73;
}
.pink {
    color: #ee6e73;
}

</style>