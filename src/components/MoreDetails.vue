<template>
  <div class="container mt-3">
    <h2>
      Past Orders
      <router-link to="/orderhistory" class="btn btn-success float-end"
        >Back</router-link
      >
    </h2>
    <div v-if="orders.length === 0">No orders were made with this account.</div>
    <table v-else class="table table-striped table-light">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.product_name }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.total }} $</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ total }} $</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  props: ["order_id"],
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.fetchOrders();
  },
  computed: {
    total() {
      return this.orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2);
    },
  },
  methods: {
    fetchOrders() {
      const order_id = this.order_id;
      const url = `${process.env.BASE_URL}php/more_order_details.php?order_id=${order_id}`;

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