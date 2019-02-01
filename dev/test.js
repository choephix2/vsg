run_tests()

function run_tests()
{
  let test_scores =[ 0, 1, 9, 123456, 9999, 999999, 1677616, 125, 1255, 12555, 125555 ]
  for ( let score of test_scores )
  {
    for ( let pi in config.paramss )
    {
      let p = config.paramss[pi]
      let encr = encrypt_score( score, p )
      let decr = decrypt( encr, p )
      console.log( pi, encr, score, "<?>", decr )
    }
  }
}

/// /// /// /// DEV ZONE /// /// /// ///

/// 36^6 = 2176782336
/// 36^4 = 1679616
/// 36^3 = 46656

/// MAX POSSIBLE NUMBER 2176782336
function encrypt_score( score, params )
{
  const function_id_possible_chars = make_possible_function_identifier_characters(params[0])
  let function_id_char = random_char(function_id_possible_chars,217+score,0x0A,16)
  let character_positions = params[2]
  let offset = params[1]

  // 
  let len = 0x28
  let radix = 0x24
  let score36plus = (score+=offset).toString(radix)
  while( score36plus.length < 0x06 )
    score36plus = random_invalid_char(++score) + score36plus
  score36plus = function_id_char + score36plus

  let fluff = randstr( len, offset + (+new Date) )
  let result = ""
  let start = 0
  for ( let i=0; i<0x07; i++ )
  {
    let pos = character_positions[i]-i
    result += fluff.substring( start, pos ) + score36plus[i]
    start = pos
  }
  result += fluff.substring( start )
  return result
  //return result + " ~~ " + score36plus  
}

//////////

function pseudorandom(n,iter) 
{ for ( let i=0; i<iter; i++ ) { n = n * 0x41A7 % 2147483647 } return n }

function random_char(string,seed,iter,max)
{ return string[pseudorandom(seed,iter)%max] }

function randstr(len,seed)
{
  let characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
  let result = ""
  for ( let i=0x00; i<len; i++ )
    result += characters[pseudorandom( 0xFF + seed, 0x0F + i ) % 64]
  return result
}       

function random_invalid_char(seed)
{ return random_char( "AAABCDEFGHIJKLMNOPQRSTUVWXYZZZ", 0xFF + seed, 0x1F + seed, 30 ) }

////

function make_possible_function_identifier_characters( function_id ) // 0 to 9
{
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-="
  let result = ""
  for (let i=0; i<16; i++)
    result += chars[i*4+function_id]
  //console.log( function_id + ' ∙ ' + result )
  return result
}