<template>
  <div style="display: flex; flex-direction: column; background-color: #ee6e73;">
    <div class="user-container">

      <!-- User Avatar -->
      <div class="user-avatar-container">
        <img src="@/assets/example-user-avatar.png">
      </div>
      
      <!-- STATUS BARS -->
      <div style="flex-grow: 1; padding: 0px 16px;">
        <ul class="bar-list">
            <!-- Health -->
            <li>   
              <div id="light-red" class="progress">
                <div id="red" class="determinate" v-bind:style="'width: ' + playerHpPercent + '%'"></div>
              </div>
              <div style="display: flex;">
                <span style="text-align: left; flex-grow: 1;">
                  {{ playerHp }} / {{ playerMaxhp }}
                </span>
                <span style="text-align: right; flex-grow: 1;">
                  Health
                </span>
              </div>
            </li>
            <!-- Experience -->
            <li>
              <div id="light-yellow" class="progress">
                <div id="yellow" class="determinate" v-bind:style="'width: ' + playerExpPercent + '%'"></div>
              </div>
              <div style="display: flex;">
                <span style="text-align: left; flex-grow: 1;">
                  {{ playerExp }} / {{ playerExpNeeded }}
                </span>
                <span style="text-align: right; flex-grow: 1;">
                  Experience
                </span>
              </div>
            </li>
            <!-- Mana -->
            <li>
              <div id="light-blue" class="progress">
                <div id="blue" class="determinate" v-bind:style="'width: ' + playerMpPercent + '%'"></div>
              </div>
              <div style="display: flex;">
                <span style="text-align: left; flex-grow: 1;">
                  {{ playerMp }} / {{ playerMaxmp }}
                </span>
                <span style="text-align: right; flex-grow: 1;">
                  Mana
                </span>
              </div>
            </li>
        </ul>
      </div>
    </div>

    <!-- SUMMARY -->
    <div style="display: flex; color: #fff; margin: 8px 16px;">
      <span style="text-align: left; flex-grow: 1;">
        🗡 Lvl {{ playerLevel }} Rogue
      </span>
      <span style="text-align: right; flex-grow: 1;">
        💰 {{ playerGold }}
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
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
        return Math.floor(((this.$store.state.player.exp / this.$store.state.player.expneeded) * 100));
      },
      playerExp () {
        return this.$store.state.player.exp;
      },
      playerExpNeeded () {
        return Math.floor(this.$store.state.player.expneeded);
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
    fetch(`${window.config.apiBase}player/1`)
        .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
        .then(res => {this.playerArr[0] = res.data, console.log(this.playerArr[0].gold); this.updatePlayer();})
        .catch(error => {let name = prompt("Please create a name for your character!", "Joe"); this.createPlayer(name);});
  },
  watch: {
    playerArr: function () {
      this.updatePlayer();
    }
  },
  methods: {
        createPlayer(name) {
                  var data = {
          "player": {
                name: name,
                hp: 25,
                mana: 25,
                maxhp: 25,
                maxmana: 25,
                level: 1,
                exp: 0,
                expneeded: 100,
                gold: 100,
                }
        }
          fetch(`${window.config.apiBase}player/`, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => this.playerArr[0] = response, this.updatePlayer())
          .catch(error => console.error('Error:', error));
            },
          updatePlayer() {

            this.$store.commit('updatePlayerArr', this.playerArr[0]);

            this.$store.commit('updatePlayer', {
              gold: this.playerArr[0].gold,
              exp: this.playerArr[0].exp,
              name: this.playerArr[0].name,
              hp: this.playerArr[0].hp,
              mana: this.playerArr[0].mana,
              maxhp: this.playerArr[0].maxhp,
              maxmana: this.playerArr[0].maxmana,
              level: this.playerArr[0].level,
              expneeded: this.playerArr[0].expneeded
      })
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

.user-container {
  display: flex;
  color: #fff;
}

/* USER AVATAR */
.user-avatar-container {
  flex-basis: 132px;
}

.user-avatar-container img {
  margin: 16px;
  width: 100px;
  background-color: dodgerblue;
}

.bar-list li {
  margin-bottom: 8px;
}

/* MATERIALIZE OVERRIDES */
.progress {
  height: 10px;
  border-radius: 5px;
  margin: 0;
  margin-bottom: 2px;
}
</style>