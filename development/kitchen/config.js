configuration =
{
  full_settings : {
    "BwLwYEHFcUe1flIV7RP7HA==": [         // Coin Pop
      [1, 0x400, [2,3,13,17,25,31,33], 0, 150],
      [2, 0x356, [2,7,14,16,22,23,31], 150, 1500],
      [3, 0x123, [2,4,15,17,21,31,34], 1500, 18000],
    ],
    "jSDMP8tbVEWun6w3ONPJQw==": [         // Crypto Match 
      [1, 0x2F2, [2,6,15,17,24,30,35], 0, 500],
      [2, 0x3F1, [2,9,18,19,25,31,36], 500, 3000],
      [3, 0x35F, [2,3,12,18,23,31,32], 3000, 50000],
    ], 
    "x4V6e6O5qUCbFNHPgofXEg==": [         // Fud Destroyr 
      [1, 0x312, [2,5,10,18,25,31,32], 0, 20],
      [2, 0x1FF, [2,8,12,17,21,30,35], 20, 200],
      [3, 0x2BD, [2,7,19,20,26,32,34], 200, 10000],
    ],
    "mSgEGYX/vkWFXON2LcKS2w==": [         // Kufox Jump
      [1, 0x3E4, [2,4,16,19,24,32,33], 0, 100],
      [2, 0x33C, [2,6,17,18,21,33,34], 100, 1000],
      [3, 0x2EE, [2,9,11,17,27,35,36], 1000, 10000],
    ]
  }
  ,
  iter_settings : function*() {
    for ( let game in this.full_settings )
      for ( let params of this.full_settings[game] )
         yield ( { game:game, params:params } )
  }
}
