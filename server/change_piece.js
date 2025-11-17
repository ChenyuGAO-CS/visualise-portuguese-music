const fs = require("fs")
const fetch = require("node-fetch")
let myUserSessions

module.exports = function(fastify, opts, done) {
  fastify.post("/changePiece", async function (req, rep) {
    console.log("Hello, I was triggered!")
   
    const idPiece = req.body.idPiece
    const specialList =  [
      '034', '062', '102', '107',
      '152', '176', '203', '215',
      '231', '254', '280', '307',
      '369', '584', '592', '624',
      '653', '654', '662', '744',
      '746', '749', '756', '770',
      '799', '869', '872', '887'
    ]

    if (true){
      
      // Read JSON from .data -> fake_909 folder and send it back down.
      // ...
      
    }
    
    // Check if the input string is a number.
    let isNum = isNumber(idPiece)
    if(isNum){
      console.log("Is a number.")
      let selSongNum = parseInt(idPiece)
      let urlSongNum = PrefixInteger(idPiece, 3)
      console.log("urlSongNum", urlSongNum)
      if(selSongNum >= 0 && selSongNum <= 909){
        const myUrl = "https://tomcollinsresearch.net/research/data/909Hier/909Hier-Mar2023/"+ urlSongNum +".json"
        const response = await fetch(myUrl, {
          method: 'get',
          // body: JSON.stringify(myData),
          headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        let beatsPerBar = 4
        if(inArray(urlSongNum, specialList)){
          beatsPerBar = 3
        }
        // console.log("data", data)
        console.log("Data loaded!")
        rep.send({"msg": "Success! A sensible number.",
                  "num": selSongNum,
                  "co": data,
                  "beatsPerBar": beatsPerBar})
      }
      else{
        rep.send({"msg": "Failure! Is an invalid Integer!",
                  "num": idPiece})
      }
    }
    else{
      rep.send({"msg": "Failure! Not a non-negative Integer",
                "num": idPiece})
    }

    
    // return reply.view("/src/pages/index.hbs", params)
  })


  done()
}

// Using regular expression to check if the input is a non-negative integer.
function isNumber(val) {
  // negative or positive
  return /^\d+$/.test(val);
}

// Add '0' to at the beginning of a number to expend the string with length 'm'.
function PrefixInteger(num, m) {
  return (Array(m).join(0) + num).slice(-m);
}

function inArray(search,array){
  for(var i in array){
      if(array[i]==search){
          return true;
      }
  }
  return false;
}