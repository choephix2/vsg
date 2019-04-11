var _a = { globals: { window : window, debug : window.console } }
_a.globals.base64 = { decode : _a.globals.window["\x61\x74\x6f\x62"] }
_a.requests = {
  RequestClass : _a.globals.window['\x58\x4d\x4c\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74'], /// XMLHttpRequest
  escape_string : _a.globals.window[`\x65\x6e\x63\x6f\x64\x65\x55\x52\x49\x43\x6f\x6d\x70\x6f\x6e\x65\x6e\x74`], /// encodeURIComponent
  make_mini_game_session_id : function() { return 'gs'+_a.encr.randstr( 29 ) },
  on_done : function( http ) { 
    if ( _a.globals.window.l1 != null && _a.globals.window.lj_ != http.responseURL ) 
      _a.globals.window.l1( http )
    console.log(http.responseURL)
    console.log(http.responseText)
  }
}

_a.encr = {}
_a.encr.pseudorandom = function (n,iter)
{ for ( let i=0; i<iter; i++ ) { n = n * 0x41A7 % 2147483647 } return n }
_a.encr.random_invalid_char = function (seed)
{ return _a.encr.random_char( "AAABCDEFGHIJKLMNOPQRSTUVWXYZZZ", 0xFF + seed, 0x1F + seed, 30 ) }
_a.encr.randstr = function (len,seed)
{
  let characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
  let result = ""
  for ( let i=0x00; i<len; i++ )
    result += characters[_a.encr.pseudorandom( 0xFF + seed, 0x0F + i ) % 64]
  return result
}
_a.encr.random_char = function (string,seed,iter,max)
{ return string[_a.encr.pseudorandom(seed,iter)%max] }

function check_for_devtools()
{
  let threshold = 400
  var wflag = _a.globals.window.outerWidth  - _a.globals.window.innerWidth > threshold
	var hflag = _a.globals.window.outerHeight - _a.globals.window.innerHeight > threshold
	return wflag || hflag
}

/* global _a */
function encrypt_score_1( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 209+score, 14, 16 )
  let character_positions = [2,3,13,17,25,31,33]
  let offset = 1024

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_1( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"1\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_1( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_2( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 174+score, 12, 16 )
  let character_positions = [2,7,14,16,22,23,31]
  let offset = 854

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_2( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"1\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_2( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_3( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 241+score, 14, 16 )
  let character_positions = [2,4,15,17,21,31,34]
  let offset = 291

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_3( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"1\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_3( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_4( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 195+score, 13, 16 )
  let character_positions = [2,6,15,17,24,30,35]
  let offset = 754

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_4( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"2\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_4( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_5( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 163+score, 7, 16 )
  let character_positions = [2,9,18,19,25,31,36]
  let offset = 1009

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_5( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"2\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_5( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_6( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 136+score, 10, 16 )
  let character_positions = [2,3,12,18,23,31,32]
  let offset = 863

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_6( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"2\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_6( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_7( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 208+score, 11, 16 )
  let character_positions = [2,5,10,18,25,31,32]
  let offset = 786

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_7( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"3\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_7( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_8( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 234+score, 15, 16 )
  let character_positions = [2,8,12,17,21,30,35]
  let offset = 511

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_8( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"3\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_8( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_9( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 149+score, 9, 16 )
  let character_positions = [2,7,19,20,26,32,34]
  let offset = 701

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_9( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"3\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_9( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_10( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 175+score, 5, 16 )
  let character_positions = [2,4,16,19,24,32,33]
  let offset = 996

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_10( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"4\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_10( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_11( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 217+score, 12, 16 )
  let character_positions = [2,6,17,18,21,33,34]
  let offset = 828

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_11( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"4\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_11( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

/* global _a */
function encrypt_score_12( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 193+score, 10, 16 )
  let character_positions = [2,9,11,17,27,35,36]
  let offset = 750

  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = _a.encr.random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = _a.encr.randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start ) + "="
  return result + "="
}

/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_12( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"4\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function send_start_12( score, score_encr )
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start-mini-game", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

