<template>
  <div class="container">
    <div class="home">
      <h1>Welcome to Our Online Grocery Store</h1>
      <h2 v-if="firstName && lastName" class="mb-3">
        Welcome back, {{ firstName }} {{ lastName }}!
      </h2>
      <p>Discover the freshest produce and quality products.</p>
      <p>
        Experience the legacy of our store, serving customers since the early
        2000s.
      </p>
      <p>
        For over two decades, we have been committed to providing the finest
        groceries and exceptional customer service.
      </p>
      <router-link to="/products" class="btn">Shop Now</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  mounted() {
    const userId = this.$store.getters.getUserId;
    if (userId) {
      this.getUserDetails(userId);
    }
  },
  methods: {
    getUserDetails(userId) {
      const data = {
        id: userId,
      };

      fetch(`${process.env.BASE_URL}php/get_user_details.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.firstName = data.data[0].first_name;
          this.lastName = data.data[0].last_name;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  text-align: center;
}

* {
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

.btn:active {
  background-color: #3d8b40;
}
</style>
