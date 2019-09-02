/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function __FUNCTION_NAME_SCORE__( score, score_encr )
{
  let data = {
    game: "__GAME_UUID__", 
    score:score, 
    session:score_encr, 
    mufasa:_a.globals.window.mufasa,
    casper:_a.globals.window.casper
  }
  $.ajax({
            type: "POST",
            data: data,
            url : _a.globals.base64.decode.apply(null,[pb__.substring(100)]),
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);},
            success : http => _a.requests.on_done_score(http),
            error : (x,t,e) => _a.requests.on_error_score(x,t,e)
        });
}

function __FUNCTION_NAME_START__()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "__GAME_UUID__", 
    mufasa:_a.globals.window.mufasa,
    casper:_a.globals.window.casper
  }
  $.ajax({
            type: "POST",
            data: data,
            url : _a.globals.base64.decode.apply(null,[pa__.substring(100)]),
            beforeSend : function(xhr){xhr.setRequestHeader('X-CSRF-TOKEN',_a.globals.window.bambi);},
            success : http => _a.requests.on_done_start(http),
            error : (x,t,e) => _a.requests.on_error_start(x,t,e)
        });
}