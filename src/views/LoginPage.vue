<template>
  <v-app
    class="pt-10"
    fill-height
    id="inspire"
    style="background-color: #f2f9ff"
  >
    <v-content>
      <div class="text-center mt-10">
        <h1 style="font-size: 1.6rem">SSO Bintang Pertiwi School</h1>
        <p>
          Hanya orang tua dan Guru Bintang Pertiwi School yang dapat menggunakan
          layanan ini
        </p>
      </div>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Masuk</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <Alert v-if="validation" v-bind:title="validation" />
                <v-form @submit.prevent="submit">
                  <v-text-field
                    v-model="user.email"
                    prepend-icon="mdi-email"
                    name="email"
                    label="Alamat Email"
                    type="email"
					@keyup.enter="login"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="password"
                    prepend-icon="mdi-key"
                    label="Kata Sandi"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show3 = !show3"
					@keyup.enter="login"
                  ></v-text-field>
                  <router-link
                    class="ml-8"
                    to="/forgot-password"
                    style="text-decoration: none"
                    >Lupa Kata Sandi</router-link
                  >
                  <v-card-actions>
                    <v-btn
                      color="primary"
                      @click="login"
                      :disabled="!user.email || !user.password"
                      block
                    >
                      <v-progress-circular
                        v-if="isLoading"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                      <h4 v-else>Masuk</h4>
                    </v-btn>
                  </v-card-actions>
                </v-form>
                <div class="btn-regist text-center my-5">
                  <router-link class="txt-btn" to="/registration"
                    ><h5>DAFTAR</h5></router-link
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Alert from "../components/AlertComponent.vue";
import axios from "axios";

export default {
  name: "LoginPage",
  components: {
    Alert,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      validation: null,
      isLoading: false,
      show3: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Minimal 8 karakter",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      axios
        .post(`${process.env.VUE_APP_SERVER_URL}login`, this.user)
        .then((response) => {
          localStorage.setItem("access_token", response.data.user.token);
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem("uid", response.data.user.uid);
          localStorage.setItem("is_verified", response.data.user.is_verified);
          this.isLoading = false;
          window.location.href = "/";
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.validation = "Akun tidak ditemukan!";
            this.isLoading = false;
          } else if (error.response.status == 400) {
            this.validation = "Format email tidak valid!";
            this.isLoading = false;
          } else {
            this.validation = "Terjadi Kesalahan!";
            this.isLoading = false;
          }
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.btn-regist {
  background-color: rgb(5, 219, 5);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 5px;
}
.btn-regist .txt-btn {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}

.btn-regist:hover {
  background-color: rgb(59, 248, 59);
}
</style>
