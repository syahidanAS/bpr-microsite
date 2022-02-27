<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        class="mx-5 my-5"
        color="primary"
        v-bind="attrs"
        v-on="on"
        fixed
        right
        bottom
      >
        <v-icon class="mx-2" right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Upload Learning Report</v-toolbar>
        <v-card-text>
          <div class="">
            <v-form class="my-4" ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="title"
                :counter="10"
                :rules="nameRules"
                label="Judul"
                required
              ></v-text-field>

              <v-select
                v-model="select"
                :hint="`${select.state}`"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Kelas"
                persistent-hint
                return-object
                single-line
                required
              ></v-select>

              <v-textarea
                v-model="description"
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

              <h3 v-if="isLoading" block>{{ progressUpload }}%</h3>
              <v-progress-linear
                v-if="isLoading"
                color="light-green darken-4"
                height="10"
                :value="progressUpload"
                striped
              ></v-progress-linear>

              <v-btn
                v-else
                :disabled="!valid"
                color="success"
                class="my-5 mr-4"
                @click="submit"
                block
              >
                Submit
              </v-btn>
            </v-form>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="danger" text @click="dialog.value = false">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "LearningReportComponent",
  data() {
    return {
      select: { state: "Toodler", abbr: "toodler" },
      items: [
        { state: "Toodler", abbr: "toodler" },
        { state: "Playgroup", abbr: "playgroup" },
        { state: "TK A", abbr: "tk-a" },
        { state: "TK B", abbr: "tk-b" },
      ],
      title: null,
      description: null,
      file: "",
      progressUpload: null,
      isLoading: false,
      dialog: false,
    };
  },
  methods: {
    handleFileUpload() {
      this.file = event.target.files[0];
    },
    submit() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("class", this.select.abbr);
      formData.append("description", this.description);
      formData.append("document", this.file);
      formData.append("uid", localStorage.getItem("uid"));
      formData.append("title", this.file);

      if (this.file.size > 10000 * 10000) {
        Swal.fire({
          icon: "error",
          title: "Yah :(",
          text: "Ukuran file tidak boleh  lebih dari 10 MB!",
        });

        this.isLoading = false;
      } else if (!this.file) {
        Swal.fire({
          icon: "error",
          title: "Yah :(",
          text: "Anda belum memilih file dokumen laporan",
        });

        this.isLoading = false;
      } else {
        axios
          .post(
            `${process.env.VUE_APP_SERVER_URL}upload-learning-report`,
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
              title: "Berhasil mengunggah dokumen!",
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
  },
};
</script>

<style></style>
