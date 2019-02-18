const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back/"
const SETTINGS = {
  "BwLwYEHFcUe1flIV7RP7HA==": [         // Coin Pop
    [1, encrypt_score_1,  send_score_1, 0, 150],
    [2, encrypt_score_2,  send_score_2, 150, 1500],
    [3, encrypt_score_3,  send_score_3, 1500, 18000],
  ],
  "jSDMP8tbVEWun6w3ONPJQw==": [         // Crypto Match 
    [1, encrypt_score_4,  send_score_4, 0, 500],
    [2, encrypt_score_5,  send_score_5, 500, 3000],
    [3, encrypt_score_6,  send_score_6, 3000, 50000],
  ], 
  "x4V6e6O5qUCbFNHPgofXEg==": [         // Fud Destroyr 
    [1, encrypt_score_7,  send_score_7, 0, 20],
    [2, encrypt_score_8,  send_score_8, 20, 200],
    [3, encrypt_score_9,  send_score_9, 200, 10000],
  ],
  "mSgEGYX/vkWFXON2LcKS2w==": [         // Kufox Jump
    [1, encrypt_score_10, send_score_10, 0, 100],
    [2, encrypt_score_11, send_score_11, 100, 1000],
    [3, encrypt_score_12, send_score_12, 1000, 10000],
  ]
}

var domMain = document.getElementById("main");

function addGame(uuid)
{
  let dom = document.createElement("div")
  dom.innerHTML = '<h2><pre>'+uuid+'</pre></h2>'
  domMain.appendChild(dom)

  let input = document.createElement('input')
  input.type = "text"
  input.name = "score1"
  input.value = SETTINGS[uuid][0][4] - 10
  dom.appendChild(input)

  for ( let i in SETTINGS[uuid] )
    addButton( SETTINGS[uuid][i] )

  let log = document.createElement('div')
  log.classList.add('log')
  dom.appendChild(log)

  function addButton( params )
  {
    let from = params[3], to = params[4]
    let button = document.createElement('button')
    button.type = "button"
    button.innerText = "SEND SCORE\n("+from+".."+to+")"
    button.addEventListener("click", ()=>sendScore(params));
    dom.appendChild(button)
  }

  function sendScore(params)
  {
    let score = input.value
    let string = params[1]( score )
    // let string = "jo1M1HGTa8e1sHeAcOvnrrT+uAdiodtsZhwhfEy3h4c4YGi"
    
    let http = new XMLHttpRequest()
    http.open("POST", BACKEND_URL, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.addEventListener("load", onDone);
  
    let game = uuid
    let user = "kodko.komkov"
    let data = "game="+game
             +"&user="+user
             +"&score="+score
             +"&session="+encodeURIComponent(string)
    dom.classList.add("busy")
    http.send(data);

    function onDone()
    {
      dom.classList.remove("busy")
      addResponseBox(http.responseText.toString())
    }
  }

  function addResponseBox(text)
  {
    let response_box = document.createElement('pre')
    response_box.innerText = text
    response_box.classList.add('response-box')
    log.prepend(response_box)
  }
}

for (let uuid in SETTINGS)
  addGame(uuid)