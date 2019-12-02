//  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

class Slide {
  constructor(slide_id, slideshow_id, dom_element) {
    this.id = slide_id;
    this.slideshow_id = slideshow_id;
    this.dom_element = dom_element;
    this.slide_data = this.dom_element.dataset;

    this.css = {};

    this.data_method_mapping = {
      "image": this.processImage.bind(this)
    };
  }

  static constructFromHtml(slide_id, slideshow_index, slide_dom){
    let new_slide = new Slide(slide_id, slideshow_index, slide_dom);
    return new_slide;
  }

  initialize() {
    this.writeUniqueHtmlIdsToDom();
    this.processSlideData();
  }

  writeUniqueHtmlIdsToDom() {
    let slide_id_text = "ez-slideshow-" + this.slideshow_id + "-slide-" + this.id;

    this.dom_element.setAttribute("id", slide_id_text);
    this.dom_element.setAttribute("data-slide-id", this.id);
  }

  processSlideData() {
    let data_key_list = Object.keys(this.dom_element.dataset);
    let registered_data_methods = Object.keys(this.data_method_mapping);

    for (let data_key of data_key_list) {
      if (registered_data_methods.includes(data_key)) {
        this.data_method_mapping[data_key]();
      }
    }

    this.updateCSS();
  }

  processImage() {
    this.css["background-image"] =  'url("' + this.slide_data.image + '")';
  }

  updateCSS() {
    let css_key_list = Object.keys(this.css);
    let css_string = "";

    for (let key of css_key_list) {
      css_string += key + ": " + this.css[key] + "; ";

    }
    this.dom_element.setAttribute("style", css_string);
  }

  getWidth() {
    return this.dom_element.scrollWidth;
  }

  getHeight() {
    return this.dom_element.scrollHeight;
  }

  setPosition(direction, location) {
    this.css[direction] = location + "px";
  }

  getPosition(direction) {
    console.log(this.css);
    console.log(direction);
    console.log(this.css[direction]);
    return this.css[direction].replace("px", "");
  }


}