<template>
  <div class="container">
    <h1>Logging out</h1>
    <p>
      You will be automatically redirected to the homepage in
      {{ timeLeft }} seconds.
    </p>
    <p>
      If you're not redirected, you can <a href="/">click here</a> to go to the
      homepage immediately.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 10,
    };
  },
  methods: {
    signOut() {
      // Reset store state
      this.$store.commit("resetState");
    },
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(timer);
        this.$router.push("/");
      }
    }, 1000);
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  min-height: 75vh;
}

a {
  text-decoration: underline;
  font-weight: bold;
  font-family: "Arial", sans-serif;
  font-size: 15px;
  color: white;
}
</style>
