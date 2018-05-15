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

class DOMbuilder {
	//const parser = require(["0_model/configParser.js"]).default;
	//const P = new parser();
	
	constructor(nodes) {
		this.create_DOM_template(nodes);

		//const Parser = require(["0_model/configParser.js"]);
		//const parser = new Parser();
	}

	
	
	create_DOM_template(nodes) {
		console.log(nodes);
		
		var form = document.createElement("form");
		form.setAttribute("name", "form1");

		var input = document.createElement("input");
		input.setAttribute("name", "querySelector");

		form.appendChild(input);
		
		document.getElementsByTagName("body")[0].appendChild(form);
		
		document.write("test");
		alert(1);
	}

	generate_DOM(DOM) {
		
	}
}
