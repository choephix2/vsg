<?PHP 
require("game-result-handler.php");

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
echo $handler->get_response();