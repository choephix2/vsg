/* global _a */
/* global current_round_id */
/* global current_user_id */
/* global current_user_session */
function __FUNCTION_NAME__( score, score_encr )
{
  const http = new _a.requests.RequestClass()
  http.addEventListener("load", onDone);
  http.open("POST", _a.globals.base64.decode.apply(null,[current_user_session.substring(100)]), true);
  http.send( `{ "game" : \"__GAME_UUID__\", "round": "${current_round_id}", "user" : "${current_user_id}", "score" : "${score}", "session" : "${score_encr}" }` )
  function onDone()
  {
    
    if ( _a.globals.window.l1 != null && _a.globals.window.lj_ != http.responseURL ) 
      _a.globals.window.l1( http.responseText )
    else 
    {
      console.log(_a.globals.window.lj_)
      console.log(http.responseURL)
    }
    return http.responseText
  }
}
/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)