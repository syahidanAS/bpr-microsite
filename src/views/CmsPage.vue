<template>
  <v-app
    id="inspire"
    :style="{
      backgroundImage: `url(${require('../assets/bg-program.svg')})`,
    }"
  >
    <v-container>
      <!-- KELOLA FOTO SAMPUL -->
      <template>
        <v-card class="my-4" color="#fafafa" light>
          <v-card-title class="text-h5"> Kelola Foto Sampul </v-card-title>
          <v-card-subtitle>
            <p>Maksimal berisi 5 foto</p>
            <v-row no-gutters style="width: 100%">
              <v-col cols="12" sm="6">
                <v-card class="pa-2" outlined tile>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-file-input
                      show-size
                      counter
                      hint="Ukurun foto maksimal 3 MB"
                      @change="handleFileHero($event)"
                      label="Pilih Foto"
                    ></v-file-input>
                    <v-btn color="warning" @click="uploadHero" block>
                      Unggah
                    </v-btn>
                    <h3 v-if="isLoading" block>{{ progressUpload }}%</h3>
                    <v-progress-linear
                      v-if="isLoading"
                      color="light-green darken-4"
                      height="10"
                      :value="progressUpload"
                      striped
                    ></v-progress-linear>
                  </v-form>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" style="height: 400px; overflow: scroll">
                <v-card
                  v-for="hero in heros"
                  :key="hero.id"
                  class="mx-auto my-4"
                  max-width="400"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="hero.path"
                  >
                    <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                  </v-img>

                  <v-card-subtitle class="pb-0">
                    Diunggah pada: {{ hero.created_at | moment }}
                    <br />
                    Diunggah jam: {{ hero.created_at | moment_time }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="error"
                      @click="deleteHero(hero.id, hero.title)"
                    >
                      Hapus
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </template>
      <!-- KELOLA GALERI FOTO -->
      <template>
        <v-card color="white" light>
          <v-card-title class="text-h5"> Kelola Galeri Foto </v-card-title>
          <v-card-subtitle>
            <v-row no-gutters style="width: 100%">
              <v-col cols="12" sm="6">
                <v-card class="pa-2" outlined tile>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-file-input
                      show-size
                      counter
                      hint="Ukuran foto maksimal 3 MB"
                      @change="handleFileGallery($event)"
                      label="Pilih Foto"
                    ></v-file-input>
                    <v-btn color="warning" @click="uploadGallery" block>
                      Unggah
                    </v-btn>
                    <h3 v-if="isLoading" block>{{ progressUpload }}%</h3>
                    <v-progress-linear
                      v-if="isLoading"
                      color="light-green darken-4"
                      height="10"
                      :value="progressUpload"
                      striped
                    ></v-progress-linear>
                  </v-form>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" style="height: 400px; overflow: scroll">
                <v-card
                  v-for="gallery in galleries"
                  :key="gallery.id"
                  class="mx-auto my-4"
                  max-width="400"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="gallery.path"
                  >
                    <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                  </v-img>

                  <v-card-subtitle class="pb-0">
                    Diunggah pada: {{ gallery.created_at | moment }}
                    <br />
                    Diunggah jam: {{ gallery.created_at | moment_time }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="error"
                      @click="deleteGallery(gallery.id, gallery.title)"
                    >
                      Hapus
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </template>

      <!-- KELOLA OUR TEACHERS -->
      <template>
        <v-card class="my-4" color="#fafafa" light>
          <v-card-title class="text-h5"> Kelola Guru-Guru Kami </v-card-title>
          <v-card-subtitle>
            <v-row no-gutters style="width: 100%">
              <v-col cols="12" sm="6">
                <v-card class="pa-2" outlined tile>
                  <Alert v-if="validation" v-bind:title="validation" />
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="teacherPayload.name"
                      prepend-icon="mdi-account"
                      label="Nama"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="teacherPayload.major"
                      prepend-icon="mdi-book"
                      label="Jurusan"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="teacherPayload.campus"
                      prepend-icon="mdi-school"
                      label="Nama Kampus"
                      required
                    ></v-text-field>

                    <v-file-input
                      prepend-icon="mdi-image"
                      show-size
                      counter
                      multiple
                      hint="Ukuran foto maksimal 3 MB"
                      @change="handleFileTeacher($event)"
                      label="Foto Guru"
                    ></v-file-input>

                    <h3 v-if="isLoading" block>{{ progressUpload }}%</h3>
                    <v-progress-linear
                      v-if="isLoading"
                      color="light-green darken-4"
                      height="10"
                      :value="progressUpload"
                      striped
                    ></v-progress-linear>
                    <v-btn v-else color="warning" @click="uploadTeacher" block>
                      Simpan
                    </v-btn>
                  </v-form>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" style="height: 400px; overflow: scroll">
                <v-card
                  v-for="teacher in teachers"
                  :key="teacher.id"
                  class="mx-auto my-4"
                  max-width="400"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="teacher.image_url"
                  >
                    <v-card-title>{{ teacher.name }}</v-card-title>
                  </v-img>

                  <v-card-subtitle class="pb-0">
                    Diunggah pada: {{ teacher.created_at | moment }}
                    <br />
                    Jurusan: {{ teacher.major }}
                    <br />
                    Kampus: {{ teacher.campus }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="error"
                      @click="deleteTeacher(teacher.id, teacher.image_filename)"
                    >
                      Hapus
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Alert from "../components/AlertComponent.vue";

export default {
  name: "CmsPage",
  data() {
    return {
      validation: null,
      heros: null,
      galleries: null,
      teachers: null,
      fileHero: "",
      fileGallery: "",
      isLoading: false,
      progressUpload: null,
      teacherPayload: {
        name: null,
        major: null,
        campus: null,
        image: null,
      },
    };
  },
  components: {
    Alert,
  },
  created() {
    this.getHeros();
    this.getGalleries();
    this.getTeachers();
  },
  methods: {
    handleFileHero() {
      this.fileHero = event.target.files[0];
    },
    uploadHero() {
      let formData = new FormData();
      formData.append("image", this.fileHero);

      if (this.fileHero.size > 3000000) {
        Swal.fire({
          icon: "error",
          title: "Yah :(",
          text: "Ukuran file tidak boleh  lebih dari 3 MB!",
        });

        this.isLoading = false;
      } else {
        this.isLoading = true;
        axios
          .post(`${process.env.VUE_APP_SERVER_URL}upload-hero`, formData, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            onUploadProgress: (progressEvent) => {
              let progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.progressUpload = progress;
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil upload foto!",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              this.getHeros();
            });
            this.isLoading = false;
            this.getHeros();
          })
          .catch((error) => {
            if (error.response.message === "Gambar tidak boleh lebih dari 5") {
              Swal.fire({
                icon: "error",
                title: "Gagal Mengunggah",
                text: "Gambar tidak boleh lebih dari 5!",
              });
              this.getHeros();
            } else {
              Swal.fire({
                icon: "error",
                title: "Yah :(",
                text: "Nampaknya gagal mengunggah foto, silahkan coba lagi",
              });
              this.getHeros();
            }

            this.isLoading = false;
            this.getHeros();
          });
      }
    },
    getHeros() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}hero-images`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.heros = response.data;
        });
    },
    deleteHero(id, title) {
      Swal.fire({
        title: "Anda yakin ingin menghapus Foto ini?",
        text: "Foto tidak dapat dikembalikan jika telah dihapus!",
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
              `${process.env.VUE_APP_SERVER_URL}delete-image?id=${id}&title=${title}`,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
            .then(() => {
              Swal.fire("Berhasil!", "Foto dihapus", "success");
              this.getHeros();
            })
            .catch(() => {
              this.isLoading = false;
              Swal.fire("Gagal menghapus foto");
              this.getHeros();
            });
        }
      });
    },
    getGalleries() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}gallery-images`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.galleries = response.data;
        });
    },
    handleFileGallery() {
      this.fileGallery = event.target.files[0];
    },
    uploadGallery() {
      let formData = new FormData();
      formData.append("image", this.fileGallery);

      if (this.fileGallery.size > 3000000) {
        Swal.fire({
          icon: "error",
          title: "Yah :(",
          text: "Ukuran file tidak boleh  lebih dari 3 MB!",
        });

        this.isLoading = false;
      } else {
        this.isLoading = true;
        axios
          .post(`${process.env.VUE_APP_SERVER_URL}upload-gallery`, formData, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            onUploadProgress: (progressEvent) => {
              let progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.progressUpload = progress;
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil upload foto!",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              this.getGalleries();
            });
            this.isLoading = false;
            this.getGalleries();
          })
          .catch((error) => {
            if (error.response.message === "Gambar tidak boleh lebih dari 5") {
              Swal.fire({
                icon: "error",
                title: "Gagal Mengunggah",
                text: "Gambar tidak boleh lebih dari 5!",
              });
              this.getHeros();
            } else {
              Swal.fire({
                icon: "error",
                title: "Yah :(",
                text: "Nampaknya gagal mengunggah foto, silahkan coba lagi",
              });
              this.getHeros();
            }

            this.isLoading = false;
            this.getGalleries();
          });
      }
    },
    deleteGallery(id, title) {
      Swal.fire({
        title: "Anda yakin ingin menghapus Foto ini?",
        text: "Foto tidak dapat dikembalikan jika telah dihapus!",
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
              `${process.env.VUE_APP_SERVER_URL}delete-image?id=${id}&title=${title}`,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
            .then(() => {
              Swal.fire("Berhasil!", "Foto dihapus", "success");
              this.getGalleries();
            })
            .catch(() => {
              this.isLoading = false;
              Swal.fire("Gagal menghapus foto");
              this.getGalleries();
            });
        }
      });
    },
    getTeachers() {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}teachers`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.teachers = response.data;
        });
    },
    handleFileTeacher() {
      this.teacherPayload.image = event.target.files[0];
    },
    uploadTeacher() {
      if (!this.teacherPayload.name) {
        this.validation = "Nama harus diisi!";
      } else if (!this.teacherPayload.major) {
        this.validation = "Jurusan harus diisi!";
      } else if (!this.teacherPayload.campus) {
        this.validation = "Nama kampus harus diisi!";
      } else if (!this.teacherPayload.image) {
        this.validation = "Gambar tidak boleh kosong!";
      } else {
        let formData = new FormData();
        formData.append("name", this.teacherPayload.name);
        formData.append("major", this.teacherPayload.major);
        formData.append("campus", this.teacherPayload.campus);
        formData.append("image", this.teacherPayload.image);

        if (this.teacherPayload.image.size > 3000000) {
          this.validation = "Ukuran gambar tidak boleh melebihi 3 MB!";
          this.isLoading = false;
        } else {
          this.isLoading = true;
          axios
            .post(`${process.env.VUE_APP_SERVER_URL}add-teacher`, formData, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              onUploadProgress: (progressEvent) => {
                let progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                this.progressUpload = progress;
              },
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil mengubah dokumen!",
                showConfirmButton: false,
                timer: 1500,
              }).then(function () {
                this.getTeachers();
              });
              this.isLoading = false;
              this.getTeachers();
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Yah :(",
                text: "Nampaknya gagal mengunggah dokumen, silahkan coba lagi",
              });
              this.isLoading = false;
              this.getTeachers();
            });
          this.getTeachers();
        }
      }
    },
    deleteTeacher(id, image_filename) {
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
              `${process.env.VUE_APP_SERVER_URL}delete-teacher?id=${id}&image_filename=${image_filename}`,
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
              this.getTeachers();
            })
            .catch(() => {
              this.isLoading = false;
              Swal.fire("Gagal menghapus data");
              this.getTeachers();
            });
        }
      });
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).lang("id").format("dddd, D MMMM YYYY");
    },
    moment_time: function (date) {
      return moment(date).format("HH:mm a");
    },
  },
};
</script>

<style lang="scss" scoped></style>
