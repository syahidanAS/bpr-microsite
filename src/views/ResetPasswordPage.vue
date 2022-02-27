<template>
  <v-app
    class="pt-10"
    fill-height
    id="inspire"
    style="background-color: #f2f9ff"
  >
    <v-content>
      <div class="text-center mt-10">
        <h1 style="font-size: 1.6rem">Ubah Kata Sandi</h1>
      </div>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4">
              <v-toolbar dark color="warning">
                <v-toolbar-title
                  >Silahkan masukkan kata sandi baru anda</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <Alert v-if="validation" v-bind:title="validation" />
                <v-form>
                  <v-text-field
                    v-model="payload.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    prepend-icon="mdi-key"
                    label="Kata Sandi"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="confPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="password"
                    prepend-icon="mdi-key-plus"
                    label="Masukkan kembali kata sandi"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show2 = !show1"
                  ></v-text-field>
                  <p text--secondary>
                    Pastikan kata sandi mudah untuk anda ingat dan aman!
                  </p>
                  <v-card-actions>
                    <v-btn
                      color="warning"
                      @click="submit"
                      :disabled="!payload.password || !confPassword"
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
import Alert from "../components/AlertComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ResetPasswordPage",
  components: { Alert },
  data() {
    return {
      confPassword: null,
      show1: false,
      show2: false,
      validation: false,
      isLoading: false,
      payload: {
        token: this.$route.query.email,
        password: null,
      },
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.isLoading = true;
      if (!this.payload.password || !this.confPassword) {
        this.validation = "Password harus diisi!";
        this.isLoading = false;
      } else if (this.payload.password != this.confPassword) {
        this.validation = "Password tidak sesuai!";
        this.isLoading = false;
      } else {
        axios
          .post(
            `${process.env.VUE_APP_SERVER_URL}change-password`,
            this.payload
          )
          .then(() => {
            this.isLoading = false;
            Swal.fire({
              title: "Berhasil",
              text: "Kata sandi berhasil diubah!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/login";
              }
            });
          })
          .catch(() => {
            this.validation = "Terjadi Kesalahan!";
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
