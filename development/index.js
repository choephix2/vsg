const BACKEND_URL = "/backend/"
const GAMES = []
let i = 0
for ( let uuid in configuration.full_settings )
{
  let game = { uuid : uuid, params: [] }
  for ( let p of configuration.full_settings[uuid] )
    game.params.push( {
      index : ++i,
      fnum : p[0],
      encrypt : window["encrypt_score_"+i],
      send : window["send_score_"+i],
      score_min : p[3],
      score_max : p[4],
      user : 'kodko.komkov.'+i
    } )
  GAMES.push( game )
}



var devtools = /./;
devtools.toString = function() { this.opened = true; }
console.log('%c', devtools);

var r = /./;
r.toString = function() { document.title = 'on'; };
console.log(r);



const DOM_MAIN = document.getElementById("main");

function addGame( game )
{
  let DOM = document.createElement("div")
  DOM_MAIN.appendChild(DOM)

  DOM.innerHTML = '<h2><pre>'+game.uuid+'</pre></h2>'

  let INPUT = document.createElement('input')
  INPUT.type = "text"
  INPUT.name = "score1"
  INPUT.value = game.params[0].score_max - 10
  DOM.appendChild(INPUT)

  for ( let params of game.params )
    addButton( params )

  let DOM_LOG = document.createElement('div')
  DOM_LOG.classList.add('log')
  DOM.appendChild(DOM_LOG)

  function addButton( params )
  {
    let from = params.score_min , to = params.score_max
    let user = params.user
    let button = document.createElement('button')
    button.type = "button"
    button.innerText = "SEND SCORE\n("+from+".."+to+")"
    button.addEventListener("click", ()=>sendScore(game.uuid,params,user));
    DOM.appendChild(button)
  }

  function sendScore(game_uuid,params,user)
  {
    let score = parseInt( INPUT.value )
    let string = params.encrypt( score )
     
    let http = new XMLHttpRequest()
    http.open("POST", BACKEND_URL, true);
    http.addEventListener("load", onDone);
    let data = `{ "game" : \"${game_uuid}\", "user" : "${user}", "score" : "${score}", "session" : "${string}" }`
    DOM.classList.add("busy")
    http.send(data);

    function onDone()
    {
      DOM.classList.remove("busy")
      addResponseBox(http.responseText.toString())
      console.log(http.responseURL);
    }
  }

  function addResponseBox(text)
  {
    let response_box = document.createElement('pre')
    response_box.innerText = text
    response_box.classList.add('response-box')
    DOM_LOG.prepend(response_box)
  }
}

for ( let game of GAMES )
  addGame( game )