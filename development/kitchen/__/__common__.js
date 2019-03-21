var _a = {bh:{wy:window}}
var _bbaj = _a
var _kki = _bbaj
var _tot = _a.bh.wy["\x61\x74\x6f\x62"]

function pseudorandom(n,iter) 
{ for ( let i=0; i<iter; i++ ) { n = n * 0x41A7 % 2147483647 } return n }

function random_invalid_char(seed)
{ return random_char( "AAABCDEFGHIJKLMNOPQRSTUVWXYZZZ", 0xFF + seed, 0x1F + seed, 30 ) }

function randstr(len,seed)
{
  /// "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
  let characters = _tot("MDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVorLw==")
  let result = ""
  for ( let i=0x00; i<len; i++ )
    result += characters[pseudorandom( 0xFF + seed, 0x0F + i ) % 64]
  return result
}   

function random_char(string,seed,iter,max)
{ return string[pseudorandom(seed,iter)%max] }

function check_for_devtools()
{
  let threshold = 400
  var wflag = _a.bh.wy.outerWidth - _a.bh.wy.innerWidth > threshold
	var hflag = _a.bh.wy.outerHeight - _a.bh.wy.innerHeight > threshold
	return wflag || hflag
}