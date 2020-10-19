<template>
    <v-card height="200">
        <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
              <v-select
              :items=list
              v-model="id"
              item-text="name"
              item-value="id"></v-select>
          </div>
          <v-list-item-title class="headline mb-1">
            <span ref="price">{{price}}</span><span style="float: right; opacity: 0.7">$</span> 
          </v-list-item-title>

        </v-list-item-content>

      </v-list-item>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CryptoCard',
    props: [
        "list"
    ],
    data () {
        return {
            id: "",
            name: "",
            price: undefined
        }
    },
    methods: {
        getPrice: function () {
            if (this.id) {
                axios
                .get('https://api.coingecko.com/api/v3/coins/' + this.id, {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',

                })
                .then(response => {
                    this.name = response.data.name
                    this.updatePriceColour(response.data.market_data.current_price.usd, this.price)
                    this.price = response.data.market_data.current_price.usd
                })
            }
        },
        updatePriceColour: function (newValue, oldValue) {
            if (newValue > oldValue) {
                this.$refs["price"].style.color = "green"
            }
            else if (newValue < oldValue) {
                this.$refs["price"].style.color = "red"
            }
            else if (newValue == oldValue) {
                this.$refs["price"].style.color = "orange"
            }
        }
    },
    watch: {
        id: function () {
            this.price = undefined
            this.$refs["price"].style.color = "unset"
            this.getPrice()
        },
        update: function () {
            this.getPrice()
        }
    }
}
</script>

<style>
</style>