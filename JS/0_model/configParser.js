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

class configParser {
	
	constructor(index) {
		this.parse_JSON("./0_model/clobber_vectors.json", index);
	}

	
	get_JSON(json, index) {
		var nodes = 1;
		var builder = new DOMbuilder(nodes);
		//window.json = json;
		this.set_JSON(json);
		//console.log(json);
		
		return json;
	}
	
	readTextFile(file, callback) {
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
	 
	parse_JSON(filepath, index) {
		var self = this;
		
		this.readTextFile(filepath, function(text){
			self.get_JSON(JSON.parse(text), index);
		});
	}

	sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	}
	
}
