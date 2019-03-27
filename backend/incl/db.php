<?php
define('DEFAULT_SQLITE_PATH','sqlite:/home/ubuntu/workspace/backend/sqlite/main.sqlite');

interface iDatabaseMiddleGuy
{
    public function add_user( string $username );
    public function add_score( string $game_uuid, string $username, int $score, 
                               string $score_encrypted, string $ip );
    
    public function add_ban( string $game_uuid, string $username, int $score, 
                             string $score_encrypted, string $error );      
}

class DatabaseMiddleGuy implements iDatabaseMiddleGuy
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

  function add_score( string $game_uuid, string $username, int $score, string $score_encrypted, string $ip )
  {
    try { $this->add_user( $username ); }
    catch ( PDOException $e ) {  }
    return $this->pdo->query("INSERT INTO scores (game_uuid,username,score,score_encrypted,ip)".
                             " VALUES ('$game_uuid','$username',$score,'$score_encrypted','$ip')");
  }

  function add_ban( string $game_uuid, string $username, int $score, string $score_encrypted, string $error )
  {
    try { $this->add_user( $username ); }
    catch ( PDOException $e ) {  }
    
    
    return $this->pdo->query("INSERT INTO bans (game_uuid,username,score,score_encrypted,error)".
                             " VALUES ('$game_uuid','$username',$score,'$score_encrypted','$error')");
  }
}

class DatabaseMiddleGuy_FAKE implements iDatabaseMiddleGuy
{
  function get( string $table ) {}

  function add_user( string $username ) {}

  function add_score( string $game_uuid, string $username, int $score, string $score_encrypted, string $ip ) {}

  function add_ban( string $game_uuid, string $username, int $score, string $score_encrypted, string $error ) {}
}