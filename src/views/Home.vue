<template>
  <div
    class="home"
    :class="{ break: list.length > 0 && list[0].working === false }"
  >
    <div class="content">
      <form class="addTask">
        <input
          class="addInput"
          type="text"
          placeholder="ADD A NEW TASK..."
          v-model="taskInput"
        />
        <button class="addButton" @click="addTask()">＋</button>
      </form>
      <div v-if="list.length > 0">
        <div class="currentTask">
          <div class="listCircle"></div>
          <div class="container">
            <h2>{{ list[0].title }}</h2>
            <div class="tomato">
              <div
                class="circle"
                v-for="i in list[0].tomatoAmount"
                :key="i"
              ></div>
            </div>
          </div>
        </div>
        <div class="time">{{ list[0].time | timeFormat }}</div>
        <ul class="todolist">
          <li class="todolist-li" v-for="(item, index, key) in list" :key="key">
            <div v-if="0 < index && index <= 3" class="todolist-li-div">
              <div class="listCircle"></div>
              <p>{{ item.title }}</p>
              <button class="button"></button>
            </div>
          </li>
        </ul>
        <div class="container">
          <router-link class="more" to="/todolist" v-if="list.length > 3"
            >MORE</router-link
          >
        </div>
      </div>
      <div class="empty" v-else>to-do list is empty</div>
    </div>
    <div class="play" :class="{ playing: playing === true }">
      <div class="sector">
        <div class="circle">
          <button class="playButton" @click="playingToggle()"></button>
          <div class="finish" @click="removeTask()"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      taskInput: "",
      timerID: null
    };
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
    playing() {
      return this.$store.state.playing;
    }
  },
  methods: {
    /**
     * 新增 task。
     * 詳情要看 /src/store/index.js action 中的 updateList
     */
    addTask: function() {
      if (this.taskInput.trim() !== "") {
        this.$store.dispatch("updateList", {
          type: "addTask",
          task: {
            title: this.taskInput,
            createTime: new Date(),
            tomatoAmount: 0,
            working: true,
            time: 25 * 60
          }
        });
        this.taskInput = "";
      }
    },
    /**
     * 移除當下的 task。
     * 1. list[0] 會被移除
     * 2. 番茄鐘停止
     * 詳情要看 /src/store/index.js action 中的 updateList
     */
    removeTask: function() {
      this.$store.dispatch("updateList", {
        type: "removeTask"
      });
    },
    /**
     * 切換計時開關。
     * 1. .play 會切換 .playing ，切換 play/pause 圖示
     * 2. playing 的話， list[0] 的 time 會減少
     * 3. 如果工作滿 25 分鐘，播開始休息鈴聲， tomato++
     * 4. 如果休息滿 5 分鐘，播開始工作鈴聲
     */
    playingToggle: function() {
      // 暫停計時
      if (this.playing === true) {
        this.$store.dispatch("updatePlaying", false);
        clearInterval(this.timerID);
        this.timerID = null;
        // 開始計時
      } else {
        if (this.list.length > 0) {
          // playing = true
          this.$store.dispatch("updatePlaying", true);
          let that = this;
          this.timerID = setInterval(() => {
            if (that.list[0].time > 0) {
              this.$store.dispatch("updateList", {
                type: "decreaseTime"
              });
            } else {
              if (this.list[0].working === true) {
                this.$store.dispatch("updateList", {
                  type: "startBreak"
                });
                let audio = new Audio(
                  require(`./../assets/music/${this.$store.state.breakRing}.mp3`)
                );
                audio.play().catch(e => {
                  console.log(e);
                });
              } else {
                this.$store.dispatch("updateList", {
                  type: "startWork"
                });
                let audio = new Audio(
                  require(`./../assets/music/${this.$store.state.workRing}.mp3`)
                );
                audio.play().catch(e => {
                  console.log(e);
                });
              }
            }
          }, 1000);
          // 沒有 task 的時候要結束計時
        } else {
          if (this.timerID !== null) {
            clearInterval(this.timerID);
            this.timerID = null;
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
    }
  }
};
</script>

<style lang="scss" scoped>
$working: #ff4384;
$break: #00a7ff;
$setting: #003164;
.home {
  display: flex;
  justify-content: center;
  width: 86.9375%;
  background-color: #ffedf7;
  background-image: linear-gradient(
    to right,
    #ffedf7 75.4545%,
    $setting 24.5455%
  );
}
.home .content {
  width: 50.9091%;
  height: 800px;
  padding-left: 80px;
  .addTask {
    display: flex;
    justify-content: flex-start;
    margin-left: 5px;
    .addInput {
      width: 405px;
      height: 56px;
      color: $working;
      font-size: 16px;
      font-weight: bold;
      font-style: italic;
      background-color: #fff;
      margin: 48px 0px 0px 0px;
      padding-left: 16px;
      outline: none;
      &::placeholder {
        color: $working;
      }
      &:focus::placeholder {
        color: transparent;
      }
    }
    .addButton {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 48px;
      color: $working;
      font-size: 16px;
      width: 40px;
      height: 56px;
      background-color: #fff;
    }
  }
  .currentTask {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 145px 0px 0px 5px;
    height: 48px;
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    h2 {
      font-size: 24px;
      line-height: 28px;
      font-weight: bold;
      color: #003164;
      margin-left: 16px;
    }
    .listCircle {
      width: 44px;
      height: 44px;
      border: #003164 2px solid;
      border-radius: 50%;
    }
    .tomato {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      height: 16px;
      margin-left: 16px;
    }
    .tomato .circle {
      width: 12px;
      height: 12px;
      border: $working 1px solid;
      border-radius: 50%;
      background-color: $working;
      margin-right: 8px;
    }
  }
  .empty {
    height: 540px;
    width: 445px;
    margin-top: 26px;
    font-size: 36px;
    color: $working;
    line-height: 540px;
    text-align: center;
  }
  .time {
    width: 454px;
    padding: 15px 0px;
    font-size: 176px;
    font-weight: bold;
    color: $working;
  }
  .todolist {
    margin: 98px 0px 0px 5px;
    width: 445px;
    .todolist-li-div {
      display: flex;
      justify-content: space-between;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 49, 100, 0.2);
      margin-top: 9px;
      .listCircle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: #003164 solid 2px;
      }
      p {
        display: block;
        width: 389px;
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
      }
      .button {
        width: 24px;
        height: 24px;
        background-color: transparent;
        background-image: url("./../assets/img/play-outline.png");
        background-size: 24px 24px;
      }
    }
  }
  .container {
    margin-top: 9px;
    width: 445px;
    display: flex;
    justify-content: flex-end;
    .more {
      color: $working;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
.home .play {
  min-width: 540px;
  height: 540px;
  border: $working 4px solid;
  border-radius: 50%;
  margin-top: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  .sector {
    display: flex;
    justify-content: center;
    align-items: center;
    .circle {
      min-width: 502px;
      height: 502px;
      border: $working 4px solid;
      border-radius: 50%;
      background-color: $working;
      position: relative;
    }
  }
  &.playing .sector .circle {
    background-color: #fff;
  }
  .playButton {
    position: absolute;
    width: 96px;
    height: 96px;
    left: 203px;
    top: 203px;
    background-size: 96px 96px;
    background-color: transparent;
    background-image: url("./../assets/img/play-white.png");
  }
  &.playing .playButton {
    background-image: url("./../assets/img/pause-pink.png");
  }
  .finish {
    background-color: #fff;
    position: absolute;
    width: 24px;
    height: 24px;
    border: $working 5px solid;
    left: 299px;
    top: 275px;
    cursor: pointer;
    &:active {
      background-color: $working;
      border-color: #fff;
      border-width: 4px;
    }
  }
  &.playing .finish {
    background-color: $working;
    border-color: #fff;
  }
}
.home.break .content {
  .addTask .addInput {
    color: $break;
  }
  .addTask .addInput::placeholder {
    color: $break;
  }
  .addTask .addInput::placeholder {
    color: $break;
  }
  .addTask .addButton {
    color: $break;
  }
}
.home.break {
  .content .currentTask .tomato .circle {
    border-color: $break;
    background-color: $break;
  }
  .content .time {
    color: $break;
  }
  .content .container .more {
    color: $break;
  }
  .play {
    border-color: $break;
  }
  .play .sector .circle {
    border-color: $break;
    background-color: $break;
  }
  .play.playing .sector .circle {
    background-color: #fff;
  }

  .play .playButton {
    background-image: url("./../assets/img/play-white.png");
  }

  .play.playing .playButton {
    background-image: url("./../assets/img/pause-blue.png");
  }

  .play .finish {
    border-color: $break;
  }

  .play .finish:active,
  .play.playing .finish {
    background-color: $break;
    border-color: #fff;
  }
}
</style>
