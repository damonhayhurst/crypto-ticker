<template>
  <v-app id="inspire">
    <v-app-bar
      app
    >
      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
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
        >
          <v-btn
            elevation="2"
            rounded
            @click="save"
          >Save</v-btn>
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
      ]
    }
  },
  created () {
    this.getCoinList()
    this.interval = setInterval(() => this.getPrices(), 10000);
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
      this.currentTime = new Date()
      this.newDbRow = {created_at: this.currentTime.getUTCDate(), coins: []}
      for (var card of this.$refs.cryptoCard) {
        this.newDbRow.coins.push({name: card.name, price: card.price})
      }
      const data = JSON.stringify(this.newDbRow)
      axios.post('http://localhost:5000/save', data)
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
</style>
