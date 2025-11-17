socket = io()

class Client {
  constructor(){
    new p5(this.load_sketch.bind(this), "lovelySketch")
  }
  
  
  load_sketch(p){
    const prm = {
      "canvasWidth": 1200,       // pixels
      "canvasHeight": 600,      // pixels
      "gridMargin": 20,         // pixels
      "screenLRepresents": 0,   // ontime
      "screenRRepresents": 284,  // *ontime, need to be adapt according to MIDIs. I do not use this parameter.
      "screenTRepresents": 108,  // MIDI note number
      "screenBRepresents": 36,  // MIDI note number
      "oblongHeight": 5,        // pixels
      "oblongNudge": 2,         // pixels to avoid oblongs running into eachother
      "compObj": co_MS,        // *Composition object loaded from file
      "fillCol": [              // Mapping of staffNo to fill colour
        "#F4D06F",
        "#7b16f5", 
        "#FF8811"
      ],
      "hier": co_MS.layer[co_MS.layer.length -1][0],      // *Hierarchy object loaded from file
      "boxDuration": 0.05,      // sec
      // Transport bar
      "trans": {
        "x": null,
        "y": null,
        "width": null,
        "height": null,
        "img": [],
        "imgName": [
          "question_mark.png",
          ["play_256_0_ecf0f1_none.png", "pause_256_0_ecf0f1_none.png"]
        ],
        "buttons": null
      },
      "path": {
        "img": "https://cdn.glitch.global/f917780f-8d1b-452f-80d8-6fe5f2d1ca07/"
      },
      "songName": "Mesquita_sorted",
      "beatsPerBar": 4
    }
    let myInterface

    
    p.preload = function(){
      prm.trans.imgName.forEach(function(nam, idx){
        if (typeof nam === "string"){
          prm.trans.img[idx] = p.loadImage(prm.path.img + nam)
        }
        else {
          prm.trans.img[idx] = []
          nam.forEach(function(aNam, jdx){
            prm.trans.img[idx][jdx] = p.loadImage(prm.path.img + aNam)
          })
        }
      })
    }

    
    p.setup = function(){
      console.log("self:", self)
      
      myInterface = new Interface(p, prm)
    }


    p.keyPressed = function(){
      // if (p.key === "c"){
      //   p.saveCanvas(myInterface.visual.canvas, "filename_here", "png")
      // }

    }


    p.touchStarted = function(){
      // myInterface.touch_check()
      if(myInterface.visual.playPauseButton.playpause_check(prm)){
        console.log("playPauseButton was clicked.")
        // console.log("c1.notes.length:", c1.notes.length)
        // console.log(Tone.context.state)
        if (Tone.context.state !== "running"){
          Tone.start()
          // Tone.context.resume()
          
          // console.log(Tone.context.state)
        }
        // pno.triggerAttackRelease(
        //   "C4", 2, Tone.now(), 0.5
        // )
        if (!pnoLoaded){
          alert("Piano samples still loading. Please wait a few seconds then try again.")
          return
        }
        myInterface.visual.playPauseButton.play_back(prm.compObj, prm)
      }

      // Stop button check
      if(myInterface.visual.stopButton.playpause_check()){
        myInterface.visual.stopButton.play_stop(prm.compObj, prm)
        myInterface.visual.playPauseButton.set_original(prm)
      }


      // Loop buttons on pendular forest to check whether a button is clicked.
      myInterface.visual.myCells.forEach(function(c){
        if(c.treeButton.playpause_check()){
          if (Tone.context.state !== "running"){
            Tone.start()
          }
          if (!pnoLoaded){
            alert("Piano samples still loading. Please wait a few seconds then try again.")
            return
          }
          c.treeButton.play_back(prm.compObj, prm)
        }
      })

      console.log(myInterface.visual.node)
    }


    p.touchMoved = function(){
      // myInterface.move()
    }


    p.touchEnded = function(){
      // myInterface.touch_end()
    }

  }
  
  
  // Helper functions
  get_parameter_by_name(name){
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  }
  
  
  remove_children_of_element(id){
    const el = document.getElementById(id)
    while(el.firstChild){
      el.removeChild(el.firstChild)
    }
  }
  
  make_a_break(){
    let br = document.createElement("br")
    return br
  }
  
}


const client = new Client()
// client.auth()

let pnoLoaded = false

// Definition of a piano sampler.
const pno = new Tone.Sampler(
  {
    "G#1": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/032_keyboard_acoustic_000-100.wav",
    "C2": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/036_keyboard_acoustic_000-100.wav",
    "E2": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/040_keyboard_acoustic_000-100.wav",
    "G#2": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/044_keyboard_acoustic_000-100.wav",
    "C3": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/048_keyboard_acoustic_000-100.wav",
    "E3": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/052_keyboard_acoustic_000-100.wav",
    "G#3": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/056_keyboard_acoustic_000-100.wav",
    "C4": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/060_keyboard_acoustic_000-100.wav",
    "E4": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/064_keyboard_acoustic_000-100.wav",
    "G#4": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/068_keyboard_acoustic_000-100.wav",
    "C5": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/072_keyboard_acoustic_000-100.wav",
    "E5": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/076_keyboard_acoustic_000-100.wav",
    "G#5": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/080_keyboard_acoustic_000-100.wav",
    "C6": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/084_keyboard_acoustic_000-100.wav",
    "E6": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/088_keyboard_acoustic_000-100.wav",
    "G#6": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/092_keyboard_acoustic_000-100.wav",
    "C7": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/096_keyboard_acoustic_000-100.wav",
    "E7": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/100_keyboard_acoustic_000-100.wav",
    "G#7": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/104_keyboard_acoustic_000-100.wav",
    "C8": "https://tomcollinsresearch.net/mc/ex/src/instrument/acoustic_grand_piano/108_keyboard_acoustic_000-100.wav"
  },
  function(){
    console.log('pno loaded!');
    pnoLoaded = true
    pno.volume.value = -10
  }
).toDestination()

// Metronome pulse
const pulse = new Tone.Sampler(
  {
    "C1": "https://tomcollinsresearch.net/mc/ex/src/instrument/edm_drum_kit/036_kick_1.wav"
  },
  function(){
    console.log('pulse loaded!');
    pulse.volume.value = -10
  }
).toDestination()


class Interface {
  constructor(_sketch, param){
    this.sk = _sketch
    // this.param = param
    this.visual = new Visual(_sketch, param)

    // console.log("co.notes.slice(0, 5):", co.notes.slice(0, 5))
  }
}


class Visual {
  constructor(_sketch, param){
    this.sk = _sketch
    this.param = param
    this.canvas = this.sk.createCanvas(this.param.canvasWidth, this.param.canvasHeight)
    // Changing piece
    this.change_piece_input()
    // Change occ
    this.change_occ_input()
    // Tree-related
    // this.myCells = []
    this.render()
  }
  
  
  change_piece_input(){
    const self = this
    // self.sk.textSize(16);
    // self.sk.textAlign(self.sk.RIGHT);
    // self.sk.text(
    //   "Input a number (1-909) to select a song:", 
    //   self.sk.width/4 - 10, self.sk.height/2 -10
    // )

    // Enable user to change piece.
    const elemCoords = document.getElementById("songSelection")
    .getBoundingClientRect()

    self.inps = self.sk.createInput("Currently: Mesquita_sorted")
    self.inps.position(
      elemCoords.x + 0,
      window.scrollY + elemCoords.y +30
    )
    self.inps.size(200)
    const btn = self.sk.createButton("Change piece")
    btn.position(
      elemCoords.x + 205 - 0,
      window.scrollY + elemCoords.y +30
    )
    btn.mousePressed(
      self.change_piece_submit.bind(self)
    )
  }
  
  
  change_piece_submit(){
    const self = this
    console.log("self.inps:", self.inps)
    const upData = {
      "idPiece": self.inps.value()
    }
    const songName = self.inps.value()
    console.log("songName:", songName)
    if(songName === 'Perez_3step'){
      self.param.compObj = co_PA
      self.param.songName = "Perez_Allegro_mu"
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    else if(songName === 'Mesquita_3step'){
      self.param.compObj = co_MS
      self.param.songName = 'Mesquita_Sonata_mu'
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    else if(songName === 'GomesAllegro_3step'){
      self.param.compObj = co_GSA
      self.param.songName = 'Gomes da Silva\'s Allegro'
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    else if(songName === 'PieceA'){
      self.param.compObj = co_PieceA
      self.param.songName = 'Gomes da Silva\'s Minuet'
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    else if(songName === 'GomesAllegro_motif'){
      self.param.compObj = co_GSA_motif
      self.param.songName = 'Gomes da Silva\'s Allegro'
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    if(songName === 'Perez_motif'){
      self.param.compObj = co_PA_motif
      self.param.songName = "Perez_Allegro"
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    else if(songName === 'Mesquita_motif'){
      self.param.compObj = co_MS_motif
      self.param.songName = 'Mesquita_Sonata'
      self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][0]
    }
    self.render()
  }
  
  change_occ_input(){
    const self = this
    // self.sk.textSize(16);
    // self.sk.textAlign(self.sk.RIGHT);
    // self.sk.text(
    //   "Input a number (1-909) to select a song:", 
    //   self.sk.width/4 - 10, self.sk.height/2 -10
    // )

    // Enable user to change piece.
    const elemCoords = document.getElementById("occSelection")
    .getBoundingClientRect()

    const occLen = this.param.compObj.layer[this.param.compObj.layer.length -1].length
    self.inp = self.sk.createInput("E.g., 2 (0-" + (occLen-1).toString() + ")")
    self.inp.position(
      elemCoords.x + 0,
      window.scrollY + elemCoords.y +30
    )
    self.inp.size(200)
    const btn = self.sk.createButton("Change pattern")
    btn.position(
      elemCoords.x + 205 - 0,
      window.scrollY + elemCoords.y +30
    )
    btn.mousePressed(
      self.change_occurrence_submit.bind(self)
    )
  }
  
  change_occurrence_submit(){
    const self = this
    console.log("self.inp:", self.inp)
    const upData = {
      "idOcc": self.inp.value()
    }
    // Then, we should update the occ to be visualised. 
    const occID = parseInt(self.inp.value())
    console.log("occID:", occID)
    self.param.hier = self.param.compObj.layer[self.param.compObj.layer.length -1][occID]
    self.render()
    
  }
  

  render(){
    const self = this
    const prm = self.param
    const notes = prm.compObj.notes
    const maxOntimeCurrent = notes[notes.length-1].ontime
    
    self.myCells = []
    // Draw rectangle for buttons and textInput box in the first line.
    self.sk.background("#2e261f")
    // self.canvas = self.sk.createCanvas(prm.canvasWidth, prm.canvasHeight)
    // self.sk.rect(
    //   prm.gridMargin, prm.gridMargin,
    //   prm.canvasWidth - 2*prm.gridMargin,
    //   3 * prm.gridMargin
    // )

    // // Another bounding rectangle for pendular tree.
    // self.sk.rect(
    //   prm.gridMargin, 4.5*prm.gridMargin,
    //   prm.canvasWidth - 2*prm.gridMargin,
    //   prm.canvasHeight/2 - 3.5*prm.gridMargin
    // )
    // Draw bounding rectangle for piano-roll.
    self.sk.stroke(0)
    self.sk.fill(55)
    self.sk.rect(
      prm.gridMargin*2, prm.canvasHeight/2 + 3*prm.gridMargin,
      prm.canvasWidth - 3*prm.gridMargin,
      prm.canvasHeight - prm.gridMargin
    )

    // Create a play/pause Button
    self.playPauseButton = new mg.PlaypauseButtons(
      self.sk, prm.trans.img[1][0], false, true,
      760, prm.gridMargin + 16, 45, 20
    )
    self.playPauseButton.draw()

    self.stopButton = new mg.StopButtons(
      self.sk, false, true,
      820, prm.gridMargin + 16, 45, 20
    )
    self.stopButton.draw()

    // Text input box.
    console.log("this.sk",this.sk)
    const occLen = this.param.compObj.layer[this.param.compObj.layer.length -1].length
    self.textInput = new mg.TextInput(
      this.sk, "lovelySketch", "Currently: \"" + prm.songName +"\" is visualised, which has "+ (occLen).toString() + " patterns.",
      45, prm.gridMargin + 16, 690, "Add file!", 575, 30
    )



    // Draw pendular tree.
    const hier_gt = prm.hier["occurrences"] // Read the first occ set. 
    console.log("prm.hier[0][occurrences]", prm.hier["occurrences"])
    const occ_key = Object.keys(hier_gt)
    console.log(occ_key.length)
    
    // Then draw circle for each occurrence.
    const max_depth = 1
    let count_node = 0
    let totalBarCount = 0

    
    totalBarCount = Math.ceil((notes[notes.length-1].offtime)/4)
    console.log("Total bar count: ", totalBarCount)
    // self.sk.line(1, 100, 100, 100)

    occ_key.forEach(function(k, idx){
      // console.log(hier_gt[k])
      self.myCells.push(new PendularTree(
        1,
        k, // Will be changed to the idx of occ set.
        totalBarCount,
        max_depth,
        Math.ceil(hier_gt[k][0][0]/4),
        16,
        hier_gt[k],
        self.sk,
        prm
      ))
      // console.log(tmp_occ[i] )
      count_node = count_node + 1
    })
    // console.log(myCells)
    self.myCells.forEach(function(c){
      c.treeButton.draw()
      // c.draw()
    })


    // Draw piano-roll.
    // Text for y-axis.
    this.sk.stroke(0)
    const MNN_y_axis = [36, 48, 60, 72, 84, 96, 108]
    const label_y_axis = ["C1", "C2", "C3", "C4", "C5", "C6", "C7"]
    const interval_two_octave = self.sk.map(
        MNN_y_axis[1], prm.screenBRepresents, prm.screenTRepresents,
        prm.canvasHeight/2 - 2*prm.gridMargin, prm.gridMargin
      ) - 
      self.sk.map(
        MNN_y_axis[0], prm.screenBRepresents, prm.screenTRepresents,
        prm.canvasHeight/2 - 2*prm.gridMargin, prm.gridMargin
      )
    self.sk.fill(220)
    for(let idx = 0; idx < MNN_y_axis.length; idx ++){
      const y_axis = self.sk.map(
        MNN_y_axis[idx], prm.screenBRepresents, prm.screenTRepresents,
        prm.canvasHeight/2 - 2*prm.gridMargin, prm.gridMargin
      )
      this.sk.text(label_y_axis[idx], prm.gridMargin, y_axis + prm.canvasHeight/2 + 2*prm.oblongHeight - interval_two_octave)
    }

    // //Text for x-axis
    // for(let idx = 1; idx <= totalBarCount; idx = idx + 4){
    //   const x_axis = self.sk.map(
    //     idx, 0, totalBarCount,
    //     prm.gridMargin, prm.canvasWidth - 2*prm.gridMargin
    //   )
    //   this.sk.text(idx, x_axis, prm.canvasHeight/2 + 2*prm.oblongHeight - interval_two_octave)
    // }

    // Draw background.
    let yAxisOblong = self.sk.map(
      prm.screenTRepresents, prm.screenBRepresents, prm.screenTRepresents,
      prm.canvasHeight/2 - 2*prm.gridMargin, prm.gridMargin
    )
    yAxisOblong = yAxisOblong + prm.canvasHeight/2 + 2*prm.oblongHeight - interval_two_octave
    let xAxisOblong = prm.gridMargin*2
    while(yAxisOblong < prm.canvasHeight){
      this.sk.stroke(0)
      self.sk.fill(35)
      self.sk.rect(
        xAxisOblong, yAxisOblong,
        prm.canvasWidth - 3*prm.gridMargin, prm.oblongHeight,
        1 // Little bit of rounding on the edges
      )
      yAxisOblong = yAxisOblong + 2*prm.oblongHeight
    }
    // Drawing a line for each 4-bar.
    let bar_gap = 0
    for(let idx = 1; idx <= totalBarCount; idx = idx + 4){
      const x_axis = self.sk.map(
        idx, 0, totalBarCount,
        prm.gridMargin, prm.canvasWidth - 2*prm.gridMargin
      )
      if(idx === 1){
        bar_gap = x_axis
      }
      else if(idx === 5){
        bar_gap = x_axis - bar_gap
      }
    }
    // Draw a bar line for each 4 bar.
    let bar_line_x_axis = prm.gridMargin*2
    let bar_num_idx = 1
    for(let idx = 1; idx <= totalBarCount; idx = idx + 4){
      this.sk.stroke(65)
      this.sk.line(bar_line_x_axis, prm.canvasHeight/2 + 3*prm.gridMargin, bar_line_x_axis, prm.canvasHeight)
      self.sk.fill(220)
      this.sk.text(idx, bar_line_x_axis, prm.canvasHeight/2 + 2*prm.oblongHeight - interval_two_octave)
      bar_line_x_axis = bar_line_x_axis + bar_gap
      bar_num_idx = bar_num_idx + 1
    }


    // Only keep the notes whose ontimes, offtimes, and MNNs mean that they are
    // (partially) within the bounding rectangle.
    notes.filter(function(n){
      return n.MNN > prm.screenBRepresents &&
      n.MNN < prm.screenTRepresents &&
      n.ontime < totalBarCount*prm.beatsPerBar &&
      n.ontime + n.duration > prm.screenLRepresents
    })
    .forEach(function(n){
      // Determine horizontal coordinates.
      let oblongL = self.sk.map(
        n.ontime,
        // The endpoints in the music are the ontimes.
        prm.screenLRepresents, totalBarCount*prm.beatsPerBar,
        // The endpoints in the graphics are determined by margin and width.
        prm.gridMargin, prm.canvasWidth -2*prm.gridMargin
      )
      // Prevent drawing outside of the grid.
      oblongL = Math.max(oblongL, prm.gridMargin)
      let oblongR = self.sk.map(
        n.ontime + n.duration, prm.screenLRepresents, totalBarCount*prm.beatsPerBar,
        prm.gridMargin, prm.canvasWidth - 2*prm.gridMargin
      )
      // Prevent drawing outside of the grid.
      oblongR = Math.min(oblongR, prm.canvasWidth - 2*prm.gridMargin)
      // Determine vertical coordinate.
      const oblongV = self.sk.map(
        n.MNN, prm.screenBRepresents, prm.screenTRepresents,
        prm.canvasHeight/2 - 2*prm.gridMargin, prm.gridMargin
      )
      self.sk.noStroke()
      // Colour based on staff number/channel.
      self.sk.fill(
        prm.fillCol[1]
      )
      self.sk.rect(
        oblongL + prm.oblongNudge +prm.gridMargin, oblongV + prm.canvasHeight/2 + 2*prm.oblongHeight,
        oblongR - oblongL - 2*prm.oblongNudge, prm.oblongHeight,
        1 // Little bit of rounding on the edges
      )
    })
    
    // Draw occurrences 
    self.myCells.forEach(function(c){
      c.notes.forEach(function(n){
          // Determine horizontal coordinates.
          let oblongL = self.sk.map(
            n[0],
            // The endpoints in the music are the ontimes.
            prm.screenLRepresents, totalBarCount*prm.beatsPerBar,
            // The endpoints in the graphics are determined by margin and width.
            prm.gridMargin, prm.canvasWidth -2*prm.gridMargin
          )
          // Prevent drawing outside of the grid.
          oblongL = Math.max(oblongL, prm.gridMargin)
          let oblongR = self.sk.map(
            n[0] + 1, prm.screenLRepresents, totalBarCount*prm.beatsPerBar,
            prm.gridMargin, prm.canvasWidth - 2*prm.gridMargin
          )
          // Prevent drawing outside of the grid.
          oblongR = Math.min(oblongR, prm.canvasWidth - 2*prm.gridMargin)
          // Determine vertical coordinate.
          const oblongV = self.sk.map(
            n[1], prm.screenBRepresents, prm.screenTRepresents,
            prm.canvasHeight/2 - 2*prm.gridMargin, prm.gridMargin
          )
          self.sk.noStroke()
          // Colour based on staff number/channel.
          self.sk.fill(
            prm.fillCol[0]
          )
          self.sk.rect(
            oblongL + prm.oblongNudge +prm.gridMargin, oblongV + prm.canvasHeight/2 + 2*prm.oblongHeight,
            oblongR - oblongL - 2*prm.oblongNudge, prm.oblongHeight,
            1 // Little bit of rounding on the edges
          )
      })
    })
  }
}


class PendularTree {
  constructor(_nodeDepth, _key, _totalBarCount, _maxDepth, _barStar, _barCount, _notes, _sketch, param){
    const self = this
    this.sk = _sketch
    this.prm = param
    this.nodeDepth = _nodeDepth
    this.notes = _notes

    this.totalBarCount = _totalBarCount/4
    this.maxDepth = _maxDepth + 1

    this.barStar = _barStar
    this.barCount = _barCount

    this.interval_x_axis = (this.prm.canvasWidth - 3*this.prm.gridMargin)/this.totalBarCount

    this.radius = 45
    this.y = this.nodeDepth*(this.prm.canvasHeight/this.maxDepth) * 2 / 5 + this.radius/2
    this.x = (this.barStar-1)/4 * this.interval_x_axis + 2*this.prm.gridMargin
    this.key = _key
    this.treeButton = new mg.TreeButton(
        this.sk, this.key, false, true,
        this.x, this.y, this.radius, this.radius,
        this.barStar, this.barCount, this.notes
    )
  }
  

}

// Get bar count according to a string
function getBarCount(str, start_idx, length_array){
  let barCount = 0
  let tmp_idx = start_idx
  for(let i = 0; i < str.length; i ++){
    barCount = barCount + length_array[tmp_idx]
    tmp_idx = tmp_idx + 1
  }
  return barCount
}

// Get start bar according to a string
function getStartBar(start_idx, length_array){
  let barCount = 1
  for(let i = 0; i < start_idx; i ++){
    barCount = barCount + length_array[i]
  }
  return barCount
}

// Get maximum depth
function getMaxDepth(hier_data){
  let maxDepth = 0
  Object.keys(hier_data).forEach(function(k){
    if(hier_data[k].subsetScore > maxDepth){
      maxDepth = hier_data[k].subsetScore
    }
  })
  return maxDepth
}