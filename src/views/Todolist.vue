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
    <button class="dropdownButton">
      <span class="title">TO-DO</span><span class="sign"></span>
    </button>
    <ul class="dropdownList currentTask"></ul>
    <button class="dropdownButton">
      <span class="title">DONE</span><span class="sign"></span>
    </button>
    <ul class="dropdownList doneTask"></ul>
  </div>
</template>
<script>
export default {
  name: "Todolist",
  data: function() {
    return {
      taskInput: ""
    };
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
  }

  .dropdownButton .title {
    font-weight: bold;
    font-size: 24px;
  }

  .dropdownButton .sign {
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
</style>
