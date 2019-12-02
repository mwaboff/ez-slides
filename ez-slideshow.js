//  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

class Slideshow {
  constructor(slideshow_id, slide_list, dom_element) {
    this.id = slideshow_id;
    this.slide_list = slide_list;
    this.dom_element = dom_element;
  }

  static constructFromHtml(slideshow_id, html_element) {
    let slide_dom_list = html_element.getElementsByClassName(EZSlides.SLIDE_CLASS_NAME);
    let slide_list = Slideshow.createSlidesFromHtml(slideshow_id, slide_dom_list);

    let new_slideshow = new Slideshow(slideshow_id, slide_list, html_element);
    return new_slideshow;
  }

  static createSlidesFromHtml(slideshow_index, slide_dom_list) {
    let slide_list = []
    for (let slide_index = 0; slide_index < slide_dom_list.length; slide_index++) {
      let slide_dom = slide_dom_list[slide_index];
      let slide = Slide.constructFromHtml(slide_index, slideshow_index, slide_dom);
      slide_list.push(slide);
    }
    return slide_list;
  }

  initialize() {
    this.writeUniqueHtmlIdsToDom();
    this.initializeSlides();
    this.positionSlides();
    this.initializeButtons();
  }

  writeUniqueHtmlIdsToDom() {
    let slideshow_id_text = "ez-slideshow-" + this.id;
    this.dom_element.setAttribute("id", slideshow_id_text);
    this.dom_element.setAttribute("data-slideshow-id", this.id);
  }

  initializeSlides() {
    for (let slide of this.slide_list) {
      slide.initialize();
    }
  }

  positionSlides() {
    // TODO: Add different arrangements.
    this.positionSlidesHorizontally();
  }

  positionSlidesHorizontally() {
    let next_slide_position = 0;
    for (let slide of this.slide_list) {
      slide.setPosition("left", next_slide_position);
      next_slide_position += slide.getWidth();
      slide.updateCSS();
    }
  }

  initializeButtons() {
    let back_button = this.createBackButton();
    let forward_button = this.createForwardButton();
    // this.dom_element.prepend(back_button);
    // this.dom_element.append(forward_button);
    document.getElementById("content-container").prepend(back_button);
    document.getElementById("content-container").append(forward_button);
  }

  createBackButton() {
    let button_id = "ez-slideshow-" + this.id + "-back";
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-slides-directional-button");
    new_button.setAttribute("class", "ez-slides-back-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = "<";

    new_button.addEventListener("click", this.moveSlideBack.bind(this));

    return new_button;
  }

  moveSlideBack() {
    for (let slide of this.slide_list) {
      let current_position = parseInt(slide.getPosition("left"));
      let new_position = current_position + slide.getWidth();
      slide.setPosition("left", new_position);
      slide.updateCSS();
    }
  }

  createForwardButton() {
    let button_id = "ez-slideshow-" + this.id + "-forward";
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-slides-directional-button");
    new_button.setAttribute("class", "ez-slides-forward-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = ">";

    new_button.addEventListener("click", this.moveSlideForward.bind(this));

    return new_button;
  }

  moveSlideForward() {
    for (let slide of this.slide_list) {
      let current_position = parseInt(slide.getPosition("left"));
      let new_position = current_position - slide.getWidth();
      slide.setPosition("left", new_position);
      slide.updateCSS();
    }
  }

}
