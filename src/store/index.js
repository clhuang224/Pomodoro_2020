import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: JSON.parse(localStorage.getItem("list")) || [],
    playing: false,
    timerId: null,
    workRing: "ring",
    breakRing: "alarm"
  },
  mutations: {
    UPDATE_LIST: (state, payload) => {
      switch (payload.type) {
        case "addTask":
          state.list.push(payload.task);
          break;
        case "doneTask":
          for (let i = 0; i < state.list.length; i++) {
            if (state.list[i].id === payload.id) {
              state.list[i].done = true;
              state.list[i].doneTime = new Date();
              break;
            }
          }
          break;
        case "undoneTask":
          for (let i = 0; i < state.list.length; i++) {
            if (state.list[i].id === payload.id) {
              state.list[i].done = false;
              state.list[i].doneTime = null;
              break;
            }
          }
          break;
        case "insertTask":
          for (let i = 0; i < state.list.length; i++) {
            if (state.list[i].id === payload.id) {
              state.list.unshift(state.list.splice(i, 1)[0]);
              break;
            }
          }
          break;
        case "decreaseTime":
          state.list[0].time--;
          break;
        case "startWork":
          state.list[0].working = true;
          state.list[0].time = 25 * 60;
          break;
        case "startBreak":
          state.list[0].working = false;
          state.list[0].time = 5 * 60;
          state.list[0].tomatoAmount++;
          break;
      }
      localStorage.setItem("list", JSON.stringify(state.list));
    },
    UPDATE_PLAYING: (state, playing) => {
      state.playing = playing;
      if (playing === false) {
        localStorage.setItem("list", JSON.stringify(state.list));
      }
    },
    UPDATE_RINGTONE: (state, payload) => {
      if (payload.type === "work") {
        state.workRing = payload.ring;
      } else {
        state.breakRing = payload.ring;
      }
    },
    UPDATE_TIMER_ID: (state, id) => {
      state.timerId = id;
    }
  },
  actions: {
    updateList: (context, payload) => {
      context.commit("UPDATE_LIST", payload);
    },
    updatePlaying: (context, payload) => {
      context.commit("UPDATE_PLAYING", payload);
    },
    updateRingtone: (context, payload) => {
      context.commit("UPDATE_RINGTONE", payload);
    },
    updateTimerID: (context, payload) => {
      context.commit("UPDATE_TIMER_ID", payload);
    }
  },
  modules: {}
});
