<template>
  <v-app
    id="inspire"
    :style="{
      backgroundImage: `url(${require('../assets/bg-program.svg')})`,
    }"
  >
    <v-container class="px-6">
      <v-select
        v-model="select"
        :items="items"
        item-text="state"
        item-value="abbr"
        label="Filter Kelas"
        return-object
        single-line
        @change="filterByClass"
      ></v-select>
      <LearningReportDialog v-if="role == 'admin' || role == 'teacher'" />
      <v-card class="my-5 py-4 hidden-md-and-down">
        <v-card-title>
          Laporan Belajar Siswa Kelas
          <v-chip class="ma-2" color="primary">
            {{ select.state }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-progress-circular
          v-if="isLoading"
          class="my-5 hidden-sm-and-down"
          :size="30"
          :width="7"
          color="purple"
          indeterminate
          style="margin-left: 40%; margin-right: 40%"
        ></v-progress-circular>
        <v-data-table
          class="hidden-sm-and-down"
          v-else
          :headers="headers"
          :items="docs"
          :search="search"
        >
          <template v-slot:item="doc">
            <tr>
              <td>{{ doc.item.full_name }}</td>
              <td>{{ doc.item.title }}</td>
              <td>{{ doc.item.class }}</td>
              <td>{{ doc.item.created_at | moment }}</td>
              <td>{{ doc.item.created_at | moment_time }}</td>
              <!-- <td>{{ doc.item.description }}</td> -->
              <td>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      :href="doc.item.filename_url"
                      target="_blank"
                    >
                      <v-icon dark>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>Lihat</span>
                </v-tooltip>
              </td>
              <td v-if="role == 'admin' || role == 'teacher'">
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      color="warning"
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        getPayload(
                          doc.item.id,
                          doc.item.title,
                          doc.item.description,
                          doc.item.class,
                          doc.item.full_name,
                          doc.item.filename_url
                        )
                      "
                    >
                      <v-icon>mdi-pen</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark>Ubah Data</v-toolbar>
                      <v-card-text>
                        <div class="">
                          <v-form
                            class="my-4"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                          >
                            <v-text-field
                              v-model="updatePayload.title"
                              :counter="10"
                              :rules="nameRules"
                              label="Judul Laporan"
                              required
                            ></v-text-field>

                            <label for="standard-select">Kelas</label>
                            <div class="select">
                              <select
                                v-model="updatePayload.class"
                                id="standard-select"
                              >
                                <option :value="updatePayload.class">
                                  {{ updatePayload.class }}
                                </option>
                                <option
                                  v-for="item in items"
                                  :key="item.index"
                                  :value="item.abbr"
                                >
                                  {{ item.state }}
                                </option>
                              </select>
                            </div>

                            <v-textarea
                              v-model="updatePayload.description"
                              name="input-7-1"
                              label="Deskripsi (opsional)"
                              hint="Deskripsi bersifat opsional"
                              required
                            ></v-textarea>

                            <v-file-input
                              type="file"
                              label="Dokumen Laporan"
                              @change="handleFileUpload($event)"
                              required
                            ></v-file-input>
                            <v-btn
                              x-small
                              color="secondary"
                              :href="updatePayload.filename"
                              target="_blank"
                            >
                              <v-icon x-small class="mr-2">
                                mdi-eye-outline
                              </v-icon>
                              <span>Lihat Dokumen</span>
                            </v-btn>
                            <h3 v-if="isLoading" block>
                              {{ progressUpload }}%
                            </h3>
                            <v-progress-linear
                              v-if="isLoading"
                              color="light-green darken-4"
                              height="10"
                              :value="progressUpload"
                              striped
                            ></v-progress-linear>

                            <v-btn
                              color="success"
                              class="my-5 mr-4"
                              @click="submit"
                              block
                            >
                              Ubah Data
                            </v-btn>
                          </v-form>
                        </div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn color="danger" text @click="dialog.value = false"
                          >Tutup</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="red"
                      @click="deleteReport(doc.item.id, doc.item.filename)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark>mdi-eraser</v-icon>
                    </v-btn>
                  </template>
                  <span>Hapus</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>

        <!-- BATAS TABLE -->
      </v-card>

      <v-progress-circular
        v-if="isLoading"
        class="hidden-sm-and-down"
        :size="30"
        :width="7"
        color="purple"
        indeterminate
        style="margin-left: 40%; margin-right: 40%"
      ></v-progress-circular>

      <v-card
        v-else
        v-for="item in docs"
        :key="item.id"
        class="my-4 hidden-md-and-up block"
      >
        <v-card-title>
          <p class="text-h6 text--primary">{{ item.title }}</p>
          <v-spacer></v-spacer>
          <v-menu offset-y v-if="role == 'admin' || role == 'teacher'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mb-4" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <div @click="deleteReport(item.id, item.filename)">Hapus</div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        getPayload(
                          item.id,
                          item.title,
                          item.description,
                          item.class,
                          item.full_name,
                          item.filename_url
                        )
                      "
                    >
                      Ubah
                    </div>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark>Ubah Data</v-toolbar>
                      <v-card-text>
                        <div class="">
                          <v-form
                            class="my-4"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                          >
                            <v-text-field
                              v-model="updatePayload.title"
                              :counter="10"
                              :rules="nameRules"
                              label="Judul Laporan"
                              required
                            ></v-text-field>

                            <label for="standard-select">Kelas</label>
                            <div class="select">
                              <select
                                v-model="updatePayload.class"
                                id="standard-select"
                              >
                                <option :value="updatePayload.class">
                                  {{ updatePayload.class }}
                                </option>
                                <option
                                  v-for="item in items"
                                  :key="item.index"
                                  :value="item.abbr"
                                >
                                  {{ item.state }}
                                </option>
                              </select>
                            </div>

                            <v-textarea
                              v-model="updatePayload.description"
                              name="input-7-1"
                              label="Deskripsi"
                              hint="Deskripsi bersifat opsional"
                              required
                            ></v-textarea>

                            <v-file-input
                              type="file"
                              label="Dokumen Laporan"
                              @change="handleFileUpload($event)"
                              required
                            ></v-file-input>
                            <v-btn
                              x-small
                              color="secondary"
                              :href="updatePayload.filename"
                              target="_blank"
                            >
                              <v-icon x-small class="mr-2">
                                mdi-eye-outline
                              </v-icon>
                              <span>Lihat Dokumen</span>
                            </v-btn>
                            <h3 v-if="isLoading" block>
                              {{ progressUpload }}%
                            </h3>
                            <v-progress-linear
                              v-if="isLoading"
                              color="light-green darken-4"
                              height="10"
                              :value="progressUpload"
                              striped
                            ></v-progress-linear>

                            <v-btn
                              color="success"
                              class="my-5 mr-4"
                              @click="submit"
                              block
                            >
                              Ubah Data
                            </v-btn>
                          </v-form>
                        </div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn color="danger" text @click="dialog.value = false"
                          >Tutup</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text>
          <p>
            <span class="">Guru: {{ item.full_name }}</span>
            <br />
            Kelas: {{ item.class }}
            <br />
            Tanggal: {{ item.created_at | moment }}
            <br />
            Jam: {{ item.created_at | moment_time }}
          </p>
          <v-btn color="primary" :href="item.filename_url" target="_blank">
            <v-icon class="mr-2">mdi-download</v-icon>
            Unduh Dokumen
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import LearningReportDialog from "@/components/LearningReportDialog.vue";

export default {
  name: "ReportPage",
  components: {
    LearningReportDialog,
  },
  data() {
    return {
      search: "",
      role: null,
      headers: [
        { text: "Nama Guru", value: "full_name" },
        {
          text: "Nama Dokumen",
          align: "start",
          value: "title",
        },
        { text: "Kelas", value: "class" },
        { text: "Tanggal Posting", value: "created_at" },
        { text: "Jam Posting", value: "created_at" },
        { text: "Dokumen", value: "filename_url" },
        { text: "Actions", value: "actions" },
      ],
      docs: [],
      select: { state: "Semua Kelas", abbr: "all" },
      items: [
        { state: "Toodler", abbr: "toodler" },

        { state: "Playgroup", abbr: "playgroup" },
        { state: "TK-A", abbr: "tk-a" },
        { state: "TK-B", abbr: "tk-b" },
      ],

      filterClass: null,
      isLoading: false,
      title: null,
      description: null,
      file: "",
      progressUpload: null,

      updatePayload: [
        {
          id: null,
          title: null,
          description: null,
          class: null,
          full_name: null,
          filename: null,
        },
      ],
    };
  },
  mounted() {
    this.roleChecker();
    this.getReports();
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
    getPayload(id, title, description, classID, full_name, filename) {
      this.updatePayload.id = id;
      this.updatePayload.title = title;
      this.updatePayload.description = description;
      this.updatePayload.class = classID;
      this.updatePayload.full_name = full_name;
      this.updatePayload.filename = filename;
    },
    roleChecker() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.role = response.data[0].role;
        });
    },
    getReports() {
      this.isLoading = true;
      if (localStorage.getItem("role") === "teacher") {
        axios
          .get(
            `${
              process.env.VUE_APP_SERVER_URL
            }reports-by-uid?uid=${localStorage.getItem("uid")}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then((response) => {
            this.isLoading = false;
            this.docs = response.data.data;
          })
          .catch(() => {
            this.isLoading = false;
            alert("Terjadi kesalahan!");
          });
      } else {
        axios
          .get(`${process.env.VUE_APP_SERVER_URL}learning-reports`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            this.isLoading = false;
            this.docs = response.data;
          })
          .catch(() => {
            this.isLoading = false;
            alert("Terjadi kesalahan!");
          });
      }
    },
    filterByClass() {
      if (localStorage.getItem("role") === "teacher") {
        let condition = null;
        if (this.select.abbr === "all") {
          condition = `${
            process.env.VUE_APP_SERVER_URL
          }reports-by-uid?uid=${localStorage.getItem("uid")}`;
        } else {
          condition = `${
            process.env.VUE_APP_SERVER_URL
          }reports-by-uidclass?class=${
            this.select.abbr
          }&uid=${localStorage.getItem("uid")}`;
        }
        this.isLoading = true;
        axios
          .get(condition, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            if (!response.data.data) {
              this.isLoading = false;
              Swal.fire("Data tidak ditemukan!");

              this.getReports();
            } else {
              this.isLoading = false;
              this.docs = response.data.data;
            }
          })
          .catch(() => {
            this.isLoading = false;
            Swal.fire("Terjadi Kesalahan!");
          });
      } else {
        let condition = null;
        if (this.select.abbr === "all") {
          condition = `${process.env.VUE_APP_SERVER_URL}learning-reports`;
        } else {
          condition = `${process.env.VUE_APP_SERVER_URL}reports-by-class?class=${this.select.abbr}`;
        }
        this.isLoading = true;
        axios
          .get(condition, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            if (!response.data.data) {
              this.isLoading = false;
              Swal.fire("Data tidak ditemukan!");

              this.getReports();
            } else {
              this.isLoading = false;
              this.docs = response.data.data;
            }
          })
          .catch(() => {
            this.isLoading = false;
            Swal.fire("Terjadi Kesalahan!");
          });
      }
    },
    handleFileUpload() {
      this.file = event.target.files[0];
    },

    submit() {
      let formData = new FormData();
      formData.append("title", this.updatePayload.title);
      formData.append("class", this.updatePayload.class);
      formData.append("description", this.updatePayload.description);
      formData.append("document", this.file);
      console.log(formData);

      if (this.file.size > 10000 * 10000) {
        Swal.fire({
          icon: "error",
          title: "Yah :(",
          text: "Ukuran file tidak boleh  lebih dari 10 MB!",
        });

        this.isLoading = false;
      } else {
        this.isLoading = true;
        axios
          .post(
            `${process.env.VUE_APP_SERVER_URL}update-report?id=${this.updatePayload.id}`,
            formData,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              onUploadProgress: (progressEvent) => {
                let progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                this.progressUpload = progress;
              },
            }
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah dokumen!",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              window.location.href = "/report";
            });
            this.isLoading = false;
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Yah :(",
              text: "Nampaknya gagal mengunggah dokumen, silahkan coba lagi",
            });
            this.isLoading = false;
          });
      }
    },

    deleteReport(id, filename) {
      Swal.fire({
        title: "Anda yakin ingin menghapus dokumen ini?",
        text: "Dokumen tidak dapat dikembalikan jika telah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `${process.env.VUE_APP_SERVER_URL}delete-report?id=${id}&filename=${filename}`,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
            .then(() => {
              Swal.fire("Berhasil!", "Data dihapus", "success");
              this.getReports();
            })
            .catch(() => {
              this.isLoading = false;
              Swal.fire("Gagal menghapus data");
              this.getReports();
            });
        }
      });
    },
  },
};
</script>

<style scoped>
select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 2px 5px 2px 2px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
