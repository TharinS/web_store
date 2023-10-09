<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-black text-center h1">Login</h5>
            <form>
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="login"
              >
                Submit
              </button>
              <button class="mt-2 btn btn-primary" type="button" @click="clear">
                Reset
              </button>
              <div class="mt-4 alert alert-danger" v-if="errAcc !== ''">
                {{ errAcc }}
              </div>
              <div>
                <router-link class="nav-link text-black mt-3 alert alert-info" to="/register">
                  Don't have a account with us yet, click here to make a new
                  one.
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errAcc: "",
    };
  },
  methods: {
    login() {
      // Prepare the request body
      const requestBody = {
        email: this.email,
        password: this.password,
      };

      // Send the login request to the server using fetch API
      fetch(`${process.env.BASE_URL}php/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          if (data.status === 200) {
            this.$store.commit("setUserId", data.user_id);
            // Redirect to homepage
            if (this.$store.getters.getUserId) {
              this.$router.push("/");
            }
          } else {
            this.errAcc = "Error" + data.message;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors here
        });
    },
    clear() {
      this.email = "";
      this.password = "";
      this.errAcc = "";
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
}

.btn-primary {
  width: 100%;
}

.text-black {
  color: black;
}
</style>
