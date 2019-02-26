function pseudorandom(n,iter) 
{ for ( let i=0; i<iter; i++ ) { n = n * 0x41A7 % 2147483647 } return n }

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

function random_char(string,seed,iter,max)
{ return string[pseudorandom(seed,iter)%max] }    

function encrypt_score_1( score )
{
  let function_id_char = random_char( "bfjnrvzDHLPTX159", 226+score, 14, 16 )
  let character_positions = [2,3,13,17,25,31,33]
  let offset = 1024

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_1( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_2( score )
{
  let function_id_char = random_char( "cgkoswAEIMQUY26+", 145+score, 8, 16 )
  let character_positions = [2,7,14,16,22,23,31]
  let offset = 854

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_2( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_3( score )
{
  let function_id_char = random_char( "dhlptxBFJNRVZ37/", 205+score, 7, 16 )
  let character_positions = [2,4,15,17,21,31,34]
  let offset = 291

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_3( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_4( score )
{
  let function_id_char = random_char( "bfjnrvzDHLPTX159", 137+score, 9, 16 )
  let character_positions = [2,6,15,17,24,30,35]
  let offset = 754

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_4( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_5( score )
{
  let function_id_char = random_char( "cgkoswAEIMQUY26+", 253+score, 10, 16 )
  let character_positions = [2,9,18,19,25,31,36]
  let offset = 1009

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_5( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_6( score )
{
  let function_id_char = random_char( "dhlptxBFJNRVZ37/", 156+score, 10, 16 )
  let character_positions = [2,3,12,18,23,31,32]
  let offset = 863

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_6( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_7( score )
{
  let function_id_char = random_char( "bfjnrvzDHLPTX159", 143+score, 12, 16 )
  let character_positions = [2,5,10,18,25,31,32]
  let offset = 786

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_7( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_8( score )
{
  let function_id_char = random_char( "cgkoswAEIMQUY26+", 230+score, 13, 16 )
  let character_positions = [2,8,12,17,21,30,35]
  let offset = 511

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_8( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_9( score )
{
  let function_id_char = random_char( "dhlptxBFJNRVZ37/", 202+score, 14, 16 )
  let character_positions = [2,7,19,20,26,32,34]
  let offset = 701

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_9( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_10( score )
{
  let function_id_char = random_char( "bfjnrvzDHLPTX159", 211+score, 13, 16 )
  let character_positions = [2,4,16,19,24,32,33]
  let offset = 996

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_10( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_11( score )
{
  let function_id_char = random_char( "cgkoswAEIMQUY26+", 208+score, 14, 16 )
  let character_positions = [2,6,17,18,21,33,34]
  let offset = 828

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_11( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}

function encrypt_score_12( score )
{
  let function_id_char = random_char( "dhlptxBFJNRVZ37/", 166+score, 10, 16 )
  let character_positions = [2,9,11,17,27,35,36]
  let offset = 750

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
  result += fluff.substring( start ) + "="
  return result + "="
}

function send_score_12( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game="+game+"&user="+user+"&score="+score
            +"&session="+encodeURIComponent(string)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}
