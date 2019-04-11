<?PHP 
require("../../ini.php");
require("../incl/game-result-handler.php");
require("../incl/db-sqlite.php");
require("../incl/db.php");

if(!defined('STDOUT')) define('STDOUT', fopen('php://stdout', 'w'));
if(!defined('STDERR')) define('STDERR', fopen('php://stderr', 'w'));

function debug($o) { fwrite(STDOUT,"\e[01;34m[DEBUG] $o\e[0m\n"); }
function info($o)  { fwrite(STDOUT,"\e[01;96m[INFO] $o\e[0m\n"); }
function warn($o)  { fwrite(STDOUT,"\e[01;93m[WARN] $o\e[0m\n"); }
function error($o) { fwrite(STDERR,"\e[01;91m[ERROR] $o\e[0m\n"); }

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$score_arguments = (array)json_decode( file_get_contents( 'php://input' ) );
debug("incame request with data: ".var_export($score_arguments,true));

try
{ 
  $db = new DatabaseMiddleGuy(); 
  // $db = new DatabaseMiddleGuy_POSTGRE(); 
  info("Connected to database");
}
catch( Exception $e ) 
{
  error($e); 
  $db = new DatabaseMiddleGuy_FAKE(); 
}

$handler = new GameResultHandler( DEBUG );
$handler->handle_game_results( $score_arguments );


//if ( $db->is_banned($score_arguments["user"],$score_arguments["round"],$score_arguments["game"]) )

if ( $handler->get_success() )
{
  $user = "TESTERADO";
  $game_uuid = $handler->get_data()->game_uuid;
  $score_raw = $handler->get_data()->score_raw;
  $score_encrypted = $handler->get_data()->score_encrypted;

  $db->add_score( $game_uuid, $user, $score_raw, $score_encrypted, $_SERVER['REMOTE_ADDR'] );
  
  info( "New score: User $user got $score_raw in game '$game_uuid'" );
}
else
if ( $handler->get_error() )
{
  $game_uuid = $handler->get_data()->game_uuid;
  $user = $handler->get_data()->user;
  $score = $handler->get_data()->score_raw;
  $score_encrypted = $handler->get_data()->score_encrypted;
  $error = $handler->get_error();
  $db->add_ban( $game_uuid, $user, $score, $score_encrypted, $error );
  warn( "<!> Banned user $user. $error" );
}
else
{
  warn( "// IGNORED //" );
}

echo $handler->get_response();
