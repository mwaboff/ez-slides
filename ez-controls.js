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
    console.log("associating slideshow!!!!");
    this.slideshow = slideshow;
    console.log(slideshow);
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
    let button_id = "ez-controls-backwards-" + this.id;
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-controls-directional-button");
    new_button.setAttribute("class", "ez-controls-back-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = "<";

    new_button.addEventListener("click", this.clickBackButton.bind(this));

    return new_button;
  }
  
  createForwardButton() {
    let button_id = "ez-controls-forwards-" + this.id;
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-controls-directional-button");
    new_button.setAttribute("class", "ez-controls-forward-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = ">";

    new_button.addEventListener("click", this.clickForwardButton.bind(this));

    return new_button;
  }
  
  createAutoplayButton() {
    let button_id = "ez-controls-forwards-" + this.id;
    let new_button = document.createElement("div");
    new_button.setAttribute("class", "ez-controls-play-button");
    new_button.setAttribute("id", button_id);
    new_button.innerText = "||";

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
  }
}
