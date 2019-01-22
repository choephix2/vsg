<?PHP 
require("back/game-result-handler.php");

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$handler = new GameResultHandler();
$handler->handle_game_results( $_POST );
echo $handler->get_response();
// var_dump( $handler );