<?PHP 
$code = file_get_contents("php://input");
if ( $code )
{
  file_put_contents( "unpretty.js", $code );
  file_put_contents( "../../frontend/sudoku.js", $code );
}
echo $code;
?>