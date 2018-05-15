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

include '0_control/DOMbuilder.php';

class DOMgenerator {

    private $DOM_clobbered;
    private $DOM_not_clobbered;
    private $DOMs;

    public function __construct() {
        $this->parse_JSON("0_model/config/nodes.json");

        $this->generate_DOM($this->DOMs, 1);
    }

    private function parse_JSON($path) {
        $this->DOMs = json_decode(file_get_contents($path), true);
    }

    private function set_DOMs($DOM_clob, $DOM2_no_clob) {
        $this->DOM_clobbered = $DOM_clob;
        $this->DOM_not_clobbered = $DOM_no_clob;
    }

    public function get_clobbered_DOM() {
        return $this->DOM_clobbered;
    }

    public function get_not_clobbered_DOM() {
        return $this->DOM_not_clobbered;
    }

    private function generate_DOM($doms, $index) {
        /**
         * Generate clobbered DOM
         */
        $builder_clob = new DOMbuilder();
        $this->DOM_clobbered = $doms[$index]["clobbered"];

        foreach ($this->DOM_clobbered as $clobbered) {
            foreach ($clobbered as $element) {
                $node = $builder_clob->create_element($element["tag"],
                                                      $element["parent_node"]);

                foreach ($element["attributes"] as $field => $value) {
                    $builder_clob->add_attribute($node, $element["parent_node"],
                                                 $field, $value);
                }
            }
        }

        $this->DOM_clobbered = $builder_clob->get_DOM();
        unset($builder_clob);


        /**
         * Generate not clobbered DOM
         */
        $builder_not_clob = new DOMbuilder();

        $this->DOM_not_clobbered = $doms[$index]["clobbered"];
        foreach ($this->DOM_not_clobbered as $not_clobbered) {
            foreach ($not_clobbered as $element) {
                $node = $builder_not_clob->create_element($element["tag"],
                                                          $element["parent_node"]);

                foreach ($element["attributes"] as $field => $value) {
                    $builder_not_clob->add_attribute($node,
                                                     $element["parent_node"],
                                                     $field, $value);
                }
            }
        }

        $this->DOM_not_clobbered = $builder_not_clob->get_DOM();
        unset($builder_not_clob);
    }
}

?>