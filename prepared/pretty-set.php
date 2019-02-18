<?PHP 
$code = file_get_contents("php://input");
if ( $code )
  file_put_contents( "pretty.js", $code );
echo $code;
?>