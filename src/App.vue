<template>
  <v-app id="inspire">
    <v-app-bar
      app
    >
      <v-toolbar-title>Crypto Ticker</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 4"
            :key="n"
            cols="3"
          >
            <CryptoCard :list=list ref="cryptoCard"/>
          </v-col>
        </v-row>
          <v-row
          align="center"
          justify="center"
          class="save-btn"
        >
          <v-btn
            elevation="2"
            rounded
            @click="save"
            color="info"
          >Save</v-btn>
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="save-alert"
          v-if="lastSaved !== ''"
        >
          <v-alert
            color="blue"
            dense
            outlined
            type="success"
            :key="lastSaved"
          >Last saved to database at {{lastSaved}}</v-alert>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CryptoCard from '@/components/CryptoCard'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    CryptoCard
  },
  data () {
    return {
      list: [],
      preSelectedCryptos: [
        'bitcoin',
        'ethereum',
        'dogecoin',
        'ripple'
      ],
      lastSaved: ""
    }
  },
  created () {
    this.getCoinList()
    this.interval = setInterval(() => this.getPrices(), 60000);
  },
  mounted () {
    this.preSelectCryptos()
  },
  methods: {
    getCoinList() {
      axios
      .get('https://api.coingecko.com/api/v3/coins/list')
      .then(response => {
        this.list = response.data
      })
    },
    getPrices() {
      console.log(this.$refs.cryptoCard)
      for (var card of this.$refs.cryptoCard) {
        card.getPrice()
      }
    },
    preSelectCryptos() {
      this.$refs.cryptoCard.forEach((item, index) => {
        item.id = this.preSelectedCryptos[index]
      })
    },
    save() {
      this.lastSaved = new Date().toString()
      this.coins = {}
      for (var card of this.$refs.cryptoCard) {
        this.coins[card.name] = card.price
      }
      axios.post('http://localhost:5000/save', {created_at: this.lastSaved, coins: this.coins}, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.save-btn {
  padding-top: 50px
}
.save-alert {
  padding-top: 30px;
}
</style>
