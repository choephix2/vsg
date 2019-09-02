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
  { 
    report_error( "send-start", xhr, textStatus, errorThrown )
    try { _a.globals.window.on_game_start_error( xhr, textStatus, errorThrown) } catch(e) {} 
  },
  on_error_score : function( xhr, textStatus, errorThrown ) 
  { 
    report_error( "send-score", xhr, textStatus, errorThrown )
    try { _a.globals.window.on_game_score_error( xhr, textStatus, errorThrown) } catch(e) {} 
  },
}

var report_error = function( request_descr, xhr, textStatus, errorThrown ) {
  console.warn( xhr )
  console.warn( textStatus )
  console.warn( errorThrown )
  let data = { text: "ERROR on "+request_descr+":\n"+textStatus }
  $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            url : "https://hooks.slack.com/services/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----",
            success : http => console.log("slack:",http),
            error : (x,t,e) => console.warn("slack:",x,t,e)
        });
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

/* global _a */
function encrypt_score_1( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 153+score, 5, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_1( score, score_encr )
{
  let data = {
    game: "1", 
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

function send_start_1()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "1", 
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

/* global _a */
function encrypt_score_2( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 167+score, 7, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_2( score, score_encr )
{
  let data = {
    game: "1", 
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

function send_start_2()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "1", 
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

/* global _a */
function encrypt_score_3( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 223+score, 6, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_3( score, score_encr )
{
  let data = {
    game: "1", 
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

function send_start_3()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "1", 
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

/* global _a */
function encrypt_score_4( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 196+score, 5, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_4( score, score_encr )
{
  let data = {
    game: "2", 
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

function send_start_4()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "2", 
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

/* global _a */
function encrypt_score_5( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 199+score, 12, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_5( score, score_encr )
{
  let data = {
    game: "2", 
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

function send_start_5()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "2", 
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

/* global _a */
function encrypt_score_6( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 213+score, 15, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_6( score, score_encr )
{
  let data = {
    game: "2", 
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

function send_start_6()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "2", 
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

/* global _a */
function encrypt_score_7( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 128+score, 12, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_7( score, score_encr )
{
  let data = {
    game: "3", 
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

function send_start_7()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "3", 
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

/* global _a */
function encrypt_score_8( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 230+score, 6, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_8( score, score_encr )
{
  let data = {
    game: "3", 
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

function send_start_8()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "3", 
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

/* global _a */
function encrypt_score_9( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 234+score, 14, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_9( score, score_encr )
{
  let data = {
    game: "3", 
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

function send_start_9()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "3", 
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

/* global _a */
function encrypt_score_10( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 254+score, 6, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_10( score, score_encr )
{
  let data = {
    game: "4", 
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

function send_start_10()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "4", 
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

/* global _a */
function encrypt_score_11( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 226+score, 14, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_11( score, score_encr )
{
  let data = {
    game: "4", 
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

function send_start_11()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "4", 
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

/* global _a */
function encrypt_score_12( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 246+score, 6, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_12( score, score_encr )
{
  let data = {
    game: "4", 
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

function send_start_12()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "4", 
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

/* global _a */
function encrypt_score_13( score )
{
  let function_id_char = _a.encr.random_char( "bfjnrvzDHLPTX159", 146+score, 9, 16 )
  let character_positions = [2,5,10,17,25,30,33]
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_13( score, score_encr )
{
  let data = {
    game: "5", 
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

function send_start_13()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "5", 
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

/* global _a */
function encrypt_score_14( score )
{
  let function_id_char = _a.encr.random_char( "cgkoswAEIMQUY26+", 235+score, 11, 16 )
  let character_positions = [2,6,12,17,25,31,32]
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_14( score, score_encr )
{
  let data = {
    game: "5", 
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

function send_start_14()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "5", 
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

/* global _a */
function encrypt_score_15( score )
{
  let function_id_char = _a.encr.random_char( "dhlptxBFJNRVZ37/", 136+score, 13, 16 )
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

/* global $, _a, pa__, pb__, bambi, mufasa, casper */

/// to log the response for debugging
/// set frame.window property "l1" to a function that receives the response data as string, and
/// set frame.window property "lj_" to the full request url (the address to the backend)

function send_score_15( score, score_encr )
{
  let data = {
    game: "5", 
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

function send_start_15()
{
  _a.globals.window.mufasa = _a.requests.make_mini_game_session_id()
  
  let data = {
    game: "5", 
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

