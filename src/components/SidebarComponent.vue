<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app color="primary">
      <div class="text-center mt-5">
        <h1 class="text-lg-h8 font-weight-bold" style="color: #fff">
          TK Bintang Pertiwi
        </h1>
        <v-avatar class="my-5" size="80">
          <avatar
            :username="user.full_name"
            style="width: 100%; height: 100%; color: #fff"
          ></avatar>
        </v-avatar>
        <h1 style="color: #caf0f8">{{ user.full_name }}</h1>
        <v-chip class="ma-2" color="yellow" text-color="black">
          {{ user.role }}
        </v-chip>
      </div>
      <v-divider class="mx-10 mt-3" color="#CAF0F8"></v-divider>
      <v-list dense class="mt-5">
        <v-list-item-group
          v-if="role === 'parent'"
          v-model="selectedItem"
          color="dark"
        >
          <v-list-item
            v-for="(item, i) in itemsParent"
            :key="i"
            v-slot="{ active }"
            :to="item.link"
            @click="addToTitle(item.text)"
            link
          >
            <v-list-item-icon class="ml-6">
              <v-icon
                v-text="item.icon"
                :color="active ? '#fff' : '#CAF0F8'"
              ></v-icon>
            </v-list-item-icon>

            <v-list-item-content :to="item.to">
              <v-list-item-title
                v-text="item.text"
                :style="active ? 'color:#fff;' : 'color:#CAF0F8;'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mt-16" v-slot="{ active }">
            <v-list-item-icon class="ml-6">
              <v-icon color="white">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="logout">
              <v-list-item-title :style="active ? 'color:#fff;' : 'color:#fff;'"
                >Logout</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group
          v-if="role === 'admin'"
          v-model="selectedItem"
          color="dark"
        >
          <v-list-item
            v-for="(item, i) in itemsAdmin"
            :key="i"
            v-slot="{ active }"
            :to="item.link"
            @click="addToTitle(item.text)"
            link
          >
            <v-list-item-icon class="ml-6">
              <v-icon
                v-text="item.icon"
                :color="active ? '#fff' : '#CAF0F8'"
              ></v-icon>
            </v-list-item-icon>

            <v-list-item-content :to="item.to">
              <v-list-item-title
                v-text="item.text"
                :style="active ? 'color:#fff;' : 'color:#CAF0F8;'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-6" v-slot="{ active }">
            <v-list-item-icon class="ml-6">
              <v-icon color="white">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="logout">
              <v-list-item-title :style="active ? 'color:#fff;' : 'color:#fff;'"
                >Logout</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group
          v-if="role === 'teacher'"
          v-model="selectedItem"
          color="dark"
        >
          <v-list-item
            v-for="(item, i) in itemsTeacher"
            :key="i"
            v-slot="{ active }"
            :to="item.link"
            @click="addToTitle(item.text)"
            link
          >
            <v-list-item-icon class="ml-6">
              <v-icon
                v-text="item.icon"
                :color="active ? '#fff' : '#CAF0F8'"
              ></v-icon>
            </v-list-item-icon>

            <v-list-item-content :to="item.to">
              <v-list-item-title
                v-text="item.text"
                :style="active ? 'color:#fff;' : 'color:#CAF0F8;'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-16" v-slot="{ active }">
            <v-list-item-icon class="ml-6">
              <v-icon color="white">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="logout">
              <v-list-item-title :style="active ? 'color:#fff;' : 'color:#fff;'"
                >Logout</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      class="mx-8 my-2 hidden-md-and-down"
      app
      color="primary"
      style="border-radius: 30px"
    >
      <div class="navcon">
        <v-icon size="40" dark @click.stop="drawer = !drawer">
          mdi-dots-horizontal-circle-outline
        </v-icon>
      </div>
      <h1 class="main-title white--text mx-4">{{ this.mainTitle }}</h1>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-app-bar class="hidden-md-and-up" app color="primary">
      <div class="navcon">
        <v-btn x-large icon color="white" @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <h1 class="main-title white--text mx-4">{{ this.mainTitle }}</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
  </nav>
</template>

<script>
import axios from "axios";
import Avatar from "vue-avatar";

export default {
  name: "SidebarComponent",
  components: {
    Avatar,
  },
  data: () => ({
    drawer: null,
    mainTitle: "Dashboard",
    selectedItem: 0,
    itemsAdmin: [
      { icon: "mdi-finance", text: "Dashboard", link: "/" },
      { icon: "mdi-calendar-outline", text: "Learning Report", link: "report" },
      { icon: "mdi-tab", text: "Kelola Website", link: "/cms" },
      {
        icon: "mdi-account-outline",
        text: "Kelola Pengguna",
        link: "/manage-account",
      },
    ],
    itemsTeacher: [
      { icon: "mdi-finance", text: "Dashboard", link: "/" },
      { icon: "mdi-calendar-outline", text: "Learning Report", link: "report" },
    ],
    itemsParent: [
      { icon: "mdi-finance", text: "Dashboard", link: "/" },
      { icon: "mdi-calendar-outline", text: "Learning Report", link: "report" },
    ],
    is_verify: null,
    role: null,
    user: null,
  }),
  created() {
    this.role = localStorage.getItem("role");

    axios
      .get(`${process.env.VUE_APP_SERVER_URL}me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        this.user = response.data[0];
      });
  },
  methods: {
    addToTitle(paramText) {
      this.mainTitle = paramText;
    },
    verifyChecker() {
      this.is_verify = localStorage.getItem("is_verify");
    },
    logout() {
      window.location.href = "/login";
      localStorage.clear();
    },
  },
};
</script>

<style>
.image {
  border: 2px solid #2ebfaf;
}
.navcon {
  display: none;
}
.main-title {
  font-size: 2rem;
}
@media only screen and (max-width: 600px) {
  .navcon {
    display: block;
  }
  .main-title {
    font-size: 1rem;
  }
}
</style>
