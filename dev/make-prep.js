var kod_common = `
function pseudorandom(n,iter) 
{ for ( let i=0; i<iter; i++ ) { n = n * 0x41A7 % 2147483647 } return n }
function random_char(string,seed,iter,max)
{ return string[pseudorandom(seed,iter)%max] }
function random_invalid_char(seed)
{ return random_char( "AAABCDEFGHIJKLMNOPQRSTUVWXYZZZ", 0xFF + seed, 0x1F + seed, 30 ) }
function randstr(len,seed)
{
  let characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
  let result = ""
  for ( let i=0x00; i<len; i++ )
    result += characters[pseudorandom( 0xFF + seed, 0x0F + i ) % 64]
  return result
}
`
var kod_func = `
function ##FNAME##( score )
{
  let function_id_char = random_char("##FCHAR##",##RAND1##+score,##RAND2##,##FCHARLEN##)
  let character_positions = [##CPOS##]
  let offset = ##OFFSET##

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
}
function ##SEND_FNAME##( score, string )
{
  
}
`

function make_prep()
{
  let i=0
  let result=""
  result += kod_common
  for ( let pa of config.settings )
  {
    ++i
    let fchar_possible = make_possible_function_identifier_characters(pa[0])
    let s = kod_func
    s = s.replace("##FNAME##","encrypt_score_"+i)
    s = s.replace("##FCHAR##",fchar_possible)
    s = s.replace("##FCHARLEN##",fchar_possible.length)
    s = s.replace("##OFFSET##",pa[1])
    s = s.replace("##CPOS##",pa[2])
    s = s.replace("##RAND1##",128+Math.floor(Math.random()*128))
    s = s.replace("##RAND2##",5+Math.floor(Math.random()*11))

    s = s.replace("##SEND_FNAME##","send_score_"+i)

    result += s + "\n"
  }

  result += "\n"
  for ( let pi in config.settings )
    result += `console.log(encrypt_score_`+(++pi)+`(123546))\n`

  return result
}

function make_possible_function_identifier_characters( function_id ) // 0 to 9
{
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/"
  let result = ""
  for (let i=0; i<16; i++)
    result += chars[i*4+function_id]
  return result
}

trace( make_prep() )