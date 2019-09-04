console.log("v500")

var _a = { globals: { window : window, debug : window.console } }
_a.globals.base64 = { decode : _a.globals.window["\x61\x74\x6f\x62"] }
_a.requests = {
  RequestClass : _a.globals.window['\x58\x4d\x4c\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74'], /// XMLHttpRequest
  escape_string : _a.globals.window[`\x65\x6e\x63\x6f\x64\x65\x55\x52\x49\x43\x6f\x6d\x70\x6f\x6e\x65\x6e\x74`], /// encodeURIComponent
  make_mini_game_session_id : function() { 
    return 't'+(new Date).getTime().toString(36)
         +'-c'+_a.globals.window.casper
         +'-s'+_a.encr.randstr( 49, Math.random()*9007199254740990  )
  },
  on_done_score : function( o ) { try { _a.globals.window.on_game_over( o ) } catch(e) {} },
  on_done_start : function( o ) { try { _a.globals.window.on_game_start( o ) } catch(e) {} },
  on_error_start : function( xhr, textStatus, errorThrown ) 
  { try { _a.globals.window.on_game_start_error( xhr, textStatus, errorThrown) } catch(e) {} },
  on_error_score : function( xhr, textStatus, errorThrown ) 
  { try { _a.globals.window.on_game_score_error( xhr, textStatus, errorThrown) } catch(e) {} },
  slack_it : function( msg )
  {
    let data = { text: msg }
    let url = "https://hooks.slack.com/services/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"
    // let url = "https://hooks.slack.com/services/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"
    $.ajax({  
              url : url, type: "POST", data: JSON.stringify(data),
              success : http => console.log("slack:",http),
              error : (x,t,e) => console.warn("slack:",x,t,e)
          });
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
  var wflag = _a.globals.window.outerWidth  - _a.globals.window.innerWidth  > threshold
	var hflag = _a.globals.window.outerHeight - _a.globals.window.innerHeight > threshold
	return wflag || hflag
}