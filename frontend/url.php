<?PHP
function make_jumbled_backend_url($backend_url)
{
	$chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$r = substr(str_shuffle(str_repeat($chars, 11)), 0, 100);
	$r .= str_replace( '==', '', base64_encode($backend_url) );
	return $r;
}

echo make_jumbled_backend_url("http://gccx2.duckdns.org:41288/backend/api/start");
echo " //// ";
echo make_jumbled_backend_url("http://gccx2.duckdns.org:41288/backend/api/end");
?>
