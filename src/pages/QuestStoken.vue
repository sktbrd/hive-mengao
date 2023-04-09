<template>
  <q-page padding>
    <div>
      <h1>
        <img src="images/coinspin.gif" alt="Spinning stoken coin" />
        Welcome to
        <span class="title">Quest For Stoken</span>
        <img src="images/coinspin.gif" alt="Spinning stoken coin" />
      </h1>
      <p>
        Brought to you by
        <a href="https://www.gnars.wtf">Gnars DAO</a> and
        <a href="https://www.skatehive.app">Skatehive</a>:
      </p>
      <br />
      <div id="game"></div>
      <br />
      <iframe
        src="https://www3.cbox.ws/box/?boxid=3525954&boxtag=3OX7Jc"
        width="720"
        height="450"
        allowtransparency="yes"
        allow="autoplay"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        scrolling="auto"
      ></iframe>

      <img src="images/hive.png" alt="Hive logo" />
      <h2 id="username"></h2>
      <h2 id="highscore"></h2>
      <q-input type="text" id="username_input" placeholder="Enter your Hive username" />
      <q-btn id="action" data-action="login" label="Login with HIVE" />
      <h3 id="feed"></h3>
      <h2>
        join the
        <a href="https://discord.gg/S9QQNAW544">Discord</a>
      </h2>

      <div class="tables">
        <div class="table_wrapper">
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody id="leaderboard"></tbody>
          </table>
        </div>
        <iframe src="QFS/index.html" width="1280" height="720"></iframe>

        <div id="post_wrapper">
          <div id="post">
            <h2>
              <a id="link" href="https://peakd.com/@stoken.quest">Reward Pool Post</a>
            </h2>
            <p>Vote to increase the pool and earn rewards for your highscore!</p>
            <div>
              <h2 id="title"></h2>
              <h3 id="rewardpool"></h3>
              <q-btn id="vote" label="Vote" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'QuestForStoken'
}
</script>

<style scoped>
body {
  color: #fcf75e;
  background-color: #1b1b1b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
body h1 {
  font-size: 32px;
}
.title {
  font-family: 'MyCustomFont', sans-serif;
  font-size: 60px;
}
a {
  color: #9efd38;
}
iframe {
  display: block;
  border: 0;
}
</style>
