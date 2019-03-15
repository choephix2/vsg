function test_prepared_with_js_decryption( score )
{
  let i = 0, settings = configuration.full_settings

  for ( let game in settings )
  {
    for ( let p of settings[game] )
    {
      let encrypt_score = window["encrypt_score_"+(++i)]
      let encr = encrypt_score( score )
      let decr = decrypt_score( encr, p )
      console.log( game, p[0], encr, score, "<?>", decr )
    }
  }
}

function test_prepared_with_php_decryption( score )
{
  let i = 0, settings = configuration.full_settings

  for ( let game in settings )
  {
    for ( let p of settings[game] )
    {
      let encrypt_score = window["encrypt_score_"+(++i)]
      let encr = encrypt_score( score )
      let decr = decrypt_via_backend( game, "jon", score, encr )
      console.log(decr)
      decr = JSON.parse(decr).data
      decr = decr.error ? decr.error : decr.score_decrypted
      console.log( game, p[0], encr, score, "<?>", decr )
    }
  }
}

function decrypt_via_backend( game, user, score, string )
{
  const BACKEND_URL = "/back"
  let http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  let data = "game="+game
           +"&user="+user
           +"&score="+score
           +"&session="+encodeURIComponent(string)
  http.send(data);
  return http.responseText
}

function compare( score )
{
  const game = "BwLwYEHFcUe1flIV7RP7HA==", fi = 1
  const en = encrypt_score_2( score )
  const pa = configuration.full_settings[game][fi]
  console.log( score, en )
  console.log( decrypt_score( en, pa ), pa )
  console.log( decrypt_via_backend( game, "compara", score, en ) )
}

// test_prepared_with_js_decryption( 123 )
test_prepared_with_php_decryption( 105 )

// compare( 523 )
// compare( 731 )
// compare( 1123 )
