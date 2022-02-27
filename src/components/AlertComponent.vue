<template>
  <div>
    <v-alert dense text type="error">{{ title }}</v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  props: ["title"],
};
</script>

<style lang="scss" scoped></style>
