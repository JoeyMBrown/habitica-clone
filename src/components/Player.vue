<template>
  <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-image border">
        <img src="https://orig06.deviantart.net/ab25/f/2014/330/6/9/pixel_art_raffle_sprite_ezio_from_assassin_s_creed_by_justingamedesign-d87t8nl.png">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <ul>
              <li>   
                <div id="light-red" class="progress">
                  <div id="red" class="determinate" v-bind:style="'width: ' + playerHpPercent + '%'"></div>
                </div>
                Health: {{ playerHp }} / {{ playerMaxhp }}
              <br />

              <div id="light-yellow" class="progress">
                <div id="yellow" class="determinate" v-bind:style="'width: ' + playerExpPercent + '%'"></div>
              </div>
                EXP: {{ playerExp }} / {{ playerExpNeeded }}
              <br />

              <div id="light-blue" class="progress">
                <div id="blue" class="determinate" v-bind:style="'width: ' + playerMpPercent + '%'"></div>
              </div>
              MP: {{ playerMp }} / {{ playerMaxmp }}</li>
          </ul>
        </div>
        <div class="card-action">
          <div>
          <p id="playerName" class="left">{{ playerName }}</p>
          <p id="playerGold" class="right">Gold: {{ playerGold }}</p>
          </div>
          <br />
          <p id="playerLevel">Level: {{ playerLevel }}</p>
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
      playerArr: [],
    };
  },
  computed: {
      playerName() {
        return this.$store.state.player.name;
      },
      playerLevel() {
        return this.$store.state.player.level;
      },
      playerExpPercent() {
        return Math.floor(((this.$store.state.player.exp / this.$store.state.player.expNeeded) * 100));
      },
      playerExp () {
        return this.$store.state.player.exp;
      },
      playerExpNeeded () {
        return Math.floor(this.$store.state.player.expNeeded);
      },
      playerHpPercent() {
        return Math.floor(((this.$store.state.player.hp / this.$store.state.player.maxhp) * 100));
      },
      playerHp () {
        return this.$store.state.player.hp;
      },
      playerMaxhp () {
        return this.$store.state.player.maxhp;
      },
      playerMpPercent() {
        return Math.floor(((this.$store.state.player.mana / this.$store.state.player.maxmana) * 100));
      },
      playerMp () {
        return this.$store.state.player.hp;
      },
      playerMaxmp () {
        return this.$store.state.player.maxmana;
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
#red {
  background-color: #c62828;
}
#light-red {
  background-color: #ef9a9a;
}
#yellow {
background-color: #f4ff81;
}
#light-yellow {
background-color: #f9fbe7;
}
#blue {
background-color: #039be5;
}
#light-blue {
background-color: #b3e5fc;
}
#playerName {
  display: inline;
}
#playerGold {
  display: inline;
}
#playerLevel {
  position: absolute;
  top: 50%;
  left: 20;
}
.border {
  border: 1px solid black;
}
</style>