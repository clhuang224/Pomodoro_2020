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
          localStorage.setItem("list", JSON.stringify(state.list));
          break;
        case "removeTask":
          state.list.splice(0, 1);
          localStorage.setItem("list", JSON.stringify(state.list));
          if (state.playing) {
            state.playing = false;
            clearInterval(state.timerId);
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
    },
    UPDATE_PLAYING: (state, playing) => {
      state.playing = playing;
    }
  },
  actions: {
    updateList: (context, payload) => {
      context.commit("UPDATE_LIST", payload);
    },
    updatePlaying: (context, payload) => {
      context.commit("UPDATE_PLAYING", payload);
    }
  },
  modules: {}
});
