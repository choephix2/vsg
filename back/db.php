<?php
define('DEFAULT_SQLITE_PATH','sqlite:/coder/mnt/choephix_bs/viral-games/sqlite/main.sqlite');

class DatabaseMiddleGuy
{
  private $pdo;

  function __construct() 
  {
    $this->pdo = new PDO( DEFAULT_SQLITE_PATH );
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  function get( string $table )
  {
    return $this->pdo->query("SELECT * FROM ".table);
  }

  function add_user( string $username )
  {
    return $this->pdo->query("INSERT INTO users (id,username) VALUES ('$username','$username')");
  }

  function add_score( string $game_uuid, string $username, int $score, string $score_encrypted=null, string $ip=null )
  {
    try { $this->add_user( $username ); }
    catch ( PDOException $e ) {  }
    return $this->pdo->query("INSERT INTO scores (game_uuid,username,score,score_encrypted,ip)".
                             " VALUES ('$game_uuid','$username',$score,'$score_encrypted','$ip')");
  }

  function add_ban( string $game_uuid, string $username, string $error, string $params )
  {
    try { $this->add_user( $username ); }
    catch ( PDOException $e ) {  }
    return $this->pdo->query("INSERT INTO bans (game_uuid,username,error,params)".
                             " VALUES ('$game_uuid','$username','$error','$params')");
  }
}

$db = new DatabaseMiddleGuy();
$db->add_score( "mockgame", "auti-2", 123 );
$db->add_ban( "mockgame", "auti-2", "FakeException: No pickles.", "args=isaynothing" );