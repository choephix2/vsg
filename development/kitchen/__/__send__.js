/* global _a */
/* global current_user_id */
/* global current_user_session */
function __FUNCTION_NAME__( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session+"="+'=']), false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  score_encr = _a.requests.escape_string(score_encr)
  http.send( `{ "game" : \"__GAME_UUID__\", "user" : "${current_user_id}", "score" : "${score}", "session" : "${score_encr}" }` )
  _a.globals.debug.log( http.responseText )
  return http.responseText
}