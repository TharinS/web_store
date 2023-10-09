<template>
  <div class="container">
    <div class="product-grid">
      <h2>{{ categoryName }}</h2>
      <div class="grid-container">
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="product-item"
        >
          <div class="product-image-container">
            <div class="product-image-gradient"></div>
            <img
              :src="require(`@/assets/${product.image}`)"
              :alt="product.name"
              class="product-image"
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">
              {{ product.price }}$ &nbsp;
              <button
                class="btn qty_btn my-auto"
                @click="increaseQuantity(product)"
              >
                +
              </button>
              {{ product.dp_qty }}x
              <button
                class="btn qty_btn my-auto"
                @click="decreaseQuantity(product)"
              >
                -
              </button>
              &nbsp; Total - {{ product.total }}$
            </p>

            <button class="btn btn-success" @click="addToBasket(product)">
              Add to Basket
            </button>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button
          class="btn btn-secondary"
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <button
          class="btn btn-secondary"
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["category"],
  data() {
    return {
      products: [],
      categoryName: "",
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return product.category_id === this.category;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // Fetch the category name and products when entering the component
      vm.fetchCategoryName(to.params.category);
      vm.fetchProducts();
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.category !== from.params.category) {
      // The category route parameter has changed, update the category name
      this.fetchCategoryName(to.params.category);
    }
    next();
  },
  methods: {
    fetchCategoryName(categoryId) {
      fetch(`${process.env.BASE_URL}php/get_category.php?id=${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.name) {
            this.categoryName = data.name;
          } else {
            console.error("Invalid category name format.");
          }
        })
        .catch((error) => {
          console.error("Error fetching category name:", error);
        });
    },
    fetchProducts() {
      fetch(`${process.env.BASE_URL}php/get_products.php`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            this.products = data.data.map((product) => ({
              ...product,
              quantity: 1,
              dp_qty: 1,
              total: product.price * 1,
            }));
          } else {
            console.error("Invalid data format. Expected an array.");
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    addToBasket(product) {
      if (this.$store.getters.getUserId !== null) {
        // Add the product to the basket
        this.$store.dispatch("addItemToBasket", product);
        product.dp_qty = 1;
        product.total = product.price * 1;
      } else {
        this.$router.push("/login");
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    increaseQuantity(product) {
      product.quantity++;
      product.dp_qty++;
      product.total = (product.price * product.quantity).toFixed(2);
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
        product.dp_qty--;
        product.total = (product.price * product.quantity).toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
.product-grid {
  margin-top: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.product-item {
  padding: 1rem;
  position: relative;
}

.product-image-container {
  position: relative;
  overflow: hidden;
  height: 300px; /* Set the desired fixed height for the images */
}

.product-image-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.product-image {
  height: auto;
  width: 100%;
}

.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 10% 10% 0% 0%;
  z-index: 2;
  color: black;
}

.product-name {
  font-size: 1.2rem;
  margin-top: 0;
}

.product-description {
  margin-top: 0.5rem;
}

.product-price {
  margin-top: 0.5rem;
  font-weight: bold;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 0.5rem;
}

.qty_btn {
  font-weight: bolder;
  font-size: 120%;
}
</style>