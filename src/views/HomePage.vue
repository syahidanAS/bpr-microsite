<template>
  <v-app
    id="inspire"
    :style="{
      backgroundImage: `url(${require('../assets/bg-program.svg')})`,
    }"
  >
    <v-container v-if="role.role === 'admin'" class="pb-10">
      <template>
        <v-container class="white lighten-5" :style="heroImage">
          <v-row no-gutters>
            <v-col class="my-2" cols="12" sm="4">
              <v-card class="my-2 mx-2" color="#385F73" dark>
                <v-card-title class="text-h5">
                  {{ totalTeacher }}
                </v-card-title>

                <v-card-subtitle>Total Guru Terdaftar</v-card-subtitle>

                <v-card-actions>
                  <v-btn x-small rounded color="white" light>
                    Lihat semua
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="my-2" cols="12" sm="4">
              <v-card class="my-2 mx-2" color="#385F73" dark>
                <v-card-title class="text-h5"> {{ totalParent }} </v-card-title>

                <v-card-subtitle>Total Orang Tua Terdaftar</v-card-subtitle>

                <v-card-actions>
                  <v-btn x-small rounded color="white" light>
                    Lihat semua
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="my-2" cols="12" sm="4">
              <v-card class="my-2 mx-2" color="#385F73" dark>
                <v-card-title class="text-h5"> {{ totalLR }} </v-card-title>

                <v-card-subtitle>Total Learning Report Dibuat</v-card-subtitle>

                <v-card-actions>
                  <v-btn x-small rounded color="white" light>
                    Lihat semua
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <template>
            <v-card max-width="450" class="mx-2">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Pendaftar Belum Verifikasi</v-toolbar-title>

                <v-spacer></v-spacer>
              </v-toolbar>

              <v-list
                class="v-list"
                three-line
                style="overflow: scroll; height: 300px"
              >
                <template v-for="item in items">
                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                    v-text="item.header"
                  ></v-subheader>
                  <v-list-item v-else :key="item.title">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.full_name }}
                        <v-chip
                          x-small
                          v-if="item.role === 'parent'"
                          class="ma-2"
                          color="primary"
                          text-color="white"
                        >
                          {{ item.role }}
                        </v-chip>
                        <v-chip
                          x-small
                          v-if="item.role === 'teacher'"
                          class="ma-2"
                          color="warning"
                          text-color="white"
                        >
                          {{ item.role }}
                        </v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-btn
                          x-small
                          outlined
                          class="btn mx-2"
                          color="secondary"
                          @click="
                            userDetail(
                              item.full_name,
                              item.email,
                              item.role,
                              item.address,
                              item.phone
                            )
                          "
                          depressed
                        >
                          Lihat Detail
                        </v-btn>
                        <v-btn
                          x-small
                          outlined
                          class="btn"
                          @click="verify(item.full_name, item.uid)"
                          color="success"
                          depressed
                        >
                          Verifikasi
                        </v-btn>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </template></v-container
        ></template
      ></v-container
    >

    <v-container v-else class="px-10">
      <template>
        <v-card class="mx-auto" color="orange" dark>
          <v-card-title>
            <span class="text-h6 font-weight-light"
              >Halo, <b>{{ role.full_name }}</b></span
            >
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            "Selamat datang, apa yang akan anda lakukan hari ini?"
          </v-card-text>
        </v-card>

        <v-card class="mt-5" color="blue" dark max-width="800">
          <v-card-text class="text-h5 font-weight-bold">
            <b
              >Aplikasi web satu pintu untuk mengakses Laporan Pembelajaran
              Siswa TK Bintang Pertiwi</b
            >
          </v-card-text>
        </v-card>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  data() {
    return {
      items: [],
      totalTeacher: 0,
      totalParent: null,
      totalLR: null,
      role: null,
    };
  },
  name: "HomePage",
  components: {},
  created() {
    this.unverifiedUser();
    this.countTeacher();
    this.countParent();
    this.countLR();
    this.roleChecker();
  },
  filters: {
    moment: function (date) {
      return moment(date).lang("id").format("dddd, D MMMM YYYY");
    },
    moment_time: function (date) {
      return moment(date).format("HH:mm a");
    },
  },
  methods: {
    roleChecker() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.role = response.data[0];
        });
    },
    countTeacher() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}users-role?role=teacher`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.totalTeacher = Object.keys(response.data.users).length;
        });
    },
    countParent() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}users-role?role=parent`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data.users == null) {
            this.totalParent = 0;
          } else {
            this.totalParent = Object.keys(response.data).length;
          }
        });
    },
    countLR() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}learning-reports`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (!response.data) {
            this.totalLR = 0;
          } else {
            this.totalLR = Object.keys(response.data).length;
          }
        });
    },

    userDetail(full_name, email, role, address, phone) {
      Swal.fire({
        title: full_name,
        text: `Sebagai: ${role} || Email: ${email} || No HP: ${phone} || Alamat: ${address}`,
      });
    },

    unverifiedUser() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}status?is_verified=false`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.items = response.data;
        });
    },

    verify(full_name, uid) {
      Swal.fire({
        title: `Apakah anda yakin ingin verifikasi ${full_name}?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#808080",
        confirmButtonText: "Ya",
        cancelButtonText: "Batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `${process.env.VUE_APP_SERVER_URL}verification`,
              {
                is_verified: "true",
                id: uid,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: `${full_name} berhasil diverifikasi!`,
                showConfirmButton: false,
                timer: 1500,
              });
              this.unverifiedUser();
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan!",
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.btn {
  text-transform: none;
  font-family: sans-serif !important;
}
</style>
