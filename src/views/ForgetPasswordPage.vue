<template>
  <v-app
    class="pt-10"
    fill-height
    id="inspire"
    style="background-color: #f2f9ff"
  >
    <v-content>
      <div class="text-center mt-10">
        <h1 style="font-size: 1.6rem">Lupa Kata Sandi</h1>
      </div>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4">
              <v-toolbar dark color="warning">
                <v-toolbar-title>Masukkan alamat email anda</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <Alert v-if="validation" v-bind:title="validation" />
                <v-form>
                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-email"
                    name="email"
                    label="Alamat Email"
                    type="email"
                  ></v-text-field>
                  <p text--secondary>
                    Permintaan ubah kata sandi akan dikirimkan ke email yang
                    anda masukkan. Jika permintaan tidak ada mohon perikas
                    <b>folder spam anda</b>
                  </p>
                  <v-card-actions>
                    <v-btn
                      color="warning"
                      @click="submit"
                      :disabled="!email"
                      block
                    >
                      <v-progress-circular
                        v-if="isLoading"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                      <h4 v-else>Kirim</h4>
                    </v-btn>
                  </v-card-actions>
                </v-form>
                <div class="btn-regist text-center my-5">
                  <router-link class="txt-btn" to="/login"
                    ><h5>Kembali</h5></router-link
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
import axios from "axios";
import Swal from "sweetalert2";
import Alert from "../components/AlertComponent.vue";

export default {
  name: "ForgetPasswordPage",
  components: { Alert },
  data() {
    return {
      email: null,
      isLoading: false,
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      if (!this.email) {
        this.validation = "Email harus diisi!";
        this.isLoading = false;
      }
      axios
        .post(
          `${process.env.VUE_APP_SERVER_URL}forgot-password?to=${this.email}`
        )
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            title: "Berhasil",
            text: "Permintaan ubah kata sandi berhasil dikirim ke email anda!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
          });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.validation = "Email tidak ditemukan!";
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

<style lang="scss" scoped></style>
