<template>
  <div class="dashboard">
    <div class="left">
      <ul class="menu">
        <li>
          <button class="todolist">
            <div class="sign"></div>
            <div class="text">TO-DO LIST</div>
          </button>
        </li>
        <li>
          <button class="analytics">
            <div class="sign"></div>
            <div class="text">ANALYTICS</div>
          </button>
        </li>
        <li>
          <button class="ringtones">
            <div class="sign"></div>
            <div class="text">RINGTONES</div>
          </button>
        </li>
      </ul>
      <div class="bottom">
        <div class="halfCircle"></div>
        <div class="play">
          <div class="sector">
            <button class="playButton"></button>
          </div>
        </div>
        <div class="information">
          <div class="time"></div>
          <div class="currentMission"></div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "LeftMenu"
};
</script>
<style lang="scss" scoped>
$working: #ff4384;
$break: #00a7ff;
$setting: #003164;
.dashboard {
  display: flex;
  justify-content: center;
  width: 86.9375%;
  background-color: $setting;
}

.left {
  width: 435px;
  height: 800px;
}

.left .menu {
  margin-top: 3px;
  margin-left: 85px;
}

.left .menu li {
  margin-top: 42px;
  height: 42px;
}

.left .menu button {
  display: flex;
  justify-content: flex-start;
  padding: 0;
  height: 42px;
  font-size: 36px;
  line-height: 42px;
  background: 0;
}

.left .menu .sign {
  display: block;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;
  background-color: transparent;
}

.left .menu .todolist .sign {
  background-image: url("../assets/img/todolist-dark.png");
}

.left .menu .todolist.active .sign {
  background-image: url("../assets/img/todolist-pink.png");
}

.left .menu .analytics .sign {
  background-image: url("../assets/img/analytics-dark.png");
}

.left .menu .analytics.active .sign {
  background-image: url("../assets/img/analytics-pink.png");
}

.left .menu .ringtones .sign {
  background-image: url("../assets/img/ringtones-dark.png");
}

.left .menu .ringtones.active .sign {
  background-image: url("../assets/img/ringtones-pink.png");
}

.left .menu button .text {
  width: 198px;
  height: 42px;
  color: #335a83;
  margin-left: 8px;
}

.left .menu button.active .text {
  color: $working;
}

.left .bottom {
  margin-top: 318px;
  margin-left: 85px;
  position: relative;
  height: 291px;
  width: 100%;
}

.left .bottom .play {
  position: absolute;
  width: 116px;
  height: 116px;
  border-radius: 50%;
  background-color: #003164;
  top: 0;
  left: 117px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left .bottom .play .sector {
  width: 104px;
  height: 104px;
  background-color: transparent;
  border: $working 2px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left .bottom .play .playButton,
.left .bottom .play .pauseButton {
  width: 90px;
  height: 90px;
  background-size: 90px 90px;
  background-color: transparent;
}

.left .bottom .play .playButton {
  background-image: url("../assets/img/play-pink.png");
}

.left .bottom .play .pauseButton {
  display: none;
  background-image: url("../assets/img/pause-white.png"),
    radial-gradient($working 50%, transparent 50%);
}

.left .bottom .halfCircle {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background-color: #ffedf7;
  top: 58px;
}

.left .bottom .information {
  position: absolute;
  top: 116px;
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-content: center;
}

.left .bottom .information .time {
  margin-top: 4px;
  font-size: 64px;
  font-weight: bold;
  color: $working;
  text-align: center;
}

.left .bottom .information .currentMission {
  font-weight: bold;
  font-size: 16px;
  overflow: hidden;
  width: 350px;
  height: 19px;
  margin-top: 5px;
  padding: 0px 5px;
  text-align: center;
}
</style>
