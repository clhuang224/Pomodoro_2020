<template>
  <div class="todolist">
    <form class="addTask">
      <input
        class="addInput"
        type="text"
        placeholder="ADD A NEW TASK..."
        v-model="taskInput"
      />
      <button class="addButton" @click="addTask()">＋</button>
    </form>
    <button class="dropdownButton" @click="todoTaskListOn = !todoTaskListOn">
      <span class="title">TO-DO</span><span class="sign"></span>
    </button>
    <ul class="dropdownList" v-if="todoTaskListOn === true">
      <li
        class="li"
        v-for="(item, index, key) in todoTaskList"
        :key="key"
        :class="{ active: item.done === true }"
      >
        <input
          class="checkbox"
          type="checkbox"
          name="todoTask"
          :id="item.id"
          @click="doneTask(item.id)"
        />
        <label class="label" :for="item.id">{{
          item.title | titleFormat(20)
        }}</label>
        <button class="button" @click="insertTask(item.id)"></button>
      </li>
    </ul>
    <button class="dropdownButton" @click="doneTaskListOn = !doneTaskListOn">
      <span class="title">DONE</span><span class="sign"></span>
    </button>
    <ul class="dropdownList" v-if="doneTaskListOn === false">
      <li
        class="li"
        v-for="(item, index, key) in doneTaskList"
        :key="key"
        :class="{ active: item.done === true }"
      >
        <input
          class="checkbox"
          type="checkbox"
          name="todoTask"
          :id="item.id"
          @click="undoneTask(item.id)"
        />
        <label class="label" :for="item.id">{{
          item.title | titleFormat(20)
        }}</label>
        <div class="tomato">
          <div class="circle" v-for="i in item.tomatoAmount" :key="i"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Todolist",
  data: function() {
    return {
      taskInput: "",
      todoTaskListOn: true,
      doneTaskListOn: false
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
    doneTaskList() {
      let result = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].done === true) {
          result.push(this.list.slice(i, i + 1)[0]);
        }
      }
      return result;
    },
    playing() {
      return this.$store.state.playing;
    },
    timerId() {
      return this.$store.state.timerId;
    }
  },
  methods: {
    addTask: function() {
      if (this.taskInput.trim() !== "") {
        this.$store.dispatch("updateList", {
          type: "addTask",
          task: {
            title: this.taskInput,
            createTime: new Date(),
            tomatoAmount: 0,
            working: true,
            time: 25 * 60,
            done: false
          }
        });
        this.taskInput = "";
      }
    },
    /**
     * 結束 task。
     * @param {String} id Task 的 id
     * 詳情要看 /src/store/index.js action 中的 updateList
     */
    doneTask: function(id) {
      if (this.todoTaskList[0].id === id) {
        this.pause();
      }
      this.$store.dispatch("updateList", {
        type: "doneTask",
        id: id
      });
    },
    /**
     * 恢復 Task。
     * @param {String} id Task 的 id
     * 詳情要看 /src/store/index.js action 中的 updateList
     */
    undoneTask: function(id) {
      this.$store.dispatch("updateList", {
        type: "undoneTask",
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
    }
  },
  filters: {
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
.todolist {
  width: 765px;
  padding-left: 125px;
}
.addTask {
  display: flex;
  justify-content: flex-start;
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
.dropdownButton {
  color: #fff;
  background-color: #335a83;
  width: 445px;
  height: 44px;
  border: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  margin-top: 48px;
  .title {
    font-weight: bold;
    font-size: 24px;
  }
  .sign {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 0 6px;
    border-color: #ffffff transparent transparent transparent;
    line-height: 0px;
    border-color: #ffffff transparent transparent transparent;
    filter: progid:DXImageTransform.Microsoft.Chroma(color='transparent');
    margin: 6px;
  }
}
.dropdownList {
  .li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #335a83;
    margin-top: 9px;
    width: 445px;
    color: #fff;
    position: relative;
    .label {
      font-size: 16px;
      line-height: 24px;
      font-weight: bold;
      margin-left: 32px;
    }
    .checkbox {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      outline: none;
      position: absolute;
      left: 0;
    }
    .checkbox::before {
      content: "";
      cursor: pointer;
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: #fff solid 2px;
      background-color: transparent;
      margin-right: 4px;
    }
    &.active .checkbox::before {
      width: 24px;
      height: 24px;
      background-image: url("./../assets/img/check-circle.png");
      background-position: center center;
      background-size: 28px 28px;
      border: none;
    }
    .button {
      width: 24px;
      height: 24px;
      background-color: transparent;
      background-image: url("./../assets/img/play-outline-white.png");
      background-size: 24px 24px;
    }
    .tomato {
      display: flex;
    }
    .tomato .circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 8px;
    }
  }
}
</style>
