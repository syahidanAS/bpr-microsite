<template>
  <v-app class="" fill-height id="inspire" style="background-color: #f2f9ff">
    <v-content>
      <div class="text-center mt-10">
        <h1 style="font-size: 1.6rem">Registrasi Akun SSO Bintang Pertiwi</h1>
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
                    v-model="full_name"
                    prepend-icon="mdi-account"
                    name="full_name"
                    label="Nama Lengkap"
                    type="text"
                  ></v-text-field>
                  <v-select
                    v-model="select"
                    :hint="`${select.state}`"
                    :items="items"
                    prepend-icon="mdi-account-supervisor"
                    item-text="state"
                    item-value="abbr"
                    label="Mendaftar Sebagai"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-email"
                    name="email"
                    label="Alamat Email"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    prepend-icon="mdi-key"
                    label="Kata Sandi"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show3 = !show3"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirm_password"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    prepend-icon="mdi-key-plus"
                    label="Masukkan kembali kata sandi"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="show3 = !show3"
                  ></v-text-field>
                  <v-text-field
                    v-model="phone"
                    id="phone"
                    prepend-icon="mdi-whatsapp"
                    prefix="+62"
                    name="phone"
                    label="Nomor Whatsapp"
                    type="number"
                  ></v-text-field>
                  <v-textarea
                    v-model="address"
                    name="input-7-1"
                    prepend-icon="mdi-map-marker"
                    label="Alamat Lengkap"
                  ></v-textarea>
                  <v-checkbox
                    class="ml-2 my-checkbox"
                    v-model="checkbox"
                    label="Saya menyetujui penggunaan data pribadi pada TK Bintang Pertiwi, dan saya adalah orang tua siswa atau guru"
                  ></v-checkbox>
                  <Alert v-if="validation" v-bind:title="validation" />
                  <v-card-actions>
                    <v-btn
                      color="primary"
                      @click="register"
                      :disabled="
                        !checkbox ||
                        !full_name ||
                        !password ||
                        !confirm_password ||
                        !email ||
                        !address ||
                        !phone
                      "
                      block
                    >
                      <v-progress-circular
                        v-if="isLoading"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                      <h4 v-else>Daftar</h4>
                    </v-btn>
                  </v-card-actions>
                </v-form>
                <div class="btn-regist text-center my-5">
                  <router-link class="txt-btn" to="/login"
                    ><h5>Sudah memiliki akun, MASUK?</h5></router-link
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
  name: "RegistrationPage",
  components: {
    Alert,
  },
  data() {
    return {
      checkbox: false,
      full_name: null,
      email: null,
      password: null,
      phone: null,
      address: null,
      confirm_password: null,

      validation: null,
      isLoading: false,
      select: { state: "Orang Tua", abbr: "parent" },
      items: [
        { state: "Orang Tua", abbr: "parent" },
        { state: "Guru", abbr: "teacher" },
      ],
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Minimal 8 karakter",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    register() {
      this.isLoading = true;
      let payload = {
        full_name: this.full_name,
        email: this.email,
        role: this.select.abbr,
        password: this.password,
        is_verified: "false",
        phone: "+62" + this.phone,
        address: this.address,
      };

      if (payload.full_name === null) {
        this.isLoading = false;
        this.validation = "Nama lengkap harus diisi!";
      } else if (payload.email === null) {
        this.isLoading = false;
        this.validation = "Email harus diisi";
      } else if (payload.role === null) {
        this.isLoading = false;
        this.validation = "Siapa anda?";
      } else if (payload.password === null) {
        this.isLoading = false;
        this.validation = "Password harus diisi!";
      } else if (payload.phone === null) {
        this.isLoading = false;
        this.validation = "Nomor whatsapp harus diisi!";
      } else if (payload.address === null) {
        this.isLoading = false;
        this.validation = "Alamat harus diisi!";
      } else if (this.password !== this.confirm_password) {
        this.isLoading = false;
        this.validation = "Kata sandi tidak cocok!";
      } else {
        axios
          .post(`${process.env.VUE_APP_SERVER_URL}register`, payload)
          .then(() => {
            this.isLoading = false;
            window.location.href = "/login";
          })
          .catch((error) => {
            if (error.response.status == 409) {
              this.validation = "Email telah digunakan!";
              this.isLoading = false;
            } else {
              this.validation = "Terjadi Kesalahan!";
              this.isLoading = false;
            }
            this.isLoading = false;
          });
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
::v-deep .my-checkbox .v-label {
  font-size: 15px;
  text-align: justify;
  margin-left: 5px;
  margin-right: 5px;
}

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
