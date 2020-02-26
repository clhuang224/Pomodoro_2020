<template>
  <div
    class="dashboard"
    :class="{ break: list.length > 0 && list[0].working === false }"
  >
    <div class="left">
      <ul class="menu">
        <li>
          <router-link tag="button" to="/todolist" class="todolist">
            <div class="sign"></div>
            <div class="text">TO-DO LIST</div>
          </router-link>
        </li>
        <li>
          <router-link tag="button" to="/analytics" class="analytics">
            <div class="sign"></div>
            <div class="text">ANALYTICS</div>
          </router-link>
        </li>
        <li>
          <router-link tag="button" to="/ringtones" class="ringtones">
            <div class="sign"></div>
            <div class="text">RINGTONES</div>
          </router-link>
        </li>
      </ul>
      <div class="bottom" v-if="list.length > 0">
        <div class="halfCircle"></div>
        <div class="play" :class="{ playing: playing === true }">
          <div class="sector">
            <button class="playButton" @click="playingToggle()"></button>
          </div>
        </div>
        <div class="information">
          <div class="time">{{ list[0].time | timeFormat }}</div>
          <div class="currentMission">
            {{ list[0].title | titleFormat(15) }}
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  computed: {
    type() {
      return this.$route.name.toLowerCase();
    },
    list() {
      return this.$store.state.list;
    },
    playing() {
      return this.$store.state.playing;
    },
    workRing() {
      return this.$store.state.workRing;
    },
    breakRing() {
      return this.$store.state.breakRing;
    },
    timerId() {
      return this.$store.state.timerId;
    }
  },
  methods: {
    isActive: function(type) {
      if (type === this.type) {
        return { active: true };
      }
    },
    /**
     * 開始計時。
     * 1. playing = true
     * 2. list[0] 的 time 會減少
     * 3. 如果工作滿 25 分鐘，播開始休息鈴聲， tomato++
     * 4. 如果休息滿 5 分鐘，播開始工作鈴聲
     */
    play: function() {
      this.$store.dispatch("updatePlaying", true);
      let that = this;
      let id = setInterval(() => {
        if (that.list[0].time > 0) {
          this.$store.dispatch("updateList", {
            type: "decreaseTime"
          });
        } else {
          if (this.list[0].working === true) {
            this.$store.dispatch("updateList", {
              type: "startBreak"
            });
            if (this.breakRing !== "none") {
              let audio = new Audio(
                require(`./../assets/music/${this.breakRing}.mp3`)
              );
              audio.play();
            }
          } else {
            this.$store.dispatch("updateList", {
              type: "startWork"
            });
            if (this.workRing !== "none") {
              let audio = new Audio(
                require(`./../assets/music/${this.workRing}.mp3`)
              );
              audio.play();
            }
          }
        }
      }, 1000);
      this.$store.dispatch("updateTimerID", id);
    },
    /**
     * 暫停計時。
     */
    pause: function() {
      this.$store.dispatch("updatePlaying", false);
      if (this.timerId !== null) {
        clearInterval(this.timerId);
        this.$store.dispatch("updateTimerID", null);
      }
    },
    /**
     * 開關計時。
     */
    playingToggle: function() {
      // 暫停計時
      if (this.playing === true) {
        this.pause();
        // 開始計時
      } else {
        if (this.list.length > 0) {
          this.play();
          // 沒有 task 的時候要結束計時
        } else {
          if (this.timerId !== null) {
            this.pause();
          }
        }
      }
    }
  },
  filters: {
    timeFormat: value => {
      let result =
        Math.floor(value / 60)
          .toString()
          .padStart(2, "0") +
        ":" +
        (value % 60).toString().padStart(2, "0");
      return result;
    },
    titleFormat: (value, len) => {
      if (value.length > len) {
        return value.slice(0, len) + "...";
      } else {
        return value;
      }
    }
  }
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

.left .menu .todolist.router-link-exact-active .sign {
  background-image: url("../assets/img/todolist-pink.png");
}

.left .menu .analytics .sign {
  background-image: url("../assets/img/analytics-dark.png");
}

.left .menu .analytics.router-link-exact-active .sign {
  background-image: url("../assets/img/analytics-pink.png");
}

.left .menu .ringtones .sign {
  background-image: url("../assets/img/ringtones-dark.png");
}

.left .menu .ringtones.router-link-exact-active .sign {
  background-image: url("../assets/img/ringtones-pink.png");
}

.left .menu button .text {
  width: 198px;
  height: 42px;
  color: #335a83;
  margin-left: 8px;
}

.left .menu button.router-link-exact-active .text {
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

.left .bottom .play.playing .playButton {
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

.dashboard.break .left .menu .todolist.router-link-exact-active .sign {
  background-image: url("../assets/img/todolist-blue.png");
}
.dashboard.break .left .menu .analytics.router-link-exact-active .sign {
  background-image: url("../assets/img/analytics-blue.png");
}
.dashboard.break .left .menu .ringtones.router-link-exact-active .sign {
  background-image: url("../assets/img/ringtones-blue.png");
}

.dashboard.break .left .menu button.router-link-exact-active .text {
  color: #00a7ff;
}

.dashboard.break .left .bottom .play .sector {
  border-color: #00a7ff;
}

.dashboard.break .left .bottom .play.playing .sector .circle {
  background-color: #fff;
}

.dashboard.break .left .bottom .play .playButton {
  background-image: url("../assets/img/play-blue.png");
}

.dashboard.break .left .bottom .play.playing .playButton {
  background-image: url("./../assets/img/pause-blue.png");
}

.dashboard.break .left .bottom .play.playing .playButton {
  background-image: url("../assets/img/pause-white.png"),
    radial-gradient(#00a7ff 50%, transparent 50%);
}

.dashboard.break .left .bottom .information .time {
  color: #00a7ff;
}

.dashboard.break .analytics .focus .amount .number {
  color: #00a7ff;
}
</style>
