<template>
  <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
        <img src="https://lorempixel.com/100/190/nature/6">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <ul>
              <li>Name: {{ playerName }}<br />HP: {{ playerHp }}%<br />MP: {{ playerMp }}%<br />Level: {{ playerLevel }}<br />Exp: {{ playerExp }}%<br />Gold: {{ playerGold }}</li>
          </ul>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      items: [],
      playerArr: []
    };
  },
  computed: {
      playerName() {
        return this.$store.state.player.name;
      },
      playerLevel() {
        return this.$store.state.player.level;
      },
      playerExp() {
        return Math.floor(((this.$store.state.player.exp / this.$store.state.player.expNeeded) * 100));
      },
      playerHp() {
        return Math.floor(((this.$store.state.player.hp / this.$store.state.player.maxhp) * 100));
      },
      playerMp() {
        return Math.floor(((this.$store.state.player.mana / this.$store.state.player.maxmana) * 100));
      },
      playerGold() {
        return this.$store.state.player.gold;
      }
    },
  created(){
      if(!this.$store.state.player.name) {
          let name = prompt("Please create a name for your character!", "Joe");
          this.$store.commit('createPlayer', name);
          console.log(this.$store.state.player);
      } else if (this.$store.state.player.name) {
          console.log("Name is: " + this.$store.state.player.name)
      }
        /*Here I'm checking for items in the items array, if there are none, create and save the example sword.*/
      let savedItems = localStorage.getItem('items');
      if(!savedItems) {
          const sword = this.createSword('Wooden Sword', 'A simple wooden sword', 1, 1, 1);
          this.items[0] = (sword);
          localStorage.setItem('items', JSON.stringify(this.items));
      } else if (savedItems) {
          this.items = JSON.parse(savedItems);
          console.log('items array: ' + (savedItems));
      }
  },
  methods: {
        createPlayer (name) {
            return {
                name,
                hp: 25,
                mana: 25,
                maxhp: 25,
                maxmana: 25,
                level: 1,
                exp: 0,
                expNeeded: 100,
                gold: 100,
                inventory: [],
                equipped: [],
                stats: {
                    strength: 1,
                    dexterity: 1,
                    intelligence: 1
                    }
                }
            },
        savePlayer () {
            let player = localStorage.getItem('player');
            JSON.parse(player);
            this.playerArr[0] = player;
            console.log("I'm being called");
        },
        createSword (name, description, strength, dexterity, intelligence) {
            return {
            name,
            description,
            stats: {
                strength,
                dexterity,
                intelligence
                }
            }
        }
    }
}
</script>

<style scoped>
</style>