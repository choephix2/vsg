var configuration =
{
  function_names : {
    send_and_encr : [
        //// encr1 send1 start
        //// encr2 send2 --
        //// encr3 send3 --
        /////
        //// ~ x each game (5)

        "_0x26af06", "_0x3c8c4d", "_0x42c19e",  
        "_0x57c4a4", "_0x4d213f", "_0xd4e4b2", 
        "_0x339cc3", "_0x5ce2b4", "_0x8dd1c1", 
        
        "_0x3b34b6", "_0x2289de", "_0x3ec572",
        "_0x2afb42", "_0x1f459e", "_0xd2a168",
        "_0x58b5a0", "_0x3e2335", "_0x521398",
        
        "_0x1dd754", "_0x5ca3f3", "_0xe5dd10",
        "_0x325def", "_0x108c44", "_0x290489",
        "_0x298ad1", "_0x3c42cb", "_0x8bb19a",
        
        "_0x1e8c37", "_0x498b55", "_0x6c5a4f",
        "_0x12c1bc", "_0x2e8af2", "_0x522589",
        "_0x1c6d06", "_0x19bc49", "_0xa1a281",
        
        "_0x327ac8", "_0x40f02d", "_0x197308",
        "_0x3918e0", "_0x2b0e53", "_0x197309",
        "_0x6e64ad", "_0x2682fc", "_0x19730a",
      ]
  },
  full_settings : {
    "1": [         // Coin Pop
      [1, 0x400, [2,3,13,17,25,31,33], 0, 150],
      [2, 0x356, [2,7,14,16,22,23,31], 150, 1500],
      [3, 0x123, [2,4,15,17,21,31,34], 1500, 18000],
    ],
    "2": [         // Crypto Match 
      [1, 0x2F2, [2,6,15,17,24,30,35], 0, 500],
      [2, 0x3F1, [2,9,18,19,25,31,36], 500, 3000],
      [3, 0x35F, [2,3,12,18,23,31,32], 3000, 50000],
    ], 
    "3": [         // Fud Destroyr 
      [1, 0x312, [2,5,10,18,25,31,32], 0, 20],
      [2, 0x1FF, [2,8,12,17,21,30,35], 20, 200],
      [3, 0x2BD, [2,7,19,20,26,32,34], 200, 10000],
    ],
    "4": [         // Kufox Jump
      [1, 0x3E4, [2,4,16,19,24,32,33], 0, 100],
      [2, 0x33C, [2,6,17,18,21,33,34], 100, 1000],
      [3, 0x2EE, [2,9,11,17,27,35,36], 1000, 10000],
    ],
    '5': [         // Kufox Lost In Space
      [ 1, 0x400, [2,5,10,17,25,30,33], 0, 200 ],
      [ 2, 0x3F1, [2,6,12,17,25,31,32], 200, 5200 ],
      [ 3, 0x2BD, [2,7,19,20,26,32,34], 5200, 255200 ],
    ]
  }
  ,
  iter_settings : function*() {
    for ( let game in this.full_settings )
      for ( let params of this.full_settings[game] )
         yield ( { game:game, params:params } )
  }
}
