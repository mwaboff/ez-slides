  //  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

class Slideshow {
  constructor(slideshow_id, slide_list, dom_element) {
    this.id = slideshow_id;
    this.slide_list = slide_list;
    this.dom_element = dom_element;
    this.current_slide_index = 0;

    this.autoplay_interval_handler = null;
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
    this.positionInitialSlides();
    // this.initializeButtons();
  }

  writeUniqueHtmlIdsToDom() {
    let slideshow_id_text = "ez-slideshow-" + this.id;
    this.dom_element.setAttribute("id", slideshow_id_text);
    if (!Object.keys(this.dom_element.dataset).includes("slideshowId")) {
      console.log('does not have slideshow-id');
      this.dom_element.setAttribute("data-slideshow-id", this.id);

    }
  }

  initializeSlides() {
    for (let slide of this.slide_list) {
      slide.initialize();
    }
  }

  positionInitialSlides() {
    // TODO: Add different arrangements.
    this.positionSlidesHorizontally();
    this.current_slide_index = 0;
  }

  getId() {
    return this.id;
  }

  initializeButtons() {
    let back_button = this.createBackButton();
    let forward_button = this.createForwardButton();
    // this.dom_element.prepend(back_button);
    // this.dom_element.append(forward_button);
    document.getElementById("content-container").prepend(back_button);
    document.getElementById("content-container").append(forward_button);
  }

  positionSlidesHorizontally() {
    for (let i = 0; i < this.slide_list.length; i++) {
      let slide = this.slide_list[i];
      let position = slide.getWidth() * i;
      slide.setLocation("left", position);
      slide.updateCSS();
    }
  }

  createBackButton() {
    let button_id = "ez-slideshow-" + this.id + "-back";
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-slides-directional-button");
    new_button.setAttribute("class", "ez-slides-back-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = "<";

    new_button.addEventListener("click", this.clickBackButton.bind(this));

    return new_button;
  }

  createForwardButton() {
    let button_id = "ez-slideshow-" + this.id + "-forward";
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-slides-directional-button");
    new_button.setAttribute("class", "ez-slides-forward-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = ">";

    new_button.addEventListener("click", this.clickForwardButton.bind(this));

    return new_button;
  }

  clickBackButton() {
    let next_index = this.current_slide_index - 1;
    this.moveToSlideIndex(next_index);
  }

  clickForwardButton() {
    let next_index = this.current_slide_index + 1;
    this.moveToSlideIndex(next_index);
  }

  clickAutoplayButton() {
    if(!this.autoplay_interval_handler) {
      this.initiateAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  moveToSlideIndex(target_slide_index) {
    target_slide_index = this.forceIndexWithinRange(target_slide_index);
    let slides_to_move = this.current_slide_index - target_slide_index;

    if(slides_to_move < 0) {
      this.moveBackwardByCount(slides_to_move);
    } else {
      this.moveForwardByCount(slides_to_move);
    }
  }

  initiateAutoplay() {
    this.autoplay_interval_handler = setInterval(this.clickForwardButton.bind(this), 3000);
  }

  stopAutoplay() {
    clearInterval(this.autoplay_interval_handler);
    this.autoplay_interval_handler = null;
  }

  forceIndexWithinRange(target_index) {
    if (target_index < 0) {
      target_index = this.slide_list.length - 1;
    } else if (target_index >= this.slide_list.length) {
      target_index = 0;
    }
    return target_index;
  }

  moveBackwardByCount(slides_to_move) {
    while (slides_to_move != 0) {
      this.moveBackwardOnce();
      slides_to_move++;
    }
  }

  moveForwardByCount(slides_to_move) {
    while (slides_to_move != 0) {
      this.moveForwardOnce();
      slides_to_move--;
    }
  }

  moveBackwardOnce() {
    for (let slide of this.slide_list) {
      let current_slide_location = parseInt(slide.getLocation("left"));
      let next_slide_location = current_slide_location - slide.getWidth();
      slide.setLocation("left", next_slide_location);
      slide.updateCSS();
    }
    this.current_slide_index++;
  }

  moveForwardOnce() {
    for (let slide of this.slide_list) {
      let current_slide_location = parseInt(slide.getLocation("left"));
      let next_slide_location = current_slide_location + slide.getWidth();
      slide.setLocation("left", next_slide_location);
      slide.updateCSS();
    }
    this.current_slide_index--;
  }

}
