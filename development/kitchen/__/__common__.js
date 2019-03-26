var _a = { globals: { window : window, debug : window.console } }
_a.globals.base64 = { 
  decode : _a.globals.window["\x61\x74\x6f\x62"] 
}
_a.requests = {
  RequestClass : _a.globals.window['\x58\x4d\x4c\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74'], /// XMLHttpRequest
  escape_string : _a.globals.window[`\x65\x6e\x63\x6f\x64\x65\x55\x52\x49\x43\x6f\x6d\x70\x6f\x6e\x65\x6e\x74`], /// encodeURIComponent
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