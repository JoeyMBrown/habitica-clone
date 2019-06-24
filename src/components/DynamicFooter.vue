<template>
    <section>
        <ul>
            <li>
                <router-link to="/Habits">
                    <div>
                        <i class="material-icons">sync</i>
                    </div>
                    <div>Habits</div>
                </router-link>
            </li>
            <li>
                <router-link to="/Dailies">
                    <div>
                        <i class="material-icons">date_range</i>
                    </div>
                    <div>Dailies</div>
                </router-link>
            </li>
            <li>
                <router-link to="/TodoList">
                    <div>
                        <i class="material-icons">check_circle</i>
                    </div>
                    <div>To-Dos</div>
                </router-link>
            </li>
            <li>
                <router-link to="/Rewards">
                    <div>
                        <i class="material-icons">???</i>
                    </div>
                    <div>Rewards</div>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "DynamicFooter",
}
</script>

<style scoped>
section {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0;
    z-index: 2;
    background-color: #ee6e73;
}
ul {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 8px 0 0 0;
}
li {
    flex-grow: 1;
}


a,
a:visited,
a:active {
    display: flex;
    flex-direction: column;
    color: #e8a9ab;
}

a.router-link-exact-active {
    color: #fff;;
}

</style>