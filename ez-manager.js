//  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

class SlideshowManager {
  constructor(slideshow_list) {
    this.slideshow_list = slideshow_list;
  }

  static constructFromDomSearch() {
    var slideshow_doms = SlideshowManager.findSlideshowsFromDom();
    var slideshows = SlideshowManager.createSlideshowsFromDom(slideshow_doms);
    let new_manager = new SlideshowManager(slideshows);
    return new_manager;
  }

  static findSlideshowsFromDom = function() {
    return document.getElementsByClassName(EZSlides.SLIDESHOW_CLASS_NAME);
  }

  static createSlideshowsFromDom = function(slideshow_doms) {
    let slideshow_list = []
    for (let slideshow_index = 0; slideshow_index < slideshow_doms.length; slideshow_index++) {
      let slideshow_dom = slideshow_doms[slideshow_index];
      let manager = Slideshow.constructFromHtml(slideshow_index, slideshow_dom);
      slideshow_list.push(manager);
    }
    return slideshow_list;
  }

  initialize() {
    this.initializeSlideshows();
  }

  initializeSlideshows() {
    for (let slideshow of this.slideshow_list) {
      slideshow.initialize();
    }
  }

}