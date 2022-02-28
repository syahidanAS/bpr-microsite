<template>
  <v-app
    id="inspire"
    :style="{
      backgroundImage: `url(${require('../assets/bg-program.svg')})`,
    }"
  >
    <div class="px-2 pb-10" style="bakground-color: #f5f5f5">
      <v-card class="px-10 hidden-md-and-down">
        <v-card-title>
          Master Data Pengguna
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="users.slice().reverse()"
          :search="search"
        >
          <template v-slot:item="user">
            <tr>
              <td>{{ user.item.full_name }}</td>
              <!-- <td>{{ user.item.email }}</td>
            <td>{{ user.item.address }}</td> -->
              <td>{{ user.item.phone }}</td>
              <td v-if="user.item.role === 'teacher'">Guru</td>
              <td v-else-if="user.item.role === 'parent'">Orang Tua</td>
              <td v-else>Admin</td>

              <td
                v-if="user.item.is_verified === 'true'"
                class="justify-center"
              >
                <v-badge content="Diverifikasi" color="green" overlap>
                </v-badge>
              </td>
              <td cla v-else class="justify-center">
                <v-badge content="Belum Diverifikasi" color="red" overlap>
                </v-badge>
              </td>
              <td>
                <v-col class="d-flex justify-start">
                  <v-btn
                    v-if="
                      user.item.role === 'teacher' ||
                      user.item.role === 'parent'
                    "
                    class="mr-2 mt-2"
                    small
                    color="success"
                    @click="asAdmin(user.item.id, user.item.full_name)"
                  >
                    Jadikan Admin
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    fab
                    small
                    color="error"
                    @click="deleteUser(user.item.id, user.item.full_name)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    v-if="user.item.is_verified === 'true'"
                    fab
                    small
                    color="warning"
                    @click="verif(user.item.id, 'false')"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn class="mr-2" v-else fab small color="warning" disabled>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>

                  <v-btn
                    v-if="user.item.is_verified === 'false'"
                    fab
                    small
                    color="success"
                    @click="verif(user.item.id, 'true')"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn v-else fab small color="success" disabled>
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-col>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>

      <!-- BATAS CARD -->
      <template class="mb-10">
        <v-text-field
          v-model="username"
          class="mx-4 hidden-md-and-up"
          prepend-icon="mdi-account-search"
          label="Cari nama pengguna"
          @input="searchUser()"
        ></v-text-field>

        <v-progress-circular
          v-if="isLoading"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          style="margin-left: 40%; margin-right: 50%; margin-top: 50%"
        ></v-progress-circular>

        <v-card
          v-else
          v-for="item in users.slice().reverse()"
          :key="item.id"
          class="mx-auto my-2 hidden-md-and-up"
          max-width="500"
        >
          <v-card-text>
            <p class="text-h6 text--primary">
              {{ item.full_name }}
              <v-chip
                v-if="item.is_verified === 'true'"
                x-small
                class="ma-2"
                color="green"
                text-color="white"
              >
                Diverifikasi
              </v-chip>
              <v-chip
                v-else
                x-small
                class="ma-2"
                color="red"
                text-color="white"
              >
                Belum Diverifikasi
              </v-chip>
              <br />
              <span>
                <v-chip
                  v-if="item.role === 'admin'"
                  x-small
                  class=""
                  color="primary"
                  label
                >
                  <v-icon x-small left> mdi-account-circle-outline </v-icon>
                  Admin
                </v-chip>
                <v-chip
                  v-else-if="item.role === 'teacher'"
                  x-small
                  class=""
                  color="success"
                  label
                >
                  <v-icon x-small left> mdi-account-circle-outline </v-icon>
                  Guru
                </v-chip>
                <v-chip v-else x-small class="" color="warning" label>
                  <v-icon x-small left> mdi-account-circle-outline </v-icon>
                  Orang Tua
                </v-chip>
              </span>
            </p>
            <div class="text--primary">
              <v-btn
                v-if="
                  item.role === 'teacher' || item.role === 'parent'
                "
                class="mr-2"
                small
                color="success"
                @click="asAdmin(item.id, item.full_name)"
              >
                Jadikan Admin
              </v-btn>
              <v-btn
                class="mr-2"
                fab
                small
                color="red"
                @click="deleteUser(item.id, item.full_name)"
              >
                <v-icon color="white">mdi-delete-outline</v-icon>
              </v-btn>
              <v-btn
                class="mr-2"
                v-if="item.is_verified === 'true'"
                fab
                small
                color="warning"
                @click="verif(item.id, 'false')"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn class="mr-2" v-else fab small color="warning" disabled>
                <v-icon>mdi-close</v-icon>
              </v-btn>

              <v-btn
                v-if="item.is_verified === 'false'"
                fab
                small
                color="success"
                @click="verif(item.id, 'true')"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn v-else fab small color="success" disabled>
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ManageAccountPage",
  components: {},
  data() {
    return {
      search: "",
      username: null,
      headers: [
        {
          text: "Full Name",
          align: "start",
          sortable: false,
          value: "full_name",
        },
        { text: "No. HP", value: "phone" },
        { text: "Role", value: "role" },
        { text: "Status verifikasi", value: "is_verified" },
        { text: "Aksi", value: "actions" },
      ],
      users: [],
      isLoading: false,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    deleteUser(id, full_name) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: `Ingin menghapus pengguna dengan nama ${full_name}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Tidak",
        confirmButtonText: "Ya",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${process.env.VUE_APP_SERVER_URL}delete-user?id=${id}`, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            })
            .then(() => {
              Swal.fire(
                "Dihapus!",
                `${full_name} berhasil dihapus!`,
                "success"
              );
              this.getUsers();
            })
            .catch(() => {
              alert("Terjadi kesalahan!");
              this.getUsers();
            });
        }
      });
    },
    searchUser() {
      this.isLoading = true;
      axios
        .get(
          `${process.env.VUE_APP_SERVER_URL}search-user?name=${this.username}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((response) => {
          this.isLoading = false;
          this.users = response.data.data;
        })
        .catch(() => {
          this.isLoading = false;
          alert("Terjadi kesalahan!");
        });
    },
    getUsers() {
      this.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}users`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.isLoading = false;
          this.users = response.data;
        })
        .catch(() => {
          this.isLoading = false;
          alert("Terjadi kesalahan!");
        });
    },
    verif(id, is_verified) {
      let payload = {
        id: id,
        is_verified: is_verified,
      };
      axios
        .post(`${process.env.VUE_APP_SERVER_URL}verification`, payload, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(() => {
          this.isLoading = false;
          this.getUsers();
        })
        .catch(() => {
          this.isLoading = false;
          alert("Terjadi kesalahan!");
        });
    },

    asAdmin(id, full_name) {
      Swal.fire({
        title: `Apakah anda yakin ingin menjadikan ${full_name} sebagai admin?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `${process.env.VUE_APP_SERVER_URL}as-admin`,
              { id: id, role: "admin" },

              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
            .then(() => {
              Swal.fire(
                "Berhasil!",
                `${full_name} kini menjadi admin!`,
                "success"
              );
              this.getUsers();
            })
            .catch(() => {
              Swal.fire("Yah :(", "Terjadi kesalahan!", "failed");
              this.getUsers();
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
