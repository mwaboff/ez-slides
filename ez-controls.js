  //  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

class SlideshowControl {
  constructor(control_id, dom_element) {
    this.id = control_id;
    this.dom_element = dom_element;
    this.control_data = this.dom_element.dataset;
    this.expected_slideshow_id = this.dom_element.dataset.slideshowId;

    this.css = {};

    this.slideshow = null;
  }

  static constructFromHtml(control_id, html_element) {
    return new SlideshowControl(control_id, html_element);
  }

  getExpectedSlideshowId() {
    return this.expected_slideshow_id;
  }

  associateSlideshow(slideshow) {
    this.slideshow = slideshow;
  }

  initialize() {
    this.generateButtons();
  }

  generateButtons() {
    let back_button = this.createBackButton();
    let forward_button = this.createForwardButton();
    let autoplay_button = this.createAutoplayButton();
    this.addButton(back_button);
    this.addButton(autoplay_button);
    this.addButton(forward_button);
  }

  createBackButton() {
    let new_button = document.createElement("img");
    new_button.setAttribute("src", "images/buttons/chevron-circle-left-solid.svg");
    new_button.setAttribute("class", "ez-controls-button");
    new_button.addEventListener("click", this.clickForwardButton.bind(this));
    return new_button;
  }

  createForwardButton() {
    let new_button = document.createElement("img");
    new_button.setAttribute("src", "images/buttons/chevron-circle-right-solid.svg");
    new_button.setAttribute("class", "ez-controls-button");
    new_button.addEventListener("click", this.clickForwardButton.bind(this));
    return new_button;
  }
  
  createAutoplayButton() {
    let new_button = document.createElement("img");
    new_button.setAttribute("src", "images/buttons/play-circle-solid.svg");
    new_button.setAttribute("class", "ez-controls-button ez-controls-play-button");
    new_button.addEventListener("click", this.clickAutoplayButton.bind(this));

    return new_button;
  }

  addButton(button) {
    this.dom_element.append(button);
  }

  clickBackButton() {
    this.slideshow.clickBackButton();
  }

  clickForwardButton() {
    this.slideshow.clickForwardButton();
  }

  clickAutoplayButton() {
    this.slideshow.clickAutoplayButton();
    this.changePlayButtonImage();
  }

  changePlayButtonImage() {
    let play_buttons = this.dom_element.getElementsByClassName("ez-controls-play-button");
    for (let button of play_buttons) {
      if(this.slideshow.autoplay_interval_handler) {
        button.setAttribute("src", "images/buttons/pause-circle-solid.svg");
      } else {
        button.setAttribute("src", "images/buttons/play-circle-solid.svg");
      }
    }
  }
}
