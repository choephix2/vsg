<style type="text/css">
html, body, div, p, a { margin:0; padding:0; }
.flex-container {
  display: flex;
  background-color: DodgerBlue;
  height: 100vh;
  flex-direction: column;
  /*align-items: center;*/
  /*justify-content: center;*/
}
.flex-container > a {
  color: #cde;
  text-decoration: none;
  font-size: 12vh;
  flex-grow: 1;
  align-items: center;
  /*justify-content: center;*/
  display:flex;
  font-family:"Arial Black";
  text-transform: uppercase;
  transition: color 150ms;
  margin-left: 6vh;
}
.flex-container > a:hover {
  color: #fff;
}
</style>

<div class="flex-container">
  <a href="/frontend/play.php?g=kufox-jump">Kufox Jump</a>
  <a href="/frontend/play.php?g=coin-pop">Coin Pop</a>
  <a href="/frontend/play.php?g=crypto-match">Crypto Match</a>
  <a href="/frontend/play.php?g=fud-destroyer">FUD Destroyer</a>
</div>