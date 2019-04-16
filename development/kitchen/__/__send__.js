/* global _a, current_round_id, current_user_id, current_user_session, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function __FUNCTION_NAME_SCORE__( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done_score(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/end", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.setRequestHeader('X-Requested-With',"XMLHttpRequest");
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"score" : "${score}", `
           + `"session" : "${score_encr}", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}

function __FUNCTION_NAME_START__()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", ()=>_a.requests.on_done_start(http) );
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)])+"/start", true);
  http.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);
  http.setRequestHeader('X-Requested-With',"XMLHttpRequest");
  http.send( `{ "game" : \"__GAME_UUID__\", `
           + `"mufasa" : "${_a.globals.window.mufasa}", `
           + `"casper" : "${_a.globals.window.casper}" }` )
}