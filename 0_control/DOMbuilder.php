<?php

class DOMbuilder {

    private $DOM;
    private $HTML;

    public function __construct() {
        libxml_use_internal_errors(true);

        $this->create_DOM_template();

        $this->HTML = $this->DOM->saveHTML();
    }


    /**
     * Create empty DOM resulting in:
     * <html>
     *  <head>
     *  </head>
     *  <body>
     *  </body>
     * </html>
     */
    private function create_DOM_template() {
        $imp = new DOMImplementation();

        // add !DOCTYPE html
        $dtd = $imp->createDocumentType("html");
        $this->DOM = $imp->createDocument("", "", $dtd);

        $this->create_structure();
    }

    /**
     * Return DOM
     */
    public function get_DOM() {
        return $this->DOM;
    }

    /**
     * Return HTML source code
     */
    public function get_HTML() {
        $this->HTML = $this->DOM->saveHTML();

        return $this->HTML;
    }

    /**
     * Create HTML structure
     */
    public function create_structure() {
        $newChild = $this->DOM->createElement("html");
        $this->DOM->appendChild($newChild);

        $newChild = $this->DOM->createElement("head");
        $this->DOM->getElementsByTagName("html")->item(0)->appendChild($newChild);

        $newChild = $this->DOM->createElement("body");
        $this->DOM->getElementsByTagName("html")->item(0)->appendChild($newChild);
    }

    /**
     * Create DOM element using $parent as its parent node
     */
    public function create_element($name, $parent) {
        $newChild = $this->DOM->createElement($name);
        $element = $this->DOM->getElementsByTagName($parent)->item(0)->appendChild($newChild);

        return $element;
    }

    /**
     * Create $attribute to $dom_element containing $value
     */
    public function add_attribute($dom_element, $attribute, $value) {
        $dom_attribute = $this->DOM->createAttribute($attribute);
        $dom_attribute->value = $value;

        $dom_element->appendChild($dom_attribute);

        $this->DOM->getElementsByTagName('body')->item(0)->appendChild($dom_element);
    }

    /**
     * Change attribute value of $name to $value
     */
    public function set_attribute_value($attribute_name, $value) {
        $this->DOM->setAttribute($attribute_name, $value);
    }
}

?>