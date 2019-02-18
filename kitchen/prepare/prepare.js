
function loadfile(name) 
{
  let http = new XMLHttpRequest()
  http.open("GET", `/kitchen/__/${name}.js`, false)
  http.send(null)
  return http.responseText
}

function save(code) 
{
  let http = new XMLHttpRequest()
  http.open("POST", `/prepared/pretty-set.php`, false)
  http.send(code)
  document.body.innerText = http.responseText
}

function prepare() 
{
  const __common__  = loadfile("__common__")
  const __encrypt__ = loadfile("__encrypt__")
  const __send__    = loadfile("__send__")

  let result = ''
  const SETTINGS = configuration.full_settings

  result += __common__ + '\n\n'
  
  let i = 0
  for ( let game in SETTINGS )
  {
    for ( let pa of SETTINGS[game] )
    {
      let s, fchar_possible = make_possible_function_identifier_characters(pa[0])
      i++

      s = __encrypt__
      s = s.replace( "__FUNCTION_NAME__","encrypt_score_"+i )
      s = s.replace( "__FCHAR__",fchar_possible )
      s = s.replace( "__FCHARLEN__",fchar_possible.length )
      s = s.replace( "__OFFSET__",pa[1] )
      s = s.replace( "__CPOS__",pa[2] )
      s = s.replace( "__RAND1__",128+Math.floor(Math.random()*128) )
      s = s.replace( "__RAND2__",5+Math.floor(Math.random()*11) )
      result += s + '\n\n'
      
      s = __send__
      s = s.replace( "__FUNCTION_NAME__","send_score_"+i )
      result += s + '\n\n'
    }
  }

  save( result )
}

function make_possible_function_identifier_characters( function_id ) // 0 to 9
{
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/"
  let result = ""
  for (let i=0; i<16; i++)
    result += chars[i*4+function_id]
  return result
}

prepare()