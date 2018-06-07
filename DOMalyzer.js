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

//      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
var tmp = document.createElement("script");
tmp.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js");
document.getElementsByTagName("body")[0].appendChild(tmp);


//main();

function readjson(file, callback) {
    var rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };

    rawFile.send(null);
}

function parse_JSON(filepath, index, flag) {
    readjson(filepath, function(text){
        build_dom(JSON.parse(text), index, flag);
    });
}


function build_dom(json, index, clob_flag) {
    var pointer;

    if (clob_flag) {
        pointer = json[index].clobbered;
    } else {
        pointer = json[index].not_clobbered;
    }

    var attribute_name = ["name", "id"];

    var clobbered_len = Object.keys(pointer).length;

    for (var j=0; j < clobbered_len; j++) {

        var node = document.createElement(pointer[j].tag);

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
            var tmp1 = compare(Object.entries(json[index].clobbered[j].attributes)[k][1]);
            var tmp2 = compare(Object.entries(json[index].not_clobbered[j].attributes)[k][1]);

            if (tmp1 == tmp2) {
                //console.log("No Clobbering");
            } else {
                console.log("Clobbering found!");
                console.log("   Tag: " + json[index].clobbered[j].tag);
                console.log("   Attribute name: " + Object.entries(json[index].clobbered[j].attributes)[k][0]);
                console.log("   Attribute value: " + Object.entries(json[index].clobbered[j].attributes)[k][1]);
            }
        }
    }

    //undo_dom(json, index);
}

function undo_dom(json, index, clob_flag) {
    var pointer;

    if (clob_flag) {
        pointer = json[index].clobbered;
    } else {
        pointer = json[index].not_clobbered;
    }

    var clobbered_len = Object.keys(pointer).length;

    for (var j=0; j < clobbered_len; j++) {
        var node = document.getElementsByTagName(pointer[j].tag)[0];

        if ((pointer[j].parent_node != "body") &&
            (pointer[j].parent_node != "head") &&
            (pointer[j].parent_node != "html")) {
            if (typeof node != 'undefined') {
                document.getElementsByName(pointer[j]
                                           .parent_node)[0].removeChild(node);
            }
        } else {
            document.getElementsByTagName(pointer[j]
                                          .parent_node)[0].removeChild(node);
        }
    }
};

function create_bruteforce_dom() {
    tags_file = "db/tags.txt";
    attr_file = "db/attributes.txt";

    line_count = [];
    clobbered = 0;

    attr_parameters = [null, "name"];

    //getline(0, tags_file, bruteforce_tags);
    var x = document.createElement("img");
    document.getElementsByTagName("body")[0].appendChild(x);

    //current_brute_tag = "img";
    //getline(0, attr_file, bruteforce_attribute, attr_parameters);
	bruteforce(tags_file, attr_file, "name");
}

//TODO: remove specific node
function undo_tag(line) {
    var myNode = document.getElementsByTagName("body")[0];

    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}
function write_to_file(data, url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
}
function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
function check_clobbered(string, tag) {
    if (typeof window[string] === "undefined") {
        //object does not exist
        undo_tag(tag);

        return;
    } else if(isFunction(window[string])) {
		undo_tag(tag);
		
		return;
	} else {
		var t = window[string];
        var expectedNode = tag.toUpperCase() === document.getElementsByTagName(tag)[0].tagName.toUpperCase();
		console.log(t);
        if (expectedNode) {
            var details = "Tag: " + tag + ", attribute: " + string;
            var node = window[string];

//            write_to_file(details, "http://localhost:8002/filewriter.php");

            console.log("Clobbering...");
            console.log("Tag: " + tag + ", attribute: " + string);
            console.log("Node: ");
            console.log(window[string]);
            clobbered++;
            console.log("clobbered:" + clobbered);

        }

        undo_tag(tag);
    }
}

function bruteforce_tags(line) {
    //console.log("hier");
    if (line == "EOF") {
        console.log("Function: bruteforce_tags -> EOF");
    } else if (line === "") {
        //console.log("Empty line?");
    } else {
        // global variable used in bruteforce_attribute
        current_brute_tag = line;

        var node = document.createElement(line);
        if (typeof node != "undefined") {
            //console.log(typeof node);
            document.getElementsByTagName("body")[0].appendChild(node);
        } else {
            console.log(line);
        }

        //getline(0, attr_file, bruteforce_attribute, attr_parameters);
    }

    //console.log(line_count["bruteforce_tags"]);
}

function undo_tag(line) {
    //console.log("removing:" + line);
    //var node = document.getElementsByTagName(line)[0];
    //node.parentNode.removeChild(node);

    var myNode = document.getElementsByTagName("body")[0];
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
function try_tag(tag_name) {
	if (tag_name !== "") {
		var node = document.createElement(tag_name);

		current_brute_tag = tag_name;
	}

    if (typeof node != "undefined") {
        document.getElementsByTagName("body")[0].appendChild(node);
    }
}

function try_attribute(attr_name, attr_value) {
    var node;
	//console.log(attr_value);

function check_clobbered(string, tag) {
    if (typeof window[string] === "undefined") {
        //object does not exist
        undo_tag(tag);

        return;
    } else {
        var expectedNode = tag.toUpperCase() === tag.toUpperCase();

        if (expectedNode) {
            var details = "Tag: " + tag + ", attribute: " + string;
            var node = window[string];
/*
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				}
			};
			xhttp.open("POST", "http://localhost:8002/filewriter.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(details);
	*/		
	
            console.log("Clobbering...");
            console.log("Tag: " + tag + ", attribute: " + string);
            console.log("Node: ");
            console.log(window[string]);
            clobbered++;
            console.log("clobbered:" + clobbered);

        }

        undo_tag(tag);
    }
}

function bruteforce_attribute(tag, attribute_value, attr_name) {
    if (attribute_value == "EOF") {
        console.log("Function: bruteforce_attribute -> EOF");
    } else {
        var node;

        if (tag == null) {
            //console.log(current_brute_tag);
            node = document.getElementsByTagName(current_brute_tag)[0];
        } else {
            node = document.getElementsByTagName(tag)[0];
        }

        if (typeof node == "object") {
            node.setAttribute(attr_name, attribute_value);
            //console.log(node);

            tag == null ? check_clobbered(attribute_value, current_brute_tag)
                : check_clobbered(attribute_value, tag);

        }
    }
	//getline(0, tags_file, bruteforce_tags);
    bruteforce_tags(current_brute_tag);
}


function iterate_list(list, callback, attr_parameters) {
    var lines = list.split("\n");

    for (var index=0; index < lines.length; index++) {
        if (typeof lines[index] != "undefined") {
            //console.log("hier2");
            if (typeof attr_parameters != "undefined") {
                callback(attr_parameters[0], lines[index], attr_parameters[1]);
            } else {
                callback(lines[index]);
            }
        } else {
            callback("EOF");
        }
    }
}

/**
 * attr_parameters[0]: tag
 * attr_parameters[1]: attr_name (id/name)
 */
function getline(line, filepath, callback, attr_parameters) {
    readfile_txt(filepath, function(text){
        var lines = text.split('\n');

        var index = callback.name;
        line_count[index] = lines.length;
        iterate_list(text, callback, attr_parameters);

        /*
          if (typeof lines[line] != "undefined") {
          if (typeof attr_parameters != "undefined") {
          callback(attr_parameters[0], lines[line], attr_parameters[1]);
          } else {
          callback(lines[line]);
          }
          } else {
          callback("EOF");
          }
        */
    });
}

function readfile_txt(file, callback) {
    var rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType("text/plain");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };

    rawFile.send(null);
}


function compare(clobber_string) {
    var test = window[clobber_string];

    return test;
}

function main() {
    var index = 0;
    var clob_flag = [true, false];
    //parse_JSON("db/clobber_vectors.json", 1, false);
    for (var i=0; i<2; i++) {
        for (var flag in clob_flag) {
            //parse_JSON("db/clobber_vectors.json", i, flag);
        }
    }

	/*

      window.onload = function() {
      if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
      }
      };

	*/

    /**
     * db/tags.txt
     * db/attr_names.txt
     * db/attributes.txt
     */
    //getline(107, "db/tags.txt", create_bruteforce_dom);
    create_bruteforce_dom();
}
