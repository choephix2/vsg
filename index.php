<?PHP 
header('Access-Control-Allow-Origin: *');
require("back/game-result-handler.php");

$handler = new GameResultHandler();
$handler->handle_game_results( $_POST );