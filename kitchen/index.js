function run_tests()
{
  let test_scores =[ 0, 1, 9, 123, 123456, 9999, 999999, 1677616, 125, 1255, 12555, 125555 ]
  let settings = configuration.full_settings
  for ( let score of test_scores )
  {
    for ( let game in settings )
    {
      for ( let p of settings[game] )
      {
        let encr = encrypt_score( score, p )
        let decr = decrypt_score( encr, p )
        console.log( game, p[0], encr, score, "<?>", decr )
      }
    }
  }
}

// run_tests()