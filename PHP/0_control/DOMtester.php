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

include '0_model/DOMgenerator.php';

class DOMtester {

    private $generator;

    public function __construct() {
        $this->generator = new DOMgenerator();

        $this->cmp_DOM_specific($this->generator->DOM_clobbered,
                                $this->generator->DOM_not_clobbered);
    }

    private function compare_DOMs() {

    }

    /**
     * Compare specific attributes between $DOM1 and $DOM2 whereas one of the
     * DOMs contain the clobbering attack vector and the other does not
     */
    private function cmp_DOM_specific($DOM1, $DOM2, $attributes) {
        
    }

    /**
     * Create a tree out of the DOM
     */
    private function build_DOM_tree($DOM) {

    }

    /**
     * Subtract the rooted trees $DOM1 and $DOM2 to get all of their
     * differences. 
     * One of the DOMs contain the clobbering attack vector and the other does
     * not 
     */
    private function rooted_tree_subtraction($DOM1, $DOM2) {

    }
}

?>