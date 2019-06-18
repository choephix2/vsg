<?php
// declare(strict_types=1);

// namespace App\Lib\Util;

final class GameResultHandler
{
    private $ban = false;
    private $success = false;
    private $response = 'unset response';
    private $error;
    private $data;
    private $DEBUG;
    private $CONFIG = array(
        'game_maximum_scores' => [ 18000,50000,10000,10000 ],
        'function_id_character_position' => 2,
        'settings' => [
          
          /// [ function_id , offset, ch_positions, range_min , range_max ]
  
          '1' => [         // Coin Pop
            [ 1, 0x400, [2,3,13,17,25,31,33], 0, 150 ],
            [ 2, 0x356, [2,7,14,16,22,23,31], 150, 1500 ],
            [ 3, 0x123, [2,4,15,17,21,31,34], 1500, 18000 ],
          ],
          '2' => [         // Crypto Match
            [ 1, 0x2F2, [2,6,15,17,24,30,35], 0, 500 ],
            [ 2, 0x3F1, [2,9,18,19,25,31,36], 500, 3000 ],
            [ 3, 0x35F, [2,3,12,18,23,31,32], 3000, 50000 ],
          ],
          '3' => [         // Fud Destroyr
            [ 1, 0x312, [2,5,10,18,25,31,32], 0, 20 ],
            [ 2, 0x1FF, [2,8,12,17,21,30,35], 20, 200 ],
            [ 3, 0x2BD, [2,7,19,20,26,32,34], 200, 10000 ],
          ],
          '4' => [         // Kufox Jump
            [ 1, 0x3E4, [2,4,16,19,24,32,33], 0, 100 ],
            [ 2, 0x33C, [2,6,17,18,21,33,34], 100, 1000 ],
            [ 3, 0x2EE, [2,9,11,17,27,35,36], 1000, 10000 ],
          ],
          '5' => [         // Kufox Lost In Space
            [ 1, 0x400, [2,5,10,17,25,30,33], 0, 200 ],
            [ 2, 0x3F1, [2,6,12,17,25,31,32], 200, 5200 ],
            [ 3, 0x2BD, [2,7,19,20,26,32,34], 5200, 255200 ],
          ]
        ],
    );
  
    // pass false for production //
    // pass true for dev/staging //
    // 
    // when true, response will spill out json debug data, and error data in case there was a failure
    // else "ok" will be returned, regardless of success or failure
    public function __construct( $debug_mode ) 
    {
      $this->DEBUG = $debug_mode;
    }
  
    public function handle_game_results( array $args )
    {
      try
      {
        $config = (object)$this->CONFIG;
        $data = $this->data = new \stdClass();
        
        if ( !isset( $args['game'] ) )
          return $this->on_error( "Missing argument 'game' (uuid)" );
        if ( !isset( $args['score'] ) )
          return $this->on_error( "Missing argument 'score' (raw value)" );
        if ( !isset( $args['session'] ) )
          return $this->on_error( "Missing argument 'session' (encrypted score value)" );
          
        if ( !isset( $args['mufasa'] ) )
          return $this->on_error( "Missing argument 'mufasa' (mini game session token)" );
        if ( !isset( $args['casper'] ) )
          return $this->on_error( "Missing argument 'casper' (competition id)" );
  
        $data->mini_game_session_token = $args["mufasa"];
        $data->competition_id = $args["casper"];
        
        $data->game_uuid = $args["game"];
        $data->score_raw = $args["score"];
        $data->score_encrypted = str_replace( "\/", "/", $args["session"] );

        $data->game_index = array_search( $data->game_uuid, array_keys( $config->settings ) );

        if ( $data->game_index === false )
          return $this->on_error( "Unrecognized game uuid" );
  
        $data->function_id_character = $data->score_encrypted[ $config->function_id_character_position ];
        $data->function_id = $this->get_function_id( $data->score_encrypted );
        $data->settings = $this->make_settings_object( $config->settings[$data->game_uuid][$data->function_id-1] );

        if ( $data->function_id <= 0 )
          return $this->on_fake("Function id is 0");

        $data->score_decrypted = $this->decrypt( $data->score_encrypted, $data->settings );

        $score = $data->score_raw;
        $score_min = $data->settings->min_score;
        $score_max = $data->settings->max_score;
        if ( $score < $score_min || $score > $score_max )
          return $this->on_hack("The  submitted score ($score) is outside allowed range in settings [$score_min..$score_max]");
        if ( $score != $data->score_decrypted )
          return $this->on_hack("The score values mismatch.\n$data->score_raw != $data->score_decrypted");
  
        return $this->on_success();
      }
      catch( Exception $e )
      {
        return $this->error( (string)$e );
      }
    }
  
    private function make_settings_object( $settings_array )
    {
      return (object)[
        "fid" => $settings_array[0],
        "offset" => $settings_array[1],
        "character_positions" => $settings_array[2],
        "min_score" => $settings_array[3],
        "max_score" => $settings_array[4],
      ];
    }
  
    private function get_function_id( $encrypted_score )
    {
      $config = (object)$this->CONFIG;
      $characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/";
      $function_id_character = $encrypted_score[ $config->function_id_character_position ];
      $function_id = strpos( $characters, $this->data->function_id_character ) % 4;
      return $function_id;
    }
  
    private function decrypt( $value, $settings )
    {
      $deb = $settings->decryption_debugging = new \stdClass();
      $deb->base36 = $value[$settings->character_positions[1]].
                     $value[$settings->character_positions[2]]. 
                     $value[$settings->character_positions[3]]. 
                     $value[$settings->character_positions[4]]. 
                     $value[$settings->character_positions[5]]. 
                     $value[$settings->character_positions[6]]; 
      $deb->base36_trimmed = preg_replace('/[A-Z]+/', '', $deb->base36);
      $deb->base10 = base_convert($deb->base36_trimmed,36,10);
      $deb->base10_no_offset = $deb->base10 - $settings->offset;
      return $deb->base10_no_offset;
    }
  
    /// RESPONSE
  
    private function on_success()
    { 
      $this->success = true; 
      $this->respond( ); 
    }
    private function on_fake($reason) 
    { 
      $this->respond( "Fake request ignored.\n".$reason ); 
    }
    private function on_hack($reason) 
    {
      $this->ban = true;
      $this->error = (string)$reason;
      $this->respond( "Banned for game result requests for 12 hours.\n".$reason );
    }
    private function on_error( $str )
    { 
      $this->respond( $str ); 
    }
  
    private function respond($error=null)
    {
      if ( $this->DEBUG )
      {
        $result = new \stdClass();
        $result->error = $error;
        $result->ban = $this->ban;
        $result->success = $this->success;
        $result->data = $this->data;
        // $result->data->settings->character_positions = '[...]';
        //       '['.implode(',',$result->data->setting->character_positions).']';
        //$result->config = $this->config;
        return $this->response = json_encode($result,JSON_PRETTY_PRINT);
      }
      else
      {
        $success = $this->success || ( mt_rand() / mt_getrandmax() < 0.18 );
        return $this->response =  `{"success":$success}`;
      }
    }
    
    ///
  
    public function set_error( $error ) { $this->on_error( (string)$error ); }
    
    public function get_response() { return $this->response; }
    public function get_success() { return $this->success; }
    
    public function get_game_id_from_uuid( $uuid )
    {
      $i = 0;
      foreach ( $this->CONFIG->settings as $key=>$params )
      {
        $i++;
        if ( $key == $uuid )
          return $i;
      }
      throw new Exception("No game with uuid $uuid found in configuration.");
    }
  
    /// PUBLIC GETTERS
  
    public function get_data()   { return $this->data; }
    public function get_user()   { return $this->data->user; }
    public function get_game()   { return $this->data->game_uuid; }
    public function get_score()  { return $this->data->score_raw; }
    public function get_error()  { return $this->error; }
  }
