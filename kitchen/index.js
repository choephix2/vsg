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

function test_one( encr )
{
  let game = "BwLwYEHFcUe1flIV7RP7HA=="
  let fnum = 1
  let score_raw = 140

  let params = configuration.full_settings[game][fnum-1]
  let decr = decrypt_score( encr, params )

  console.log( score_raw, decr )
}

test_one( "SJr18T0IGil1Y4jUP0CPdDDwK15m0Ky0W2fqTWp2DBHCaM6==" )
// test_one( "icj1fUFRkactf4hgB0\/r7079E1Snyqm0B2IkD66UzgTto2\/==" )
// test_one( "icj1fUFRkactf4hgB0\\/r7079E1Snyqm0B2IkD66UzgTto2\\/==" )