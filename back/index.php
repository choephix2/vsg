<?PHP 
require("game-result-handler.php");
require("db.php");

// set to false for production //
// set to true for dev/staging //
// 
// when true, response will spill out json debug data, and error data in case there was a failure
// else "ok" will be returned, regardless of success or failure
define( 'DEBUG', true ); 

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$score_arguments = $_POST;
$handler = new GameResultHandler( DEBUG );
$handler->handle_game_results( $score_arguments );

iDatabaseMiddleGuy $db = new DatabaseMiddleGuy();
if ( $handler->get_success() )
{
  $game_uuid = $handler->get_data()->game_uuid;
  $user = $handler->get_data()->user;
  $score_raw = $handler->get_data()->score_raw;
  $score_encrypted = $handler->get_data()->score_encrypted;
  $db->add_score( $game_uuid, $user, $score_raw, $score_encrypted, $_SERVER['REMOTE_ADDR'] );
}
else
if ( $handler->get_error() )
{
  $game_uuid = $handler->get_data()->game_uuid;
  $user = $handler->get_data()->user;
  $error = $handler->get_error();
  $db->add_ban( $game_uuid, $user, $error, implode("\n",$score_arguments) );
}

echo $handler->get_response();