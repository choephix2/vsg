<?PHP 
$code = file_get_contents("php://input");
if ( $code )
  file_put_contents( "unpretty.js", $code );
echo $code;
?>