<template>
  <div class="container mt-3">
    <h2>Past Orders <router-link to="/orders" class="btn btn-success float-end"
        >Back</router-link
      ></h2>
    <div v-if="orders.length === 0">No orders were made with this account.</div>
    <table v-else class="table table-striped table-light">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Date</th>
          <th>Total Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.total_amount }} $</td>
          <td>
            <router-link
              class="btn btn-primary"
              :to="`/more_details/${order.id}`"
            >
              More Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      const userId = this.$store.getters.getUserId;
      const url = `${process.env.BASE_URL}php/get_order_history.php?user_id=${userId}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.orders = data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>


<style scoped>
</style>