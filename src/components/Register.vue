<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          class="form-control"
          required
        />
      </div>
      <div class="form-row mb-3">
        <div class="col mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="formData.firstName"
            class="form-control"
            required
          />
          <div v-if="isErFN && form_submitted" class="error-message">
            Invalid first name
          </div>
        </div>
        <div class="col">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="formData.lastName"
            class="form-control"
            required
          />
          <div v-if="isErLN && form_submitted" class="error-message">
            Invalid last name
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="form-control"
          required
        />
        <div v-if="isErEml && form_submitted" class="error-message">
          Invalid email
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          class="form-control"
          required
        />
        <div v-if="isErPass && form_submitted" class="error-message">
          Invalid password
        </div>
      </div>
      <div class="mb-3">
        <label for="confirm_password" class="form-label"
          >Confirm Password</label
        >
        <input
          type="password"
          id="confirm_password"
          v-model="formData.confirm_password"
          class="form-control"
          required
        />
        <div v-if="isErCPass && form_submitted" class="error-message">
          Passwords do not match
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="address" class="form-label">Address</label>
          <input
            type="text"
            id="address"
            v-model="formData.address"
            class="form-control"
            required
          />
          <div v-if="isErStr && form_submitted" class="error-message">
            Address too long
          </div>
        </div>
        <div class="col-6">
          <label for="city" class="form-label">City</label>
          <input
            type="text"
            id="city"
            v-model="formData.city"
            class="form-control"
            required
          />
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <label for="state" class="form-label">State</label>
            <input
              type="text"
              id="state"
              v-model="formData.state"
              class="form-control"
              required
            />
          </div>
          <div class="col-6">
            <label for="zipCode" class="form-label">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              v-model="formData.zipCode"
              class="form-control"
              required
            />
            <div v-if="isErPost && form_submitted" class="error-message">
              Invalid zip code
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
      <button type="button" class="mx-3 btn btn-primary" @click="clear">
        Clear
      </button>
      <div class="alert alert-danger" v-if="errAcc !== ''">{{ errAcc }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form_submitted: false,
      errAcc: "",
      formData: {
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    };
  },
  methods: {
    clear() {
      this.form_submitted = false;
      this.errAcc = "";
      this.formData = {
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      };
    },
    onSubmit() {
      if (
        this.isErFN ||
        this.isErLN ||
        this.isErUN ||
        this.isErPass ||
        this.isErCPass ||
        this.isErEml ||
        this.isErStr ||
        this.isErPost
      ) {
        this.form_submitted = true;
        return;
      }

      // Prepare the form data
      const formData = {
        username: this.formData.username,
        password: this.formData.password,
        email: this.formData.email,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        address: this.formData.address,
        city: this.formData.city,
        state: this.formData.state,
        zipCode: this.formData.zipCode,
      };

      // Send the form data to the server using fetch API
      fetch(`${process.env.BASE_URL}php/create_user.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 409) {
            this.errAcc = "Error" + data.message;
          } else if (data.status === 200) {
            // Update the user ID in the Vuex store
            this.$store.commit("setUserId", data.user_id);
            // Redirect to homepage
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  computed: {
    isErFN() {
      return (
        !this.formData.firstName || !/^[a-zA-Z]+$/.test(this.formData.firstName)
      );
    },
    isErLN() {
      return (
        !this.formData.lastName || !/^[a-zA-Z]+$/.test(this.formData.lastName)
      );
    },
    isErUN() {
      return !this.formData.username || this.formData.username.length < 3;
    },
    isErPass() {
      const specialChars = /[$%^&*]/;
      return (
        !this.formData.password ||
        this.formData.password.length < 8 ||
        !specialChars.test(this.formData.password)
      );
    },
    isErCPass() {
      return this.formData.confirm_password !== this.formData.password;
    },
    isErEml() {
      const emailRegex = /\S+@\S+\.\S+/;
      return !this.formData.email || !emailRegex.test(this.formData.email);
    },
    isErStr() {
      return this.formData.address && this.formData.address.length > 40;
    },
    isErPost() {
      const regex = /^\d{4}$/;
      return !this.formData.zipCode || !regex.test(this.formData.zipCode);
    },
  },
};
</script>

<style scoped>
* {
  color: white;
}

.container {
  padding: 45px;
}

.form-label {
  font-weight: bold;
}

.btn-primary {
  margin-top: 10px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
