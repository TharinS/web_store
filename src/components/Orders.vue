<template>
  <div class="container">
    <h2 class="mt-3">Items in Basket <router-link to="/orderhistory" class="btn btn-success float-end">Order History</router-link></h2>

    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>
            <button @click="empty" class="btn btn-warning">Clear</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedBasket" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ calculateItemTotal(item) }}</td>
          <td>
            <button @click="remove(item)" class="btn btn-warning">
              Remove
            </button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="end-td">
            Total: {{ this.$store.getters.getBasketTotal }} $
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button
        class="btn btn-secondary"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <div class="my-auto">{{ currentPage }} of {{ totalPages }}</div>
      <button
        class="btn btn-secondary justify-content-end"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
      <button class="btn btn-primary ml-auto" @click="finish">
        Move to payment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    basket() {
      return this.$store.getters.getBasket;
    },
    displayedBasket() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.basket.slice(startIndex, endIndex);
    },
    currentPage() {
      return Math.ceil(this.startIndex / this.itemsPerPage) + 1;
    },
    totalPages() {
      return Math.ceil(this.basket.length / this.itemsPerPage);
    },
    itemsPerPage() {
      return 10;
    },
  },
  methods: {
    finish() {
      // Prepare the data to send in the request body
      const data = {
        user_id: this.$store.getters.getUserId, // Replace with the actual user ID
        total_price: this.$store.getters.getBasketTotal,
        items: this.$store.getters.getBasket,
      };

      fetch(`${process.env.BASE_URL}php/new_order.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          this.$store.dispatch("emptyBasket");
          this.$router.push("/");
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    },
    remove(item) {
      this.$store.dispatch("removeItemFromBasket", item.id);
    },
    empty() {
      this.$store.dispatch("emptyBasket");
    },
    calculateItemTotal(item) {
      return (item.price * item.quantity).toFixed(2);
    },
    previousPage() {
      this.startIndex -= this.itemsPerPage;
    },
    nextPage() {
      this.startIndex += this.itemsPerPage;
    },
  },
  data() {
    return {
      startIndex: 0,
    };
  },
};
</script>

<style scoped>
* {
  color: white;
}

td {
  color: white;
  font-weight: bolder;
  text-align: center;
}

p {
  font-weight: bolder;
}

th {
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
}

.pagination {
  margin-top: 1rem;
  display: flex;
}

.pagination button {
  margin: 0 0.5rem;
}

.end-td {
  text-align: right;
}
</style>
