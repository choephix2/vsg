<?PHP

define( 'DEBUG', true );
 
class GameResultHandler
{
  function handle_game_results( array $args )
  {
    global $config, $data;

    /// /// CONFIGURATION /// /// 
    
    $config = new \stdClass();
    $config->params = [
      // Coin Pop
      [ 1, 0x400, [2,3,13,17,25,31,33] ],
      [ 2, 0x356, [2,7,14,16,22,23,31] ],
      [ 3, 0x123, [2,4,15,17,21,31,34] ],
      // Crypto Match
      [ 1, 0x2F2, [2,6,15,17,24,30,35] ],
      [ 2, 0x3F1, [2,9,18,19,25,31,36] ],
      [ 3, 0x35F, [2,3,12,18,23,31,32] ],
      // Fud Destroye
      [ 1, 0x312, [2,5,10,18,25,31,32] ],
      [ 2, 0x1FF, [2,8,12,17,21,30,35] ],
      [ 3, 0x2BD, [2,7,19,20,26,32,34] ],
      // Kufox Jump
      [ 1, 0x3E4, [2,4,16,19,24,32,33] ],
      [ 2, 0x33C, [2,6,17,18,21,33,34] ],
      [ 3, 0x2EE, [2,9,11,17,27,35,36] ],
    ];
    $config->game_uuids = ["BwLwYEHFcUe1flIV7RP7HA==","jSDMP8tbVEWun6w3ONPJQw==","x4V6e6O5qUCbFNHPgofXEg==","mSgEGYX/vkWFXON2LcKS2w=="];
    $config->game_maximum_scores = [18000,50000,10000,10000];
    $config->function_id_character_position = 2;

    /// /// ERROR+ HANDLING /// /// 

    $data = new \stdClass();
    function respond($result_info=null)
    {
      if ( DEBUG )
      {
        global $config, $data;
        $result = new \stdClass();
        $result->result = $result_info;
        $result->data = $data;
        //$result->config = $config;
        header("Content-Type: application/json");
        echo json_encode($result,JSON_PRETTY_PRINT);
      }
      else
      {
        header("Content-Type: text");
        echo "ok";
      }
      
      //TODO: Save the debug_data to a history table for future inspection
      // ...

      exit;
    }
    function on_success() : bool
    { respond( "ok"); }
    function on_fake($reason) 
    { respond( "Fake request ignored.\n".$reason ); }
    function on_hack($reason) 
    { respond( "Banned for game result requests for 12 hours.\n".$reason ); }
    function on_error( int $no , string $str, string $file, int $line ) : bool
    { respond( $str." (".$file." -- line ".$line.")" ); }
    set_error_handler( "on_error" );

    /// /// PROCESS INCOMING INFO /// /// 

    function get_function_id( $encrypted_score )
    {
      global $config, $data;
      $function_id_character = $encrypted_score[ $config->function_id_character_position ];
      $function_id = strpos( "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=",$data->function_id_character) % 4;
      return $function_id;
    }

    function decrypt( $value, $params )
    {
      $offset = $params[1];
      $character_positions = $params[2];
      $score36 = $value[$params[2][1]].
                 $value[$params[2][2]].
                 $value[$params[2][3]].
                 $value[$params[2][4]].
                 $value[$params[2][5]].
                 $value[$params[2][6]];
      $score36 = preg_replace('/[A-Z]+/', '', $score36);
      return base_convert($score36,36,10);
      return (int)base_convert($score36,36,10)-$offset;
    }

    $data->user = $args["user"];
    $data->game_uuid = $args["game"];
    $data->score_raw = $args["score"];
    $data->score_encrypted = $args["session"];

    $data->game_index = array_search( $data->game_uuid,$config->game_uuids );
    $data->game_max_score = $config->game_maximum_scores[ $data->game_index ];
    $data->function_id_character = $data->score_encrypted[ $config->function_id_character_position ];
    $data->function_id = get_function_id( $data->score_encrypted );
    $data->function_index = 3 * $data->game_index + $data->function_id - 1;
    $data->score_decrypted = decrypt( $data->score_encrypted, $config->params[0] );

    /// /// HANDLE THE RESULTS /// /// 

    if ( $data->function_id === 0 )
      on_fake("Function id is 0");
      
    if ( $data->score_raw > $data->game_max_score )
      on_hack("The submitted score exceeds the value, deemed possible for this game.\n".$data->score_raw." > ".$data->game_max_score);

    if ( $data->score_raw != $data->score_decrypted )
      on_hack("The score values mismatch.\n".$data->score_raw." != ".$data->score_decrypted);

    function save_valid_score( $user, $game, $score )
    {
      //TODO: Save user's score to leaderboards db
      // ...
    }

    save_valid_score( $data->user, $data->game_index, $data->score_raw );
    on_success();
  }
}