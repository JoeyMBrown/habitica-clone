<template>
<div id="header">
    <ul>
        <li>Home</li>
        <li>Inventory</li>
        <li>Shop</li>
    </ul>
</div>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>
#header ul {
list-style: none;
text-align: left;
}
#header ul li {
display: inline-block;
padding-left: 20px;
}
#header{
border: solid black 1px;
background-color: #ffae00;
border-bottom: 0px;
margin-bottom: 0px;
max-width: 1200px;
width: 100%;
margin: 0 auto;
}
</style>