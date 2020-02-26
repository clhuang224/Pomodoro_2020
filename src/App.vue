<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: "Pomodoro",
    titleTemplate: `%s | Lynn`,
    htmlAttrs: {
      lang: "zn-TW",
      amp: true
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        vmid: "description",
        name: "description",
        content: "用番茄鐘做好時間管理！"
      },
      {
        property: "og:title",
        content: "Pomodoro",
        template: chunk => `${chunk} | Lynn`,
        vmid: "og:title"
      },
      {
        property: "og:url",
        content: process.env.BASE_URL,
        vmid: "og:url"
      },
      {
        property: "og:image",
        content: require("./assets/img/play-pink.png"),
        vmid: "og:image"
      },
      {
        property: "og:description",
        content: "用番茄鐘做好時間管理！",
        vmid: "og:description"
      }
    ]
  }
};
</script>
<style lang="scss">
@import "./assets/css/reset.css";
.app {
  display: flex;
  justify-content: center;
  color: #003164;
}
</style>
