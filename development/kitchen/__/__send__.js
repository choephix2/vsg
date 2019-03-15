function __FUNCTION_NAME__( score, score_encr )
{
  const BACKEND_URL = "https://blockch-viral-games-choephix.c9users.io/back/index.php"
  const BACKEND_URL_DEVTOOLS = "https://blockch-viral-games-choephix.c9users.io/back/special.php"
  const http = new XMLHttpRequest()
  http.open("POST", check_for_devtools() ? BACKEND_URL_DEVTOOLS : BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game=__GAME_UUID__&user="+user+"&score="+score
            +"&session="+encodeURIComponent(score_encr)
  http.send(data);
  console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}