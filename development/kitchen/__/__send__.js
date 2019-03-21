function __FUNCTION_NAME__( score, score_encr )
{
  const http = new XMLHttpRequest()
  http.open("POST", atob(current_user_session+"="+'='), false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const data = "game=__GAME_UUID__&user="+current_user_id+"&score="+score
            +"&session="+encodeURIComponent(score_encr)
  http.send(data);
  console.log( http.responseText )
  return http.responseText
}