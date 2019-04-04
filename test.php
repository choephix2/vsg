<?PHP

// $link = pg_connect("host=localhost dbname=vsg user=ubuntu password=cloud9isawesome");
$pg = pg_connect("host=localhost dbname=vsg user=postgres password=Varna052");

// $query = 'DROP TABLE scores';
// pg_query($query) or die('Query failed: ' . pg_last_error());
// $query = 'CREATE TABLE scores ( "user" VARCHAR, "game" VARCHAR, "score" INTEGER )';
// pg_query($query) or die('Query failed: ' . pg_last_error());

// $query = 'CREATE TABLE bans ( "user" VARCHAR, "game" VARCHAR, "reason" VARCHAR, "until" TIMESTAMP )';
// pg_query($query) or die('Query failed: ' . pg_last_error());

$query = 'SELECT * FROM "scores"';
$result = pg_query($query) or die('Query failed: ' . pg_last_error());
echo json_encode( pg_fetch_all($result) );

?>