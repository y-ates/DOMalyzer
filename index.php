<?php

include '0_control/DOMbuilder.php';


$builder = new DOMbuilder();

$form = $builder->create_element("form", "body");
$builder->add_attribute($form, "name", "form1");

$input = $builder->create_element("input", "form");
$builder->add_attribute($input, "name", "attributes");

echo $builder->get_HTML();

?>