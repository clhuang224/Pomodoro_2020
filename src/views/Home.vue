<template>
  <div
    class="home"
    :class="{ break: todoTaskList.length > 0 && list[0].working === false }"
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
      <div v-if="todoTaskList.length > 0">
        <div class="currentTask">
          <div class="listCircle"></div>
          <div class="container">
            <h2>{{ todoTaskList[0].title | titleFormat(14) }}</h2>
            <div class="tomato">
              <div
                class="circle"
                v-for="i in todoTaskList[0].tomatoAmount"
                :key="i"
              ></div>
            </div>
          </div>
        </div>
        <div class="time">{{ todoTaskList[0].time | timeFormat }}</div>
        <ul class="todolist">
          <li
            class="todolist-li"
            v-for="(item, index, key) in todoTaskList"
            :key="key"
          >
            <div v-if="0 < index && index <= 3" class="todolist-li-div">
              <div class="listCircle"></div>
              <p>{{ item.title | titleFormat(20) }}</p>
              <button class="button" @click="insertTask(item.id)"></button>
            </div>
          </li>
        </ul>
        <div class="container">
          <router-link
            class="more"
            to="/todolist"
            v-if="todoTaskList.length > 3"
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
          <div class="finish" @click="doneTask(list[0].id)"></div>
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
      taskInput: ""
    };
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
    todoTaskList() {
      let result = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].done === false) {
          result.push(this.list.slice(i, i + 1)[0]);
        }
      }
      return result;
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
    /**
     * 新增 task。
     * 詳情要看 /src/store/index.js action 中的 updateList
     */
    addTask: function() {
      // 產生 UID
      let d = Date.now();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now(); //use high-precision timer if available
      }
      let id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
      if (this.taskInput.trim() !== "") {
        this.$store.dispatch("updateList", {
          type: "addTask",
          task: {
            id: id,
            title: this.taskInput,
            createdTime: new Date(),
            tomatoAmount: 0,
            working: true,
            time: 25 * 60,
            done: false,
            doneTime: null
          }
        });
        this.taskInput = "";
      }
    },
    doneTask: function(id) {
      if (this.playing && this.todoTaskList[0].id === id) {
        this.pause();
      }
      this.$store.dispatch("updateList", {
        type: "doneTask",
        id: id
      });
    },
    /**
     * 將指定 task 移到最前面並開始計時。
     */
    insertTask: function(id) {
      this.pause();
      this.$store.dispatch("updateList", {
        type: "insertTask",
        id: id
      });
      this.play();
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
      if (value) {
        if (value.length > len) {
          return value.slice(0, len) + "...";
        }
      }
      return value;
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
