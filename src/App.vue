<template>
  <div>
    <div v-if="isDesktop === true">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/"
                ><img
                  class="icon"
                  src="@/assets/home_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/1"
                ><img
                  class="icon"
                  src="@/assets/vege_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/2"
                ><img
                  class="icon"
                  src="@/assets/dairy_eggs_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/3"
                ><img
                  class="icon"
                  src="@/assets/bread_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/4"
                ><img
                  class="icon"
                  src="@/assets/meat_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/5"
                ><img
                  class="icon"
                  src="@/assets/seafood_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/6"
                ><img
                  class="icon"
                  src="@/assets/pantry_icons.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/7"
                ><img
                  class="icon"
                  src="@/assets/snacks_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/8"
                ><img
                  class="icon"
                  src="@/assets/frozen_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category/9"
                ><img
                  class="icon"
                  src="@/assets/sauce_icon.png"
                  alt="vegetables and fruits icon"
              /></router-link>
            </li>
          </ul>
          <span
            class="navbar-logo"
            v-if="this.$store.getters.getUserId === null"
          >
            <router-link class="nav-link" to="/login">
              <img class="icon_l" src="@/assets/login_icon.png" alt="Login" />
            </router-link>
            <p class="mx-3 navbar-slash">|</p>
            <router-link class="nav-link" to="/register">
              <img
                class="icon_l"
                src="@/assets/register_icon.png"
                alt="Register"
              />
            </router-link>
          </span>
          <span class="navbar-logo" v-else>
            <router-link class="nav-link" to="/orders">
              <span class="icon-text">
                <img
                  class="icon_l"
                  src="@/assets/basket_icon.png"
                  alt="Login"
                />
                &nbsp;{{ this.$store.getters.getBasketTotal }} $
              </span>
            </router-link>
            <p class="mx-3 navbar-slash">|</p>
            <router-link class="nav-link" to="/logout">
              <img
                class="icon_l"
                src="@/assets/logout_icon.png"
                alt="Register"
              />
            </router-link>
          </span>
        </div>
      </nav>

      <div class="text-white content">
        <router-view></router-view>
      </div>

      <footer class="fixed-bottom pt-3 bg-dark">
        <div class="d-flex mb-3">
          &nbsp;&nbsp;
          <div class="sp">Contact:</div>
          <a href="mailto:103166002@student.swin.edu.au" class="ml-2"
            >Developer</a
          >
        </div>
      </footer>
    </div>
    <div v-else-if="isMobilePortrait === true">
      <h1>Mobile Portrait</h1>
    </div>
    <div v-else-if="isMobileLandscape === true">
      <h1>Mobile Landscape</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDesktop: false,
    };
  },
  computed: {
    isMobilePortrait() {
      return !this.isDesktop && window.innerWidth <= 576;
    },
    isMobileLandscape() {
      return (
        !this.isDesktop && window.innerWidth > 576 && window.innerWidth <= 768
      );
    },
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener("resize", this.checkScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isDesktop = window.innerWidth >= 992; // Adjust the breakpoint as per your requirement
    },
  },
};
</script>

<style scoped>
footer {
  z-index: -1;
  border-top: solid 1px white;
}

.sp {
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 8px 4px;
  border: 2px solid white;
}

.navbar-slash {
  font-size: 40px;
}

.icon_l {
  height: auto;
  width: 40px;
  align-content: center;
  align-items: center;
}

.icon-text {
  display: inline-flex;
  align-items: center;
  font-weight: bolder;
  font-size: 110%;
}

.icon {
  height: auto;
  width: 70px;
  align-content: center;
  align-items: center;
}

.gradient-bg {
  height: 100%;
  background: linear-gradient(to bottom right, #435e6a, white);
}

li a {
  color: black;
  font-weight: bold;
  font-family: "Arial", sans-serif;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;
}

footer div {
  font-weight: bold;
  font-family: "Arial", sans-serif;
  font-size: 15px;
  color: white;
}

footer div a {
  text-decoration: none;
  color: black;
  background-color: white;
  padding: 8px 4px;
  border: 2px solid black;
}

#logo {
  height: auto;
  width: 7%;
}

.primary-border {
  border-radius: 5px;
  border: white 2.5px solid;
}

#logo-text {
  margin-left: 2%;
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 20px;
}

nav {
  background-color: #333334;
  border-bottom: white 1px solid;
}

.navbar-logo {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 1%;
  color: white;
}

.navbar-logo img {
  margin-left: auto;
  display: block;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

@media (max-width: 576px) {
  /* Mobile Portrait */
}

@media (max-width: 768px) {
  /* Mobile Landscape */
}
</style>