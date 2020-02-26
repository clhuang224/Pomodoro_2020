<template>
  <div class="analytics">
    <h3 class="head">FOCUS TIME</h3>
    <div class="focus">
      <div class="today">
        <h4 class="head">TODAY</h4>
        <div class="amount">
          <span class="number">20</span>
          <span class="tomato">/TOMATO</span>
        </div>
      </div>
      <div class="week">
        <h4 class="head">WEEK</h4>
        <div class="amount">
          <span class="number">108</span> <span class="tomato">/TOMATO</span>
        </div>
      </div>
    </div>
    <h3 class="head">
      <div>CHART</div>
      <div class="date">
        <button class="leftArrow">
          &#60;
        </button>
        <span class="from">2019.7.1</span>
        -
        <span class="to">2019.7.7</span>
        <button class="rightArrow">></button>
      </div>
    </h3>
    <div class="chart">
      <div class="container">
        <div class="left">
          <div class="amount">24</div>
          <div class="amount">20</div>
          <div class="amount">16</div>
          <div class="amount">12</div>
          <div class="amount">8</div>
          <div class="amount">4</div>
        </div>
        <div class="graph">
          <div class="bar">
            <div class="barAmount"></div>
          </div>
          <div class="bar">
            <div class="barAmount"></div>
          </div>
          <div class="bar">
            <div class="barAmount"></div>
          </div>
          <div class="bar">
            <div class="barAmount"></div>
          </div>
          <div class="bar">
            <div class="barAmount"></div>
          </div>
          <div class="bar">
            <div class="barAmount"></div>
          </div>
          <div class="bar">
            <div class="barAmount"></div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="date">7/1</div>
        <div class="date">7/2</div>
        <div class="date">7/3</div>
        <div class="date">7/4</div>
        <div class="date">7/5</div>
        <div class="date">7/6</div>
        <div class="date">7/7</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Analytics"
};
</script>

<style lang="scss" scoped>
$working: #ff4384;
$break: #00a7ff;
$setting: #003164;
.analytics {
  width: 765px;
  padding-left: 125px;
}

.analytics .head,
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

.analytics .head .date {
  font-size: 16px;
}

.analytics .head .leftArrow,
.analytics .head .rightArrow {
  background-color: transparent;
  border: 0;
  color: #fff;
  font-family: "Consolas";
  padding: 8px;
  font-weight: bold;
  font-size: 16px;
}

.analytics .head .from,
.analytics .head .to {
  padding: 8px;
}

.analytics .focus {
  width: 445px;
  display: flex;
  justify-content: space-between;
}

.analytics .focus .head {
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-size: 16px;
}

.analytics .focus .today {
  width: 35%;
}

.analytics .focus .week {
  width: 42.9213%;
}

.analytics .focus .amount .number {
  font-size: 64px;
  color: #ff4384;
  padding: 4px 0px 7px 0px;
}

.analytics .focus .amount .tomato {
  font-size: 16px;
  color: #335a83;
  margin-left: 8px;
}

.analytics .chart {
  color: #fff;
  height: initial;
}

.analytics .chart .container {
  display: flex;
  justify-content: flex-start;
  height: initial;
  margin-top: 16px;
  align-items: flex-end;
}

.analytics .chart .left {
  width: 25px;
  font-size: 16px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 9px;
}

.analytics .chart .left .amount {
  margin-bottom: 20px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.analytics .chart .graph {
  width: 419px;
  height: 232px;
  border: #fff solid 1px;
  border-top: 0;
  border-right: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}

.analytics .chart .bar {
  width: 30px;
  height: 228px;
  display: flex;
  align-items: flex-end;
}

.analytics .chart .bar .barAmount {
  box-sizing: initial;
  background-color: #fff;
  width: 100px;
  height: 16.7%;
}

.analytics .chart .bottom {
  width: 419px;
  margin: 16.5px 0 0 25px;
  display: flex;
  justify-content: space-evenly;
}

.analytics .chart .bottom .date {
  width: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
