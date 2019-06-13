<?PHP 
require("../../../ini.php");
require("../../incl/db-sqlite.php");
require("../../incl/db.php");

if(!defined('STDOUT')) define('STDOUT', fopen('php://stdout', 'w'));
if(!defined('STDERR')) define('STDERR', fopen('php://stderr', 'w'));

function debug($o) { fwrite(STDOUT,"\e[01;34m[DEBUG] $o\e[0m\n"); }
function info($o)  { fwrite(STDOUT,"\e[01;96m[INFO] $o\e[0m\n"); }
function warn($o)  { fwrite(STDOUT,"\e[01;93m[WARN] $o\e[0m\n"); }
function error($o) { fwrite(STDERR,"\e[01;91m[ERROR] $o\e[0m\n"); }

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

$score_arguments = (array)json_decode( file_get_contents( 'php://input' ) );
info("START: ".var_export($score_arguments,true));

echo "{\"success\":true}";
