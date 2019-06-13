<?php

class DatabaseMiddleGuy_POSTGRE
{
  private $pg;

  function __construct() 
  {
    $this->pg = pg_connect("host=localhost dbname=vsg user=postgres password=Varna052");
  }

  function get( string $table )
  {
    return pg_query("SELECT * FROM ".table);
  }

  function add_user( string $username )
  {
    return pg_query("INSERT INTO users (id,username) VALUES ('$username','$username')");
  }

  function add_score( string $game_uuid, string $username, int $score, string $score_encrypted, string $ip )
  {
    // return pg_query("INSERT INTO scores (game_uuid,username,score,score_encrypted,ip)".
    //                 " VALUES ('$game_uuid','$username',$score,'$score_encrypted','$ip')");
    return pg_query("INSERT INTO scores (\"game\", \"user\", \"score\")".
                    " VALUES ('$game_uuid','$username',$score)");
  }

  function add_ban( string $game_uuid, string $username, int $score, string $score_encrypted, string $error )
  {
    return pg_query("INSERT INTO bans (game_uuid,username,score,score_encrypted,error)".
                    " VALUES ('$game_uuid','$username',$score,'$score_encrypted','$error')");
  }
}