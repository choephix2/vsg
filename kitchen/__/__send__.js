function __FUNCTION_NAME__( score, score_encr )
{
  const BACKEND_URL = "https://8000-copybiochemicalbadger.cdr.co/back"
  const http = new XMLHttpRequest()
  http.open("POST", BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game=__GAME_UUID__&user="+user+"&score="+score
            +"&session="+encodeURIComponent(score_encr)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}