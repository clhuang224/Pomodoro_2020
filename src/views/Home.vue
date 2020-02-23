<template>
  <div class="home">
    <div class="content">
      <form class="addMission">
        <input class="addInput" type="text" placeholder="ADD A NEW MISSON..." />
        <button class="addButton">＋</button>
      </form>
      <div class="notEmpty" v-if="list.length > 0">
        <div class="currentMission">
          <div class="listCircle"></div>
          <div class="container">
            <h2></h2>
            <div class="tomato"></div>
          </div>
        </div>
        <div class="time"></div>
        <ul class="todolist">
          <li class="todolist-li" v-for="(item, index, key) in list" :key="key">
            <span v-if="index > 0">{{ item.title }}</span>
          </li>
        </ul>
        <div class="container"><a class="more">MORE</a></div>
      </div>
      <div class="empty" v-else>to-do list is empty</div>
    </div>
    <div class="play">
      <div class="sector">
        <div class="circle">
          <button class="playButton"></button>
          <button class="pauseButton"></button>
          <div class="finish"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    list() {
      return this.$store.state.list;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  width: 86.9375%;
  background-color: #ffedf7;
  background-image: linear-gradient(
    to right,
    #ffedf7 75.4545%,
    #003164 24.5455%
  );
  .content {
    width: 50.9091%;
    height: 800px;
    padding-left: 80px;
    .addMission {
      display: flex;
      justify-content: flex-start;
      margin-left: 5px;
      .addInput {
        width: 405px;
        height: 56px;
        color: #ff4384;
        font-size: 16px;
        font-weight: bold;
        font-style: italic;
        background-color: #fff;
        margin: 48px 0px 0px 0px;
        padding-left: 16px;
        outline: none;
        &::placeholder {
          color: #ff4384;
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
        color: #ff4384;
        font-size: 16px;
        width: 40px;
        height: 56px;
        background-color: #fff;
      }
    }
    .currentMission {
      display: flex;
      justify-content: flex-start;
      margin: 145px 0px 0px 5px;
      width: 412px;
      height: 48px;
      .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
        .circle {
          width: 12px;
          height: 12px;
          border: #ff4384 1px solid;
          border-radius: 50%;
          background-color: #ff4384;
          margin-right: 8px;
        }
      }
    }
    .empty {
      height: 540px;
      width: 445px;
      margin-top: 26px;
      font-size: 36px;
      color: #ff4384;
      line-height: 540px;
      text-align: center;
    }
    .time {
      width: 454px;
      padding: 15px 0px;
      font-size: 176px;
      font-weight: bold;
      color: #ff4384;
    }
    .todolist {
      margin: 98px 0px 0px 5px;
      width: 445px;
      li {
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
            background-image: url("../assets/img/play-outline.png");
            background-size: 24px 24px;
          }
        }
      }
    }
    .container {
      margin-top: 9px;
      width: 445px;
      display: flex;
      justify-content: flex-end;
      .more {
        color: #ff4384;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
  .play {
    min-width: 540px;
    height: 540px;
    border: #ff4384 4px solid;
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
        border: #ff4384 4px solid;
        border-radius: 50%;
        background-color: #ff4384;
        position: relative;
      }
    }
    &.playing .sector .circle {
      background-color: #fff;
    }
    .playButton,
    .pauseButton {
      position: absolute;
      width: 96px;
      height: 96px;
      left: 203px;
      top: 203px;
      background-size: 96px 96px;
      background-color: transparent;
    }
    .playButton {
      background-image: url("../assets/img/play-white.png");
    }
    .pauseButton {
      display: none;
      background-image: url("../assets/img/pause-pink.png");
    }
    .finish {
      background-color: #fff;
      position: absolute;
      width: 24px;
      height: 24px;
      border: #ff4384 5px solid;
      left: 299px;
      top: 275px;
      cursor: pointer;
      &:active {
        background-color: #ff4384;
        border-color: #fff;
        border-width: 4px;
      }
    }
    &.playing .finish {
      background-color: #ff4384;
      border-color: #fff;
    }
  }
}
</style>
