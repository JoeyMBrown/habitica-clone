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
    fetch("http://localhost:4000/api/player/1")
        .then(response => {return response.json()}) // parses JSON response into native Javascript objects 
        .then(res => {this.playerArr[0] = res.data, console.log(this.playerArr[0].gold); this.updatePlayer();})
        .catch(error => {let name = prompt("Please create a name for your character!", "Joe"); this.createPlayer(name);});
  },
  watch: {
    playerArr: function () {
      console.log(this.playerArr[0]);
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
          fetch("http://localhost:4000/api/player/", {
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