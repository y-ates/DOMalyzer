<?php

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

//include '0_control/DOMbuilder.php';
include '0_model/DOMgenerator.php';

/*
$builder = new DOMbuilder();

$form = $builder->create_element("form", "body");
$builder->add_attribute($form, "name", "form1");

$input = $builder->create_element("input", "form");
$builder->add_attribute($input, "name", "attributes");

echo $builder->get_HTML();
*/

$generator = new DOMgenerator();


?>