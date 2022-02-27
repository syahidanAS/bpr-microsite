<template>
  <v-app>
    <Sidebar v-if="condition && is_verified === 'true'" />
    <div v-else></div>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../src/components/SidebarComponent.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    Sidebar,
  },
  data() {
    return {
      condition: false,
      is_verified: null,
    };
  },
  mounted() {
    this.loginChecker();
  },
  methods: {
    loginChecker() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.condition = true;
          this.is_verified = response.data[0].is_verified;
        })
        .catch(() => {
          this.condition = false;
          this.is_verified = "false";
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}

#app {
  font-family: "Montserrat", sans-serif;
}
.swal-title {
  font-family: "Montserrat", sans-serif;
}
.swal-text {
  font-family: "Montserrat", sans-serif;
}
</style>
