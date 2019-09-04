/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function __FUNCTION_NAME_SCORE__( score, score_encr, retries=0 )
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
            error : function (x,t,e) {
              ++retries
              if ( retries <= 4 )
              {
                _a.requests.slack_it( "[ERROR] failed sending score (retry #"+retries+") -- "+t+" -- "+JSON.stringify(data) )
                setTimeout( () => $.ajax(this), 250 )
              }
              else
              {
                _a.requests.slack_it( "[CRITICAL] failed sending score (giving up) -- "+t+" -- "+JSON.stringify(data) )
                _a.requests.on_error_score(x,t,e)
              }
            }
        });
}

function __FUNCTION_NAME_START__( retries=0 )
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
            error : function (x,t,e) {
              ++retries
              if ( retries <= 4 )
              {
                _a.requests.slack_it( "[ERROR] failed sending start (retry #"+retries+") -- "+t+" -- "+JSON.stringify(data) )
                setTimeout( ()=> $.ajax(this), 750 )
              }
              else
              {
                _a.requests.slack_it( "[CRITICAL] failed sending start (giving up) -- "+t+" -- "+JSON.stringify(data) )
                _a.requests.on_error_start(x,t,e)
              }
            }
        });
}