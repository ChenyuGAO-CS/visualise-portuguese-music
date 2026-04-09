// These functions were imported from maia-jam in April 2018.
// Here are some Composition objects that we might show in the index.html file.

// var COMPOSITION = 'tallis_thomas/if_ye_love_me';
// var COMPOSITION = 'tur_barry/directions_example';
// var COMPOSITION = 'tur_barry/directions_example_2';
// var COMPOSITION = 'tur_barry/tie_creation_test';
// var COMPOSITION = 'green_day/21_guns';
// var COMPOSITION = 'tur_barry/oasis_snippet';
// var COMPOSITION = 'tur_barry/double_sharp_and_flat';
// var COMPOSITION = 'tur_barry/fill_missing_time_intervals_1';
// var COMPOSITION = 'tur_barry/tuplets_simpler';
// var COMPOSITION = 'tur_barry/tuplets';
// var COMPOSITION = 'haydn_joseph/op_17_no_1_mvt_1';
// var COMPOSITION = 'holst_gustav/in_the_bleak_midwinter';
// var COMPOSITION = 'tur_barry/sequencing_example';
// var COMPOSITION = 'tur_barry/tie_type_example';
// var COMPOSITION = 'tur_barry/tie_type_example_2';
// var COMPOSITION = 'taurus_berry/10120.00';
// var COMPOSITION = 'tur_barry/articulation_example';
// var COMPOSITION = 'isley_brothers/shout';
// var COMPOSITION = 'jimi_hendrix_experience_the/purple_haze';
// var COMPOSITION = 'tur_barry/guitar_tab_in_e-flat_minor_with_triplets'
// var COMPOSITION = 'tur_barry/we_are_young_excerpt';
// var COMPOSITION = 'tur_barry/expressions_and_tuplets';

// var ex1 = require('../../data/json_exports/tallis_thomas/if_ye_love_me');
// var json_score = ex1.json_score;

var useSmoothScroll = false;

var smoothScroll = function(offset,intRef){
	var y = 1;
	intRef = setInterval(function() {
		y++;
		if(y>offset){
			clearInterval(intRef);
			return;
		}
		window.scrollTo(0,y);
	}, 7);

	// function increment(){
	//
	// 	y++;
	// 	if(y>offset){
	// 		return;
	// 	}
	// 	console.log(y,"SCROLL TO")
	//
	//
	// 	setTimeout(function() {
	// 		console.log('INCREMENT');
	// 	    increment();
	// 	}, 10);
	// 	//console.log(ctx_nrnest_sbl.verticalStarts[sysi][0])
	// 	//document.body.scrollTop = ctx_nrnest_sbl.verticalStarts[sysi][0];
	//
	// }


};


function rehighlight(ctx_nrnest_sbl, hiBarNo, topSys){
	// console.log('Called unhighlight!');
	// console.log('ctx_nrnest_sbl:', ctx_nrnest_sbl);
	//var hiBarNo = 3;

	// Determine the system to which this bar belongs.
	var sysi = undefined;
	var sbl = ctx_nrnest_sbl.systemBarLimits;
	var sbli = 0;
	while (sbli < sbl.length){
		if (hiBarNo >= sbl[sbli].systemBarBegin &&
				hiBarNo <= sbl[sbli].systemBarEnd){
			sysi = sbli;
			sbli = sbl.length - 1;
		}
		sbli++;
	}
	console.log('hiBarNo = ' + hiBarNo + ', and belongs to system ' + sysi);

	// Scroll to this system, if it is not already at the top of the window.
	console.log('topSys:', topSys,sysi);
	if (sysi !== topSys){
			if(useSmoothScroll){
				smoothScroll(ctx_nrnest_sbl.verticalStarts[sysi][0])
			} else {
				window.scrollTo(0,ctx_nrnest_sbl.verticalStarts[sysi][0]);
			}
	}

	// Turn all notes and rests in this bar blue.
	if (sysi !== undefined){
		var curr_sys = ctx_nrnest_sbl.notesRestsNest[sysi];
		// console.log('curr_sys:', curr_sys);
		if (curr_sys !== undefined){
			for (voici = 0; voici < curr_sys.length; voici++){
				var curr_voice = curr_sys[voici].voice;
				// console.log('curr_voice:', curr_voice);
				var curr_notesRests = curr_sys[voici].notesRests;
				// console.log('curr_notesRests:', curr_notesRests);
				if (curr_notesRests !== undefined){
					for (nri = 0; nri < curr_notesRests.length; nri++){
						curr_nr = curr_notesRests[nri];
						if (curr_nr.fj_inhr !== undefined &&
								curr_nr.fj_inhr.barOn == hiBarNo){
							for (keyi = 0; keyi < curr_nr.keys.length; keyi++){
								curr_nr.setKeyStyle(
									keyi,
									{ fillStyle: "blue", strokeStyle: "blue" }
								);
							}
						}
					}
					curr_voice.draw(ctx_nrnest_sbl.context, curr_sys[voici].joinStaff);
					// voice.draw(ctx, join_staves);
				}
			}
		}
	}

	// Turn all blue notes in bars either side back to black.
	var loBarNo = [hiBarNo - 1, hiBarNo + 1];
	console.log('loBarNo:', loBarNo);
	for (bari = 0; bari < loBarNo.length; bari++){
		// Determine the system to which this bar belongs.
		var sysi = undefined;
		var sbl = ctx_nrnest_sbl.systemBarLimits;
		var sbli = 0;
		while (sbli < sbl.length){
			if (loBarNo[bari] >= sbl[sbli].systemBarBegin &&
					loBarNo[bari] <= sbl[sbli].systemBarEnd){
				sysi = sbli;
				sbli = sbl.length - 1;
			}
			sbli++;
		}
		console.log('loBarNo = ' + loBarNo[bari] + ', and belongs to system ' + sysi);

		var curr_sys = ctx_nrnest_sbl.notesRestsNest[sysi];
		// console.log('curr_sys:', curr_sys);
		if (curr_sys !== undefined){
			for (voici = 0; voici < curr_sys.length; voici++){
				var curr_voice = curr_sys[voici].voice;
				// console.log('curr_voice:', curr_voice);
				var curr_notesRests = curr_sys[voici].notesRests;
				// console.log('curr_notesRests:', curr_notesRests);
				if (curr_notesRests !== undefined){
					for (nri = 0; nri < curr_notesRests.length; nri++){
						curr_nr = curr_notesRests[nri];
						if (curr_nr.fj_inhr !== undefined &&
								curr_nr.fj_inhr.barOn == loBarNo[bari]){
							for (keyi = 0; keyi < curr_nr.keys.length; keyi++){
								if (curr_nr.note_heads[keyi].style !== undefined &&
										curr_nr.note_heads[keyi].style.fillStyle == "blue" &&
										curr_nr.note_heads[keyi].style.strokeStyle == "blue"){
									curr_nr.setKeyStyle(
										keyi,
										{ fillStyle: "black", strokeStyle: "black" }
									);
								}
							}
						}
					}
					curr_voice.draw(ctx_nrnest_sbl.context, curr_sys[voici].joinStaff);
					// voice.draw(ctx, join_staves);
				}
			}
		}
	}


	//ctx_note_voice_join_staves[1].setKeyStyle(
	//	0,
	//	{fillStyle: "blue", strokeStyle: "blue"}
	//);
	//ctx_note_voice_join_staves[2].draw(ctx_note_voice_join_staves[0], ctx_note_voice_join_staves[3]);
	//console.log('a_note.note_heads[0].style:', ctx_note_voice_join_staves[1].note_heads[0].style)
	return;
}



// Start with four helper functions:
// getUnique, points_belonging_to_interval, and segment.

// CDC: Tom I think we can do this for getUnique on any array:

// var unique=[1,1,22,2,2,2,3,4,5].filter(function(el,i,a){ return i==a.indexOf(el); });
// console.log(unique);

// function getUnique(inarray) {
//   var a = [];

//   for (var i=0,l = inarray.length; i<l; i++){
//     if (a.indexOf(inarray[i]) === -1){
//     	a.push(inarray[i]);
//     }
//    }
//   return a;
// }

function points_belonging_to_interval(notes, a, b){
  var L = notes.length;
  //console.log(notes);
  var segment = new Array(L);
  var i = 0;
  var j = 0;
  while (i < L) {
    if (notes[i].ontime <b && notes[i].offtime > a) {
      segment[j] = notes[i];
      j++;

    }
    if (notes[i].ontime < a) {
      // This conditional is probably obsolete!
    }
    if (notes[i].ontime >=b) {
		  // I removed this conditional because the way this function was being
			// used in the VexFlow rendering, we couldn't assume ontimes were
			// strictly ascending here.
      // i=L;
    }
    i++;
  }
  return segment.slice(0,j);
}

function segment(notes){
  // Tom Collins 25/10/2011.
  // This function will take notes as input, calculate the unique ontimes and
  // offtimes, and return collections of notes that sound at each of the
  // unique times.

  // Get all the ontimes.
  // var notes = json_score.notes;
  var L = notes.length;
  var ontimes = new Array(L);
  // var duration = new Array(L);

  for (i = 0; i < L; i++){
    ontimes[i] = notes[i].ontime;
  }
	// console.log(ontimes);
  // Get all the offtimes.
  var offtimes = new Array(L);
  for (i = 0; i < L; i++){
    offtimes[i] = notes[i].offtime;
  }
  // console.log(offtimes);

	// Calculate the unique times.
  var onofftimes = new Array(L * 2);
  onofftimes = ontimes.concat(offtimes);
  onofftimes.sort(function(a, b){return a-b});
  var uniquetimes = onofftimes.filter(function(el,i,a){ return i==a.indexOf(el); });
  // console.log(uniquetimes);

	// For each unique time, find the notes that sound at this time.
  var d = uniquetimes.length;
  var groups = [];

	for (var k=0; k<d-1; k++){
    var a = uniquetimes[k];
    var b = uniquetimes[k+1];
    groups[k] = { "ontime":a, "offtime":b,
    "notes":points_belonging_to_interval(notes, a, b) };
  }
  return groups;
}

// The next four functions are copied from maia-util. I would prefer they
// remained there and could be referenced using require...
row_of_max_bar_leq_bar_arg = function(bar, time_sigs_array){
  // Tom Collins 17/10/2014.
  // In
  // bar Integer mandatory
  // time_sigs_array Array mandatory
  // Out Array
  // This function returns the row (in a list of time signatures) of the
  // maximal bar number less than or equal to the bar number argument.

	var bar_out = time_sigs_array[0];
  var i = 0;
  var n = time_sigs_array.length;
  while (i < n) {
    if (bar < time_sigs_array[i]["barNo"]){
      bar_out = time_sigs_array[i - 1];
      i = n - 1;
    }
    else if (bar == time_sigs_array[0]["barNo"]){
      bar_out = time_sigs_array[i];
      i = n - 1;
    }
    else if (i == n - 1){
      bar_out = time_sigs_array[i];
    }
    i=i+1;
  }
  return bar_out;
}

row_of_max_ontime_leq_ontime_arg = function(ontime, time_sigs_array){
  // Tom Collins 17/10/2014.
  // In
  // ontime Number mandatory
  // time_sigs_array Array mandatory
  // Out Array
  // This function returns the row (in a list of time signatures) of the
  // maximal ontime less than or equal to the ontime argument.

  var ontime_out = time_sigs_array[0];
  var i = 0;
  var n = time_sigs_array.length;
  while (i < n) {
    if (ontime < time_sigs_array[i]["ontime"]){
      ontime_out = time_sigs_array[i - 1];
      i = n - 1;
    }
    else if (ontime == time_sigs_array[0]["ontime"]){
      ontime_out = time_sigs_array[i];
      i = n - 1;
    }
    else if (i == n - 1){
      ontime_out = time_sigs_array[i];
    }
    i=i+1;
  }
  return ontime_out;
}

bar_and_beat_number_of_ontime = function(ontime, time_sigs_array){
  // Tom Collins 17/10/2014.
  // In
  // ontime Number mandatory
  // time_sigs_array Array mandatory
  // Out Array
  // Given an ontime and a time-signature table (with ontimes appended),
  // this function returns the bar number and beat number of that ontime.

  var n = time_sigs_array.length;
  var relevant_row = row_of_max_ontime_leq_ontime_arg(ontime, time_sigs_array);
  if (ontime >= 0) {
    var excess = ontime - relevant_row["ontime"];
    var local_beat_bar = relevant_row["topNo"]*4/relevant_row["bottomNo"];
    var a = [
      relevant_row["barNo"] + Math.floor(excess/local_beat_bar),
      (excess % local_beat_bar) + 1
    ];
  }
  else {
    var anacrusis_beat = time_sigs_array[0]["topNo"] + ontime + 1;
    var a = [0, anacrusis_beat];
  }
  return a;
};

ontime_of_bar_and_beat_number = function(bar, beat, time_sigs_array){
  // Tom Collins 17/10/2014.
  // In
  // bar Integer mandatory
  // beat Number mandatory
  // time_sigs_array Array mandatory
  // Out Number
  // Given a bar and beat number, and a time-signature table (with ontimes
  // appended), this function returns the ontime of that bar and beat
  // number.

  var n = time_sigs_array.length;
  var relevant_row = row_of_max_bar_leq_bar_arg(bar, time_sigs_array);
  var excess = bar - relevant_row["barNo"];
  var local_beat_bar = relevant_row["topNo"]*4/relevant_row["bottomNo"];
  var a = relevant_row["ontime"] + excess*local_beat_bar + beat - 1;
  return a;
};

// Example:
// ontime_of_bar_and_beat_number(3, 1.5,
//  [{ "barNo":1, "topNo":2, "bottomNo":4, "ontime":0 },
//   { "barNo":2, "topNo":3, "bottomNo":8, "ontime":2 },
//   { "barNo":4, "topNo":3, "bottomNo":4, "ontime":5 },
//   { "barNo":7, "topNo":5, "bottomNo":8, "ontime":14 }])


// This function is copied from candidates/commandments/array_operations.js. I
// would prefer it remained there and could be referenced using require...
function copy_array_object(arr){
  // Tom Collins 21/2/2015.
  // This function returns an independent copy of an array object.

  var arr2 = JSON.parse(JSON.stringify(arr));
  return arr2;
}


function max_argmax(arr){
  // Tom Collins 21/10/2014.
  // In
  // arr Array mandatory
  // Out Array
  // Returns the maximum element in an array and its index (argument).

  var max = arr[0];
  var maxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return [max, maxIndex];

  // CDC said the following is the same, but it does not retain the index of
  // the maximum element:
  // return arr.reduce(function(a, b){ return a > b?a:b; }, arr[0]);
}


function min_argmin(arr){
  // Tom Collins 21/10/2014.
  // Returns the minimum element in an array and its index (argument).

  var min = arr[0];
  var minIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      minIndex = i;
      min = arr[i];
    }
  }
  return [min, minIndex];
}

// Example:
// var ans = min_argmin([9, -2, 4, 11, -5]);
// console.log(ans); // Should give [-5, 4].


// This function is copied from candidates/musicxml/utility.js. I would prefer
// it remained there and could be referenced using require...
function default_page_and_system_breaks(staff_and_clef_names, final_bar_no){
   // Tom Collins 1/3/2015
   // If the page_breaks and system_breaks variables are empty, this function
   // will populate them with default values based on the number of staves and
   // bars.

   var page_breaks = [];
   var system_breaks = [];
   var nos_staves = staff_and_clef_names.length;
   switch (nos_staves){
      case 1:
         var sbreak = 4;
         var pbreak = 10*sbreak;
         break;
      case 2:
         var sbreak = 4;
         var pbreak = 5*sbreak;
         break;
      case 3:
         var sbreak = 4;
         var pbreak = 3*sbreak;
         break;
      case 4:
         var sbreak = 4;
         var pbreak = 2*sbreak;
         break;
      case 5:
         var sbreak = 4;
         var pbreak = 2*sbreak;
         break;
      case 6:
         var sbreak = 4;
         var pbreak = 2*sbreak;
         break;
      default:
         var sbreak = 4;
         var pbreak = sbreak;
         break;
   }
   var curr_bar = sbreak;
   while (curr_bar < final_bar_no){
      if (curr_bar%pbreak == 0){
         page_breaks.push(curr_bar + 1);
      }
      else{
         system_breaks.push(curr_bar + 1);
      }
      curr_bar = curr_bar + sbreak;
   }
   return [page_breaks, system_breaks];
}



// CDC: should be able to do:


// var Sum = [1, 2, 3].reduce(function (a, b) { return a + b; }, 0);
// console.log('Sum: '+Sum)


// This one is copied from array operations and I'd prefer it stayed there.
// function array_sum(an_array){
// 		// Tom Collins 14/3/2015
// 		// Returns the sum of elements of an array.

// 		var count = 0;
// 		for(var i = 0, n = an_array.length; i < n; i++){
// 				count += an_array[i];
// 		}
// 		return count;
// }



function system_page_breaks2system_bar_limits(
  page_breaks, system_breaks, staff_and_clef_names, time_sigs,
  bar_crotchet_beats, first_bar, last_bar){
		// Tom Collins 14/3/2015.
		// This function takes the page break and system break arrays from the
		// pageLayout property of a json_score variable, as well as the staff and
		// clef names and number of crotchet beats in each bar and the first and
		// last bar numbers in a piece (which won't necessarily be specified in the
		// page and system layout information). It outputs an array with one
		// element per system. This element specifies the bar numbers with which
		// the system should begin and end.

		var system_bar_limits = [];
		// If the page or system breaks are empty, populate them with default
		// values.
		if (page_breaks.length == 0 || system_breaks.length == 0){
				var page_and_system_breaks
				  = default_page_and_system_breaks(staff_and_clef_names, last_bar);
				page_breaks = page_and_system_breaks[0];
				system_breaks = page_and_system_breaks[1];
				// console.log('page_breaks.length:', page_breaks.length);
				// console.log('system_breaks:', system_breaks);
		}
		// If they are still empty it must be because the piece requires only one
		// page and one system.
		if (page_breaks.length == 0 && system_breaks.length == 0){
				var first_system_bar_end = last_bar;
		}
		else{
				// Work out whether the first system ending is due to a system break or
				// page break.
				if (page_breaks.length == 0 || system_breaks[0] < page_breaks[0]){
						var first_system_bar_end = system_breaks.shift() - 1;
						var next_break = "system";
				}
				else{
						var first_system_bar_end = page_breaks.shift() - 1;
						var next_break = "page";
				}
		}
		var break_type = "beginning of piece";

		var nos_crotchet_beats
		  = bar_crotchet_beats.slice(first_bar, first_system_bar_end + 1).reduce(function (a, b) { return a + b; }, 0);;
    // 22/11/2015. Inserted these to handle mid-system (and mid-bar) clef changes.
    var ontime = ontime_of_bar_and_beat_number(first_bar, 1, time_sigs);
    var offtime = ontime_of_bar_and_beat_number(first_system_bar_end + 1, 1, time_sigs);
		system_bar_limits.push({ systemBarBegin: first_bar,
                             systemOntime: ontime,
												     systemBarEnd: first_system_bar_end,
                             systemOfftime: offtime,
													   nosCrotchetBeats: nos_crotchet_beats,
													   breakType: break_type });
		// Iterate over the entries of page and system breaks to populate
		// subsequent entries of system_bar_limits.
		var breki = 1;
		while (page_breaks.length > 0 || system_breaks.length > 0){
				// console.log('Got to here!');
				var system_bar_begin = system_bar_limits[breki - 1].systemBarEnd + 1;
				var break_type = next_break;
				// Work out whether this system ending is due to a system break or page
				// break.
				if (page_breaks.length == 0 || system_breaks[0] < page_breaks[0]){
						var system_bar_end = system_breaks.shift() - 1;
						var next_break = "system";
				}
				else{
						var system_bar_end = page_breaks.shift() - 1;
						var next_break = "page";
				}
				var nos_crotchet_beats
				  = bar_crotchet_beats.slice(system_bar_begin, system_bar_end + 1).reduce(function (a, b) { return a + b; }, 0);;
        // 22/11/2015. Inserted these to handle mid-system (and mid-bar) clef changes.
        var ontime = ontime_of_bar_and_beat_number(system_bar_begin, 1, time_sigs);
        var offtime = ontime_of_bar_and_beat_number(system_bar_end + 1, 1, time_sigs);
				system_bar_limits.push({ systemBarBegin: system_bar_begin,
                                 systemOntime: ontime,
                                 systemBarEnd: system_bar_end,
                                 systemOfftime: offtime,
																 nosCrotchetBeats: nos_crotchet_beats,
																 breakType: break_type });
				breki++;
		}
		// Populate final entry of system_bar_limits.
		if (system_bar_limits.length > 0 && next_break !== undefined){
				// There is a last element that needs populating.
				var system_bar_begin = system_bar_limits[breki - 1].systemBarEnd + 1;
				var break_type = next_break;
				var nos_crotchet_beats
				  = bar_crotchet_beats.slice(system_bar_begin).reduce(function (a, b) { return a + b; }, 0);;
        // 22/11/2015. Inserted these to handle mid-system (and mid-bar) clef changes.
        var ontime = ontime_of_bar_and_beat_number(system_bar_begin, 1, time_sigs);
        var offtime = ontime_of_bar_and_beat_number(last_bar + 1, 1, time_sigs);
				system_bar_limits.push({ systemBarBegin: system_bar_begin,
                                 systemOntime: ontime,
															   systemBarEnd: last_bar,
                                 systemOfftime: offtime,
																 nosCrotchetBeats: nos_crotchet_beats,
																 breakType: next_break });
		}
		return system_bar_limits;
}


// This is a direct copy of a function from array_operations.js. I'd prefer it
// stayed there.

// CDC: Tom, I think you can accomplish the same thing with :

// var flattenedArray = [].concat.apply([],[[1],[2,3],[4]]);
// console.log(flattenedArray);

// function append_array(an_array){
//   // Tom Collins 23/12/2014.
//   // This function removes one level of brackets from an array.

//   var out_array = [];
//   for (ia = 0; ia < an_array.length; ia++){
//     for (ib = 0; ib < an_array[ia].length; ib++){
//       out_array.push(an_array[ia][ib]);
//     }
//   }
//   return out_array;
// };


function fj_clef2vexflow_clef_str(fj_clef){
		// Tom Collins 15/3/2015.
		// This function converts a clef string from the json score variable to
		// the clef strings used by VexFlow.

		switch (fj_clef){
				case "treble clef":
						var vexflow_clef_str = "treble";
						var octave_shift = 0;
						break;
				case "treble clef 8va":
						var vexflow_clef_str = "treble";
						var octave_shift = 1;
						break;
				case "treble clef 15ma":
						var vexflow_clef_str = "treble";
						var octave_shift = 2;
						break;
				case "treble clef 8vb":
						var vexflow_clef_str = "treble";
						var octave_shift = -1;
						break;
				case "French violin clef":
						var vexflow_clef_str = "french";
						var octave_shift = 0;
						break;
				case "soprano clef":
						var vexflow_clef_str = "soprano";
						var octave_shift = 0;
						break;
				case "mezzo-soprano clef":
						var vexflow_clef_str = "mezzo-soprano";
						var octave_shift = 0;
						break;
				case "alto clef":
						var vexflow_clef_str = "alto";
						var octave_shift = 0;
						break;
				case "tenor clef":
						var vexflow_clef_str = "tenor";
						var octave_shift = 0;
						break;
				case "baritone clef (C clef)":
						var vexflow_clef_str = "baritone-c";
						var octave_shift = 0;
						break;
				case "bass clef":
						var vexflow_clef_str = "bass";
						var octave_shift = 0;
						break;
				case "bass clef 8va":
						var vexflow_clef_str = "bass";
						var octave_shift = 1;
						break;
				case "bass clef 15ma":
						var vexflow_clef_str = "bass";
						var octave_shift = 2;
						break;
				case "bass clef 8vb":
						var vexflow_clef_str = "bass";
						var octave_shift = -1;
						break;
				case "bass clef 15mb":
						var vexflow_clef_str = "bass";
						var octave_shift = -2;
						break;
				case "alto clef":
						var vexflow_clef_str = "alto";
						var octave_shift = 0;
						break;
				case "baritone clef (F clef)":
						var vexflow_clef_str = "bartione-f";
						var octave_shift = 0;
						break;
				case "subbass clef 15mb":
						var vexflow_clef_str = "subbass";
						var octave_shift = 0;
						break;
				// These last two do not seem to be supported from MusicXML import
				// (although tablature information is preserved in notations).
				case "percussion clef":
						var vexflow_clef_str = "percussion";
						var octave_shift = 0;
						break;
				case "tablature":
						var vexflow_clef_str = "treble";
						var octave_shift = 0;
						break;
		}
		return [vexflow_clef_str, octave_shift];
}


function create_ties(voice_split, time_sigs, bar_begin_ends){
		// This function identifies oblong objects that need to be rendered as two
		// or more tied notes, e.g., because: (A) they span more than one bar;
		// (B) there are oblongs in the same staff and voice simultaneously with
		// different durations; (C) the integral duration is not recognised;
		// (D) the oblong extends beyond conventional intra-bar groupings.

		// (A) The variable voice_split_in is an array nested by bar, then staff,
		// then voice. First of all, iterate over it to identifty oblong objects
		// that span more than one bar, and create ties.
		// Add in a check for tablature staves here, because we don't need to do
		// this if it's the type of tablature staff where rhythmic information is
		// not presented.
		const logging = false
    var targ_idx = [];
		for (bari = 0; bari < voice_split.length; bari++){
				for (stafi = 0; stafi < voice_split[bari].length; stafi++){
						for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
								var oblongs = voice_split[bari][stafi][voici];
								for (obloi = oblongs.length - 1; obloi >= 0; obloi--){
										// Check if the oblong begins and ends in different bars.
										// We do this in reverse order because in the next loop we
										// will splice things into an array, and we don't want the
										// indexing to get out of whack.
										if (oblongs[obloi].barOn !== oblongs[obloi].barOff){
												if (oblongs[obloi].barOff == oblongs[obloi].barOn + 1 &&
														oblongs[obloi].beatOff == 1){
														// No need to do anything here. This is the
														// instance where a note ends precisely at the
														// beginning of the next bar.
												}
												else{
														// This is an oblong for which we must create ties,
														// so include its indices in targ_idx.
														targ_idx.push([bari, stafi, voici, obloi]);

												}
										}
								}
						}
				}
		}
		// console.log('targ_idx:');
		// console.log(targ_idx);
		// console.log('time_sigs:');
		// console.log(time_sigs);

		// Iterate over targ_idx, create ties and splice them in.
		for (idxi = 0; idxi < targ_idx.length; idxi++){
				// This is where we could create and return a message.

				var curr_barOn = targ_idx[idxi][0];
				var curr_stafi = targ_idx[idxi][1];
				var curr_voici = targ_idx[idxi][2];
				var curr_obloi = targ_idx[idxi][3];
				var curr_oblong = $.extend({}, voice_split[curr_barOn][curr_stafi][curr_voici][curr_obloi]);
				// new_object =  $.extend({},old_object)
				// var curr_oblong = copy_array_object(voice_split[curr_barOn][curr_stafi][curr_voici][curr_obloi]);
				var new_oblongs = []; // Think this is obsolete.
				var curr_barOff = curr_oblong.barOff - (curr_oblong.beatOff == 1);
				// console.log('[curr_barOn, curr_stafi, curr_voici, curr_obloi, curr_barOff]:');
				// console.log([curr_barOn, curr_stafi, curr_voici, curr_obloi, curr_barOff]);
				for (bari = curr_oblong.barOn;
						 bari <= curr_barOff;
						 bari++){
						var new_oblong = $.extend({}, curr_oblong);
						// var new_oblong = copy_array_object(curr_oblong);
						switch (bari){
								case curr_barOn:
										// Start case. Don't need to modify the ontime, just the
										// offtime and duration.
										new_oblong.barOff = curr_oblong.barOn + 1;
										new_oblong.beatOff = 1;
										new_oblong.offtime = ontime_of_bar_and_beat_number(
											new_oblong.barOff, new_oblong.beatOff, time_sigs);
										// Might need to round this to avoid errors with tuplets.
										new_oblong.duration
										  = new_oblong.offtime - new_oblong.ontime;
										new_oblong.tieType = "start";
										// new_oblongs.push(new_oblong);
										// Splice new_oblong into voice_split.
										voice_split[bari][curr_stafi][curr_voici].splice(curr_obloi, 1, new_oblong);
										break;
								case curr_barOff:
										// End case. Don't need to modify the offtime, just the
										// ontime and duration.
										new_oblong.barOn = curr_barOff;
										new_oblong.beatOn = 1;
										new_oblong.ontime = ontime_of_bar_and_beat_number(
											new_oblong.barOn, new_oblong.beatOn, time_sigs);
										// Might need to round this to avoid errors with tuplets.
										new_oblong.duration
										  = new_oblong.offtime - new_oblong.ontime;
										new_oblong.tieType = "stop";
										// Should probably strip off information relating to grace
										// notes etc. here.

										// Push new_oblong into voice_split.
										if (voice_split[bari] == undefined){
												voice_split[bari] = [];
										}
										if (voice_split[bari][curr_stafi] == undefined){
												voice_split[bari][curr_stafi] = [];
										}
										if (voice_split[bari][curr_stafi][curr_voici] == undefined){
												voice_split[bari][curr_stafi][curr_voici] = [new_oblong];
										}
										else{
												voice_split[bari][curr_stafi][curr_voici].push(new_oblong);
										}
										break;
								default:
										new_oblong.barOn = bari;
										new_oblong.beatOn = 1;
										new_oblong.ontime = ontime_of_bar_and_beat_number(
											new_oblong.barOn, new_oblong.beatOn, time_sigs);
										new_oblong.barOff = bari + 1;
										new_oblong.beatOff = 1;
										new_oblong.offtime = ontime_of_bar_and_beat_number(
											new_oblong.barOff, new_oblong.beatOff, time_sigs);
										// Might need to round this to avoid errors with tuplets.
										new_oblong.duration
										  = new_oblong.offtime - new_oblong.ontime;
										new_oblong.tieType = "stop and start";
										// Should probably strip off information relating to grace
										// notes etc. here.

										// Push new_oblong into voice_split.
										if (voice_split[bari] == undefined){
												voice_split[bari] = [];
										}
										if (voice_split[bari][curr_stafi] == undefined){
												voice_split[bari][curr_stafi] = [];
										}
										if (voice_split[bari][curr_stafi][curr_voici] == undefined){
												voice_split[bari][curr_stafi][curr_voici] = [new_oblong];
										}
										else{
												voice_split[bari][curr_stafi][curr_voici].push(new_oblong);
										}
										break;
						}
				}
		}

		// The oblong objects in voice_split are no longer necessarily ordered by
		// ontime, so sort them by ontime here.
		// for (bari = 0; bari < voice_split.length; bari++){
		//		for (stafi = 0; stafi < voice_split[bari].length; stafi++){
		//				for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
		//						voice_split[bari][stafi][voici].sort(
    //               function(a,b){return a.ontime - b.ontime;});
		//				}
		//		}
		// }

		// Instead of just sorting by ontime, let's segment them here.
		// The segment function includes an ontime sort anyway.
		for (bari = 0; bari < voice_split.length; bari++){
				for (stafi = 0; stafi < voice_split[bari].length; stafi++){
						for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
								voice_split[bari][stafi][voici] = segment(voice_split[bari][stafi][voici]);
						}
				}
		}

		// (A/B) It seems like here would be a good place as well to check that
		// user-specified notes and rests do not contradict one another, and to let
		// user-specified notes prevail over rests where there are contradictions.
		for (bari = 0; bari < voice_split.length; bari++){
				for (stafi = 0; stafi < voice_split[bari].length; stafi++){
						for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
								var segments = voice_split[bari][stafi][voici];
								// Iterate over each segment.
								for (segmi = 0; segmi < segments.length; segmi++){
										var notes_and_rests = segments[segmi].notes;
										// Check for the presence of both notes and rests in a
										// segment. If both are present, throw out the rest(s).
										var notep = false;
										// The check here is to set notep to true, if there are
										// notes present.
										var nri = 0;
										while (nri < notes_and_rests.length){
												if (notes_and_rests[nri].pitch){
														notep = true;
														nri = notes_and_rests.length - 1;
												}
												nri++;
										}
										// If there were notes present, now go back through
										// notes_and_rests and throw out any rests.
										if (notep){
												for (nri = notes_and_rests.length - 1; nri >= 0; nri--){
														if (notes_and_rests[nri].pitch == undefined){
																// This is where we could create and return a message.

																notes_and_rests.splice(nri, 1);
														}
												}
										}

								}
						}
				}
		}

		// Alter notes if they extend beyond the segment limits. Then insert
		// missing rests.
		for (bari = 0; bari < voice_split.length; bari++){
				for (stafi = 0; stafi < voice_split[bari].length; stafi++){
						for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
								voice_split[bari][stafi][voici] =
								  truncate_notes2time_intervals(bar_begin_ends[bari], bari,
																								voice_split[bari][stafi][voici]);
								voice_split[bari][stafi][voici] =
								  fill_missing_time_intervals(
								    bar_begin_ends[bari], bari, stafi, voici,
										voice_split[bari][stafi][voici]);
						}
				}
		}

    // (C) Begin by creating an array of notes whose integral durations are not
    // recognised.
    var permissible_durations = [
      6, 4.5, 4, 3, 2, 1.75, 1.5, 1, 0.75, 0.5, 0.375, 0.25, 0.125, 0.0625
    ];
    targ_idx = [];
		for (bari = 0; bari < voice_split.length; bari++){
      for (stafi = 0; stafi < voice_split[bari].length; stafi++){
        for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
          var segments = voice_split[bari][stafi][voici];
          // Iterate over each segment. Check if the segment duration is
          // recognised. We do this in reverse order because in the next loop
          // we will splice things into an array, and we don't want the
          // indexing to get out of whack.
          for (segmi = segments.length - 1; segmi >= 0; segmi--){
            if (permissible_durations.indexOf(
                  segments[segmi].offtime - segments[segmi].ontime) == -1){
              targ_idx.push([bari, stafi, voici, segmi]);
            }
          }
        }
      }
		}
		// console.log('targ_idx:');
		// console.log(targ_idx);
    for (i = 0; i < Math.min(targ_idx.length, 4); i++){
			if (logging){
	      console.log('Some naughties!:')
	      console.log(voice_split[targ_idx[i][0]][targ_idx[i][1]][targ_idx[i][2]][targ_idx[i][3]])
			}
    }
    // Iterate over targ_idx, create ties and splice them in.
		for (idxi = 0; idxi < targ_idx.length; idxi++){
      // This is where we could create and return a message.

      var curr_bari = targ_idx[idxi][0];
      var curr_stafi = targ_idx[idxi][1];
      var curr_voici = targ_idx[idxi][2];
      var curr_segmi = targ_idx[idxi][3];
      var curr_seg = voice_split[curr_bari][curr_stafi][curr_voici][curr_segmi];
      // console.log('curr_seg:');
      // console.log(curr_seg);
      var curr_dur = curr_seg.offtime - curr_seg.ontime;
      var m_argm = min_argmin(permissible_durations.map(
        function(a){
          return Math.abs(a - curr_dur);
        }
      ));
      var resd_dur = m_argm[0];
      clst_dur = permissible_durations[m_argm[1]];
      // console.log('clst_dur:');
      // console.log(clst_dur);
      // console.log('resd_dur:');
      // console.log(resd_dur);
      if (permissible_durations.indexOf(resd_dur) !== -1){
        // Make two segments from where there was only one before!
        // NEEDS ATTENTION.

      }

    }

		return voice_split;
}


function create_textnote_durations(voice_split, time_sigs, bar_begin_ends){
		// This function assigns durations to textnotes if they are not assigned
    // already, and identifies durations that need to be truncated for the
    // purposes of VexFlow rendering (which we're keeping within the bar for)
    // now. It also identifies textnoes in the same staff and voice
    // simultaneously and returns a warning that (1) only the first of these
    // will be rendered, and (2) the others should be moved to voices 2, 3, or
    // 4..

		// The variable voice_split_in is an array nested by bar, then staff, then
		// voice. First of all, iterate over it to identifty textnotes that span
    // more than one bar, and truncate them.
    // var targ_idx = []; // Inherited, and deprecated for now.
		const logging = false
		if (voice_split == undefined){
			return voice_split;
		}
		for (bari = 0; bari < voice_split.length; bari++){
      for (stafi = 0; stafi < voice_split[bari].length; stafi++){
        for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
          var tn = voice_split[bari][stafi][voici];
          for (tni = tn.length - 1; tni >= 0; tni--){
            if (tn[tni].ontime == 3.5){
              // console.log('bar_begin_ends: ', bar_begin_ends);
              // console.log('bari: ', bari);
              // console.log('tn[tni]: ', tn[tni]);
            }
            // Assign duration if it is not defined.
            if (tn[tni].duration == undefined){
              tn[tni].duration = 1;
            }
            // Assign offtime if it is not defined or contradicts.
            if (tn[tni].offtime == undefined ||
                tn[tni].offtime !== tn[tni].ontime + tn[tni].duration){
              tn[tni].offtime = tn[tni].ontime + tn[tni].duration;
              if (tn[tni].offtime > bar_begin_ends[bari][1]){
                tn[tni].offtime = bar_begin_ends[bari][1];
                tn[tni].duration = tn[tni].offtime - tn[tni].ontime;
              }
            }
            // Assign barOff and beatOff if it is not defined, or contradicts.
            var bnb = bar_and_beat_number_of_ontime(tn[tni].offtime, time_sigs);
            if (tn[tni].ontime == 3.5){
              // console.log('bnb: ', bnb);
            }
            if (tn[tni].barOff == undefined || tn[tni].beatOff == undefined ||
                tn[tni].barOff !== bnb[0] || tn[tni].beatOff !== bnb[1]){
              tn[tni].barOff = bnb[0];
              tn[tni].beatOff = bnb[1];
            }
            // Check if the textnote begins and ends in different bars.
            // We do this in reverse order because it was inherited
            // from another function where splicing into an array was
            // necessary in the next step.
            if (tn[tni].barOn !== tn[tni].barOff){
              if (tn[tni].barOff == tn[tni].barOn + 1 &&
                tn[tni].beatOff == 1){
                // No need to do anything here. This is the
                // instance where a note ends precisely at the
                // beginning of the next bar.
              }
              else {
                // This is a textnote for which we need to truncate the
                // duration.
                tn[tni].barOff = tn[tni].barOn + 1;
                tn[tni].beatOff == 1;
                tn[tni].offtime = ontime_of_bar_and_beat_number(
                  tn[tni].barOff, tn[tni].beatOff, time_sigs);
                tn[tni].duration = tn[tni].offtime - tn[tni].ontime;
                // targ_idx.push([bari, stafi, voici, tni]);
              }
            }
          }
        }
      }
		}
		// console.log('targ_idx:');
		// console.log(targ_idx);
		// console.log('time_sigs:');
		// console.log(time_sigs);

		// The oblong objects in voice_split are no longer necessarily ordered by
		// ontime, so sort them by ontime here.
		// for (bari = 0; bari < voice_split.length; bari++){
		//		for (stafi = 0; stafi < voice_split[bari].length; stafi++){
		//				for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
		//						voice_split[bari][stafi][voici].sort(
    //               function(a,b){return a.ontime - b.ontime;});
		//				}
		//		}
		// }

		// Instead of just sorting by ontime, let's segment them here.
		// The segment function includes an ontime sort anyway.
		for (bari = 0; bari < voice_split.length; bari++){
      for (stafi = 0; stafi < voice_split[bari].length; stafi++){
        for (voici = 0; voici < voice_split[bari][stafi].length; voici++){

          //if (bari == 1 && stafi == 0 && voici == 0){
          //  console.log('voice_split[1][0][0]: ', voice_split[bari][stafi][voici]);
          //}

          voice_split[bari][stafi][voici] = segment(voice_split[bari][stafi][voici]);

          //if (bari == 1 && stafi == 0 && voici == 0){
          //  console.log('voice_split[1][0][0]: ', voice_split[bari][stafi][voici]);
          //}

        }
      }
		}

		// Alert if there are multiple textnotes in the same segment. Then insert
		// missing rests.
		for (bari = 0; bari < voice_split.length; bari++){
      for (stafi = 0; stafi < voice_split[bari].length; stafi++){
        for (voici = 0; voici < voice_split[bari][stafi].length; voici++){

          var seg_lengths = voice_split[bari][stafi][voici].map(function(a){
            return a.notes.length;
          });
          var seg_length_max = max_argmax(seg_lengths);
          if (bari == 1 && stafi == 0 && voici == 0){
						if (logging){
							console.log('seg_length_max: ', seg_length_max)
						}
          }
          if (seg_length_max[0] > 1){
						if (logging){
							console.log(
								'There were multiple textnotes in the same staff and' +
								' voice. Only the first will be rendered. Bar ' +
								bari + ', staff ' + stafi +  ', voice ' + voici + '.'
							)
						}
          }
          var segs = voice_split[bari][stafi][voici];
          for (segi = 0; segi < segs.length; segi++){
            if (segs[segi].notes.length > 1){
              segs[segi].notes = [segs[segi].notes[0]];
            }
          }
          voice_split[bari][stafi][voici] = segs;

          //voice_split[bari][stafi][voici] =
          //  truncate_notes2time_intervals(bar_begin_ends[bari], bari,
          //                                voice_split[bari][stafi][voici]);
          voice_split[bari][stafi][voici] =
            fill_missing_time_intervals(
              bar_begin_ends[bari], bari, stafi, voici,
              voice_split[bari][stafi][voici]);
        }
      }
		}

    // Now we will check the note durations. Begin by creating an array of
    // notes whose integral durations are not recognised.
    var permissible_durations = [
      6, 4.5, 4, 3, 2, 1.75, 1.5, 1, 0.75, 0.5, 0.375, 0.25, 0.125, 0.0625
    ];
    targ_idx = [];
		for (bari = 0; bari < voice_split.length; bari++){
      for (stafi = 0; stafi < voice_split[bari].length; stafi++){
        for (voici = 0; voici < voice_split[bari][stafi].length; voici++){
          var segments = voice_split[bari][stafi][voici];
          // Iterate over each segment. Check if the segment duration is
          // recognised. We do this in reverse order because in the next loop
          // we will splice things into an array, and we don't want the
          // indexing to get out of whack.
          for (segmi = segments.length - 1; segmi >= 0; segmi--){
            if (permissible_durations.indexOf(
                segments[segmi].offtime - segments[segmi].ontime) == -1){
              targ_idx.push([bari, stafi, voici, segmi]);
            }
          }
        }
      }
		}
		// console.log('targ_idx:');
		// console.log(targ_idx);
    for (i = 0; i < Math.min(targ_idx.length, 4); i++){
			if (logging){
	      console.log('Some expression naughties!:')
	      console.log(voice_split[targ_idx[i][0]][targ_idx[i][1]][targ_idx[i][2]][targ_idx[i][3]])
			}
    }
    // Iterate over targ_idx, create ties and splice them in.
		for (idxi = 0; idxi < targ_idx.length; idxi++){
      // This is where we could create and return a message.

      var curr_bari = targ_idx[idxi][0];
      var curr_stafi = targ_idx[idxi][1];
      var curr_voici = targ_idx[idxi][2];
      var curr_segmi = targ_idx[idxi][3];
      var curr_seg = voice_split[curr_bari][curr_stafi][curr_voici][curr_segmi];
      // console.log('curr_seg:');
      // console.log(curr_seg);
      var curr_dur = curr_seg.offtime - curr_seg.ontime;
      var m_argm = min_argmin(permissible_durations.map(
        function(a){
          return Math.abs(a - curr_dur);
        }
      ));
      var resd_dur = m_argm[0];
      clst_dur = permissible_durations[m_argm[1]];
      // console.log('clst_dur:');
      // console.log(clst_dur);
      // console.log('resd_dur:');
      // console.log(resd_dur);
      if (permissible_durations.indexOf(resd_dur) !== -1){
        // Make two segments from where there was only one before!
        // NEEDS ATTENTION.

      }

    }


		return voice_split;
}


function truncate_notes2time_intervals(bar_begin_end, bar_no, segments){
		// Tom Collins 18/3/2015.
		// This function searches for notes that extend beyond segments to which
		// they belong. It creates a copy of such notes and modifies their ontime,
		// barOn, beatOn, offtime, barOff, beatOff, duration, and tieType
		// properties, so that they will appear tied in the staff notation.

		for (segmi = 0; segmi < segments.length; segmi++){
				if (segments[segmi].notes !== undefined){
						curr_notes = segments[segmi].notes;
						for (notei = 0; notei < curr_notes.length; notei++){
								// Check whether the note extends beyond the segment to which
								// it belongs.
								if (curr_notes[notei].ontime < segments[segmi].ontime ||
										curr_notes[notei].offtime > segments[segmi].offtime){
										// It does extend and will need altering.
										var new_note = $.extend({}, curr_notes[notei]);
										// Check if ontime-related information needs altering.
										var ontime_adj = false;
										if (curr_notes[notei].ontime < segments[segmi].ontime){
												// The ontime-related information does need altering.
												// This is where we could create and return a message.

												ontime_adj = true;
												new_note.ontime = segments[segmi].ontime;
												new_note.barOn = bar_no;
												new_note.beatOn = new_note.ontime - bar_begin_end[0] + 1;
												new_note.tieType = "stop";
										}
										// Check if offtime-related information needs altering.
										var offtime_adj = false;
										if (curr_notes[notei].offtime > segments[segmi].offtime){
												// The offtime-related information does need altering.
												// This is where we could create and return a message.

												offtime_adj = true;
												new_note.offtime = segments[segmi.offtime];
												if (segments[segmi].offtime == bar_begin_end[1]){
														new_note.barOff = bar_no + 1;
														new_note.beatOff = 1;
												}
												else {
														new_note.barOff = bar_no;
														new_note.beatOff = new_note.offtime - bar_begin_end[0] + 1;
												}
												new_note.tieType = "start";
										}
										new_note.duration = new_note.offtime - new_note.ontime;
										if (ontime_adj && offtime_adj){
												new_note.tieType = "stop and start";
										}
										// Replace the old note with the new note in segments.
										segments[segmi].notes.splice(notei, 1, new_note);
								}
						}
				}
		}
		return segments;
}


function fill_missing_time_intervals(bar_begin_end, bar_no, staff_no,
																		 voice_no, segments){
		// Tom Collins 17/3/2015.
		// This function inserts rests into missing time intervals in the segments
		// that make up a bar. We can assume that even if the user did not write
		// anything in this bar, default bar-long rests have been inserted already,
		// so segments is never an empty argument.

		// Check whether the first segment begins at the beginning of the bar.
		if (segments[0].ontime !== bar_begin_end[0]){
				// Insert a default rest at the bar's beginning.
				// This is where we could create and return a message.

				var new_seg = {};
				new_seg.ontime = bar_begin_end[0];
				new_seg.offtime = segments[0].ontime;
				var default_rest =
					{ id: "null", barOn: bar_no,
					  beatOn: new_seg.ontime - bar_begin_end[0] + 1,
						ontime: new_seg.ontime,
						barOff: bar_no,
						beatOff: new_seg.offtime - bar_begin_end[0] + 1,
						offtime: new_seg.offtime,
						duration: new_seg.offtime - new_seg.ontime,
						staffNo: staff_no, voiceNo: voice_no };
				new_seg.notes = [default_rest];
				segments.unshift(new_seg);
		}

		// Check whether the last segment ends at the end of the bar.
		if (segments[segments.length - 1].offtime !== bar_begin_end[1]){
				// Insert a default rest at the bar's end.
				// This is where we could create and return a message.

				var new_seg = {};
				new_seg.ontime = segments[segments.length - 1].offtime;
				new_seg.offtime = bar_begin_end[1];
				var default_rest =
					{ id: "null", barOn: bar_no,
						beatOn: new_seg.ontime - bar_begin_end[0] + 1,
						ontime: new_seg.ontime,
						barOff: bar_no + 1,
						beatOff: 1,
						offtime: new_seg.offtime,
						duration: new_seg.offtime - new_seg.ontime,
						staffNo: staff_no, voiceNo: voice_no };
				new_seg.notes = [default_rest];
				segments.push(new_seg);
		}

    // Seems to me it's possible that a missing time interval could also occur
    // partway through a bar, but we are not taking that into account right
    // now. THIS MAY NEED ADDRESSING!
    // if (new_seg == undefined){
    //   console.log('segments:');
    //   console.log(segments);
    // }

		// Fill in any empty segments with rests.
		for (segmi = 0; segmi < segments.length; segmi++){
				if (segments[segmi].notes.length == 0){
						// This is where we could create and return a message.

						if (segments[segmi].offtime == bar_begin_end[1]){
								var curr_bar_off = bar_no + 1;
								var curr_beat_off = 1;
						}
						else {
								var curr_bar_off = bar_no;
								var curr_beat_off = segments[segmi].offtime - bar_begin_end[0] + 1;
						}
						var default_rest =
						{ id: "null", barOn: bar_no,
							beatOn: segments[segmi].ontime - bar_begin_end[0] + 1,
							ontime: segments[segmi].ontime,
							barOff: curr_bar_off,
							beatOff: curr_beat_off,
							offtime: segments[segmi].offtime,
							duration: segments[segmi].offtime - segments[segmi].ontime,
							staffNo: staff_no, voiceNo: voice_no };
						segments[segmi].notes = [default_rest];
				}
		}
		// console.log('segments:');
		// console.log(segments);

		return segments;
}


function fill_intervals_for_textnotes(bar_begin_end, bar_no, staff_no,
																		 voice_no, segments){
		// Tom Collins 19/7/2016.
		// This function inserts rests into missing time intervals in the segments
		// that make up a bar. We can assume that even if the user did not write
		// anything in this bar, default bar-long rests have been inserted already,
		// so segments is never an empty argument.

		// Check whether the first segment begins at the beginning of the bar.
		if (segments[0].ontime !== bar_begin_end[0]){
				// Insert a default rest at the bar's beginning.
				// This is where we could create and return a message.

				var new_seg = {};
				new_seg.ontime = bar_begin_end[0];
				new_seg.offtime = segments[0].ontime;
				var default_rest =
					{ id: "null", barOn: bar_no,
					  beatOn: new_seg.ontime - bar_begin_end[0] + 1,
						ontime: new_seg.ontime,
						barOff: bar_no,
						beatOff: new_seg.offtime - bar_begin_end[0] + 1,
						offtime: new_seg.offtime,
						duration: new_seg.offtime - new_seg.ontime,
						staffNo: staff_no, voiceNo: voice_no };
				new_seg.notes = [default_rest];
				segments.unshift(new_seg);
		}

		// Check whether the last segment ends at the end of the bar.
		if (segments[segments.length - 1].offtime !== bar_begin_end[1]){
				// Insert a default rest at the bar's end.
				// This is where we could create and return a message.

				var new_seg = {};
				new_seg.ontime = segments[segments.length - 1].offtime;
				new_seg.offtime = bar_begin_end[1];
				var default_rest =
					{ id: "null", barOn: bar_no,
						beatOn: new_seg.ontime - bar_begin_end[0] + 1,
						ontime: new_seg.ontime,
						barOff: bar_no + 1,
						beatOff: 1,
						offtime: new_seg.offtime,
						duration: new_seg.offtime - new_seg.ontime,
						staffNo: staff_no, voiceNo: voice_no };
				new_seg.notes = [default_rest];
				segments.push(new_seg);
		}

    // Seems to me it's possible that a missing time interval could also occur
    // partway through a bar, but we are not taking that into account right
    // now. THIS MAY NEED ADDRESSING!
    // if (new_seg == undefined){
    //   console.log('segments:');
    //   console.log(segments);
    // }

		// Fill in any empty segments with rests.
		for (segmi = 0; segmi < segments.length; segmi++){
				if (segments[segmi].notes.length == 0){
						// This is where we could create and return a message.

						if (segments[segmi].offtime == bar_begin_end[1]){
								var curr_bar_off = bar_no + 1;
								var curr_beat_off = 1;
						}
						else {
								var curr_bar_off = bar_no;
								var curr_beat_off = segments[segmi].offtime - bar_begin_end[0] + 1;
						}
						var default_rest =
						{ id: "null", barOn: bar_no,
							beatOn: segments[segmi].ontime - bar_begin_end[0] + 1,
							ontime: segments[segmi].ontime,
							barOff: curr_bar_off,
							beatOff: curr_beat_off,
							offtime: segments[segmi].offtime,
							duration: segments[segmi].offtime - segments[segmi].ontime,
							staffNo: staff_no, voiceNo: voice_no };
						segments[segmi].notes = [default_rest];
				}
		}
		// console.log('segments:');
		// console.log(segments);

		return segments;
}


function expand_written_ties(notes, time_signatures){
		// Tom Collins 15/3/2015
		// This function identifies notes that either have a tie property already
		// defined, and expands them.

		var notes_out = [];
		for (notei = 0; notei < notes.length; notei++){
				if (notes[notei].tie == undefined){
						// This is where clever stuff needs to happen, in terms of checking
						// whether a note spans more than one bar (or more than one beat
						// such that convention dictates it ought to be notated as two or
						// more tied notes).
            // 22/1/2016. Not sure this is where the clever stuff should
            // happen! Search on '(C)' to see more...
						var clever_stuff = false;
						if (clever_stuff){
								// .
						}
						else{
								// If we get here, the note did not have a predefined tie
								// property, and does not seem to require tieing across
								// multiple bars/beats.
								notes_out.push(notes[notei]);
						}
				}
				else{
						// For now, we can assume here that the definition of the tie is
						// complete and correct.
						var curr_expand = notes[notei].tie;
						for (tiei = 0; tiei < curr_expand.length; tiei++){
              if (tiei < curr_expand.length - 1){
                curr_expand[tiei].tieStopID = curr_expand[tiei + 1].ID;
              }
              // Push the notes belonging to the tie property to the new
              // notes array.
              notes_out.push(curr_expand[tiei]);
						}
				}
		}
		return notes_out;
}

function tie_details(vex_tie, details, rel_idx){
  // Tom Collins 15/10/2014.
  // In
  // vex_tie Object mandatory
  // details Array optional
  // rel_idx Integer mandatory
  // Out Integer
  // This function uses details associated with a tie to populate VexFlow tie
  // properties. Because details can be a two-element array of objects when a
  // tie extends from one system to the next, the rel_idx argument specifies
  // which of the two objects is to be used.

  if (details !== undefined && details[rel_idx] !== undefined){
    if (details[rel_idx].firstXShift !== undefined){
      vex_tie.render_options.first_x_shift =
        details[rel_idx].firstXShift;
    }
    if (details[rel_idx].lastXShift !== undefined){
      vex_tie.render_options.last_x_shift =
        details[rel_idx].lastXShift;
    }
    if (details[rel_idx].yShift !== undefined){
      vex_tie.render_options.y_shift =
        details[rel_idx].yShift;
    }
    // Sign of curve points determines upward or downward direction of the tie
    // curve. If the stem of the second note is up, positive values of
    // curvePoint1 or 2 result in downward curving ties, and negative values in
    // upward curving ties. If the stem of the second note is down, positive
    // values of curvePoint1 or 2 result in upward curving ties, and negative
    // values in downward curving ties.
    if (details[rel_idx].curvePoint1 !== undefined){
      vex_tie.render_options.cp1 =
        details[rel_idx].curvePoint1;
    }
    if (details[rel_idx].curvePoint2 !== undefined){
      vex_tie.render_options.cp2 =
        details[rel_idx].curvePoint2;
    }
    if (details[rel_idx].spacing !== undefined){
      vex_tie.render_options.spacing =
        details[rel_idx].spacing;
    }
    if (details[rel_idx].tieSpacing !== undefined){
      vex_tie.render_options.tie_spacing =
        details[rel_idx].tieSpacing;
    }
    if (details[rel_idx].text !== undefined){
      vex_tie.text = details[rel_idx].text;
    }
    if (details[rel_idx].font !== undefined){
      if (details[rel_idx].font.family !== undefined){
        vex_tie.render_options.font.family =
          details[rel_idx].font.family;
      }
      if (details[rel_idx].font.size !== undefined){
        vex_tie.render_options.font.size =
          details[rel_idx].font.size;
      }
      if (details[rel_idx].font.style !== undefined){
        vex_tie.render_options.font.style =
          details[rel_idx].font.style;
      }
    }
  }
	return vex_tie;
}


// This is a direct copy of a function from array_operations.js. I'd prefer it
// stayed there.
function arrayObjectIndexOf(myArray, searchTerm, property){
  // Joe on Stack Overflow 27/12/2014.
  // In an array of objects that all have the same properties, this function
  // locates the index of the object whose specifiable property is set to a
  // specifiable value.
  // http://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array

  for(var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}


function fj_notes_rests2vexflow_tab(notes_and_rests, note_to_color_id){
		// Tom Collins 25/4/2015
		// This function takes a concatenated array of notes and rests in the
		// format of a json_score variable and prepares them for rendering as
		// VexFlow tabNote objects. The function is quite similar to
		// fj_notes_rests2vexflow.

		// Create the output variable.
		var vexflow_notes_and_rests = new Array();
		// Segment the json_score into unique on/offtimes, and events that occur at
		// these on/offtimes.
		// 16/5/2015. Transferred segmentation to create_ties.
		var segments = notes_and_rests;
		// var segments = segment(notes_and_rests);
		// console.log(segments)
		// Grab the unique ontimes.
		//var unq_on = segments.ontime;
		//console.log(unq_on)
		// Not sure if I need this variable in the long run. Leave it in for now.
		//var curr_ontime = unq_on[0];

		for (var on_idx = 0; on_idx < segments.length; on_idx++){
				var curr_positions = new Array();
				var curr_notes = segments[on_idx].notes;
				var curr_duration = segments[on_idx].offtime - segments[on_idx].ontime;
				var time_mod = segments[on_idx].notes[0].timeMod;
				duration_str = duration2vexflow_string(curr_duration, time_mod);

				for (var key_idx = 0; key_idx < curr_notes.length; key_idx++){
					var rest_indicator = false;
					// console.log('curr_notes[key_idx]');
					// console.log(curr_notes[key_idx]);
					if (curr_notes[key_idx].notations &&
							curr_notes[key_idx].notations.technical &&
							curr_notes[key_idx].notations.technical.string !== undefined){
						var curr_string = curr_notes[key_idx].notations.technical.string;
					}
					else{
						var curr_string = 3.5;
					}
					if (curr_notes[key_idx].notations &&
							curr_notes[key_idx].notations.technical &&
							curr_notes[key_idx].notations.technical.fret !== undefined){
						var curr_fret = curr_notes[key_idx].notations.technical.fret;
					}
					else{
						var curr_fret = "";
					}
					curr_positions.push({str: curr_string, fret: curr_fret});
				}
				// Add an r to the duration_str if it is a rest.
				if (rest_indicator){
						duration_str = duration_str + "r";
				}
				// If technical property is defined (i.e. beyond string and fret to
        // bend, etc.), use it.
        var curr_tech = [];
        key_idx = 0;
        while (key_idx < curr_notes.length) {
          curr_tech.push(fj_technical2vexflow_technical(curr_notes[key_idx]));
          // console.log('fj_technical2vexflow_technical was called!');
          key_idx++;
        }
				// If stem property is defined, this is where it could be implemented.
				// If beam property is defined, this is where it could be implemented.
				var beam_str = undefined;
        // If tuplet property is defined, use it.
        key_idx = 0;
				var tuplet_str = undefined;
        var tuplet_num_notes = undefined;
        var tuplet_beats_occupied = undefined;
        var tuplet_bracketed = false;
        var tuplet_show_number = "numerator";
				while (key_idx < curr_notes.length){
          if (curr_notes[key_idx].notations !== undefined &&
              curr_notes[key_idx].notations.tuplet !== undefined){
            tuplet_str = curr_notes[key_idx].notations.tuplet.type;
            tuplet_num_notes = curr_notes[key_idx].timeMod.actualNotes;
            tuplet_beats_occupied = curr_notes[key_idx].timeMod.normalNotes;
            if (curr_notes[key_idx].notations.tuplet.bracket !== undefined){
              if (curr_notes[key_idx].notations.tuplet.bracket == "yes"){
                tuplet_bracketed = true;
              }
            }
            if (curr_notes[key_idx].notations.tuplet.showNumber !== undefined){
              tuplet_show_number = curr_notes[key_idx].notations.tuplet.showNumber;
            }
            // console.log('tuplet_str:');
            // console.log(tuplet_str);
            key_idx = curr_notes.length - 1;
          }
          key_idx++;
				}
        // If tabtie property is defined, use it.
        var tbt_by_keys = [];
        for (key_idx = 0; key_idx < curr_notes.length; key_idx++){
          var curr_tbt = [];
          if (curr_notes[key_idx].notations !== undefined &&
              curr_notes[key_idx].notations.technical !== undefined &&
              curr_notes[key_idx].notations.technical.tabtie !== undefined){
            var tbt_arr = curr_notes[key_idx].notations.technical.tabtie;
            for (tbti = 0; tbti < tbt_arr.length; tbti++){
              if (tbt_arr[tbti].tabTieDetails !== undefined){
                var tbt_details = tbt_arr[tbti].tabTieDetails;
              }
              else {
                var tbt_details = undefined;
              }
              curr_tbt[tbti] = {
                type: tbt_arr[tbti].type,
                number: tbt_arr[tbti].number,
                // text: tbt_arr[tbti].text,
                systemIdx: systi,
                staffIdx: stafi,
                voiceIdx: voici,
                noteIdx: on_idx,
                keyIdx: key_idx,
                tabtieDetails: tbt_details
              };
            }
            tbt_by_keys[key_idx] = curr_tbt;
          }
        }
        // If tabslide property is defined, use it.
        var tbs_by_keys = [];
        for (key_idx = 0; key_idx < curr_notes.length; key_idx++){
          var curr_tbs = [];
          if (curr_notes[key_idx].notations !== undefined &&
              curr_notes[key_idx].notations.technical !== undefined &&
              curr_notes[key_idx].notations.technical.tabslide !== undefined){
            var tbs_arr = curr_notes[key_idx].notations.technical.tabslide;
            for (tbsi = 0; tbsi < tbs_arr.length; tbsi++){
              if (tbs_arr[tbsi].tabSlideDetails !== undefined){
                var tbs_details = tbs_arr[tbsi].tabSlideDetails;
              }
              else {
                var tbs_details = undefined;
              }
              curr_tbs[tbsi] = {
                type: tbs_arr[tbsi].type,
                number: tbs_arr[tbsi].number,
                direction: tbs_arr[tbsi].direction,
                systemIdx: systi,
                staffIdx: stafi,
                voiceIdx: voici,
                noteIdx: on_idx,
                keyIdx: key_idx,
                tabslideDetails: tbs_details
              };
            }
            tbs_by_keys[key_idx] = curr_tbs;
          }
        }

				var tabNote = { positions: curr_positions, duration: duration_str };
        if (curr_tech.length > 0){
          // console.log("We included the bend!");
          tabNote.technical = curr_tech;
        }
				if (beam_str != undefined){
          tabNote.beam = beam_str;
          // console.log('We are beaming, with:');
          // console.log(note);
				}
        if (tuplet_str !== undefined){
					tabNote.tuplet = tuplet_str;
          // console.log('tuplet_str:');
          // console.log(tuplet_str);
          // console.log('duration_str:');
          // console.log(duration_str);
          if (tuplet_str == "start"){
            tabNote.tuplet_num_notes = tuplet_num_notes;
            tabNote.tuplet_beats_occupied = tuplet_beats_occupied;
            tabNote.tuplet_bracketed = tuplet_bracketed;
            tabNote.tuplet_show_number = tuplet_show_number;
            // console.log('tabNote:');
            // console.log(tabNote);
          }
				}
        if (tbt_by_keys.length > 0){
          tabNote.tabtie = tbt_by_keys;
        }
				if (tbs_by_keys.length > 0){
          tabNote.tabslide = tbs_by_keys;
        }
				if (note_to_color_id != undefined){
						var color_idx = arrayObjectIndexOf(curr_notes, note_to_color_id, "ID");
						if (color_idx >= 0){
								console.log('Found tab to color!');
								tabNote.note_to_color_idx = color_idx;
								// console.log(tabNote);
						}
				}
				vexflow_notes_and_rests.push(tabNote);
				// console.log('We got here with key_idx = ' + key_idx + '!');
		}
		return vexflow_notes_and_rests;
}

function fj_notes_rests2vexflow(notes_and_rests, clef_str, octave_shift,
                                mid_system_clef_changes, staff_idx,
                                note_to_color_id, stafi, voici){
		// Tom Collins 16/3/2015
		// This function takes a concatenated array of notes and rests in the
		// format of a json_score variable and prepares them for rendering as
		// VexFlow note objects.

		// Create the output variable.
		var vexflow_notes_and_rests = new Array();
		// Segment the json_score into unique on/offtimes, and events that occur at
		// these on/offtimes.
		// 16/5/2015. Transferred segmentation to create_ties.
		var segments = notes_and_rests;
		// var segments = segment(notes_and_rests);
		// console.log(segments)
		// Grab the unique ontimes.
		//var unq_on = segments.ontime;
		//console.log(unq_on)
		// Not sure if I need this variable in the long run. Leave it in for now.
		//var curr_ontime = unq_on[0];

		for (var on_idx = 0; on_idx < segments.length; on_idx++){
				var curr_keys = new Array();
				var curr_notes = segments[on_idx].notes;
        // Check whether a clef change occurs between the previous segment
        // ontime and this segment ontime, and, if so, update the clef_str and
        // octave_shift values accordingly.
				var vfnr_cc_os = integrate_clef_changes(
					vexflow_notes_and_rests, segments, on_idx, staff_idx,
					mid_system_clef_changes, clef_str, octave_shift
				);
				vexflow_notes_and_rests = vfnr_cc_os[0];
				clef_str = vfnr_cc_os[1];
				octave_shift = vfnr_cc_os[2];
				// This is where an incorrect rest can be auto-corrected, but I don't
				// think it's a good long-term idea.
				var curr_duration = segments[on_idx].offtime - segments[on_idx].ontime;
        var time_mod = segments[on_idx].notes[0].timeMod;
				duration_str = duration2vexflow_string(curr_duration, time_mod);

				for (var key_idx = 0; key_idx < curr_notes.length; key_idx++){
					var rest_indicator = false;
					if (curr_notes[key_idx].pitch){
						var curr_pitch = curr_notes[key_idx].pitch;
						// console.log(curr_pitch)
						var pitch_class = curr_pitch[0];
						// console.log(pitch_class)
						pitch_class = pitch_class.toLowerCase();
						var octave = parseInt(curr_pitch[curr_pitch.length - 1]);

			      // console.log('curr_pitch:', curr_pitch);
			      // if (curr_pitch.slice(0, 2) == 'Ab'){
			      //  console.log('We found an Ab!');
			      // }

					}
					else{
						rest_indicator = true;
            var curr_rest_pitch = curr_notes[key_idx].restPitch;
            if (curr_rest_pitch){
              // A restPitch was defined, use it!
              var pitch_class = curr_rest_pitch[0];
              pitch_class = pitch_class.toLowerCase();
              var octave = parseInt(curr_rest_pitch[curr_rest_pitch.length - 1]);
            }
            else {
              // A restPitch was not defined. Define default with massive
              // switch!
              // Adjusting the height of rests for different clef types. This
              // could be made more advanced (e.g., to take into account notes
              // from other voices getting in the way). Hiding of rests happens
              // elsewhere btw (search on "render_options.glyph_font_scale").
              switch (clef_str){
                case "treble":
                  switch (octave_shift){
                    // There is a pattern here. I think the switch could be
                    // simplified.
                    case 0:
                      switch (duration_str){
                        case "w": // Special: whole notes hang from line above.
                          var pitch_class = "d";
                          var octave = 5;
                          break;
                        default:
                          var pitch_class = "b";
                          var octave = 4;
                          break;
                      }
                      break;
                    case -1:
                      switch (duration_str){
                        case "w": // Special: whole notes hang from line above.
                          var pitch_class = "d";
                          var octave = 4;
                          break;
                        default:
                          var pitch_class = "b";
                          var octave = 3;
                          break;
                      }
                      break;
                    case 1:
                      switch (duration_str){
                        case "w": // Special: whole notes hang from line above.
                          var pitch_class = "d";
                          var octave = 6;
                          break;
                        default:
                          var pitch_class = "b";
                          var octave = 5;
                          break;
                      }
                      break;
                  }
                  break;
                case "bass":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "tenor":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "alto":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "d";
                      var octave = 4;
                      break;
                    default:
                      var pitch_class = "c";
                      var octave = 4;
                      break;
                  }
                  break;
                case "soprano":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "percussion":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "d";
                      var octave = 5;
                      break;
                    default:
                      var pitch_class = "b";
                      var octave = 4;
                      break;
                  }
                  break;
                case "mezzo-soprano":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "baritone-c":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "baritone-f":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "subbass":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
                case "french":
                  switch (duration_str){
                    case "w": // Special: whole notes hang from line above.
                      var pitch_class = "f";
                      var octave = 3;
                      break;
                    default:
                      var pitch_class = "d";
                      var octave = 3;
                      break;
                  }
                  break;
              }

            }

					}
					octave = octave - octave_shift;
					curr_keys.push(pitch_class + "/" + octave);
				}
				// Add an r to the duration_str if it is a rest.
				if (rest_indicator){
						duration_str = duration_str + "r";
				}
				// If accidental property is defined, use it.
				var key_idx = 0;
				var curr_accd = new Array();
				while (key_idx < curr_notes.length){
					if (curr_notes[key_idx].accidental){
						switch (curr_notes[key_idx].accidental) {
							case "natural":
								curr_accd[key_idx] = "n";
								break;
							case "sharp":
								curr_accd[key_idx] = "#";
								break;
							case "flat":
								curr_accd[key_idx] = "b";
								break;
							case "double-sharp":
								curr_accd[key_idx] = "##";
								break;
							case "flat-flat":
								curr_accd[key_idx] = "bb";
								break;
						}
					}
					key_idx++;
				}
        // If articulations property is defined, use it.
        key_idx = 0;
        var curr_artc = [];
        while (key_idx < curr_notes.length) {
          curr_artc.push(fj_artic2vexflow_artic(curr_notes[key_idx]));
          key_idx++;
        }
				// If notehead property is defined, use it.
        var curr_nh = curr_notes.map(function(n){
					if (n.vexflow !== undefined && n.vexflow.notehead !== undefined){
						return n.vexflow.notehead
					}
				})
				// If stem property is defined, use it.
				key_idx = 0;
				var stem_dir = 1;
				while (key_idx < curr_notes.length){
						if (curr_notes[key_idx].stem){
								if (curr_notes[0].stem == "down"){
										var stem_dir = -1;
								}
								key_idx = curr_notes.length - 1;
						}
						key_idx++;
				}
				// If beam property is defined, use it.
				key_idx = 0;
				var beam_str = undefined;
				while (key_idx < curr_notes.length){
						if (curr_notes[key_idx].beam){
								// Hunt for a beam beginning/end at the top of the beam hierarchy
								// (number = 1).
								var beam_idx = arrayObjectIndexOf(curr_notes[key_idx].beam, 1, "number");
								if (beam_idx >= 0){
										switch (curr_notes[key_idx].beam[beam_idx].type){
												case "begin":
														beam_str = "begin";
														key_idx = curr_notes.length - 1;
														break;
												case "end":
														beam_str = "end";
														key_idx = curr_notes.length - 1;
														break;
										}
								}
						}
						key_idx++;
				}
        // If tuplet property is defined, use it.
        key_idx = 0;
				var tuplet_str = undefined;
        var tuplet_num_notes = undefined;
        var tuplet_beats_occupied = undefined;
        var tuplet_bracketed = false;
        var tuplet_show_number = "numerator";
				while (key_idx < curr_notes.length){
          if (curr_notes[key_idx].notations !== undefined &&
              curr_notes[key_idx].notations.tuplet !== undefined){
            tuplet_str = curr_notes[key_idx].notations.tuplet.type;
            tuplet_num_notes = curr_notes[key_idx].timeMod.actualNotes;
            tuplet_beats_occupied = curr_notes[key_idx].timeMod.normalNotes;
            if (curr_notes[key_idx].notations.tuplet.bracket !== undefined){
              if (curr_notes[key_idx].notations.tuplet.bracket == "yes"){
                tuplet_bracketed = true;
              }
            }
            if (curr_notes[key_idx].notations.tuplet.showNumber !== undefined){
              tuplet_show_number = curr_notes[key_idx].notations.tuplet.showNumber;
            }
            // console.log('tuplet_str:');
            // console.log(tuplet_str);
            key_idx = curr_notes.length - 1;
          }
          key_idx++;
				}
        // If lyric property is defined, use it.
        key_idx = 0;
        var curr_lyr = undefined;
				var lyrics_arr = [];
				while (key_idx < curr_notes.length){
          if (curr_notes[key_idx].lyric !== undefined){
            curr_lyr = curr_notes[key_idx].lyric;
            // console.log('curr_lyr:');
            // console.log(curr_lyr);
            for (lyr_idx = 0; lyr_idx < curr_lyr.length; lyr_idx++){
              lyrics_arr[curr_lyr[lyr_idx].number - 1] = curr_lyr[lyr_idx].text;
              if (curr_lyr[lyr_idx].syllabic == 'begin' ||
                  curr_lyr[lyr_idx].syllabic == 'middle'){
                lyrics_arr[curr_lyr[lyr_idx].number - 1] =
                lyrics_arr[curr_lyr[lyr_idx].number - 1] + '-';
              }
            }
            // If verse 2 has a lyric attached to a note, but verse 1 did not,
            // then we need to ensure that the verse 2 lyric is printed in
            // approximate vertical alignment with the other verse 2 lyrics.
            for (lyr_idx = 0; lyr_idx < lyrics_arr.length; lyr_idx++){
              if (lyrics_arr[lyr_idx] == undefined){
                lyrics_arr[lyr_idx] = '';
              }
            }
            key_idx = curr_notes.length - 1;
          }
          key_idx++;
				}
        // If tie property is defined, use it.
        var curr_tie = [];
        for (key_idx = 0; key_idx < curr_notes.length; key_idx++){
          if (curr_notes[key_idx].tieType !== undefined){
            if (curr_notes[key_idx].tieStopID !== undefined){
              var tie_stop_ID = curr_notes[key_idx].tieStopID;
            }
            else {
              var tie_stop_ID = undefined;
            }
            if (curr_notes[key_idx].tieDetails !== undefined){
              var tie_details = curr_notes[key_idx].tieDetails;
            }
            else {
              var tie_details = undefined;
            }
            switch (curr_notes[key_idx].tieType){
              case "start":
                curr_tie[key_idx] = {
                  type: "start",
                  systemIdx: systi,
                  staffIdx: stafi,
                  voiceIdx: voici,
                  noteIdx: on_idx,
                  keyIdx: key_idx,
                  tieStopID: tie_stop_ID,
                  tieDetails: tie_details
                }
                break;
              case "stop":
                curr_tie[key_idx] = {
                  type: "stop",
                  systemIdx: systi,
                  staffIdx: stafi,
                  voiceIdx: voici,
                  noteIdx: on_idx,
                  keyIdx: key_idx,
                  ID: curr_notes[key_idx].ID,
                  tieDetails: tie_details
                }
                break;
              case "stop and start":
                curr_tie[key_idx] = {
                  type: "start",
                  systemIdx: systi,
                  staffIdx: stafi,
                  voiceIdx: voici,
                  noteIdx: on_idx,
                  keyIdx: key_idx,
                  ID: curr_notes[key_idx].ID,
                  tieStopID: tie_stop_ID,
                  tieDetails: tie_details
                }
                break;
              case "start and stop":
                curr_tie[key_idx] = {
                  type: "start and stop",
                  systemIdx: systi,
                  staffIdx: stafi,
                  voiceIdx: voici,
                  noteIdx: on_idx,
                  keyIdx: key_idx,
                  ID: curr_notes[key_idx].ID,
                  tieStopID: curr_notes[key_idx].ID,
                  tieDetails: tie_details
                }
                break;
            };
          }
				}
        // If slur property is defined, use it.
        var slur_by_keys = [];
        for (key_idx = 0; key_idx < curr_notes.length; key_idx++){
          var curr_slur = [];
          if (curr_notes[key_idx].notations !== undefined &&
              curr_notes[key_idx].notations.slur !== undefined){

						var slur_arr = curr_notes[key_idx].notations.slur;
            for (sluri = 0; sluri < slur_arr.length; sluri++){
              if (slur_arr[sluri].slurDetails !== undefined){
                var slur_details = [slur_arr[sluri].slurDetails];
              }
              else {
                var slur_details = undefined;
              }
              curr_slur[sluri] = {
                type: slur_arr[sluri].type,
                number: slur_arr[sluri].number,
                systemIdx: systi,
                staffIdx: stafi,
                voiceIdx: voici,
                noteIdx: on_idx,
                keyIdx: key_idx,
                slurDetails: slur_details
              }
            }
            slur_by_keys[key_idx] = curr_slur;
            // console.log('Got here. slur_by_keys:', slur_by_keys);
          }
        }

				var note = {
					keys: curr_keys, duration: duration_str,
					stem_direction: stem_dir, clef: clef_str,
					accidentals: curr_accd, articulations: curr_artc,
					noteheads: curr_nh
				};
				if (beam_str !== undefined){
						note.beam = beam_str;
						// console.log('We are beaming, with:');
						// console.log(note);
				}
        if (tuplet_str !== undefined){
					note.tuplet = tuplet_str;
          // console.log('tuplet_str:');
          // console.log(tuplet_str);
          // console.log('duration_str:');
          // console.log(duration_str);
          if (tuplet_str == "start"){
            note.tuplet_num_notes = tuplet_num_notes;
            note.tuplet_beats_occupied = tuplet_beats_occupied;
            note.tuplet_bracketed = tuplet_bracketed;
            note.tuplet_show_number = tuplet_show_number;
            // console.log('note:');
            // console.log(note);
          }
				}
        if (lyrics_arr.length > 0){
          note.lyrics = lyrics_arr;
          // console.log('lyrics_arr:');
          // console.log(lyrics_arr);
        }
        if (curr_tie.length > 0){
          note.tie = curr_tie;
        }
        if (slur_by_keys.length > 0){
          note.slur = slur_by_keys;
        }
				if (note_to_color_id !== undefined){
						var color_idx = arrayObjectIndexOf(curr_notes, note_to_color_id, "ID");
						if (color_idx >= 0){
							// console.log('Found note to color!');
							note.note_to_color_idx = color_idx;
							// console.log(note);
						}
				}
				// Inherit some properties from the FJ Composition Object.
				if (curr_keys.length > 0){
					note.fj_inhr = {
						"barOn": curr_notes[0].barOn,
						"ontime": curr_notes[0].ontime
					};
				}


				vexflow_notes_and_rests.push(note);
		}
		return vexflow_notes_and_rests;
}

function fj_expressions2vexflow_textnotes(expr, staff_idx, mid_system_clef_changes){
		// Tom Collins 18/5/2016
		// This function takes an array of expressions in the format of a
    // json_score variable and prepares them for rendering as VexFlow textNote
    // objects. The function is quite similar to fj_notes_rests2vexflow_tab.

		// console.log('expr: ', expr);
		// var vf_textnotes = [
		//	{
		//	 clefnote: true,
		//	 clef_str: "treble",
		//	 octave_shift: 0,
		//	 hidden: true
		//	}
		//];
		var vf_textnotes = [];
    // var permissible_dynamics = [
    //   "p", "m", "f", "s", "z"
    // ];
    // var permissible_dynamics = [
    //   "ppp", "pp", "p", "mp", "mf", "f", "ff", "fff", "fp", "sf", "sfz", "sff",
    //   "sffz", "sfp", "sfpp",
    //   // these four not possible in VexFlow at present "rfz", "rf", "r", "n",
    //   "fz", "m", "s", "z"
    // ];

    for (xpri = 0; xpri < expr.length; xpri++){
			// Check whether a clef change occurs between the previous segment
			// ontime and this segment ontime, and, if so, update the clef_str and
			// octave_shift values accordingly.
			var vfe_cc_os = integrate_clef_changes(
				vf_textnotes, expr, xpri, staff_idx,
				mid_system_clef_changes);
			vf_textnotes = vfe_cc_os[0];

      // Remember, there should only be one textnote here.
      var curr_expr = expr[xpri].notes[0];
      if (curr_expr.type !== undefined &&
          curr_expr.type.dynamics !== undefined){
        if (permissible_dynamics.indexOf(curr_expr.type.dynamics) > -1){
          if (curr_expr.type.dynamics == "z"){
            // console.log('curr_expr: ', curr_expr);
            // console.log(duration2vexflow_string(curr_expr.duration));
          }
          var vf_textnote = {
            "glyph": curr_expr.type.dynamics,
            "duration": duration2vexflow_string(curr_expr.duration)
          };
        }
        else {
          var vf_textnote = {
            "text": curr_expr.type.dynamics,
            "duration": duration2vexflow_string(curr_expr.duration)
          };
        }
      }
      else {
        var vf_textnote = {
          "text": "",
          "duration": duration2vexflow_string(curr_expr.duration)
        };
      }
      // If xShift is defined, use it.
      if (curr_expr.xShift !== undefined){
        vf_textnote.x_shift = curr_expr.xShift;
      }
      // If above or below are specified, use them to set setLine.
			if (curr_expr.placement !== undefined){
				switch (curr_expr.placement){
					case "above":
						vf_textnote.setLine = 0;
						break;
					default:
						vf_textnote.setLine = 10;
						break;
				}
				// console.log('Placement defined:', vf_textnote);
			}
			else {
				vf_textnote.setLine = 0;
				// console.log('Placement not defined:', vf_textnote);
			}
			// If yLine is defined, use it.
      if (curr_expr.yLine !== undefined){
        vf_textnote.setLine = vf_textnote.setLine + curr_expr.yLine;
      }
      vf_textnotes.push(vf_textnote);
    }

    return vf_textnotes;
}


function integrate_clef_changes(
	vexflow_events, segments, on_idx, staff_idx,
	mid_system_clef_changes, clef_str, octave_shift){

	if (mid_system_clef_changes.length > 0){
		rel_clefs = [];
		for (clefi = 0; clefi < mid_system_clef_changes.length; clefi++){
			if (on_idx == 0){
				// No previous segment to compare to, so a special checking case.
				if (segments[0].ontime == mid_system_clef_changes[clefi].ontime ||
						(segments.length == 1 &&
						 segments[0].notes[0].barOn == mid_system_clef_changes[clefi].barNo)){
					rel_clefs.push(mid_system_clef_changes[clefi]);
				}
			}
			else{
				// Ordinary checking case.
				if (segments[on_idx - 1].ontime < mid_system_clef_changes[clefi].ontime &&
						segments[on_idx].ontime >= mid_system_clef_changes[clefi].ontime){
					rel_clefs.push(mid_system_clef_changes[clefi]);
				}
			}
		}
		//rel_clefs = mid_system_clef_changes.filter(
		//  function (a){ // This needs work! 25/11/2015.
		//    return (segments[on_idx].ontime >= a.ontime &&
		//            segments[on_idx].notes[0].barOn == a.barNo)
		//           ||
		//           (segments.length == 1 &&
		//            segments[on_idx].notes[0].barOn == a.barNo);
		//  }
		//);

		var nrel_clefs = rel_clefs.length;
		if (nrel_clefs > 0){
			for (clefi = 0; clefi < nrel_clefs; clefi++){

				if (rel_clefs[clefi].staffNo == staff_idx){
					// Actually draw notes according to it, because it's in this
					// staff. Begin by updating the clef_str and octave_shift values.
					clef_str = rel_clefs[clefi].clef_str;
					octave_shift = rel_clefs[clefi].octave_shift;
					if (rel_clefs[clefi].ontime == segments[on_idx].ontime){
						// Draw a mid-system clef change, because we're at the correct
						// ontime.
						var clefnote = {
							clefnote: true,
							clef_str: clef_str,
							octave_shift: octave_shift
						};
						vexflow_events.push(clefnote);
					}
				}
				else {
					// Draw it but hide it, it's in a different staff. And don't
					// update the clef_str and octave_shift values, because we
					// shouldn't be drawing notes according to it.
					var clefnote = {
						clefnote: true,
						clef_str: rel_clefs[clefi].clef_str,
						octave_shift: rel_clefs[clefi].octave_shift,
						hidden: true
					};
					vexflow_events.push(clefnote);
				}

			}

		}
	}
	return [vexflow_events, clef_str, octave_shift];
}


function duration2vexflow_string(duration, timeMod){
  // Tom Collins 13/3/2015
  // In
  // duration Number mandatory
  // timeMod Array optional
  // This function takes a duration in crotchet beats and attempts to find a
  // vexflow duration string representing that duration. The object timeMod has
  // the properties actualNotes and normalNotes, and assist with the rendering
  // of tuplets.

  if (timeMod !== undefined){
    var permissible_durations = [
      6, 4.5, 4, 3, 2, 1.75, 1.5, 1, 0.75, 0.5, 0.375, 0.25, 0.125, 0.0625
    ];
    var notating_dur = duration*timeMod.actualNotes/timeMod.normalNotes;
    // console.log('notating_dur:');
    // console.log(notating_dur);
    var rel_idx = min_argmin(permissible_durations.map(
      function (a){
        return Math.abs(a - notating_dur);
      }
    ));
    // console.log('rel_idx:');
    // console.log(rel_idx);
    duration = permissible_durations[rel_idx[1]];
    // console.log('duration:');
    // console.log(duration);
  }

  switch(duration){
		case 6:
      var duration_str = "wd";
      break;
		case 4.5: // Problem with this one and 3.5 is that barlines will be drawn in wrong place.
		// Need to find a way to express these durations in VexFlow's system.
      var duration_str = "w";
      break;
    case 4:
      var duration_str = "w";
      break;
    // 10/12/2015 testing.
    case 3.5:
      var duration_str = "w";
      break;
    // 10/12/2015 end.
    case 3:
      var duration_str = "hd";
      break;
    case 2:
      var duration_str = "h";
      break;
    case 1.75:
      var duration_str = "qdd";
      break;
    case 1.5:
      var duration_str = "qd";
      break;
    case 1:
      var duration_str = "q";
      break;
    case 0.75:
      var duration_str = "8d";
      break;
    case 0.5:
      var duration_str = "8";
      break;
    case 0.375:
      var duration_str = "16d";
      break;
    case 0.25:
      var duration_str = "16";
      break;
    case 0.125:
      var duration_str = "32";
      break;
    case 0.0625:
      var duration_str = "64";
      break;
  }
  return duration_str;
}

function fj_artic2vexflow_artic(note){
  // Tom Collins 31/1/2016.
  // In
  // note Object mandatory
  // Out Object
  // This function converts the FreshJam representation of articulations into
  // the representation required for VexFlow rendering.

  var artc_obj = {};
  if (note.notations !== undefined &&
      note.notations.articulations !== undefined){
    var fj_artc = note.notations.articulations;
    for (var key in fj_artc){
      switch (key) {
        case "staccato":
          artc_obj["a."] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a."].code = fj_artc[key].code;
          }
          else {
            artc_obj["a."].code = "v23";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a."].width = fj_artc[key].width;
          }
          else {
            artc_obj["a."].width = 4;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a."].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a."].shift_right = -2;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a."].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a."].shift_up = 8;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a."].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a."].shift_down = 0;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a."].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a."].between_lines = true;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a."].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a."].setPosition = 3;
          }
          break;
        case "staccatissimo":
          artc_obj["av"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["av"].code = fj_artc[key].code;
          }
          else {
            artc_obj["av"].code = "v28";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["av"].width = fj_artc[key].width;
          }
          else {
            artc_obj["av"].width = 4;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["av"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["av"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["av"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["av"].shift_up = 11;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["av"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["av"].shift_down = 5;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["av"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["av"].between_lines = true;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["av"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["av"].setPosition = 3;
          }
          break;
        case "accent":
          artc_obj["a>"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a>"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a>"].code = "v42";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a>"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a>"].width = 10;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a>"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a>"].shift_right = 5;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a>"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a>"].shift_up = 8;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a>"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a>"].shift_down = 1;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a>"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a>"].between_lines = true;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a>"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a>"].setPosition = 3;
          }
          break;
        case "tenuto":
          artc_obj["a-"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a-"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a-"].code = "v25";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a-"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a-"].width = 9;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a-"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a-"].shift_right = -4;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a-"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a-"].shift_up = 17;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a-"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a-"].shift_down = 10;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a-"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a-"].between_lines = true;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a-"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a-"].setPosition = 3;
          }
          break;
        case "marcato":
          artc_obj["a^"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a^"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a^"].code = "va";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a^"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a^"].width = 8;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a^"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a^"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a^"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a^"].shift_up = -4;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a^"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a^"].shift_down = -2;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a^"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a^"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a^"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a^"].setPosition = 3;
          }
          break;
        case "pizzicatoLH":
          artc_obj["a+"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a+"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a+"].code = "v8b";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a+"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a+"].width = 9;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a+"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a+"].shift_right = -4;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a+"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a+"].shift_up = 12;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a+"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a+"].shift_down = 12;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a+"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a+"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a+"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a+"].setPosition = 3;
          }
          break;
        case "pizzicatoSnap":
          artc_obj["ao"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["ao"].code = fj_artc[key].code;
          }
          else {
            artc_obj["ao"].code = "v94";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["ao"].width = fj_artc[key].width;
          }
          else {
            artc_obj["ao"].width = 8;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["ao"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["ao"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["ao"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["ao"].shift_up = -4;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["ao"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["ao"].shift_down = 6;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["ao"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["ao"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["ao"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["ao"].setPosition = 3;
          }
          break;
        case "naturalHarmonic":
          artc_obj["ah"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["ah"].code = fj_artc[key].code;
          }
          else {
            artc_obj["ah"].code = "vb9";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["ah"].width = fj_artc[key].width;
          }
          else {
            artc_obj["ah"].width = 7;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["ah"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["ah"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["ah"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["ah"].shift_up = -4;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["ah"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["ah"].shift_down = 4;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["ah"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["ah"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["ah"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["ah"].setPosition = 3;
          }
          break;
        case "fermataUpright":
          artc_obj["a@a"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a@a"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a@a"].code = "v43";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a@a"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a@a"].width = 25;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a@a"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a@a"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a@a"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a@a"].shift_up = 8;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a@a"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a@a"].shift_down = 10;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a@a"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a@a"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a@a"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a@a"].setPosition = 3;
          }
          break;
        case "fermataInverted":
          artc_obj["a@u"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a@u"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a@u"].code = "v5b";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a@u"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a@u"].width = 25;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a@u"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a@u"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a@u"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a@u"].shift_up = 0;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a@u"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a@u"].shift_down = -4;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a@u"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a@u"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a@u"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a@u"].setPosition = 1;
          }
          break;
        case "bowUp":
          artc_obj["a|"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a|"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a|"].code = "v75";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a|"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a|"].width = 8;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a|"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a|"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a|"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a|"].shift_up = 8;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a|"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a|"].shift_down = 10;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a|"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a|"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a|"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a|"].setPosition = 3;
          }
          break;
        case "bowDown":
          artc_obj["am"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["am"].code = fj_artc[key].code;
          }
          else {
            artc_obj["am"].code = "v97";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["am"].width = fj_artc[key].width;
          }
          else {
            artc_obj["am"].width = 13;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["am"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["am"].shift_right = 0;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["am"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["am"].shift_up = 10;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["am"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["am"].shift_down = 12;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["am"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["am"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["am"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["am"].setPosition = 3;
          }
          break;
        case "choked":
          artc_obj["a,"] = {};
          if (fj_artc[key].code !== undefined){
            artc_obj["a,"].code = fj_artc[key].code;
          }
          else {
            artc_obj["a,"].code = "vb3";
          }
          if (fj_artc[key].width !== undefined){
            artc_obj["a,"].width = fj_artc[key].width;
          }
          else {
            artc_obj["a,"].width = 6;
          }
          if (fj_artc[key].shiftRight !== undefined){
            artc_obj["a,"].shift_right = fj_artc[key].shiftRight;
          }
          else {
            artc_obj["a,"].shift_right = 8;
          }
          if (fj_artc[key].shiftUp !== undefined){
            artc_obj["a,"].shift_up = fj_artc[key].shiftUp;
          }
          else {
            artc_obj["a,"].shift_up = -4;
          }
          if (fj_artc[key].shiftDown !== undefined){
            artc_obj["a,"].shift_down = fj_artc[key].shiftDown;
          }
          else {
            artc_obj["a,"].shift_down = 4;
          }
          if (fj_artc[key].betweenLines !== undefined){
            artc_obj["a,"].between_lines = fj_artc[key].betweenLines;
          }
          else {
            artc_obj["a,"].between_lines = false;
          }
          if (fj_artc[key].setPosition !== undefined){
            artc_obj["a,"].setPosition = fj_artc[key].setPosition;
          }
          else {
            artc_obj["a,"].setPosition = 3;
          }
          break;
      }



    }
  }
  // console.log("artc_obj:");
  // console.log(artc_obj);

  return artc_obj;
}


function fj_technical2vexflow_technical(note){
  // Tom Collins 3/5/2016.
  // In
  // note Object mandatory
  // Out Object
  // This function converts the FreshJam representation of technical
  // indications (e.g., string bending) into the representation required for
  // VexFlow rendering.

  var tech_obj = {};
  if (note.notations !== undefined &&
      note.notations.technical !== undefined){
    var fj_tech = note.notations.technical;
    for (var key in fj_tech){
      switch (key){
        case "bend":
          tech_obj["bend"] = {};
          if (fj_tech[key].type !== undefined){
            tech_obj["bend"].type = fj_tech[key].type;
          }
          else {
            tech_obj["bend"].type = 0;
          }
          if (fj_tech[key].text !== undefined){
            tech_obj["bend"].text = fj_tech[key].text;
          }
          else {
            tech_obj["bend"].text = "";
          }
          // Currently bend width does not seem to carry through properly into
          // Vexflow rendering, so it's not carried through here at present.
          /*if (fj_tech[key].width !== undefined){
          //  tech_obj["bend"].width = fj_tech[key].width;
          //}
          //else {
          //  tech_obj["bend"].width = 8;
          //}
          // console.log("We found the bend!");*/
          break;
        case "vibrato":
          tech_obj["vibrato"] = {};
          if (fj_tech[key].harsh !== undefined){
            tech_obj["vibrato"].harsh = fj_tech[key].harsh;
          }
          else {
            tech_obj["vibrato"].harsh = true;
          }
          if (fj_tech["vibrato"].position !== undefined){
            tech_obj["vibrato"].position = fj_tech[key].position;
          }
          else {
            tech_obj["vibrato"].position = 0;
          }
          if (fj_tech["vibrato"].width !== undefined){
            tech_obj["vibrato"].width = fj_tech[key].width;
          }
          else {
            tech_obj["vibrato"].width = 20;
          }
          if (fj_tech["vibrato"].waveHeight !== undefined){
            tech_obj["vibrato"].waveHeight = fj_tech[key].waveHeight;
          }
          else {
            tech_obj["vibrato"].waveHeight = 6;
          }
          if (fj_tech["vibrato"].waveWidth !== undefined){
            tech_obj["vibrato"].waveWidth = fj_tech[key].waveWidth;
          }
          else {
            tech_obj["vibrato"].waveWidth = 4;
          }
          if (fj_tech["vibrato"].waveGirth !== undefined){
            tech_obj["vibrato"].waveGirth = fj_tech[key].waveGirth;
          }
          else {
            tech_obj["vibrato"].waveGirth = 2;
          }
          break;
      }



    }
  }
  // console.log('tech_obj: ', tech_obj);

  return tech_obj;
}


function notes_and_rests_by_bar_staff_voice(
				   notes, rests, staff_and_clef_names, time_sigs,
					 anacrusis, first_bar, last_bar){
		// Tom Collins 15/4/2015
		// This function takes notes and rests and rearranges them according to
		// bar number, staff number, and voice number in a nested array. It also
		// inserts bar-long rests into any empty bars. The function is responsible
		// for identifying tablature staves and expanding those. Finally, it should
		// be remarked that notes appearing in the output nested array will **not**
		// necessarily be in ontime (or any other) order. Ordering is accomplished
		// by a later function � [create_ties](freshjam.vexflow#create_ties).

		const logging = false
		// Get the staff numbers into an array.
		var staff_nos = [];
		for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
				staff_nos.push(staff_and_clef_names[stafi].staffNo);
		}
		// console.log('staff_nos:');
		// console.log(staff_nos);

		// Collect the notes by bar.
		var notes_and_rests = [];
		for (noti = 0; noti < notes.length; noti++){
				if (notes_and_rests[notes[noti].barOn] == undefined){
						notes_and_rests[notes[noti].barOn] = [notes[noti]];
				}
				else{
						notes_and_rests[notes[noti].barOn].push(notes[noti]);
				}
		}
		// Put the rests in there too.
		for (resti = 0; resti < rests.length; resti++){
				if (notes_and_rests[rests[resti].barOn] == undefined){
						notes_and_rests[rests[resti].barOn] = [rests[resti]];
				}
				else{
						notes_and_rests[rests[resti].barOn].push(rests[resti]);
				}
		}
		// If there are any empty bars, fill them with default bar-long
		// rests.
		for (stafi = 0; stafi < staff_nos.length; stafi++){
				if (anacrusis == 0){
						var bar1 = 1;
				}
				else{
						var bar1 = 0;
				}
				for (bari = bar1; bari <= last_bar; bari++){
						if (notes_and_rests[bari] == undefined ||
								arrayObjectIndexOf(notes_and_rests[bari], staff_nos[stafi], "staffNo") == -1){
								// This is where we could create and return a message.

								var default_on = ontime_of_bar_and_beat_number(
																	 bari, 1, time_sigs);
								var default_off = ontime_of_bar_and_beat_number(
																	 bari + 1, 1, time_sigs);
								var default_rest =
									{ id: "null", barOn: bari, beatOn: 1,
										ontime: default_on,
										barOff: bari + 1, beatOff: 1,
										offtime: default_off,
										duration: default_off - default_on,
										staffNo: staff_nos[stafi], voiceNo: 0 };
								if (notes_and_rests[bari] == undefined){
										notes_and_rests[bari] = [default_rest];
								}
								else{
										notes_and_rests[bari].push(default_rest);
								}
						}
				}
		}
		// console.log('Local notes_and_rests:');
		// console.log(notes_and_rests);

		// Split further into arrays according to staff number.
		var staff_split = [];
		if (anacrusis == 0){
				staff_split[0] = [];
		}
		for (bari = first_bar; bari <= last_bar; bari++){
				var curr_bar = notes_and_rests[bari];
				var curr_staff_split = [];
				for (nri = 0; nri < curr_bar.length; nri++){
						if (curr_staff_split[curr_bar[nri].staffNo] == undefined){
								curr_staff_split[curr_bar[nri].staffNo] = [curr_bar[nri]];
						}
						else{
								curr_staff_split[curr_bar[nri].staffNo].push(curr_bar[nri]);
						}
				}
				staff_split.push(curr_staff_split);
		}
		if (logging){
			console.log('staff_split:', staff_split)
		}

		// Split further into arrays according to voice number.
		var voice_split = [];
		if (anacrusis == 0){
				voice_split[0] = [];
		}
		for (bari = first_bar; bari <= last_bar; bari++){
				var curr_bar = staff_split[bari];
				if (logging){
					console.log('curr_bar:', curr_bar)
				}
				for (stafi = 0; stafi < curr_bar.length; stafi++){
						var curr_staff_split = curr_bar[stafi];
						// Get the unique voice numbers for this staff in this bar.
						var voice_nos = [];
						for (nri = 0; nri < curr_staff_split.length; nri++){
								voice_nos.push(curr_staff_split[nri].voiceNo);
						}
						voice_nos = voice_nos.filter(function(el,i,a){ return i==a.indexOf(el); });

						// Define the array that will hold the notes/rests for each voice
						// in this staff in this bar.
						curr_voice_split = [];
						for (nri = 0; nri < curr_staff_split.length; nri++){
								if (curr_voice_split[curr_staff_split[nri].voiceNo] == undefined){
										curr_voice_split[curr_staff_split[nri].voiceNo] = [curr_staff_split[nri]];
								}
								else{
										curr_voice_split[curr_staff_split[nri].voiceNo].push(curr_staff_split[nri]);
								}
						}
						// 15/5/2015. Took out temporarily and transferred to
						// the create_ties function.
						// Sort the notes/rests in each voice by ontime.
						/*//for (voici = 0; voici < voice_nos.length; voici++){
						//		curr_voice_split[voice_nos[voici]]
						//				= curr_voice_split[voice_nos[voici]].sort(
						//						function(a,b){return a.ontime - b.ontime;});
						//}*/

						// Add them to the voice_split variable.
						if (voice_split[bari] == undefined){
								voice_split[bari] = [];
						}
						if (voice_split[bari][stafi] == undefined){
								voice_split[bari][stafi] = curr_voice_split;
						}
				}
		}

		// Iterate over staff_and_clef_names and expand any tablature staves,
		// splicing copies of the notes/rests into voice_split too.
		var expand_idx = [];
		for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
				if (staff_and_clef_names[stafi].displayTablature !== undefined &&
						staff_and_clef_names[stafi].displayTablature == "both"){
						expand_idx.push(stafi);
				}
		}
    // console.log('expand_idx: ', expand_idx);
		for (expi = expand_idx.length - 1; expi >= 0; expi--){
      var curr_staff = copy_array_object(staff_and_clef_names[expand_idx[expi]]);
      curr_staff.displayTablature = "only";
      // Remove the connector property.
      curr_staff.connector = undefined;
      staff_and_clef_names.splice(expand_idx[expi] + 1, 0, curr_staff);
      // Adjust the connector.toStaffNo property.
      if (staff_and_clef_names[expand_idx[expi]].connector !== undefined){
        staff_and_clef_names[expand_idx[expi]].connector.toStaffNo =
          staff_and_clef_names[expand_idx[expi]].connector.toStaffNo + expi + 1;
      }

			for (bari = first_bar; bari <= last_bar; bari++){
          voice_split[bari].splice(expand_idx[expi] + 1, 0,
                                   $.extend([], voice_split[bari][expand_idx[expi]]));
      }
		}

		// console.log('staff_and_clef_names:');
		// console.log(staff_and_clef_names);
		// console.log('voice_split:');
		// console.log(voice_split);
		return [voice_split, staff_and_clef_names, expand_idx];
}

var permissible_dynamics = ["p", "m", "f", "s", "z"];

function textnotes_by_bar_staff_voice(
           expressions, staff_and_clef_names, expand_idx, time_sigs, anacrusis,
           first_bar, last_bar, bar_begin_ends){
		// Tom Collins 12/5/2016
		// This function takes expressions (only so far) and rearranges them
    // according to bar number, staff number, and voice number in a nested
    // array. The aim is to display expressions such as f (forte) or similar
    // in the correct position on each stave. To do this we have to make a
    // voice consisting of such expressions, complete with rests in empty bars
    // or segments.

    // ??
    // The function is responsible identifying tablature staves and expanding
    // those. Finally, it should
		// be remarked that notes appearing in the output nested array will **not**
		// necessarily be in ontime (or any other) order. Ordering is accomplished
		// by a later function � [create_ties](freshjam.vexflow#create_ties).

		if (expressions.length == 0){
			return undefined;
		}

		// Split into separate voices any expressions all of whose type/dynamic
		// string's elements belong to the permissible_dynamics.
		for (xpri = expressions.length - 1; xpri >= 0; xpri--){
			var curr_expr = expressions[xpri];
			curr_expr.voiceNo = 0;
			if (curr_expr.type !== undefined && curr_expr.type.dynamics !== undefined){
				// Get the dynamics text string and check if all of its characters are
				// members of permissible dynamics.
				var curr_et = [];
				for (i = 0; i < curr_expr.type.dynamics.length; i++){
					curr_et.push(curr_expr.type.dynamics[i]);
				}
				var curr_memb = curr_et.map(function(a){
					if (permissible_dynamics.indexOf(a) !== -1){
						return 1;
					}
					else {
						return 0;
					};
				});
				var check_sum = curr_memb.reduce(function(total, num){
					return total + num;
				});
				if (check_sum == curr_expr.type.dynamics.length){
					// All of the dynamics text string's characters are permissible
					// dynamics: render as glyphs. Use prev_char_incr to store the
					// x-shift of the previous glyph, in order to generate the x-shift
					// for the next glyph.
					if (curr_expr.xShift !== undefined){
						var prev_char_incr = curr_expr.xShift + 12;
					}
					else {
						var prev_char_incr = 12;
					}
					// This is the typical amount of x-shift between glyphs.
					var char_incr = 11;
					for (ichar = 0; ichar < check_sum; ichar++){
						var expr_cp = copy_array_object(curr_expr);
						expr_cp.type.dynamics = curr_expr.type.dynamics[ichar];
						expr_cp.voiceNo = ichar;
						expr_cp.xShift = prev_char_incr + char_incr*(ichar !== 0);
						// m is a little wider than the other glyphs, so add extra spacing.
						prev_char_incr = expr_cp.xShift + 7*(expr_cp.type.dynamics == "m");
						if (ichar == 0){
							expressions.splice(xpri, 1, expr_cp);
						}
						else {
							expressions.splice(xpri, 0, expr_cp);
						}

					}
				}
			}
		}
		// console.log('expressions post-permitted glyphs:', expressions);

		// Get the staff numbers into an array.
		var staff_nos = [];
		for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
				staff_nos.push(staff_and_clef_names[stafi].staffNo);
		}
		// console.log('staff_nos:');
		// console.log(staff_nos);

		// Collect the expressions by bar.
		var express = [];
		for (xpri = 0; xpri < expressions.length; xpri++){
				if (express[expressions[xpri].barOn] == undefined){
						express[expressions[xpri].barOn] = [expressions[xpri]];
				}
				else {
						express[expressions[xpri].barOn].push(expressions[xpri]);
				}
		}
		// Put the rests in there too.
		/*//for (resti = 0; resti < rests.length; resti++){
		//		if (notes_and_rests[rests[resti].barOn] == undefined){
		//				notes_and_rests[rests[resti].barOn] = [rests[resti]];
		//		}
		//		else{
		//				notes_and_rests[rests[resti].barOn].push(rests[resti]);
		//		}
		//}*/

		// If there are any empty bars, fill them with default bar-long
		// rests.
		for (stafi = 0; stafi < staff_nos.length; stafi++){
			// This upper limit on four voices is quite arbitrary, and leads to the
			// creation of unnecessary default bar-long rests. What we need to do is
			// determine whether a particular voice is used by this staff somewhere
			// in this system. If so, create the default bar-long rests. If not,
			// don't.
			for (voice_no = 0; voice_no < 4; voice_no++){
				if (anacrusis == 0){
					var bar1 = 1;
				}
				else {
					var bar1 = 0;
				}
				for (bari = bar1; bari <= last_bar; bari++){
					var rel_expr = [];
					if (express[bari] !== undefined){
						rel_expr = express[bari].filter(function(a){
							return a.staffNo == staff_nos[stafi] && a.voiceNo == voice_no;
						});
					}
					if (rel_expr.length == 0
							//express[bari] == undefined ||
							//arrayObjectIndexOf(express[bari], staff_nos[stafi], "staffNo") == -1
						 ){
						// This is where we could create and return a message.

						var default_on = ontime_of_bar_and_beat_number(
															 bari, 1, time_sigs);
						var default_off = ontime_of_bar_and_beat_number(
															 bari + 1, 1, time_sigs);
						var express_rest = {
							id: "null", barOn: bari, beatOn: 1,
							ontime: default_on,
							barOff: bari + 1, beatOff: 1,
							offtime: default_off,
							duration: default_off - default_on,
							staffNo: staff_nos[stafi], voiceNo: voice_no,
							//yLine: -5
						};
						if (express[bari] == undefined){
							express[bari] = [express_rest];
						}
						else{
							express[bari].push(express_rest);
						}
					}
				}

			}

		}
		// console.log('Local express:');
		// console.log(express);

		// Split further into arrays according to staff number.
		var staff_split = [];
		if (anacrusis == 0){
			staff_split[0] = [];
		}
		for (bari = first_bar; bari <= last_bar; bari++){
      var curr_bar = express[bari];
      var curr_staff_split = [];
      for (xpi = 0; xpi < curr_bar.length; xpi++){
        if (curr_staff_split[curr_bar[xpi].staffNo] == undefined){
          curr_staff_split[curr_bar[xpi].staffNo] = [curr_bar[xpi]];
        }
        else{
          curr_staff_split[curr_bar[xpi].staffNo].push(curr_bar[xpi]);
        }
      }
      staff_split.push(curr_staff_split);
		}
		// console.log('staff_split:', staff_split);

		// Split further into arrays according to voice number.
    // ??
    // 12/5/2016. I'm not sure about the wisdom of this. The expressions I've
    // worked with so far don't appear to have any voice numbers. It could be
    // worth retaining, in order to ensure that multiple textnotes can be
    // rendered at the same ontime...
		var voice_split = [];
		if (anacrusis == 0){
			voice_split[0] = [];
		}
		for (bari = first_bar; bari <= last_bar; bari++){
      var curr_bar = staff_split[bari];
      // console.log('curr_bar:');
      // console.log(curr_bar);
      for (stafi = 0; stafi < curr_bar.length; stafi++){
        var curr_staff_split = curr_bar[stafi];
        // Get the unique voice numbers for this staff in this bar.
        var voice_nos = [];
        for (xpi = 0; xpi < curr_staff_split.length; xpi++){
          if (curr_staff_split[xpi].voiceNo == undefined){
           curr_staff_split[xpi].voiceNo = 0;
          }
          voice_nos.push(curr_staff_split[xpi].voiceNo);
        }
        voice_nos = voice_nos.filter(function(el,i,a){ return i==a.indexOf(el); });

        // Define the array that will hold the expressions for each voice in
        // this staff in this bar.
        curr_voice_split = [];
        for (xpi = 0; xpi < curr_staff_split.length; xpi++){
					if (curr_voice_split[curr_staff_split[xpi].voiceNo] == undefined){
						curr_voice_split[curr_staff_split[xpi].voiceNo] = [curr_staff_split[xpi]];
					}
					else {
						curr_voice_split[curr_staff_split[xpi].voiceNo].push(curr_staff_split[xpi]);
					}
				}

				// Add them to the voice_split variable.
        if (voice_split[bari] == undefined){
          voice_split[bari] = [];
        }
        if (voice_split[bari][stafi] == undefined){
          voice_split[bari][stafi] = curr_voice_split;
        }
      }
		}

		for (expi = expand_idx.length - 1; expi >= 0; expi--){
      for (bari = first_bar; bari <= last_bar; bari++){
          voice_split[bari].splice(expand_idx[expi] + 1, 0,
                                   $.extend([], voice_split[bari][expand_idx[expi]]));
      }
		}

		// console.log('staff_and_clef_names:');
		// console.log(staff_and_clef_names);
		// console.log('voice_split:');
		// console.log(voice_split);
		// return [voice_split, staff_and_clef_names];
    return voice_split;
}



function cobj2vex(Canvas, compObj, param){
	if (param.ontime !== undefined && param.offtime !== undefined){
		compObj = excerpt(compObj, param.ontime, param.offtime)
	}

  // Random note to color:
	var note_to_color_id = "57";

	// Identify any hidden staves and removed associated events from the Composition object.
	// Get staff and clef names, clef changes, key changes,
	// time-signature changes.
	var staff_and_clef_names = copy_array_object(compObj.layer);
	// console.log('staff_and_clef_names in:');
	// console.log(staff_and_clef_names);
  // Clef changes sorted by ontime.
  var clef_changes = compObj.clefChanges;
  //var clef_changes = compObj.clefChanges.sort(
  //  function(a, b){
  //    return a.ontime - b.ontime;
  //  }
  //);
	// Key signatures sorted by barNo.
	var key_sigs = compObj.keySignatures.sort(
    function(a, b){
      return a.barNo - b.barNo;
    }
  );

	// Keep the staves for which vexflow is either undefined or it's defined but the hidden
	// property is undefined or set to false.
	var non_hidden_staves_idx = [];
	staff_and_clef_names = staff_and_clef_names.filter(function(s){
		if (s.vexflow === undefined || (s.vexflow.hidden === undefined || !s.vexflow.hidden)){
			non_hidden_staves_idx.push(s.staffNo)
			return s;
		}
	})
	//console.log('staff_and_clef_names:', staff_and_clef_names);
	if (param.logging){
		console.log('non_hidden_staves_idx:', non_hidden_staves_idx)
	}
	// Return only those notes that belong to non-hidden members of staff_and_clefnames.
	var notes = compObj.notes;
	notes = notes.filter(function(n){
		return non_hidden_staves_idx.indexOf(n.staffNo) >= 0;
	});
	// console.log('notes.slice(0, 10):', notes.slice(0, 10));
	var rests = compObj.rests//||[]
	if (param.logging){
		console.log('rests pre-filter:', rests)
	}
	rests = rests.filter(function(r){
		return non_hidden_staves_idx.indexOf(r.staffNo) >= 0;
	})
	if (param.logging){
		console.log('rests post-filter:', rests)
	}
	//// Do the clefs and key signatures also.
	//clef_changes = clef_changes.filter(function(c){
	//	return non_hidden_staves_idx.indexOf(c.staffNo) >= 0;
	//});
	//key_sigs = key_sigs.filter(function(k){
	//	return non_hidden_staves_idx.indexOf(k.staffNo) >= 0;
	//});

	// Get notes and rests, and find the first and last bar numbers.
  // Need to unpack tied notes...
	notes = expand_written_ties(notes);
  // Stuck the map in temporarily below to sort out notes without voice
  // numbers.
  // var notes = compObj.notes.map(function(a){
  //   if (a.voiceNo == undefined){
  //     a.voiceNo = 0;
  //   }
  // });
	// notes = expand_written_ties(compObj.notes);


	// Get the first and last bar numbers. This assumes notes and rests are
	// sorted ascending by ontime prior to appearing here. This needs
	// tweaking a bit, because it assumes that the last note to begin is
	// also the last note to finish, which might not necessarily be true.
	if (param.logging){
		console.log("rests.length:", rests.length)
	}
	if (notes.length > 0 && rests.length > 0){
		// console.log("CALCULATING FIRST_BAR at notes.length > 0 && rests.length > 0!")
    var first_bar = Math.min(notes[0].barOn, rests[0].barOn);
    if (notes[notes.length - 1].offtime >= rests[rests.length - 1].offtime){
      var last_bar = notes[notes.length - 1].barOff;
      // If the last note completes the bar, subtract 1 from the above
      // value of last_bar, because it will have carried over into the next
      // (non-existent) bar.
      last_bar = last_bar - (notes[notes.length - 1].beatOff == 1);
    }
    else{
      var last_bar = rests[rests.length - 1].barOff;
      // If the last rest completes the bar, subtract 1 from the above
      // value of last_bar, because it will have carried over into the next
      // (non-existent) bar.
      last_bar = last_bar - (rests[rests.length - 1].beatOff == 1);
    }
    // var last_bar = Math.max(notes[notes.length - 1].barOff, rests[rests.length - 1].barOff);
	}
	else{
    if (notes.length > 0){
			// console.log("CALCULATING FIRST_BAR at notes.length > 0!")
			// console.log("notes[0].barOn:", notes[0].barOn)
	    var first_bar = notes[0].barOn;
      var last_bar = notes[notes.length - 1].barOff;
      last_bar = last_bar - (notes[notes.length - 1].beatOff == 1);
    }
    else{
			// console.log("CALCULATING FIRST_BAR HERE!")
      var first_bar = rests[0].barOn;
      var last_bar = rests[rests.length - 1].barOff;
      last_bar = last_bar - (rests[rests.length - 1].beatOff == 1);
    }
	}
	if (param.logging){
		console.log('first_bar:', first_bar)
		console.log('last_bar:', last_bar)
	}

	// Get page layout information.
	var page_breaks = compObj.pageLayout.pageBreaks;
  if (page_breaks == undefined) {
    page_breaks = [];
  }
	var system_breaks = compObj.pageLayout.systemBreaks;
	if (system_breaks == undefined) {
    system_breaks = [];
  }
	// console.log('system_breaks:');
	// console.log(system_breaks);

	// For each clef change, determine clef_str and octave_shift properties.
  for (clefi = 0; clefi < clef_changes.length; clefi++){
    var clef_str_and_octave_shift =
      fj_clef2vexflow_clef_str(clef_changes[clefi].clef);
		clef_changes[clefi].clef_str = clef_str_and_octave_shift[0];
    clef_changes[clefi].octave_shift = clef_str_and_octave_shift[1];
  }
  // This variable records whether there are any mid-system clef changes in
  // this rendering.
  var mid_system_clef_changesp = false;

  // Determine the length of each bar in crotchet beats. Also determine the
	// on/off times at which each bar begins and ends. These will be useful for
	// inserting missing rests, and hidden rests in voices that appear/
	// disappear.
	var time_sigs = compObj.timeSignatures;
  var anacrusis = compObj.miscXML.anacrusis;
	// console.log('anacrusis:');
	// console.log(anacrusis);
	var bar_crotchet_beats = [];
	var bar_begin_ends = [];
	if (anacrusis < 0){
			bar_crotchet_beats[0] = -anacrusis;
			bar_begin_ends[0] = [anacrusis, 0];
	}
	else{
			bar_crotchet_beats[0] = 0;
			bar_begin_ends[0] = [0, 0];
	}
	for (bari = 1; bari <= last_bar; bari++){
			var rel_time_sig = row_of_max_bar_leq_bar_arg(bari, time_sigs);
			var curr_bar_crotchet_beats = 4*rel_time_sig.topNo/rel_time_sig.bottomNo;
			bar_crotchet_beats.push(curr_bar_crotchet_beats);
			bar_begin_ends.push([bar_begin_ends[bari - 1][1],
													 bar_begin_ends[bari - 1][1] + curr_bar_crotchet_beats]);
	}
	// console.log('bar_crotchet_beats:');
	// console.log(bar_crotchet_beats);
	// console.log('bar_begin_ends:');
	// console.log(bar_begin_ends);

	// Initialise nrnest, which is an array of elemnts representing each system
	// with the structre
	// nrnest = [
	//   {
	//     voice: voice,
	//     notesRests: [],
	//     joinStaff: joinStaves[stafi]
	//   }
	//	 ...,
	// ]
	// It supports on-the-fly post-rendering highlighting/unhighlighting of
	// notes and rests.
	var nrnest = [];

	// Rearrange the notes and rests variables by bar, staff number, and voice
	// number.
	var voice_split_and_staff_clef_names
	  = notes_and_rests_by_bar_staff_voice(
	    notes, rests, staff_and_clef_names, time_sigs, anacrusis, first_bar,
			last_bar);
	var voice_split_0 = voice_split_and_staff_clef_names[0];
	// console.log('voice_split_0:');
	// console.log(voice_split_0);
	staff_and_clef_names = voice_split_and_staff_clef_names[1];
	// console.log('staff_and_clef_names out:');
	// console.log(staff_and_clef_names);
  var expand_idx = voice_split_and_staff_clef_names[2];
  // console.log('expand_idx: ', expand_idx);

	var voice_split =
	  create_ties(voice_split_0, time_sigs, bar_begin_ends);
	// console.log('voice_split:');
	// console.log(voice_split);

  // Handling expressions.
  var expressions = compObj.expressions;
  // console.log('expressions: ', expressions);
  var expr_voice_split = textnotes_by_bar_staff_voice(
    expressions, staff_and_clef_names, expand_idx, time_sigs, anacrusis,
    first_bar, last_bar, bar_begin_ends);
  // console.log('expr_voice_split: ', expr_voice_split);
  expr_voice_split = create_textnote_durations(
    expr_voice_split, time_sigs, bar_begin_ends);

	// This variable should increment over elements of page and system breaks
	// to indicate the bar number with which each new system begins.
	//var system_bar_limits = [{systemBarBegin: 1, systemBarEnd: 2,
	//												  nosCrotchetBeats: 8, breakType: "system"}];
	var system_bar_limits = system_page_breaks2system_bar_limits(
	  page_breaks, system_breaks, staff_and_clef_names, time_sigs,
    bar_crotchet_beats, first_bar, last_bar
	)
	if (param.logging){
		console.log('system_bar_limits:')
		console.log(system_bar_limits)
	}
	// Go through the key signatures and determine which ones occur partway
  // through a system, pushing them to mid_system_key_sigs.
  var mid_system_key_sigs = [];
	for (keyi = 0; keyi < key_sigs.length; keyi++){
    var rel_sys = system_bar_limits.filter(
      function (a){
        return a.systemBarBegin == key_sigs[keyi].barNo;
      }
    );
    if (rel_sys.length == 0){
      mid_system_key_sigs.push(key_sigs[keyi]);
    }
  }
  // console.log('mid_system_key_sigs:');
  // console.log(mid_system_key_sigs);
  // Do the same for time signatures.
  var mid_system_time_sigs = [];
  for (tsigi = 0; tsigi < time_sigs.length; tsigi++){
    var rel_sys = system_bar_limits.filter(
      function (a){
        return a.systemBarBegin == time_sigs[tsigi].barNo;
      }
    );
    if (rel_sys.length == 0){
      mid_system_time_sigs.push(time_sigs[tsigi]);
    }
  }
  // console.log('mid_system_time_sigs:');
  // console.log(mid_system_time_sigs);


  // Application wrapper element into jquery.
	// var AppElement = $('#app');
	// Get the width of the app element, which is the screen in this case.
	// var AppWidth = AppElement.width()
	// This gives the system a bit of a border on the left.
	let AppWidthAdjLeft = 125;
	if (param.padding !== undefined && param.padding.left !== undefined){
		AppWidthAdjLeft = param.padding.left
	}
	// This gives the system a bit of a border on the right.
	let AppWidthAdjRight = 50;
	if (param.padding !== undefined && param.padding.right !== undefined){
		AppWidthAdjRight = param.padding.right
	}
	// Introduced the next variable because the system always seemed to finish
	// before the voices, so this forces the voices to finish slightly earlier.
	let ExtraVoiceAdj = 125;
	if (param.padding !== undefined && param.padding.voice !== undefined){
		ExtraVoiceAdj = param.padding.voice
	}
	var system_spacers = [];
  if (compObj.pageLayout !== undefined &&
      compObj.pageLayout.systemSpacers !== undefined){
    system_spacers = compObj.pageLayout.systemSpacers;
  }
  var StaffSpacer = 125;
  var SystemSpacer = 150;
	// Work out where the beginnings of all the staves will be, and therefore
	// how long to make the canvas. At some point we'll have to adapt this to
	// multi-page compositions.
	var vertical_start = 100;
	var vertical_starts = []; // Useful for on-the-fly highlighting's refocusing component.
	system_bar_limits.map(function(sbl, systi){
		vertical_starts[systi] = [vertical_start];
		staff_and_clef_names.map(function(scn, stafi){
			if (stafi < staff_and_clef_names.length - 1){
				vertical_start = vertical_start + StaffSpacer;
				vertical_starts[systi].push(vertical_start);
			}
			else {
				// Apply system spacing for the next system.
        var curr_syst_spacer = system_spacers.filter(
          function (a){
            return systi == a.afterSystem;
          }
        );
        if (curr_syst_spacer.length > 0){
          curr_syst_spacer = curr_syst_spacer[0].px;
        }
        else{
          curr_syst_spacer = SystemSpacer;
        }
        vertical_start = vertical_start + curr_syst_spacer;
			}
		});
	});
	// console.log("vertical_starts:", vertical_starts);
	var AppHeight = vertical_start;
	// var AppHeight = 200*system_bar_limits.length*staff_and_clef_names.length + 0;
	var onx = {}; // Keeps track of all the notehead x-locations at integer ontimes.

	// jquery find the canmvas element
	// CanvasElement = AppElement.find('canvas');

	// CDC:
	// Tom, when using jQuery, we have to get the first element in a jQuery object which is always an array
	// In this case we are Not using jquer, we are using document.getElementById('id_of_canvas') to get a single
	// dom object, so it's not an array.
	// I've commented this out and passed "Canvas" to the top of the function call
	// var Canvas = a_canvas[0];

	// CDC: this is done in the maia-jam script
	//  make the canvas fit the screen width
	// Canvas.setAttribute('width', AppWidth);
	//
	// CDC: this is still relevant as the canvas needs to know how tall to be
	Canvas.setAttribute('height', AppHeight);

	// create a VexFlow renderer
	var renderer = new Vex.Flow.Renderer(Canvas, Vex.Flow.Renderer.Backends.CANVAS);
	renderer.resize(param.notationWidth, AppHeight);

	// get the context from our renderer object ??? not sure yet what this means
	var ctx = renderer.getContext();

	// Vex.Flow.RESOLUTION = 10000;
	// console.log('Vex.Flow.RESOLUTION:');
	// console.log(Vex.Flow.RESOLUTION);

  // Title etc.
  if (compObj.name !== undefined){
    var defaultFontSize = ctx.font;
    ctx.font = "28px serif";
    // console.log('ctx.font :', ctx.font);
    ctx.textAlign = "center";
    ctx.fillText(compObj.name, param.notationWidth/2, 40);
    ctx.font = defaultFontSize;
    // ctx.textAlign = "right";
    // ctx.fillText("Fr\u00E9d\u00E9ric\n Chopin", 550, 40);
    ctx.textAlign = "start";
  }
  var all_ties = []; // Contains tie info for all tied notes in the score.
  var all_tabties = []; // Tabtie (hammer on, pull off,...) for the score.
  var all_tabslides = []; // Tabslides (between frets) for the score.
  var all_slurs = []; // slur info for all slurred notes in the score.

	// Increment over each element of page and system breaks to draw systems
	// one at a time. These are stored in convenient format in
	// system_bar_limits.
	// for (systi = 0; systi < 1; systi++){
	for (systi = 0; systi < system_bar_limits.length; systi++){

			// console.log('systi:', systi);
			// The variable join_staves holds everything rendered on each staff of
			// a system as an element of an array.
			var join_staves = [];
			// The variable join_voices holds everything rendered on each staff of
			// a system, but with an additional layer of separation by staff.
			var join_voices = [];
      var all_beams = []; // Contains beam info for all beams in the system.
			var all_tuplets = []; // Contains tuplet info for all tuplets in the system.
      // The following variable makes it possible for notated durations and
      // the duration allotted to a given system to disagree. It is useful
      // for testing purposes, but in reality these disagreements should not
      // occur.
      var setStrict = false;
      // Introduced the next variable because the system always seemed to finish
      // before the voices if time or key signatures are specified (and variable
      // with the number of sharps/flats), so this forces the voices to finish
      // slightly earlier.
      var ExtraSysAdj = 0;
			//
			// nrnest[systi] = {};
			var vf_notes_by_staff_voice = [];
			// vertical_starts[systi] = [vertical_start];
			var horizontal_start, stave_width;
			for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
					// 1/19/2019. It doesn't seem necessary to nest these in here, but
					// I guess we might have weird alignments at some point (in piano
				  // music, sometimes the first system is indented). But I took the
					// variable names outside the loop so they have global scope (useful
				  // for passing on horizontal_start to playback highlighting).
					// Define the horizontal start, vertical start and horizontal
					// finish positions.
					// Define the horizontal start, vertical start and horizontal
					// finish positions.
					horizontal_start = AppWidthAdjLeft;
					//var vertical_start
					//  = 150*staff_and_clef_names.length*systi + 125*stafi;
					stave_width = param.notationWidth - AppWidthAdjLeft - AppWidthAdjRight;
					// Define a logical that determines whether we're dealing with
					// a conventional staff or tablature.
					if (staff_and_clef_names[stafi].displayTablature !== undefined &&
							staff_and_clef_names[stafi].displayTablature == "only"){
							var tabp = true;
					}
					else{
							var tabp = false;
					}
					// Define the staff and draw the appropriate clef.
					if (tabp){
						var stave = new Vex.Flow.TabStave(
              horizontal_start, vertical_starts[systi][stafi], stave_width);
            stave.options.num_lines = staff_and_clef_names[stafi].tuning.length;
					}
					else{
						var stave = new Vex.Flow.Stave(
              horizontal_start, vertical_starts[systi][stafi], stave_width);
					}

					// New logic on clefs as of 22/11/2015.
          // Limit clef changes to the current staff.
          var clef_changes_in_staff = clef_changes.filter(
            function (a){
              return a.staffNo == staff_and_clef_names[stafi].staffNo;
            }
          );

          // Go through clef_changes once more. If there is a clef change
          // with an ontime different to those already contained in
          // clef_changes_in_staff, include it.
          for (clefi = 0; clefi < clef_changes.length; clefi++){
            var rel_idx = arrayObjectIndexOf(clef_changes_in_staff, clef_changes[clefi].ontime, "ontime");
            if (rel_idx == -1){
              clef_changes_in_staff.push(clef_changes[clefi]);
            }
          }
          // Sort the clef changes by ontime.
          clef_changes_in_staff.sort(
            function(a, b){
              return a.ontime - b.ontime;
            }
          );
          // var clef_changes_in_staff = clef_changes;

          var rel_clefs = clef_changes_in_staff.filter(
            function (a){
              return a.staffNo == staff_and_clef_names[stafi].staffNo &&
              a.ontime <= system_bar_limits[systi].systemOntime;
            }
          );
          var nrel_clefs = rel_clefs.length;
          // curr_clef is the clef that applies at the beginning of the
          // system.
          var curr_clef = rel_clefs[nrel_clefs - 1];
          // Here are any clef changes that occur partway through a system or
          // bar.
          var mid_system_clef_changes = clef_changes_in_staff.filter(
            function (a){
              return a.ontime > system_bar_limits[systi].systemOntime &&
                a.ontime < system_bar_limits[systi].systemOfftime;
            }
          );
          // console.log('systi:');
          // console.log(systi);
          // console.log('curr_clef:');
          // console.log(curr_clef);
          // console.log('mid_system_clef_changes:');
          // console.log(mid_system_clef_changes);

          // Old logic on clefs.
          // Limit clef changes to the current staff.
					//var clef_changes_in_staff = [];
					//for (clefi = 0; clefi < clef_changes.length; clefi++){
					//		if (clef_changes[clefi].staffNo == staff_and_clef_names[stafi].staffNo){
					//				clef_changes_in_staff.push(clef_changes[clefi]);
					//		}
					//}
					// Search these clef changes for the clef that applies at the bar
					// number at which the system begins.
					//var curr_clef
					//  = row_of_max_bar_leq_bar_arg(
					//    system_bar_limits[systi].systemBarBegin, clef_changes_in_staff);
          //var clef_str_and_octave_shift
					//  = fj_clef2vexflow_clef_str(curr_clef.clef);
					//var clef_str = clef_str_and_octave_shift[0];
					//var octave_shift = clef_str_and_octave_shift[1];
					// Add the clef.
          // console.log('curr_clef:');
          // console.log(curr_clef);
					if (tabp){
						stave.addTabGlyph();
						// stave.setContext(ctx).draw();
					}
					else{
						stave.addClef(curr_clef.clef_str);
             // stave.addClef(clef_str).setContext(ctx).draw();
					}

          // Limit key signatures to the current staff and those with
          // with barNo values less than or equal to
          // system_bar_limits[systi].systemBarBegin.
          var rel_key_sigs = key_sigs.filter(
            function(a){
              return a.staffNo == staff_and_clef_names[stafi].staffNo &&
              a.barNo <= system_bar_limits[systi].systemBarBegin;
            }
          );
          // console.log('rel_key_sigs:');
          // console.log(rel_key_sigs);
          var nrel_key = rel_key_sigs.length;
          // Add key signature at the beginning of a system.
          if (nrel_key > 0){
            var fifthSteps = rel_key_sigs[nrel_key - 1].fifthSteps;
            var mode = rel_key_sigs[nrel_key - 1].mode;
            if (mode == 0){
              var vexKeyNames = {
                "0": "C", "1": "G", "-1": "F", "2": "D", "-2": "Bb",
                "3": "A", "-3": "Eb", "4": "E", "-4": "Ab",
                "5": "B", "-5": "Db", "6": "F#", "-6": "Gb"
              };
            }
            else{
              var vexKeyNames = {
                "0": "Cm", "1": "Gm", "-1": "Fm", "2": "Dm", "-2": "Bbm",
                "3": "Am", "-3": "Ebm", "4": "Em", "-4": "Abm",
                "5": "Bm", "-5": "Dbm", "6": "F#m", "-6": "Gbm"
              };
            }
            if (tabp == false){
              var keySig = new Vex.Flow.KeySignature(vexKeyNames[fifthSteps]);
              keySig.addToStave(stave);
            }
            ExtraSysAdj = ExtraSysAdj + 1 + 2*Math.abs(fifthSteps);

          }

          //// Add an initial time signature.
          //if (systi == 0){
          //  var topNo = time_sigs[0].topNo;
          //  var botNo = time_sigs[0].bottomNo;
          //  stave.addTimeSignature(topNo + "/" + botNo);
          //  ExtraSysAdj = ExtraSysAdj + 5;
          //  // console.log('ExtraSysAdj:');
          //  // console.log(ExtraSysAdj);
          //}

          // Limit time signatures to those with barNo values less than or
          // equal to system_bar_limits[systi].systemBarBegin.
          var rel_time_sigs = time_sigs.filter(
            function(a){
              return a.barNo <= system_bar_limits[systi].systemBarBegin;
            }
          );
          // console.log('rel_time_sigs:');
          // console.log(rel_time_sigs);
          var nrel_tsig = rel_time_sigs.length;
          if (systi == 0 ||
              rel_time_sigs[nrel_tsig - 1].barNo ==
                system_bar_limits[systi].systemBarBegin){
            var topNo = rel_time_sigs[nrel_tsig - 1].topNo;
            var botNo = rel_time_sigs[nrel_tsig - 1].bottomNo;
            if (tabp){
              switch(stave.options.num_lines){
                case 4:
                  var timeSig =
                    new Vex.Flow.TimeSignature(topNo + "/" + botNo,
                                               23 + 7*Math.abs(fifthSteps));
                    // console.log('timeSig: ', timeSig);
                    timeSig.bottomLine = 1.5;
                    timeSig.topLine = 3;
                    timeSig.addToStave(stave);
                  break;
                default:
                  stave.addTimeSignature(topNo + "/" + botNo,
                                         13 + 7*Math.abs(fifthSteps)
                                         // 80
                                        );
                  break;
              }
            }
            else{
              if (curr_clef.clef_str == "percussion"){
                // console.log('yoyo perc!');
                stave.addTimeSignature(topNo + "/" + botNo,
                                       50
                                      );
              }
              else{
                stave.addTimeSignature(topNo + "/" + botNo);
              }
            }

            ExtraSysAdj = ExtraSysAdj + 1;
          }
          // This is for padding tab (and perc.) staves post-system zero.
          if (systi > 0){
            if (tabp){
              switch(stave.options.num_lines){
                case 4:
                  var fakeTimeSig =
                    new Vex.Flow.TimeSignature("C",
                                               20 + 4*Math.abs(fifthSteps)
                                               // 80
                                              );
                  break;
                default:
                  var fakeTimeSig =
                    new Vex.Flow.TimeSignature("C",
                                               10 + 4*Math.abs(fifthSteps)
                                               // 80
                                              );
                  break;
              }
              // console.log('fakeTimeSig: ', fakeTimeSig);
              fakeTimeSig.timeSig.glyph.scale = 0;
              // fakeTimeSig.a.bottomLine = 3;
              fakeTimeSig.addToStave(stave);
            }
            if (curr_clef.clef_str == "percussion"){
              var fakeTimeSig =
                new Vex.Flow.TimeSignature("C",
                                           33
                                          );
              fakeTimeSig.timeSig.glyph.scale = 0;
              fakeTimeSig.addToStave(stave);
            }
          }


          // Add instrument name text to the beginning of the staff.
          // This is a little bit of a disaster zone. One reason for the mess
          // at system zero is that instrument/playback relies on name
          // properties for each staff, which I had booted to the connector
          // property for things like guitar notation + tab. For systi > 0,
          // it's easier, because the abbreviation property is not
          // linked in anyway to instrument/playback.
					if (!param.hideStaveNames){
	          if (systi == 0){
	            if (stafi > 0){
	              if (staff_and_clef_names[stafi].connector == undefined){
	                if (
										staff_and_clef_names[stafi - 1].connector == undefined ||
										(staff_and_clef_names[stafi - 1].connector.name == undefined)
									){
	                  stave.setText(
											staff_and_clef_names[stafi].vexflow.name,
											Vex.Flow.Modifier.Position.LEFT
										)
	                }
	              }
	            }
	            else {
	              if (
									staff_and_clef_names[0].connector == undefined ||
									staff_and_clef_names[0].connector.name == undefined
								){
	                stave.setText(
										staff_and_clef_names[stafi].vexflow.name,
										Vex.Flow.Modifier.Position.LEFT
									)
	              }
	            }
	          }
	          else {
	            if (
								staff_and_clef_names[stafi].vexflow !== undefined &&
								staff_and_clef_names[stafi].vexflow.abbreviation !== undefined
							){
	              stave.setText(
	                staff_and_clef_names[stafi].vexflow.abbreviation,
	                Vex.Flow.Modifier.Position.LEFT);
	            }
	          }
					}

          // Draw the staff.
          stave.setContext(ctx);
          stave.draw();

					// This variable contains all the voices within a given staff over a
					// range of bars.
					// var join_voices = [];
					for (voici = 0; voici <= 3; voici++){
							// console.log('System ' + systi + ', staff ' + stafi + ', voice '
							// 						+ voici);
							var voice = new Vex.Flow.Voice({
                num_beats: system_bar_limits[systi].nosCrotchetBeats,
                beat_value: 4,
                resolution: Vex.Flow.RESOLUTION
              });
              // Temporarily removed for MEC.
              var textVoice = new Vex.Flow.Voice({
                num_beats: system_bar_limits[systi].nosCrotchetBeats,
                beat_value: 4,
                resolution: Vex.Flow.RESOLUTION
              });

							var render_notes_rests = [];
              var render_textnotes = [];
							for (
								bari = system_bar_limits[systi].systemBarBegin;
								bari <= system_bar_limits[systi].systemBarEnd;
								bari++
							){
									if (param.logging){
										console.log(
											'systi = ' + systi + ', ' +
		                  'stafi = ' + stafi + ', ' +
		                  'bari = ' + bari + ', ' +
		                  'voici = ' + voici + '.'
										)
									}

									// if (bari == 1) {
                  //   console.log('voice_split[bari][stafi][voici]:');
                  //   console.log(voice_split[bari][stafi][voici]);
									// }

                  if (bari !== system_bar_limits[systi].systemBarBegin){
                    // Check if there is a change of time signature at the
                    // beginning of this mid-system bar.
                    var chg_time_sig = mid_system_time_sigs.filter(function(a){
                      return a.barNo == bari;
                    });
                    if (chg_time_sig.length > 0){
                      var topNo = chg_time_sig[0].topNo;
                      var botNo = chg_time_sig[0].bottomNo;
                      var tsig_str = topNo + "/" + botNo;
                      // console.log('curr_time_sig:');
                      // console.log(curr_time_sig);
                      var curr_time_sig = new Vex.Flow.TimeSigNote(tsig_str);
                      // curr_time_sig.extraLeftPx = -10;
                      // Without reducing the spacing/padding, the mid-system
                      // time signature seemed to appear too far to the
                      // right.
                      curr_time_sig.render_options.annotation_spacing = 0;
                      curr_time_sig.render_options.stave_padding = -15;
                      // console.log('curr_time_sig:');
                      // console.log(curr_time_sig);
                      render_notes_rests.push(curr_time_sig);
                    }
                  }

									// Convert notes/rests/chords appearing in this staff/voice/bar
									// combo into vexflow array objects.
									if (param.logging){
										console.log("voice_split[bari]:", voice_split[bari])
									}
									if (voice_split[bari][stafi][voici]){
                      // console.log('Appearing voice.');
											if (tabp) {
													var vexflow_notes_rests
															= fj_notes_rests2vexflow_tab(
																	voice_split[bari][stafi][voici],
																	note_to_color_id);
											}
											else{
													var vexflow_notes_rests = fj_notes_rests2vexflow(
                            voice_split[bari][stafi][voici],
                            curr_clef.clef_str, curr_clef.octave_shift,
                            mid_system_clef_changes, staff_and_clef_names[stafi].staffNo,
                            note_to_color_id, stafi, voici);
                          // console.log('vexflow_notes_rests:');
                          // console.log(vexflow_notes_rests);

											}
									}
									else{
											// A voice may disappear in this bar, so we need to create
											// an artificial rest.
                      // console.log('Disappearing voice.');
											if (tabp){
												var vexflow_notes_rests = [
													{
														positions: [{ str: 3.6, fret: "" }],
														duration: duration2vexflow_string(
															bar_crotchet_beats[bari]
														) + "r",
														hidden: true
													}
												]
											}
											else {
													// This needs generalising, perhaps turning into a
													// function, and ideally, the rest needs hiding. I
													// was able to hide it by editing the
													// glyph_font_scale property once the object was defined.
													switch (curr_clef.clef_str){
															case "treble":
																	var rest_pitch = "e/4";
																	break;
															case "bass":
																	var rest_pitch = "g/2";
																	break;
															default:
																	var rest_pitch = "g/4";
																	// console.log("YOU NEED TO ADD MORE CLEFS HERE FOOL!");
																	break;
													}
                          // 22/11/2015. Modified to handle mid-system clef
                          // changes in hidden voices.
													var vexflow_notes_rests = [];
                          // Determine if there are any clef changes in this bar.
                          if (mid_system_clef_changes.length > 0){
                            rel_clefs = mid_system_clef_changes.filter(
                              function (a){
                                return bari == a.barNo;
                              }
                            );
                            // If there are, just draw them at the bar beginning to start with.
                            for (clefi = 0; clefi < rel_clefs.length; clefi++){
                              // console.log('Clef drawing in voici = ' + voici + '.');
                              // Update the clef_str and octave_shift values.
                              // curr_clef.clef_str = rel_clefs[clefi].clef_str;
                              // curr_clef.octave_shift = rel_clefs[clefi].octave_shift;
                              var clefnote = {
                                clefnote: true,
                                clef_str: rel_clefs[clefi].clef_str,
                                octave_shift: rel_clefs[clefi].octave_shift,
                                hidden: true
                              };
                              vexflow_notes_rests.push(clefnote);
                            }
                          }
													vexflow_notes_rests.push(
                            {
                              keys: [rest_pitch],
                              duration: duration2vexflow_string(
                                bar_crotchet_beats[bari]) + "r",
                              clef: curr_clef.clef_str,
                              hidden: true
                            }
                          )
													// console.log('vexflow_notes_rests:');
                          // console.log(vexflow_notes_rests);
											}
									}
									if (param.logging){
										console.log('vexflow_notes_rests:')
										console.log(vexflow_notes_rests)
									}

									// Prepare each of these notes/rests/chords for rendering.
									var curr_accd = undefined;
									if (tabp){
                    var tuplet_group_status = "closed";
                    var tuplet_group = [];
                    var tuplet_idx = undefined;


                    for (nri = 0; nri < vexflow_notes_rests.length; nri++){
                      if (// voici == 0 && // Should only need to do once per stave, but if you do it messes up the intra-stave alignment.
                            vexflow_notes_rests[nri].clefnote !== undefined &&
                            vexflow_notes_rests[nri].clefnote == true){
                        // Add the clef.
                        var curr_note = new Vex.Flow.ClefNote(vexflow_notes_rests[nri].clef_str);
                        // Seemed to put a lot of extra space around a
                        // clef, which these commands help reduce.
                        curr_note.render_options.annotation_spacing = 0;
                        curr_note.render_options.stave_padding = -15;
                        curr_note.width = 10;
                        if (vexflow_notes_rests[nri].hidden){
                          // console.log('Yo yo yo we got here!');
                          // console.log('clefnote:');
                          // console.log(clefnote);
                          // console.log('curr_note:');
                          // console.log(curr_note);
                          curr_note.glyph.scale = 0;
                          // Didn't seem to have an effect:
                          // curr_note.clef.point = 0;
                          // curr_note.render_options.glyph_font_scale = 0;
                        }
                        mid_system_clef_changesp = true;
                      }
                      else{ // No mid-system clef change (clefnote).
                        var dur_str = vexflow_notes_rests[nri].duration;
                        var curr_note = new Vex.Flow.TabNote(vexflow_notes_rests[nri]);
                        // Disappearing hidden notes.
                        if (vexflow_notes_rests[nri].hidden){
                            curr_note.render_options.glyph_font_scale = 0;
                        }
                        else{
                            // console.log('curr_note:');
                            // console.log(curr_note);
                            curr_note.render_options.glyph_font_scale = 35;
                            // curr_note.glyphs[0].width = 5;
                        }

                        // Add any technical properties here.
                        if (vexflow_notes_rests[nri].hidden == undefined &&
                            vexflow_notes_rests[nri].technical !== undefined){
                          // This is an array of technical objects, with the
                          // technical properties for note i of the chord in
                          // element i of curr_tech.
                          curr_tech = vexflow_notes_rests[nri].technical;
                          for (techi = 0; techi < curr_tech.length; techi++){
                            // curr_tech[artci] is an object holding the
                            // different techincal aspects for note i as its
                            // properties.
                            for (tech_key in curr_tech[techi]){
                              switch (tech_key){
                                case "bend":
                                  var bend = new Vex.Flow.Bend("", "",
                                                               [{
                                                                "type": curr_tech[techi].bend.type,
                                                                "text": curr_tech[techi].bend.text,
                                                                // "width": curr_tech[techi].bend.width
                                                              }]);
                                  curr_note.addModifier(bend, techi);
                                  // console.log("We got to bending!");
                                  break;
                                case "vibrato":
                                  var vibr = new Vex.Flow.Vibrato();
                                  vibr.setHarsh(curr_tech[techi].vibrato.harsh);
                                  vibr.setVibratoWidth(curr_tech[techi].vibrato.width);
                                  vibr.position = curr_tech[techi].vibrato.position;
                                  vibr.render_options.wave_height = curr_tech[techi].vibrato.waveHeight;
                                  vibr.render_options.wave_width = curr_tech[techi].vibrato.waveWidth;
                                  vibr.render_options.wave_girth = curr_tech[techi].vibrato.waveGirth;
                                  curr_note.addModifier(vibr, techi);
                                  break;
                              }
                            }
                          }
                        }

                        // This is where a fret number will get color because it was
                        // clicked on in the edit form.
                        if (vexflow_notes_rests[nri].note_to_color_idx != undefined){
                          // Color doesn't seem to work for tab, but I didn't
                          // investigate extensively.
                          //console.log('Found note to color again: ', curr_note);
                          // curr_note.setKeyStyle(
                          //  vexflow_notes_rests[nri].note_to_color_idx,
                          //  {fillStyle: "red", strokeStyle: "red"}
                          // )
                        }
                        // This is where tuplet logic is applied.
                        if (vexflow_notes_rests[nri].tuplet){
                          if (vexflow_notes_rests[nri].tuplet == "start"){
                            if (tuplet_group_status == "closed"){
                              tuplet_group_status = "open";
                              tuplet_idx = nri;
                            }
                            else{
															if (param.logging){
	                              console.log(
																	'Attempt to reopen already-open tuplet group.'
																)
															}
                            }
                          }
                          if (vexflow_notes_rests[nri].tuplet == "stop") {
                            if (tuplet_group_status == "open"){
                              tuplet_group.push(curr_note);
                              // tuplet_idxs[1] = nri;
                              // console.log('systi = ' + systi + ', ' +
                              //             'stafi = ' + stafi + ', ' +
                              //             'bari = ' + bari + ', ' +
                              //             'voici = ' + voici + '.'
                              //             );
                              // console.log('vexflow_notes_rests:');
                              // console.log(vexflow_notes_rests);
                              var curr_tuplet = new Vex.Flow.Tuplet(
                                tuplet_group,
                                {
                                  num_notes: vexflow_notes_rests[tuplet_idx].tuplet_num_notes,
                                  // num_notes: tuplet_group.length,
                                  beats_occupied: vexflow_notes_rests[tuplet_idx].tuplet_beats_occupied,
                                  // bracketed: false, // Don't seem to
                                  // have control over this at present.
                                  // ratioed: true
                                });
                              // Because it's tab, I'm overruling any bracket
                              // and number instructions here, but these
                              // could be reintroduced if desired (e.g., when
                              // beaming in tab).
                              curr_tuplet.bracketed = false;
                              // curr_tuplet.bracketed = vexflow_notes_rests[tuplet_idx].tuplet_bracketed;
                              curr_tuplet.ratioed = false;
                              // This can be used to display the ratio.
                              //if (vexflow_notes_rests[tuplet_idx].tuplet_show_number == "both"){
                              //  curr_tuplet.ratioed = true;
                              //}
                              // This code can be used to hide the text (and ratio).
                              // if (vexflow_notes_rests[tuplet_idx].tuplet_show_number == "none"){
                                // curr_tuplet.point = 0;
                                // Ought to iterate over num_glyphs and denom_glyphs because
                                // there may be double digits.
                                 curr_tuplet.num_glyphs[0].scale = 0;
                                 curr_tuplet.denom_glyphs[0].scale = 0;
                              // }
                              // console.log('curr_tuplet:');
                              // console.log(curr_tuplet);
                              // Push it to a variable that holds all
                              // tuplets in the piece.
                              all_tuplets.push(curr_tuplet);
                              // Empty the tuplet_idx and reset
                              // tuplet_group_status.
                              tuplet_group = [];
                              tuplet_group_status = "closed";
                              tuplet_idx = undefined;
                            }
                            else{
															if (param.logging){
																console.log(
																	'Attempt to re-close ' +
																	'already-closed tuplet group.'
																)
															}
                            }

                          }
                        }
                        if (tuplet_group_status == "open" &&
                            curr_note.clefnote == undefined){
                          tuplet_group.push(curr_note);
                        }
                        // This is where a tab event could get beamed.

                        // This is where a note gets added to all_tabties.
                        if (vexflow_notes_rests[nri].tabtie !== undefined){
                          curr_note.tabtie = vexflow_notes_rests[nri].tabtie;
                          all_tabties.push(curr_note);
                        }
                        // This is where a note gets added to all_tabslides.
                        if (vexflow_notes_rests[nri].tabslide !== undefined){
                          curr_note.tabslide = vexflow_notes_rests[nri].tabslide;
                          all_tabslides.push(curr_note);
                        }

												// This is where properties are inherited from the
												// FJ Composition Object.
												// ATTEMPT TO FIX BUG BY EVENING OUT, 4/10/2018.
												if (vexflow_notes_rests[nri].fj_inhr !== undefined){
													curr_note.fj_inhr = vexflow_notes_rests[nri].fj_inhr;;
													// Add the note to vf_notes_by_staff_voice.
													// console.log('vf_notes_by_staff_voice:', vf_notes_by_staff_voice);
													if (vf_notes_by_staff_voice[stafi] == undefined){
														vf_notes_by_staff_voice[stafi] = [
															[curr_note]
														];
													}
													else {
														if (vf_notes_by_staff_voice[stafi][voici] == undefined){
															vf_notes_by_staff_voice[stafi][voici] = [curr_note];
														}
														else {
															vf_notes_by_staff_voice[stafi][voici].push(curr_note);
														}
													}
												}

											}
                      render_notes_rests.push(curr_note);
                    }
									}
									else {
											var beam_group_status = "closed";
											var beam_group = [];
                      var tuplet_group_status = "closed";
                      var tuplet_group = [];
                      var tuplet_idx = undefined;
											for (nri = 0; nri < vexflow_notes_rests.length; nri++){
                        // Check for a mid-system clef change (clefnote).
                        if (// voici == 0 && // Should only need to do once per stave, but if you do it messes up the intra-stave alignment.
                            vexflow_notes_rests[nri].clefnote !== undefined &&
                            vexflow_notes_rests[nri].clefnote == true){
                          // Add the clef.
                          var curr_note = new Vex.Flow.ClefNote(vexflow_notes_rests[nri].clef_str);
                          // Seemed to put a lot of extra space around a
                          // clef, which these commands help reduce.
                          curr_note.render_options.annotation_spacing = 0;
                          curr_note.render_options.stave_padding = -15;
                          curr_note.width = 10;
                          if (vexflow_notes_rests[nri].hidden){
                            // console.log('Yo yo yo we got here!');
                            // console.log('clefnote:');
                            // console.log(clefnote);
														// console.log('curr_note:');
                            // console.log(curr_note);
                            curr_note.glyph.scale = 0;
														// Didn't seem to have an effect:
                            // curr_note.clef.point = 0;
														// curr_note.render_options.glyph_font_scale = 0;
													}
                          mid_system_clef_changesp = true;
                        }
                        else { // No mid-system clef change (clefnote).
                          var dur_str = vexflow_notes_rests[nri].duration;
                          var curr_note = new Vex.Flow.StaveNote(vexflow_notes_rests[nri]);
													// if (bari == system_bar_limits[systi].systemBarBegin &&
													// 	  voici == 0 &&
													// 		stafi <= 1 &&
													// 		nri <= 1) {
													// 	console.log("nri:", nri);
													// 	console.log("vexflow_notes_rests[nri]:", vexflow_notes_rests[nri]);
													// 	console.log("curr_note:", curr_note);
													// }

													// This chunk is about storing relevant x-locations
													// for use of cursor later.
													if (vexflow_notes_rests[nri].fj_inhr !== undefined){
														// console.log("GOT TO FJ_INHR.ONTIME DEFINED!");
														// console.log("nri:", nri);
														// console.log("curr_note:", curr_note);
														var curr_on = vexflow_notes_rests[nri].fj_inhr.ontime;
														var integer_on = Math.floor(curr_on);
														// console.log("integer_on:", integer_on);
														if (Math.abs(curr_on - integer_on) < 0.00002){
															if (onx[integer_on] == null) {
																onx[integer_on] = [];
															}
															curr_note.note_heads.map(function(nh){
																onx[integer_on].push(nh);
																return;
															})
														}
													}

                          // Add any accidentals here.
                          if (vexflow_notes_rests[nri].hidden == undefined &&
                              vexflow_notes_rests[nri].accidentals !== undefined){
                            curr_accd = vexflow_notes_rests[nri].accidentals;
                            for (accdi = 0; accdi < curr_accd.length; accdi++){
                              if (curr_accd[accdi]){
                                curr_note.addAccidental(accdi,
                                  new Vex.Flow.Accidental(curr_accd[accdi]));
                              }
                            }
                          }

                          // Add any articulations here.
                          if (vexflow_notes_rests[nri].hidden == undefined &&
                              vexflow_notes_rests[nri].articulations !== undefined){
                            // This is an array of articulations, with the
                            // articulations for note i of the chord in
                            // element i of curr_artc.
                            curr_artc = vexflow_notes_rests[nri].articulations;
                            for (artci = 0; artci < curr_artc.length; artci++){
                              // curr_artc[artci] is an object holding the
                              // different articulations for note i as its
                              // properties.
                                for (artc_key in curr_artc[artci]){
                                if (curr_artc[artci][artc_key] !== undefined){
                                  var artc = new Vex.Flow.Articulation(artc_key);
                                  if (curr_artc[artci][artc_key].setPosition !== undefined){
                                    artc.setPosition(curr_artc[artci][artc_key].setPosition);
                                  }
                                  curr_note.addArticulation(artci, artc);
                                }
                              }
                            }
                          }
                          // curr_note.addArticulation(0, new Vex.Flow.Articulation("a."));

                          // Just seeing if I can make things smaller. This makes
                          // tail smaller:
                          // curr_note.render_options.glyph_font_scale = 2;
                          if (vexflow_notes_rests[nri].hidden){
                              curr_note.note_heads[0].render_options.glyph_font_scale = 0;
                              // curr_note.note_heads[0].ignore_ticks = true;
                          }
                          else {
                              // Just trying to muck with spacing.
                              // curr_note.note_heads[0].render_options.glyph_font_scale = 35;
                              // curr_note.note_heads[0].render_options.stave_padding = 5;

                              // This is where a note gets dotted, perhaps multiple times.
                              // We do not want to dot hidden notes, because the dots will
                              // display, which is the reason for the hidden check.
                              var finished_dotting = false;
                              var dur_str_temp = dur_str;
                              while (!finished_dotting){
                                  var dur_str_length = dur_str_temp.length;
                                  if ((dur_str_length > 0 && // No rest condition.
                                       dur_str_temp[dur_str_length - 1] == 'd') ||
                                      (dur_str_length > 1 && // Rest condition.
                                       dur_str_temp[dur_str_length - 1] == 'r' &&
                                       dur_str_temp[dur_str_length - 2] == 'd')){
                                      curr_note.addDotToAll();
                                      // Beware - destructive alterations.
                                      if (dur_str_temp[dur_str_length - 1] == 'r') {
                                          // Remove a 'd' but keep the 'r'.
                                          dur_str_temp = dur_str_temp.slice(0, -2) + 'r';
                                      }
                                      else{
                                          // Remove a 'd'.
                                          dur_str_temp = dur_str_temp.slice(0, -1);
                                      }
                                  }
                                  else{
                                      finished_dotting = true;
                                  }
                              }

                          }

													// This is where a note gets color because its
													// vexflow notehead property has fill and/or stroke
													// properties.
													// OLD
                          // This is where a note gets color because it was
                          // clicked on in the edit form.
													if (
														param.colorNoteheads &&
														vexflow_notes_rests[nri].noteheads !== undefined &&
														vexflow_notes_rests[nri].noteheads[0] !== undefined
													){
													// OLD
													// if (
													// 	param.colorNoteheads &&
													// 	vexflow_notes_rests[nri].note_to_color_idx != undefined
													// ){
                            console.log('Found noteheads to color!');
														const nhs = vexflow_notes_rests[nri].noteheads
														nhs.forEach(function(nh, idx){
															if (nh !== undefined){
																curr_note.setKeyStyle(
																	idx,
																	{
																		fillStyle: nh.fill,
																		// strokeStyle: "red"
																	}
																)
															}
														})

														// const nh = vexflow_notes_rests[nri].noteheads[0] // NEEDS GENERALISING AWAY FROM ZERO.
														// console.log("nh:", nh)
                            // curr_note.setKeyStyle(
														// 	0, // NEEDS GENERALISING AWAY FROM ZERO.
														// 	// vexflow_notes_rests[nri].note_to_color_idx,
														// 	{
														// 		fillStyle: nh.fill,
														// 		// strokeStyle: "red"
														// 	}
														// 	// {
														// 	// 	fillStyle: "rgb(200, 200, 0)", //"red",
														// 	// 	strokeStyle: "red"
														// 	// }
														// 	// {shadowColor: "red", shadowBlur: 20}),
														//
														// );

														// 27/7/2016. Old test of highlighting single
														// note on-the-fly.
														// var a_note = curr_note;
														// var a_note_test = true;
                          }
                          // This is where tuplet logic is applied.
                          if (vexflow_notes_rests[nri].tuplet){
                            if (vexflow_notes_rests[nri].tuplet == "start"){
                              if (tuplet_group_status == "closed"){
                                tuplet_group_status = "open";
                                tuplet_idx = nri;
                              }
                              else{
																if (param.logging){
	                                console.log(
																		'Attempt to reopen already-open ' +
																		'tuplet group.'
																	)
																}
                              }
                            }
                            if (vexflow_notes_rests[nri].tuplet == "stop") {
                              if (tuplet_group_status == "open"){
                                tuplet_group.push(curr_note);
                                // tuplet_idxs[1] = nri;
                                // console.log('systi = ' + systi + ', ' +
                                //             'stafi = ' + stafi + ', ' +
                                //             'bari = ' + bari + ', ' +
                                //             'voici = ' + voici + '.'
                                //             );
                                // console.log('vexflow_notes_rests:');
                                // console.log(vexflow_notes_rests);
                                var curr_tuplet = new Vex.Flow.Tuplet(
                                  tuplet_group,
                                  {
                                    num_notes: vexflow_notes_rests[tuplet_idx].tuplet_num_notes,
                                    // num_notes: tuplet_group.length,
                                    beats_occupied: vexflow_notes_rests[tuplet_idx].tuplet_beats_occupied,
                                    // bracketed: false, // Don't seem to
                                    // have control over this at present.
                                    // ratioed: true
                                  });
                                curr_tuplet.bracketed = vexflow_notes_rests[tuplet_idx].tuplet_bracketed;
                                // This can be used to display the ratio.
                                if (vexflow_notes_rests[tuplet_idx].tuplet_show_number == "both"){
                                  curr_tuplet.ratioed = true;
                                }
                                // This code can be used to hide the text (and ratio).
                                if (vexflow_notes_rests[tuplet_idx].tuplet_show_number == "none"){
                                  // curr_tuplet.point = 0;
                                  // Ought to iterate over num_glyphs and denom_glyphs because
                                  // there may be double digits.
                                   curr_tuplet.num_glyphs[0].scale = 0;
                                   curr_tuplet.denom_glyphs[0].scale = 0;
                                }
                                // console.log('curr_tuplet:');
                                // console.log(curr_tuplet);
                                // Push it to a variable that holds all
                                // tuplets in the piece.
                                all_tuplets.push(curr_tuplet);
                                // Empty the tuplet_idx and reset
                                // tuplet_group_status.
                                tuplet_group = [];
                                tuplet_group_status = "closed";
                                tuplet_idx = undefined;
                              }
                              else{
																if (param.logging){
	                                console.log(
																		'Attempt to re-close ' +
                                    'already-closed tuplet group.'
																	)
																}
                              }

                            }
                          }
                          if (tuplet_group_status == "open" &&
                              curr_note.clefnote == undefined){
                            tuplet_group.push(curr_note);
                          }

                          // This is where a note gets beamed.
                          if (vexflow_notes_rests[nri].beam){
                              if (vexflow_notes_rests[nri].beam == "begin"){
                                  if (beam_group_status == "closed"){
                                      // beam_group.push(vexflow_notes_rests[nri]);
                                      beam_group_status = "open";
                                  }
                                  else {
																		if (param.logging){
																			console.log(
																				'Attempt to reopen already-open ' +
																				'beam group.'
																			)
																		}
                                  }
                              }
                              if (vexflow_notes_rests[nri].beam == "end"){
                                if (beam_group_status == "open"){
                                  beam_group.push(curr_note);
                                  // console.log('beam_group:');
                                  // console.log(beam_group);
                                  var curr_beam = new Vex.Flow.Beam(beam_group);
                                  //// Push it to a variable that holds all
                                  //// beams in the piece.
                                  all_beams.push(curr_beam);
                                  // Empty the beam_group and reset
                                  // beam_group_status.
                                  beam_group = [];
                                  beam_group_status = "closed";
                                }
                                else {
																	if (param.logging){
		                                console.log(
																			'Attempt to re-close ' +
																			'already-closed beam group.'
																		)
																	}
                                }
                              }
                          }
                          if (beam_group_status == "open"){
                              beam_group.push(curr_note);
                          }

                          // This is where lyrics get added.
                          if (vexflow_notes_rests[nri].lyrics !== undefined){
                            var curr_lyric = vexflow_notes_rests[nri].lyrics;
                            for (lyr_idx = 0; lyr_idx < curr_lyric.length; lyr_idx++){
                              if (curr_lyric[lyr_idx] !== undefined){
                                var lyr = new Vex.Flow.Annotation(curr_lyric[lyr_idx]);
                                lyr.setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.BOTTOM);
                                curr_note.addModifier(0, lyr);
                                // lyr.VerticalJustify = 'CENTER';
                                // lyr.setYShift(50);
                                // lyr.setYShift(Vex.Flow.Modifier.setYShift(50));
                                //if (curr_lyric[lyr_idx] == 'ye'){
                                //  lyr.y_shift = 50;
                                //  console.log('lyr:');
                                //  console.log(lyr);
                                //}
                                // var lyr = new Vex.Flow.Annotation(curr_lyric[lyr_idx]).setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.BOTTOM);
                              }
                            }
                          }

                          // This is where a note gets added to all_ties.
                          if (vexflow_notes_rests[nri].tie !== undefined){
                            curr_note.tie = vexflow_notes_rests[nri].tie;
                            all_ties.push(curr_note);
                            // all_ties.push(vexflow_notes_rests[nri]);
                          }

                          // This is where a note gets added to all_slurs.
                          if (vexflow_notes_rests[nri].slur !== undefined){
                            curr_note.slur = vexflow_notes_rests[nri].slur;
                            all_slurs.push(curr_note);
                          }

													// This is where properties are inherited from the
													// FJ Composition Object.
													// Can't remember why this is happening, 4/10/2018.
													if (vexflow_notes_rests[nri].fj_inhr !== undefined){
														curr_note.fj_inhr = vexflow_notes_rests[nri].fj_inhr;
														// Add the note to vf_notes_by_staff_voice.
														// console.log('vf_notes_by_staff_voice:', vf_notes_by_staff_voice);
														if (vf_notes_by_staff_voice[stafi] == undefined){
															vf_notes_by_staff_voice[stafi] = [
																[curr_note]
															];
														}
														else {
															if (vf_notes_by_staff_voice[stafi][voici] == undefined){
																vf_notes_by_staff_voice[stafi][voici] = [curr_note];
															}
															else {
																vf_notes_by_staff_voice[stafi][voici].push(curr_note);
															}
														}
													}

												}

                        render_notes_rests.push(curr_note);
											}
									}

                  // Temporarily removed for MEC.
                  if (expr_voice_split !== undefined &&
											expr_voice_split[bari][stafi][voici]){
                    // console.log('bari, stafi, voici: ', bari, stafi, voici);
                    var vexflow_textnotes =
                      fj_expressions2vexflow_textnotes(
                        expr_voice_split[bari][stafi][voici], stafi, mid_system_clef_changes);

                    // console.log('vexflow_textnotes: ', vexflow_textnotes);
                    for (tni = 0; tni < vexflow_textnotes.length; tni++){
											if (vexflow_textnotes[tni].clefnote !== undefined &&
													vexflow_textnotes[tni].clefnote == true){
												// console.log('hello clefnote!');
												// Add the clef.
												var txtn = new Vex.Flow.ClefNote(vexflow_textnotes[tni].clef_str);
												// Seemed to put a lot of extra space around a
												// clef, which these commands help reduce.
												txtn.render_options.annotation_spacing = 0;
												txtn.render_options.stave_padding = -15;
												txtn.width = 10;
												txtn.glyph.scale = 0;
												mid_system_clef_changesp = true;
											}
											else { // No mid-system clef change (clefnote).
												curr_txtn = vexflow_textnotes[tni];
												if (curr_txtn.glyph !== undefined){
													var txtn = new Vex.Flow.TextNote(
														{
															glyph: curr_txtn.glyph,
															duration: curr_txtn.duration
														}
													);
												}
												else {
													var txtn = new Vex.Flow.TextNote(
														{
															text: curr_txtn.text,
															duration: curr_txtn.duration
														}
													);
												}
												// console.log('curr_txtn.x_shift:', curr_txtn.x_shift);
												// Seems like if the TextNote is of type glyph, then
												// render_options.x_shift is initialized to 0. If it
												// is of type text, then render_options.x_shift is
												// undefined. In the following, we're trying to
												// ensure any undefined or zeroed stave_padding
												// commands are set to 12.
												if (curr_txtn.x_shift == undefined || curr_txtn.x_shift == 0){
													txtn.render_options.stave_padding = 12;
												}
												else {
													// console.log('tni:', tni);
													txtn.render_options.stave_padding = curr_txtn.x_shift;
												}
												if (curr_txtn.setLine !== undefined){
													txtn.setLine(curr_txtn.setLine);
												}
												txtn.setStave(stave);
											}
                      render_textnotes.push(txtn);
                    }
										// console.log('render_textnotes:', render_textnotes);
                  }

									// This inserts a standard bar line.
									var curr_barline = new Vex.Flow.BarNote({duration: "b"});
									// console.log('standard barline inserted.');
									// If it's the last barline in a system, we don't want to draw it.
									if (bari != system_bar_limits[systi].systemBarEnd){
										render_notes_rests.push(curr_barline);
                    if (render_textnotes.length > 0){
                      render_textnotes.push(curr_barline);
                    }
									}
									// As yet I am unable to alter the lineWidth of the
									// rendered bar lines. This creates a bit of an issue,
									// because a bar line must be rendered for each voice on a
									// stave (even hidden voices) in order to maintain good
									// alignment. Previous attempts to alter lineWidth are as
									// follows:
									// curr_barline.context = {};
									// curr_barline.context.lineWidth = 10;
									// I thought this one would work but it's the padding
									// surrounding a bar line.
									// curr_barline.width = 0;

							} // bari.

              if (setStrict == false){
                voice.setStrict(false);
                // Temporarily removed for MEC.
                textVoice.setStrict(false);
              }
							voice.addTickables(render_notes_rests);
              // Temporarily removed for MEC.
              textVoice.addTickables(render_textnotes);
              if (systi == 0 && voici == 0){
                // console.log('render_textnotes: ', render_textnotes);
              }

							// voice.stave = true;
							if (voici == 0){
								join_voices[stafi] = [voice];
							}
							else{
								join_voices[stafi].push(voice);
							}
              if (render_textnotes.length > 0){
                join_voices[stafi].push(textVoice);
              }

					} // voici.

          //////////////////////////////////////
          // Fake vexflow_textnotes variable. //
          //////////////////////////////////////
          //var vexflow_textnotes = fj_expressions2vexflow_textnotes();
          //console.log('vexflow_textnotes: ', vexflow_textnotes);
          //var vexflow_textnotes = [
          //  {
          //    text: "",
          //    duration: "q"
          //  },
          //  {
          //    glyph: "p",
          //    duration: "h",
          //    setLine: 9
          //  },
          //  {
          //    text: "",
          //    duration: "h"
          //  },
          //  {
          //    text: "",
          //    duration: "q"
          //  },
          //  {
          //    text: "",
          //    duration: "h"
          //  },
          //  {
          //    text: "",
          //    duration: "q"
          //  },
          //  {
          //    text: "",
          //    duration: "h"
          //  },
          //  {
          //    text: "",
          //    duration: "q"
          //  },
          //  {
          //    text: "",
          //    duration: "h"
          //  },
          //  {
          //    text: "",
          //    duration: "q"
          //  }
          //];
          //
          //// var textnotes = undefined;
          //if (systi == 0 && stafi == 0){
          //  var textnotes = [];
          //  for (txti = 0; txti < vexflow_textnotes.length; txti++){
          //    var curr_txtn = vexflow_textnotes[txti];
          //    if (curr_txtn.glyph !== undefined){
          //      var txtn = new Vex.Flow.TextNote(
          //        {
          //          glyph: curr_txtn.glyph,
          //          duration: curr_txtn.duration
          //        }
          //      );
          //    }
          //    else {
          //      var txtn = new Vex.Flow.TextNote(
          //        {
          //          text: curr_txtn.text,
          //          duration: curr_txtn.duration
          //        }
          //      );
          //    }
          //    //if (curr_txtn.setLine !== undefined){
          //    //  txtn.setLine(curr_txtn.setLine);
          //    //}
          //    txtn.setStave(stave);
          //    textnotes.push(txtn);
          //  }
          //  console.log('textnotes: ', textnotes);
          //}

          // if (stafi < staff_and_clef_names.length - 1){
          //   vertical_start = vertical_start + StaffSpacer;
					// 	vertical_starts[systi].push(vertical_start);
          // }

        join_staves.push(stave);
			} // stafi.

			// Format and justify the notes.

      // Mucking around with textnotes.
      //if (systi == 0 && textnotes !== undefined && textnotes.length > 0){
      //  var voiceText = new Vex.Flow.Voice({
      //    num_beats: system_bar_limits[systi].nosCrotchetBeats,
      //    beat_value: 4,
      //    resolution:Vex.Flow.RESOLUTION
      //  });
      //  voiceText.addTickables(textnotes);
      //  join_voices[0].push(voiceText);
      //  console.log('Did this!');
      //}


			// console.log('join_voices:');
			// console.log(join_voices);
			// Within each staff, we need to call the formatter with the joinVoices
			// method, to avoid note occlusion.
			for (stafi = 0; stafi < join_voices.length; stafi++){
      // for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
        if (stafi == 0){ // formatter not yet defined.
          var formatter =
            new Vex.Flow.Formatter().joinVoices(join_voices[0]);
        }
        else{ // formatter already defined.
          formatter.joinVoices(join_voices[stafi]);
        }
			}
			// Between staves on the same system, we need to call the formatter
			// without the joinVoices method. Otherwise it thinks an F4 on one
			// staff and a G4 on another are going to get in each other's way,
			// which isn't the case.
			var flattened_join_voices = [].concat.apply([], join_voices);
			// console.log('flattened_join_voices:', flattened_join_voices);
			formatter.format(flattened_join_voices,
											 param.notationWidth - AppWidthAdjLeft - AppWidthAdjRight - ExtraVoiceAdj - ExtraSysAdj);
			// Now draw the voices.
			for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
					for (voici = 0; voici < join_voices[stafi].length; voici++){
							var curr_voice = join_voices[stafi][voici];
							curr_voice.draw(ctx, join_staves[stafi]);
							// 27/7/2016. Old test of highlighting single note on-the-fly.
							//if (a_note_test !== undefined && a_note_test){
							//	var a_voice = curr_voice;
							//	var a_join_staves = join_staves[stafi];
							//	a_note_test = false;
							//}
							// Update nrnest for on-the-fly highlighting.
							var vf_notes_by_staff_voice_to_add;
							if (vf_notes_by_staff_voice[stafi] !== undefined &&
									vf_notes_by_staff_voice[stafi][voici] !== undefined){
								vf_notes_by_staff_voice_to_add = vf_notes_by_staff_voice[stafi][voici];
							}
							if (nrnest[systi] == undefined){
								nrnest[systi] = [
									{
										"voice": curr_voice,
										"notesRests": vf_notes_by_staff_voice_to_add,
										"joinStaff": join_staves[stafi]
									}
								];
							}
							else {
								// console.log('stafi:', stafi);
								// console.log('voici:', voici);
								nrnest[systi].push(
									{
										"voice": curr_voice,
										"notesRests": vf_notes_by_staff_voice_to_add,
										"joinStaff": join_staves[stafi]
									}
								);
							}
					}
			}
      // Now draw the tuplets.
      for (tupli = 0; tupli < all_tuplets.length; tupli++){
				all_tuplets[tupli].setContext(ctx).draw();
			}
			// Now draw the beams.
			// console.log('all_beams:');
			// console.log(all_beams)
			for (beami = 0; beami < all_beams.length; beami++){
				all_beams[beami].setContext(ctx).draw();
			}

      // Draw braces etc. here.
			var brace = new Vex.Flow.StaveConnector(join_staves[0],
																							join_staves[join_staves.length - 1]);
			brace.setType(Vex.Flow.StaveConnector.type.LINE);
      brace.setContext(ctx).draw();
      for (stafi = 0; stafi < staff_and_clef_names.length; stafi++){
        if (staff_and_clef_names[stafi].connector !== undefined){
          //console.log('stafi:');
          //console.log(stafi);
          //console.log('staff_and_clef_names[stafi].connector.toStaffNo:');
          //console.log(staff_and_clef_names[stafi].connector.toStaffNo);
          //console.log('staff_and_clef_names[stafi].connector.type:');
          //console.log(staff_and_clef_names[stafi].connector.type);
          var brace = new Vex.Flow.StaveConnector(
            join_staves[stafi],
            join_staves[staff_and_clef_names[stafi].connector.toStaffNo]);
          switch (staff_and_clef_names[stafi].connector.type){
            case 'brace':
              brace.setType(Vex.Flow.StaveConnector.type.BRACE);
              break;
            case 'bracket':
              brace.setType(Vex.Flow.StaveConnector.type.BRACKET);
              break;
            case 'none':
              break;
            default:
              brace.setType(Vex.Flow.StaveConnector.type.LINE);
              break;
          }
          // Add some text to the brace.
					if (!param.hideStaveNames){
						if (systi == 0){
	            brace.setText(
	              staff_and_clef_names[stafi].connector.name,
	              Vex.Flow.Modifier.Position.LEFT
							)
	          }
	          else {
	            brace.setText(
	              staff_and_clef_names[stafi].connector.abbreviation,
	              Vex.Flow.Modifier.Position.LEFT
							)
	          }
					}
          brace.setContext(ctx).draw();
        }
      }

      // // Apply system spacing for the next system.
      // var curr_syst_spacer = system_spacers.filter(
      //   function (a){
      //     return systi == a.afterSystem;
      //   }
      // );
      // if (curr_syst_spacer.length > 0){
      //   curr_syst_spacer = curr_syst_spacer[0].px;
      // }
      // else{
      //   curr_syst_spacer = SystemSpacer;
      // }
      // vertical_start = vertical_start + curr_syst_spacer;

			// nrnest[systi].joinStaves = join_staves;
	} // systi.

  // Now draw the ties. The tie property is an array, because 'note' objects
  // in VexFlow may be chords with multiple notes, and so index i of a tie
  // array refers to note i of the corresponding chord. This means we need to
  // iterate over tie array i (using keyi) and over tie array j (using keyj)
  // in order to match up tie starts and stops.
  // console.log('all_ties.length = ' + all_ties.length);
  // console.log('all_ties:');
  // console.log(all_ties);
  for (tiei = 0; tiei < all_ties.length; tiei++){
    // If this is a starting tie, hunt for the stopping tie to which it
    // corresponds.
    var curr_start = undefined;
    var curr_stop = undefined;
    var tiej = undefined;
    if (all_ties[tiei].tie !== undefined){
      for (keyi = 0; keyi < all_ties[tiei].tie.length; keyi++){
        if (all_ties[tiei].tie[keyi] !== undefined){
          curr_start = all_ties[tiei];
          switch (all_ties[tiei].tie[keyi].type) {
            case "start" || "stop and start":

              tiej = tiei + 1;
              while (tiej < all_ties.length){
                var keyj = 0;
                while (keyj < all_ties[tiej].tie.length){
                  if (all_ties[tiej].tie[keyj] !== undefined &&
                      all_ties[tiej].tie[keyj].ID == curr_start.tie[keyi].tieStopID){
                    curr_stop = all_ties[tiej];
                    if (all_ties[tiej].tie[keyj].systemIdx == all_ties[tiei].tie[keyi].systemIdx){
                      // console.log('Found a tie stop ID for note in the same system:');
                      // console.log(all_ties[tiei]);
                      // console.log('first_note:');
                      // console.log(curr_start);
                      // curr_stop = all_ties[tiej];
                      var tie = new Vex.Flow.StaveTie({
                        first_note: curr_start,
                        last_note: curr_stop,
                        first_indices: [curr_start.tie[keyi].keyIdx],
                        last_indices: [curr_stop.tie[keyj].keyIdx]
                        } //, "Text can go here."
                      );
                      tie = tie_details(tie, curr_start.tie[keyi].tieDetails, 0);
                      tie.setContext(ctx).draw();
                      // tiej = all_ties.length - 1;
                    }
                    else {
                      // console.log('Found a tie stop ID for note in a different system:');
                      // Do some default little ties either side of the system break.
                      // console.log(all_ties[tiei]);
                      // console.log('first_note:');
                      // console.log(curr_start);
                      // curr_stop = all_ties[tiej];
                      // Tie end system.
                      var tie = new Vex.Flow.StaveTie({
                        first_note: curr_start,
                        last_note: curr_start,
                        first_indices: [curr_start.tie[keyi].keyIdx],
                        last_indices: [curr_start.tie[keyi].keyIdx]
                        } //, "Text can go here."
                      );
                      // Tie details.
                      if (curr_start.tie[keyi].tieDetails !== undefined &&
                          curr_start.tie[keyi].tieDetails[0].lastXShift == undefined){
                        curr_start.tie[keyi].tieDetails[0].lastXShift = 20;
                      }
                      if (curr_start.tie[keyi].tieDetails == undefined){
                        curr_start.tie[keyi].tieDetails = [{ "lastXShift": 20 }];
                      }
                      tie = tie_details(tie, curr_start.tie[keyi].tieDetails, 0);
                      tie.setContext(ctx).draw();
                      // Tie begin system.
                      var tie = new Vex.Flow.StaveTie({
                        first_note: curr_stop,
                        last_note: curr_stop,
                        first_indices: [curr_stop.tie[keyj].keyIdx],
                        last_indices: [curr_stop.tie[keyj].keyIdx]
                        } //, "Text can go here."
                      );
                      // Tie details.
                      if (curr_start.tie[keyi].tieDetails !== undefined &&
                          curr_start.tie[keyi].tieDetails[1] !== undefined &&
                          curr_start.tie[keyi].tieDetails[1].firstXShift == undefined){
                        curr_start.tie[keyi].tieDetails[1].firstXShift = -20;
                      }
                      if (curr_start.tie[keyi].tieDetails == undefined){
                        curr_start.tie[keyi].tieDetails = [, { "firstXShift": -20 }];
                      }
                      tie = tie_details(tie, curr_start.tie[keyi].tieDetails, 1);
                      tie.setContext(ctx).draw();
                      // tiej = all_ties.length - 1;
                    }
                    tiej = all_ties.length - 1;
                    keyj = curr_stop.length - 1;
                  } // if (all_ties[tiej].tie[keyj].ID == curr_start.tie[keyi].tieStopID){

                  keyj=keyj+1;
                } // keyj.

                tiej=tiej+1;
              } // tiej.

              if (curr_stop == undefined){
								if (param.logging){
	                console.log('No tie stop within the system for the following note:')
	                console.log(all_ties[tiei])
								}
              }

              break;
            case "start and stop":

              // console.log('We got to the start and stop zone!');
              // console.log('curr_start: ', curr_start);
              var tie = new Vex.Flow.StaveTie({
                first_note: curr_start,
                last_note: curr_start,
                first_indices: [curr_start.tie[keyi].keyIdx],
                last_indices: [curr_start.tie[keyi].keyIdx]
                } //, "Text can go here."
              );
              // Tie details.
              tie = tie_details(tie, curr_start.tie[keyi].tieDetails, 0);
              tie.setContext(ctx).draw();

              break;
          } // switch.
        } // if (all_ties[tiei].tie[keyi] !== undefined){
      } // keyi.


    } // if (all_ties[tiei].tie !== undefined){
  } // tiei.

  // Now draw the tab ties (hammer ons, pull offs, etc.). The tabtie property
  // is an array, because 'note' objects in VexFlow may be chords with
  // multiple notes, and so index i of a tabtie array refers to note i of the
  // corresponding chord. This means we need to iterate over tabtie array i
  // (using keyi) and over tab tie array j (using keyj) in order to match up
  // tabtie starts and stops.
  // Hunt over all_tabties using tt1 to find a starting tabtie.
  // console.log('all_tabties:');
  // console.log(all_tabties);
  for (tt1 = 0; tt1 < all_tabties.length; tt1++){
    var curr_start = undefined;
    if (all_tabties[tt1].tabtie !== undefined){
      // Hunt over keyi in all_tabties[tt1].tabtie to find a starting tabtie.
      for (keyi = 0; keyi < all_tabties[tt1].tabtie.length; keyi++){
        if (all_tabties[tt1].tabtie[keyi] !== undefined){
          // Because multiple tabties may attach to a single tabnote, hunt
          // over tbti in all_tabties[tt1].tabtie[keyi] to find a starting tabtie.
          for (tbti = 0; tbti < all_tabties[tt1].tabtie[keyi].length; tbti++){
            if (all_tabties[tt1].tabtie[keyi][tbti] !== undefined &&
                all_tabties[tt1].tabtie[keyi][tbti].type == "start"){
              // Found a starting tabtie!
              curr_start = all_tabties[tt1].tabtie[keyi][tbti];
              // console.log('Found a starter for tt1 = ' + tt1 +
              //             ', keyi = ' + keyi + ', tbti = ' + tbti);
              // Hunt over all_tabties using tt2 to find the corresponding
              // stopping tabtie.
              var curr_stop = undefined;
              // var tt2 = 0;
              var tt2 = tt1 + 1;
              var tt2_brk = all_tabties.length;
              while (tt2 < tt2_brk){
                if (all_tabties[tt2].tabtie !== undefined){
                  // Hunt over keyj in all_tabties[tt2].tabtie to find the corresponding
                  // stopping tabtie.
                  var keyj = 0;
                  var keyj_brk = all_tabties[tt2].tabtie.length;
                  while (keyj < keyj_brk){
                    if (all_tabties[tt2].tabtie[keyj] !== undefined){
                      var tbtj = 0;
                      var tbtj_brk = all_tabties[tt2].tabtie[keyj].length;
                      while (tbtj < tbtj_brk){
                        if (all_tabties[tt2].tabtie[keyj][tbtj] !== undefined &&
                            all_tabties[tt2].tabtie[keyj][tbtj].type == "stop" &&
                            all_tabties[tt2].tabtie[keyj][tbtj].number ==
                              curr_start.number){
                          // Found the corresponding stopping tabtie!
                          curr_stop = all_tabties[tt2].tabtie[keyj][tbtj];
                          if (curr_stop.systemIdx == curr_start.systemIdx){
                            // console.log('Found a tabtie stop ID for note in the same system:');
                            // console.log('Found a stopper for tt2 = ' + tt2 +
                            //             ', keyj = ' + keyj + ', tbtj = ' + tbtj);
                            // console.log(all_tabties[tt1]);
                            // console.log('first_note:');
                            // console.log(all_tabties[tt1].tabtie[keyi]);
                            var tbt = new Vex.Flow.TabTie(
                              {
                                first_note: all_tabties[tt1],
                                last_note: all_tabties[tt2],
                                first_indices: [curr_start.keyIdx],
                                last_indices: [curr_stop.keyIdx]
                              } //, "Text can go here."
                            );
                            // console.log('curr_start.tabtieDetails: ', curr_start.tabtieDetails);
                            tbt = tie_details(tbt, curr_start.tabtieDetails, 0);
                            tbt.setContext(ctx).draw();
                            // tt2 = all_tabties.length - 1;
                          }
                          else {
                            // console.log('Found a tabtie stop ID for note in a different system:');
                            // console.log('Found a stopper for tt2 = ' + tt2 +
                            //             ', keyj = ' + keyj + ', tbtj = ' + tbtj);
                            // Do some default little tabties either side of the system break.
                            // console.log(all_tabties[tt1]);
                            // console.log('first_note:');
                            // console.log(all_tabties[tt1].tabtie[keyi]);
                            // Tabtie end system.
                            var tbt = new Vex.Flow.TabTie(
                              {
                                first_note: all_tabties[tt1],
                                last_note: all_tabties[tt1],
                                first_indices: [curr_start.keyIdx],
                                last_indices: [curr_start.keyIdx]
                              } //, "Text can go here."
                            );
                            // Tabtie details.
                            if (curr_start.tabtieDetails !== undefined &&
                                curr_start.tabtieDetails[0].lastXShift == undefined){
                              curr_start.tabtieDetails[0].lastXShift = 20;
                            }
                            if (curr_start.tabtieDetails == undefined){
                              curr_start.tabtieDetails = [{ "lastXShift": 20 }];
                            }
                            tbt = tie_details(tbt, curr_start.tabtieDetails, 0);
                            tbt.setContext(ctx).draw();
                            // Slur begin system.
                            var tbt = new Vex.Flow.TabTie(
                              {
                                first_note: all_tabties[tt2],
                                last_note: all_tabties[tt2],
                                first_indices: [curr_stop.keyIdx],
                                last_indices: [curr_stop.keyIdx]
                              } //, "Text can go here."
                            );
                            // Tabtie details.
                            if (curr_stop.tabtieDetails !== undefined &&
                                curr_stop.tabtieDetails[0].firstXShift == undefined){
                              curr_stop.tabtieDetails[0].firstXShift = -20;
                            }
                            if (curr_stop.tabtieDetails == undefined){
                              curr_stop.tabtieDetails = [{ "firstXShift": -20 }];
                            }
                            tbt = tie_details(tbt, curr_stop.tabtieDetails, 0);
                            tbt.setContext(ctx).draw();
                          }
                          tbtj = tbtj_brk - 1;
                          keyj = keyj_brk - 1;
                          tt2 = tt2_brk - 1;
                        } // if... all_tabties[tt2].tabtie[keyj][tbtj].number == curr_start.number
                        tbtj=tbtj+1;
                      } // tbtj.
                    } // if (all_tabties[tt2].tabtie[keyj] !== undefined)
                  keyj=keyj+1;
                  } // keyj.
                } // if (all_tabties[tt2].tabtie !== undefined)
                tt2=tt2+1;
              } // tt2.

              if (curr_stop == undefined){
								if (param.logging){
	                console.log('No tabtie stop within the system for the following note:')
	                console.log(all_tabties[tt1])
								}
              }
            } // if...all_tabties[tt1].tabtie[keyi][tbti].type == "start"
          } // tbti.
        } // if (all_tabties[tt1].tabtie[keyi] !== undefined)
      } // keyi.
    } // if (all_tabties[tt1].tabtie !== undefined)
  } // tt1.

  // Now draw the tab slides. The tabslide property is an array, because
  // 'note' objects in VexFlow may be chords with multiple notes, and so
  // index i of a tie array refers to note i of the corresponding chord. This
  // means we need to iterate over tabslide array i (using keyi) and over
  // tabslide array j (using keyj) in order to match up tabslide starts and
  // stops.
  // console.log('all_tabslides.length = ' + all_tabslides.length);
  // console.log('all_tabslides:');
  // console.log(all_tabslides);
  for (ts1 = 0; ts1 < all_tabslides.length; ts1++){
    var curr_start = undefined;
    if (all_tabslides[ts1].tabslide !== undefined){
      // Hunt over keyi in all_tabslides[ts1].tabslide to find a starting tabslide.
      for (keyi = 0; keyi < all_tabslides[ts1].tabslide.length; keyi++){
        if (all_tabslides[ts1].tabslide[keyi] !== undefined){
          // Because multiple tabslides may attach to a single tabnote, hunt
          // over tbti in all_tabslides[ts1].tabslide[keyi] to find a starting tabslide.
          for (tbsi = 0; tbsi < all_tabslides[ts1].tabslide[keyi].length; tbsi++){
            if (all_tabslides[ts1].tabslide[keyi][tbsi] !== undefined){
              // Found a starting tabslide!
              curr_start = all_tabslides[ts1].tabslide[keyi][tbsi];
              switch (curr_start.type){
                case "start":
                  // console.log('Found a starter for ts1 = ' + ts1 +
                  //             ', keyi = ' + keyi + ', tbsi = ' + tbsi);
                  // Hunt over all_tabslides using ts2 to find the corresponding
                  // stopping tabslide.
                  var curr_stop = undefined;
                  // var ts2 = 0;
                  var ts2 = ts1 + 1;
                  var ts2_brk = all_tabslides.length;
                  while (ts2 < ts2_brk){
                    if (all_tabslides[ts2].tabslide !== undefined){
                      // Hunt over keyj in all_tabslides[ts2].tabslide to find the corresponding
                      // stopping tabslide.
                      var keyj = 0;
                      var keyj_brk = all_tabslides[ts2].tabslide.length;
                      while (keyj < keyj_brk){
                        if (all_tabslides[ts2].tabslide[keyj] !== undefined){
                          var tbsj = 0;
                          var tbsj_brk = all_tabslides[ts2].tabslide[keyj].length;
                          while (tbsj < tbsj_brk){
                            if (all_tabslides[ts2].tabslide[keyj][tbsj] !== undefined &&
                                all_tabslides[ts2].tabslide[keyj][tbsj].type == "stop" &&
                                all_tabslides[ts2].tabslide[keyj][tbsj].number ==
                                  curr_start.number){
                              // Found the corresponding stopping tabslide!
                              curr_stop = all_tabslides[ts2].tabslide[keyj][tbsj];
                              if (curr_stop.systemIdx == curr_start.systemIdx){
                                // console.log('Found a tabslide stop ID for note in the same system:');
                                // console.log('Found a stopper for ts2 = ' + ts2 +
                                //             ', keyj = ' + keyj + ', tbsj = ' + tbsj);
                                // console.log(all_tabslides[ts1]);
                                // console.log('first_note:');
                                // console.log(all_tabslides[ts1].tabslide[keyi]);
                                if (curr_stop.direction !== undefined &&
                                    curr_stop.direction == "down"){
                                  var tbs = new Vex.Flow.TabSlide(
                                    {
                                      first_note: all_tabslides[ts1],
                                      last_note: all_tabslides[ts2],
                                      first_indices: [curr_start.keyIdx],
                                      last_indices: [curr_stop.keyIdx]
                                    }, Vex.Flow.TabSlide.SLIDE_DOWN
                                  );
                                }
                                else {
                                  var tbs = new Vex.Flow.TabSlide(
                                    {
                                      first_note: all_tabslides[ts1],
                                      last_note: all_tabslides[ts2],
                                      first_indices: [curr_start.keyIdx],
                                      last_indices: [curr_stop.keyIdx]
                                    }, Vex.Flow.TabSlide.SLIDE_UP
                                  );
                                }
                                // console.log('curr_start.tabslideDetails: ', curr_start.tabslideDetails);
                                tbs = tie_details(tbs, curr_start.tabslideDetails, 0);
                                tbs.setContext(ctx).draw();
                                // ts2 = all_tabslides.length - 1;
                              }
                              else {
                                // console.log('Found a tabslide stop ID for note in a different system:');
                                // console.log('Found a stopper for ts2 = ' + ts2 +
                                //             ', keyj = ' + keyj + ', tbsj = ' + tbsj);
                                // Do some default little tabslides either side of the system break.
                                // console.log(all_tabslides[ts1]);
                                // console.log('first_note:');
                                // console.log(all_tabslides[ts1].tabslide[keyi]);
                                // Tabslide end system.
                                if (curr_stop.direction !== undefined &&
                                    curr_stop.direction == "down"){
                                  var tbs = new Vex.Flow.TabSlide(
                                    {
                                      first_note: all_tabslides[ts1],
                                      last_note: all_tabslides[ts1],
                                      first_indices: [curr_start.keyIdx],
                                      last_indices: [curr_start.keyIdx]
                                    }, Vex.Flow.TabSlide.SLIDE_DOWN
                                  );
                                }
                                else {
                                  var tbs = new Vex.Flow.TabSlide(
                                    {
                                      first_note: all_tabslides[ts1],
                                      last_note: all_tabslides[ts1],
                                      first_indices: [curr_start.keyIdx],
                                      last_indices: [curr_start.keyIdx]
                                    }, Vex.Flow.TabSlide.SLIDE_UP
                                  );
                                }
                                // Tabslide details.
                                if (curr_start.tabslideDetails !== undefined &&
                                    curr_start.tabslideDetails[0].lastXShift == undefined){
                                  curr_start.tabslideDetails[0].lastXShift = 20;
                                }
                                if (curr_start.tabslideDetails == undefined){
                                  curr_start.tabslideDetails = [{ "lastXShift": 20 }];
                                }
                                tbs = tie_details(tbs, curr_start.tabslideDetails, 0);
                                tbs.setContext(ctx).draw();
                                // TabSlide begin system.
                                if (curr_stop.direction !== undefined &&
                                    curr_stop.direction == "down"){
                                  var tbs = new Vex.Flow.TabSlide(
                                    {
                                      first_note: all_tabslides[ts2],
                                      last_note: all_tabslides[ts2],
                                      first_indices: [curr_stop.keyIdx],
                                      last_indices: [curr_stop.keyIdx]
                                    }, Vex.Flow.TabSlide.SLIDE_DOWN
                                  );
                                }
                                else {
                                  var tbs = new Vex.Flow.TabSlide(
                                    {
                                      first_note: all_tabslides[ts2],
                                      last_note: all_tabslides[ts2],
                                      first_indices: [curr_stop.keyIdx],
                                      last_indices: [curr_stop.keyIdx]
                                    }, Vex.Flow.TabSlide.SLIDE_UP
                                  );
                                }
                                // Tabslide details.
                                if (curr_stop.tabslideDetails !== undefined &&
                                    curr_stop.tabslideDetails[0].firstXShift == undefined){
                                  curr_stop.tabslideDetails[0].firstXShift = -20;
                                }
                                if (curr_stop.tabslideDetails == undefined){
                                  curr_stop.tabslideDetails = [{ "firstXShift": -20 }];
                                }
                                tbs = tie_details(tbs, curr_stop.tabslideDetails, 0);
                                tbs.setContext(ctx).draw();
                              }
                              tbsj = tbsj_brk - 1;
                              keyj = keyj_brk - 1;
                              ts2 = ts2_brk - 1;
                            } // if... all_tabslides[ts2].tabslide[keyj][tbsj].number == curr_start.number
                            tbsj=tbsj+1;
                          } // tbsj.
                        } // if (all_tabslides[ts2].tabslide[keyj] !== undefined)
                      keyj=keyj+1;
                      } // keyj.
                    } // if (all_tabslides[ts2].tabslide !== undefined)
                    ts2=ts2+1;
                  } // ts2.

                  if (curr_stop == undefined){
										if (param.logging){
	                    console.log('No tabslide stop within the system for the following note:');
	                    console.log(all_tabslides[ts1]);
										}
                  }

                  break;
                case "start and stop":
                  if (curr_start.direction !== undefined &&
                      curr_start.direction == "down"){
                    var tbs = new Vex.Flow.TabSlide(
                      {
                        first_note: all_tabslides[ts1],
                        last_note: all_tabslides[ts1],
                        first_indices: [curr_start.keyIdx],
                        last_indices: [curr_start.keyIdx]
                      }, Vex.Flow.TabSlide.SLIDE_DOWN
                    );
                  }
                  else {
                    var tbs = new Vex.Flow.TabSlide(
                      {
                        first_note: all_tabslides[ts1],
                        last_note: all_tabslides[ts1],
                        first_indices: [curr_start.keyIdx],
                        last_indices: [curr_start.keyIdx]
                      }, Vex.Flow.TabSlide.SLIDE_UP
                    );
                  }
                  // Tabslide details.
                  tbs = tie_details(tbs, curr_start.tabslideDetails, 0);
                  // console.log('tbs: ', tbs);
                  tbs.setContext(ctx).draw();
                  break;
              }
            } // if...all_tabslides[ts1].tabslide[keyi][tbsi].type == "start"
          } // tbsi.
        } // if (all_tabslides[ts1].tabslide[keyi] !== undefined)
      } // keyi.
    } // if (all_tabslides[ts1].tabslide !== undefined)
  } // ts1.


  // Now draw the slurs. The slur property is an array, because 'note'
  // objects in VexFlow may be chords with multiple notes, and so index i of
  // a slur array refers to note i of the corresponding chord. This means we
  // need to iterate over slur array i (using keyi) and over slur array j
  // (using keyj) in order to match up slur starts and stops.
  // console.log('all_slurs.length = ' + all_slurs.length);
  // console.log('all_slurs:');
  // console.log(all_slurs);
  // Hunt over all_slurs using as1 to find a starting slur.
  for (as1 = 0; as1 < all_slurs.length; as1++){
    var curr_start = undefined;
    if (all_slurs[as1].slur !== undefined){
      // Hunt over keyi in all_slurs[as1].slur to find a starting slur.
      for (keyi = 0; keyi < all_slurs[as1].slur.length; keyi++){
        if (all_slurs[as1].slur[keyi] !== undefined){
          // Because multiple slurs may attach to a single key, hunt over
          // sluri in all_slurs[as1].slur[keyi] to find a starting slur.
          for (sluri = 0; sluri < all_slurs[as1].slur[keyi].length; sluri++){
            if (all_slurs[as1].slur[keyi][sluri] !== undefined &&
                all_slurs[as1].slur[keyi][sluri].type == "start"){
              // Found a starting slur!
              curr_start = all_slurs[as1].slur[keyi][sluri];
              // console.log('Found a starter for as1 = ' + as1 +
              //             ', keyi = ' + keyi + ', sluri = ' + sluri);
              // Hunt over all_slurs using as2 to find the corresponding
              // stopping slur.
              var curr_stop = undefined;
							// 1/19/2019. Looking at tie/slur issues in If ye love me.
              // var as2 = 0;    // Why was this commented in?!
              var as2 = as1 + 1; // Why was this commented out?!
              var as2_brk = all_slurs.length;
              while (as2 < as2_brk){
                if (all_slurs[as2].slur !== undefined){
                  // Hunt over keyj in all_slurs[as2].slur to find the corresponding
                  // stopping slur.
                  var keyj = 0;
                  var keyj_brk = all_slurs[as2].slur.length;
                  while (keyj < keyj_brk){
                    if (all_slurs[as2].slur[keyj] !== undefined){
                      var slurj = 0;
                      var slurj_brk = all_slurs[as2].slur[keyj].length;
                      while (slurj < slurj_brk){
                        if (all_slurs[as2].slur[keyj][slurj] !== undefined &&
                            all_slurs[as2].slur[keyj][slurj].type == "stop" &&
                            all_slurs[as2].slur[keyj][slurj].number ==
                              curr_start.number &&
														all_slurs[as2].slur[keyj][slurj].staffIdx ==
													    curr_start.staffIdx){
                          // Found the corresponding stopping slur!
                          curr_stop = all_slurs[as2].slur[keyj][slurj];
                          if (curr_stop.systemIdx == curr_start.systemIdx){
                            // console.log('Found a slur stop ID for note in the same system:');
                            // console.log('Found a stopper for as2 = ' + as2 +
                            //             ', keyj = ' + keyj + ', slurj = ' + slurj);
                            // console.log(all_slurs[as1]);
                            // console.log('first_note:');
                            // console.log(all_slurs[as1].slur[keyi]);
                            var slur = new Vex.Flow.StaveTie(
                              {
                                first_note: all_slurs[as1],
                                last_note: all_slurs[as2],
                                first_indices: [curr_start.keyIdx],
                                last_indices: [curr_stop.keyIdx]
                              } //, "Text can go here."
                            );
                            slur = tie_details(slur, curr_start.slurDetails, 0);
                            slur.setContext(ctx).draw();
                            // as2 = all_slurs.length - 1;
                          }
                          else {
                            // console.log('Found a slur stop ID for note in a different system:');
                            // console.log('Found a stopper for as2 = ' + as2 +
                            //             ', keyj = ' + keyj + ', slurj = ' + slurj);
                            // Do some default little slurs either side of the system break.
                            // console.log(all_slurs[as1]);
                            // console.log('first_note:');
                            // console.log(all_slurs[as1].slur[keyi]);
                            // Slur end system.
                            var slur = new Vex.Flow.StaveTie(
                              {
                                first_note: all_slurs[as1],
                                last_note: all_slurs[as1],
                                first_indices: [curr_start.keyIdx],
                                last_indices: [curr_start.keyIdx]
                              } //, "Text can go here."
                            );
                            // Slur details.
                            if (curr_start.slurDetails !== undefined &&
                                curr_start.slurDetails[0].lastXShift == undefined){
                              curr_start.slurDetails[0].lastXShift = 20;
                            }
                            if (curr_start.slurDetails == undefined){
                              curr_start.slurDetails = [{ "lastXShift": 20 }];
                            }
														// 1/19/2019. Looking at tie/slur issues in If ye love me.
														// console.log("Investigating the resolution of slurs.");
														// console.log("curr_start:", curr_start);
                            slur = tie_details(slur, curr_start.slurDetails, 0);
                            slur.setContext(ctx).draw();
                            // Slur begin system.
                            var slur = new Vex.Flow.StaveTie(
                              {
                                first_note: all_slurs[as2],
                                last_note: all_slurs[as2],
                                first_indices: [curr_stop.keyIdx],
                                last_indices: [curr_stop.keyIdx]
                              } //, "Text can go here."
                            );
                            // Slur details.
                            if (curr_stop.slurDetails !== undefined &&
                                curr_stop.slurDetails[0].firstXShift == undefined){
                              curr_stop.slurDetails[0].firstXShift = -20;
                            }
                            if (curr_stop.slurDetails == undefined){
                              curr_stop.slurDetails = [{ "firstXShift": -20 }];
                            }
                            slur = tie_details(slur, curr_stop.slurDetails, 0);
                            slur.setContext(ctx).draw();
                          }
                          slurj = slurj_brk - 1;
                          keyj = keyj_brk - 1;
                          as2 = as2_brk - 1;
                        } // if... all_slurs[as2].slur[keyj][slurj].number == curr_start.number
                        slurj=slurj+1;
                      } // slurj.
                    } // if (all_slurs[as2].slur[keyj] !== undefined)
                  keyj=keyj+1;
                  } // keyj.
                } // if (all_slurs[as2].slur !== undefined)
                as2=as2+1;
              } // as2.

              if (curr_stop == undefined){
								if (param.logging){
	                console.log('No slur stop within the system for the following note:')
	                console.log(all_slurs[as1])
								}
              }
            } // if...all_slurs[as1].slur[keyi][sluri].type == "start"
          } // sluri.
        } // if (all_slurs[as1].slur[keyi] !== undefined)
      } // keyi.
    } // if (all_slurs[as1].slur !== undefined)
  } // as1.


  // VexFlow warnings.
  //if (mid_system_clef_changesp){
  //  console.log('This is fine, we can handle it.');
  //}
  if (mid_system_key_sigs.length > 0){
		if (param.logging){
	    console.log(
				'At least one key change occurs partway through a system. The current' +
				' version of VexFlow does not support mid-system rendering of key' +
				' changes, but they will be displayed correctly from the next system' +
				' onwards. To work around this issue, you could alter your system/page' +
	      ' breaks so that key changes coincide with system/page beginnings.'
			)
		}
  }
  // Another known issue involves two staves on the same system having
  // different key signatures (e.g., with transposing instrument), which
  // leads to misalignment. Similarly for percussion clefs, although I need
  // to double-check because this may have been addressed in VexFlow.

  // Putting a clef change partway through a tuplet causes
  // mis-alignment issue.

	// console.log('stave:', stave);

	// Clean up onx before returning it, now that rendering positions have been
	// determined.
	var onx_keys = Object.keys(onx)
	onx_keys.map(function(o){
		onx[o] = onx[o].map(function(nh){
			return nh.x
		})
	})
	return {
		"context": ctx,
		"notesRestsNest": nrnest,
		"systemBarLimits": system_bar_limits,
		"verticalStarts": vertical_starts,
		"ontimeXLoc": onx,
		"misc": {
			staffSpacer: StaffSpacer,
			horizontalStart: horizontal_start,
			staveWidth: stave_width
		}
	}
}


function excerpt(cobj, ontime, offtime){
	const logging = true
	// console.log("ontime:", ontime)
	// console.log("offtime:", offtime)
	// The way ontime and offtime are being used below, there is an
	// assumption that they each correspond to the beginning of some bar.
	// So warn and return without excerpting if this is not the case.
	const bb = bar_and_beat_number_of_ontime(ontime, cobj.timeSignatures)
	// console.log("bb:", bb)
	const bb2 = bar_and_beat_number_of_ontime(offtime, cobj.timeSignatures)
	// console.log("bb2:", bb2)
	if (
    (bb[1] !== 1 && bb[0] !== 0) || // When bb[0] is zero, it's an anacrusis,
    // so allow bb[1] to be anything in this instance.
    bb2[1] !== 1
  ){
		if (logging){
			console.log(
				"Ontime or offtime does not correspond to beginning of a bar. " +
			 	"No excerpting performed."
			)
		}
		return cobj
	}

	bb[0] -= 1
	if (logging){
  	console.log("The value of bb[0] to be subtracted:", bb[0])
	}
	const cobj2 = JSON.parse(JSON.stringify(cobj))
	// console.log("cobj2.notes before:", cobj2.notes)
	cobj2.notes = cobj2.notes.filter(function(n){
		return n.ontime >= ontime && n.ontime < offtime
	})
	// console.log("cobj2.notes.length after:", cobj2.notes.length)
	// console.log("cobj2.rests before:", cobj2.rests)
	cobj2.rests = cobj2.rests.filter(function(r){
		return r.ontime >= ontime && r.ontime < offtime
	})
	// console.log("cobj2.rests after:", cobj2.rests)
	if (cobj2.notes.length === 0 && cobj2.rests.length === 0){
		if (logging){
			console.log(
				"Time window requested contains no notes or rests. " +
				"No excerpting performed."
			)
		}
		return cobj
	}
	cobj2.keySignatures = cobj2.keySignatures.filter(function(ks, idx){
		return cobj2.keySignatures.length === 1 || // There's only one.
		(ks.ontime >= ontime && ks.ontime < offtime) || // Occurs midway through.
		(
			idx < cobj2.keySignatures.length - 1 &&      // Isn't final time sig.
			cobj2.keySignatures[idx + 1].ontime > ontime // The next one is midway through or beyond.
		)
	})
	cobj2.timeSignatures = cobj2.timeSignatures.filter(function(ts, idx){
		console.log("ts.ontime:", ts.ontime)
		console.log("ontime:", ontime)
		console.log("offtime:", offtime)
		return cobj2.timeSignatures.length === 1 || // There's only one.
		(ts.ontime >= ontime && ts.ontime < offtime) || // Occurs midway through.
		(
			ts.ontime < ontime &&                     // Occurs before
			idx === cobj2.timeSignatures.length - 1   // but there's nothing else.
		) ||
		(
			idx < cobj2.timeSignatures.length - 1 &&      // Isn't final time sig.
			cobj2.timeSignatures[idx + 1].ontime > ontime // The next one is midway through or beyond.
		)
	})
	console.log("cobj2.timeSignatures after:", cobj2.timeSignatures)
	cobj2.tempi = cobj2.tempi.filter(function(t, idx){
		return cobj2.tempi.length === 1 || // There's only one.
		(t.ontime >= ontime && t.ontime < offtime) || // Occurs midway through.
		(
			idx < cobj2.tempi.length - 1 &&      // Isn't final time sig.
			cobj2.tempi[idx + 1].ontime > ontime // The next one is midway through or beyond.
		)
	})
	cobj2.clefChanges = cobj2.clefChanges.filter(function(c, idx){
		return cobj2.clefChanges.length === 1 || // There's only one.
		(c.ontime >= ontime && c.ontime < offtime) || // Occurs midway through.
		(
			idx < cobj2.clefChanges.length - 1 &&      // Isn't final time sig.
			cobj2.clefChanges[idx + 1].ontime > ontime // The next one is midway through or beyond.
		)
	})
	cobj2.expressions = cobj2.expressions.filter(function(e, idx){
		return cobj2.expressions.length === 1 || // There's only one.
		(e.ontime >= ontime && e.ontime < offtime) || // Occurs midway through.
		(
			idx < cobj2.expressions.length - 1 &&      // Isn't final time sig.
			cobj2.expressions[idx + 1].ontime > ontime // The next one is midway through or beyond.
		)
	})
	cobj2.sequencing = cobj2.sequencing.filter(function(s){
		return s.ontime >= ontime && s.ontime < offtime
	})

	// If the piece has an anacrusis but the excerpt is from an ontime greater
	// than or equal to zero, then the record of the anacrusis needs destroying.
	if (cobj2.miscXML.anacrusis < 0 && ontime >= 0){
		// console.log("Destroying record of anacrusis!")
		cobj2.miscXML.anacrusis = 0
	}

	// Shift temporal events back by an appropriate amount.
	if (ontime > 0){
		cobj2.notes = cobj2.notes.map(function(n){
			n.ontime -= ontime
			n.offtime -= ontime
			n.barOn -= bb[0]
			n.barOff -= bb[0]
			if (n.tie !== undefined){
				n.tie.forEach(function(tn){
					tn.ontime -= ontime
					tn.offtime -= ontime
					tn.barOn -= bb[0]
					tn.barOff -= bb[0]
				})
			}
			return n
		})
		// console.log("cobj2.notes:", cobj2.notes)
		cobj2.rests = cobj2.rests.map(function(r){
			r.ontime -= ontime
			r.offtime -= ontime
			r.barOn -= bb[0]
			r.barOff -= bb[0]
			return r
		})
		cobj2.tempi = cobj2.tempi.map(function(t){
			if (t.ontime > ontime){
				t.ontime -= ontime
				t.barOn -= bb[0]
			}
			return t
		})
		cobj2.expressions = cobj2.expressions.map(function(e){
			if (e.ontime > ontime){
				e.ontime -= ontime
				e.barOn -= bb[0]
			}
			return e
		})
		const propsToAlter = [
			"keySignatures", "timeSignatures", "clefChanges", "sequencing"
		]
		propsToAlter.forEach(function(p){
			cobj2[p].forEach(function(e){
				e.ontime = Math.max(e.ontime - ontime, cobj2.miscXML.anacrusis)
				if (cobj2.miscXML.anacrusis < 0){
					e.barNo = Math.max(e.barNo - bb[0], 0)
				}
				else {
					e.barNo = Math.max(e.barNo - bb[0], 1)
				}
			})
		})
		// cobj2.keySignatures = cobj2.keySignatures.map(function(ks){
		// 	if (ks.ontime > ontime){
		// 		ks.ontime -= ontime
		// 		ks.barNo -= bb[0]
		// 	}
		// 	return ks
		// })
		// cobj2.timeSignatures = cobj2.timeSignatures.map(function(ts){
		// 	ts.ontime = Math.max(ts.ontime - ontime, cobj2.miscXML.anacrusis)
		// 	if (cobj2.miscXML.anacrusis < 0){
		// 		ts.barNo = Math.max(ts.barNo - bb[0], 0)
		// 	}
		// 	else {
		// 		ts.barNo = Math.max(ts.barNo - bb[0], 1)
		// 	}
		// 	return ts
		// })
		// cobj2.clefChanges = cobj2.clefChanges.map(function(c){
		// 	if (c.ontime > ontime){
		// 		c.ontime -= ontime
		// 		c.barNo -= bb[0]
		// 	}
		// 	return c
		// })
		// cobj2.sequencing = cobj2.sequencing.map(function(s){
		// 	s.ontime -= ontime
		// 	s.barNo -= bb[0]
		// 	return s
		// })
	}
	return cobj2
}
