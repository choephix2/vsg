function __FUNCTION_NAME__( score, score_encr )
{
  const BACKEND_URL = atob(current_user_session+"="+'=')
  const http = new XMLHttpRequest()
  http.open("POST", check_for_devtools() ? BACKEND_URL_DEVTOOLS : BACKEND_URL, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game=__GAME_UUID__&user="+current_user_id+"&score="+score
            +"&session="+encodeURIComponent(score_encr)
  http.send(data);
  // console.log( score, score_encr )
  console.log( http.responseText )
  return http.responseText
}