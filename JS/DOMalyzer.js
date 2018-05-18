/*
 *   DOMalyzer - Search for DOM Clobbering
 *
 *   Copyright (C) 2018 Yakup Ates <Yakup.Ates@rub.de>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var readjson = function (file, callback) {
    var rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };

    rawFile.send(null);
};

var parse_JSON = function (filepath, index, flag) {
    readjson(filepath, function(text){
        build_dom(JSON.parse(text), index, flag);
    });
};


var build_dom = function(json, index, clob_flag) {
	if (clob_flag) {
		var pointer = json[index].clobbered;
	} else {
		var pointer = json[index].not_clobbered;
	}
	
	var attribute_name = ["name", "id"];

	var clobbered_len = Object.keys(pointer).length;
	
	for (var j=0; j < clobbered_len; j++) {

		var node = document.createElement(pointer[j].tag);
		//console.log(node);
/*
		for (var key in pointer[j].attributes) {
			if (!pointer[j].attributes.hasOwnProperty(key)) {
				var value = pointer[j].attributes[key];
				
				console.log(value);
			} else {
				var value = pointer[j].attributes[key];
				
				console.log(value);
			}
		}
	*/	
		var attributes_len = Object.keys(pointer[j].attributes).length;
		for (var k=0; k < attributes_len; k++) {
			var attr_name = Object.entries(pointer[j].attributes)[k][0];
			var attr_val = Object.entries(pointer[j].attributes)[k][1];
			
			node.setAttribute(attr_name, attr_val);
		}
		
		if ((pointer[j].parent_node != "body") &&
			(pointer[j].parent_node != "head") &&
			(pointer[j].parent_node != "html")) {
			document.getElementsByName(pointer[j]
									   .parent_node)[0].appendChild(node);
		} else {
			document.getElementsByTagName(pointer[j]
										  .parent_node)[0].appendChild(node);				
		}

		for (var k=0; k < attributes_len; k++) {
			compare(Object.entries(json[index].clobbered[j].attributes)[k][1]);
		}
	}
	

	//node.setAttribute();

	//document.getElementsByTagName("body")[0].appendChild(node);

    //var clob_elm_len = json[0].clobbered.elements[0].length;
    //console.log(arr[0].clobbered.elements[0].attributes.length);
    //console.log(json[0].clobbered[0].parent_node);
	//console.log(Object.keys(json[0].clobbered[0]).length);
    //console.log(json[0].clobbered.elements[0].attributes.length);

    //console.log(Object.keys(json).length);

    return json;
};
                                                                
var bruteforce_tags = function() {
	
};

var bruteforce_attribute_names = function() {
	
};

var brutforce_attribute_values = function() {
	
};

var readfile_txt = function (file, callback) {
	var rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType("text/plain");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };

    rawFile.send(null);
	
};


var compare = function(clobber_string) {
	console.log(window[clobber_string]);
};
  
var main = function() {
    var index = 1;
    parse_JSON("./clobber_vectors.json", index);


	filepath = "tags.txt";
    readfile_txt(filepath, function(text){
		var lines = text.split('\n');
        console.log(lines[1]);
    });	
};
