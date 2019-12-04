//  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

class SlideshowManager {
  constructor(slideshow_list, control_list) {
    this.slideshow_list = slideshow_list;
    this.control_list = control_list;
  }

  static constructFromDomSearch() {
    var slideshow_doms = SlideshowManager.findSlideshowsFromDom();
    var control_doms = SlideshowManager.findControlsFromDom();
    var slideshows = SlideshowManager.createSlideshowsFromDom(slideshow_doms);
    var controls = SlideshowManager.createControlsFromDom(control_doms);
    let new_manager = new SlideshowManager(slideshows, controls);
    return new_manager;
  }

  static findSlideshowsFromDom = function() {
    return document.getElementsByClassName(EZSlides.SLIDESHOW_CLASS_NAME);
  }

  static findControlsFromDom = function() {
    return document.getElementsByClassName(EZSlides.CONTROLS_CLASS_NAME);
  }

  static createSlideshowsFromDom = function(slideshow_doms) {
    let slideshow_list = []
    for (let slideshow_index = 0; slideshow_index < slideshow_doms.length; slideshow_index++) {
      let slideshow_dom = slideshow_doms[slideshow_index];
      let slideshow = Slideshow.constructFromHtml(slideshow_index, slideshow_dom);
      slideshow_list.push(slideshow);
    }
    return slideshow_list;
  }

  static createControlsFromDom = function(control_doms) {
    let controls_list = []
    for (let control_index = 0; control_index < control_doms.length; control_index++) {
      let control_dom = control_doms[control_index];
      let control = SlideshowControl.constructFromHtml(control_index, control_dom);
      controls_list.push(control);
    }
    return controls_list;
  }

  initialize() {
    this.initializeSlideshows();
    this.associateControlsWithSlideshows();
    this.initializeControls();
  }

  initializeSlideshows() {
    for (let slideshow of this.slideshow_list) {
      slideshow.initialize();
    }
  }

  associateControlsWithSlideshows() {
    for (let control of this.control_list) {
      let expected_slideshow_id = control.getExpectedSlideshowId();
      console.log("expected slideshow ID: " + expected_slideshow_id);
      let found_slideshow = this.findSlideshowWithId(expected_slideshow_id);
      console.log("found slideshow ID: " + found_slideshow);
      control.associateSlideshow(found_slideshow);
    }
  }

  initializeControls() {
    for (let control of this.control_list) {
      control.initialize();
    }
  }

  findSlideshowWithId(target_id) {
    console.log("Searching for target Slideshow with ID: " + target_id);
    for (let slideshow of this.slideshow_list) {
      console.log("ID of this slideshow is: " + slideshow.getId());
      if (parseInt(slideshow.getId()) === parseInt(target_id)) {
        console.log("slideshow matches!");
        return slideshow;
      }
    }
    return null;
  }

}