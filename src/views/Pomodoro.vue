<template>
  <div class="pomodoro">
    <router-view />
    <header class="header">
      <ul class="menu">
        <li class="menu-li">
          <router-link class="button todolist" tag="button" to="/todolist"></router-link>
        </li>
        <li class="menu-li">
          <router-link class="button analytics" tag="button" to="/analytics"></router-link>
        </li>
        <li class="menu-li">
          <router-link class="button ringtones" tag="button" to="/ringtones"></router-link>
        </li>
        <li class="menu-li">
          <router-link class="button close" tag="button" :to="{name: 'Home'}">╳</router-link>
        </li>
      </ul>
      <h1 class="title">POMODORO</h1>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Pomodoro',
};
</script>

<style lang="scss">
.pomodoro {
  display: flex;
  width: 1280px;
  justify-content: center;
  overflow: hidden;
}
/******** header ********/

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  width: 14.0625%;
  height: 800px;
  background-color: #003164;
  .menu {
    width: 36px;
    margin-right: 85px;
    .menu-li {
      margin-top: 48px;
      .button {
        width: 36px;
        height: 36px;
        background-size: 36px 36px;
        background-color: transparent;
        color: #fff;
        font-size: 36px;
        font-weight: bold;
      }
      .todolist {
        background-image: url("../assets/img/todolist-white.png");
      }
      .analytics {
        background-image: url("../assets/img/analytics-white.png");
      }
      .ringtones {
        background-image: url("../assets/img/ringtones-white.png");
      }
      .close.router-link-exact-active {
        display: none;
      }
    }
  }
  .title {
    font-size: 24px;
    line-height: 36px;
    font-weight: bold;
    color: #fff;
    transform-origin: 100% 0;
    transform: rotate(90deg) translateX(121px);
    padding: 85px 48px 0px 0px;
    width: 165px;
  }
}
</style>
