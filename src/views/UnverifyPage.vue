<template>
  <div class="hero-image">
    <div class="hero-text">
      <h1 style="font-size: 50px">Ups...</h1>
      <p>Tampaknya akun anda belum diverifikasi oleh admin kami</p>
      <a
        class="button-contact"
        :href="
          'whatsapp://send?phone=+6285780714686&text=Halo admin, saya ingin verifikasi akun atas nama ' +
          name +
          ', sebagai ' +
          role
        "
        >Hubungi Admin</a
      >
      <button class="button-logout mx-2" @click="logout">Keluar</button>
      <a class="button-contact mx-2" :href="'/'">Muat Ulang</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UnverifyPage",
  data() {
    return {
      name: null,
      role: null,
    };
  },
  mounted() {
    this.getMe();
  },
  methods: {
    logout() {
      window.location.href = "/login";
      localStorage.clear();
    },
    getMe() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.name = response.data[0].full_name;
          if (response.data[0].role == "teacher") {
            this.role = "guru";
          } else if (response.data[0].role == "parent") {
            this.role = "orang tua";
          }
        });
    },
  },
};
</script>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.507), rgba(0, 0, 0, 0.63)),
    url("/denied.svg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.hero-text .button-contact {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  text-decoration: none;
  background-color: #2168db;
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
}

.hero-text .button-contact:hover {
  background-color: #0a3f94;
  color: #fff;
}

.hero-text .button-logout {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  background-color: #db2121;
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
}

.hero-text .button-logout:hover {
  background-color: #6b0505;
  color: #fff;
}
</style>
