<template>
  <div class="ringtones">
    <h3 class="head">WORK</h3>
    <ul class="work">
      <li
        class="li"
        :class="{ active: item === workRing }"
        v-for="(item, index, key) in ringtoneList"
        :key="key"
      >
        <input
          type="radio"
          name="work"
          :id="`work-${item}`"
          class="radio"
          :class="item"
          @click="updateRingtone(`work`, item)"
        />
        <label :for="`work-${item}`">{{ item }}</label>
      </li>
    </ul>
    <h3 class="head">BREAK</h3>
    <ul class="break">
      <li
        class="li"
        :class="{ active: item === breakRing }"
        v-for="(item, index, key) in ringtoneList"
        :key="key"
      >
        <input
          type="radio"
          name="break"
          :id="`break-${item}`"
          class="radio"
          :class="item"
          @change="updateRingtone(`break`, item)"
        />
        <label :for="`break-${item}`">{{ item }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Ringtones",
  data() {
    return {
      ringtoneList: [
        "none",
        "alarm",
        "alert",
        "alien",
        "beep",
        "bug",
        "call",
        "duck",
        "dog",
        "horn",
        "message",
        "ring",
        "smartphone",
        "spring",
        "telephone",
        "warning"
      ]
    };
  },
  computed: {
    workRing() {
      return this.$store.state.workRing;
    },
    breakRing() {
      return this.$store.state.breakRing;
    }
  },
  methods: {
    updateRingtone: function(type, ring) {
      if (ring !== "none") {
        let audio = new Audio(require(`./../assets/music/${ring}.mp3`));
        audio.play();
      }
      this.$store.dispatch("updateRingtone", {
        type: type,
        ring: ring
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$working: #ff4384;
$break: #00a7ff;
$setting: #003164;
.ringtones {
  width: 765px;
  padding-left: 125px;
}

.ringtones * {
  color: #fff;
}
.ringtones .head {
  color: #fff;
  background-color: #335a83;
  width: 445px;
  height: 44px;
  border: 0;
  padding: 0px 16px;
  margin-top: 48px;
  line-height: 44px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}

.ringtones .work,
.ringtones .break {
  display: flex;
  justify-content: flex-start;
  width: 445px;
  flex-wrap: wrap;
}

.ringtones .li {
  width: 33%;
  margin-top: 16px;
}

.ringtones .li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
  border: 0;
  font-size: 16px;
}

.ringtones .li .radio {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;
  &::before {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: #fff 2px solid;
    margin: 2px 6px 2px 2px;
  }
}

.ringtones .li.active .radio::before {
  background-image: radial-gradient(#ff4384 5px, transparent 4px);
  border-color: #ff4384;
}
</style>
