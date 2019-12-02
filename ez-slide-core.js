//  DSN6040 - Web Design and Javascript - Slideshow Project
//    Michael Aboff - mwaboff@gmail.com - https://github.com/mwaboff

(function() {

  // Set the namespace to prevent any potential collisions.
  var EZSlides = window.EZSlides = (window.EZSlides || {});

  EZSlides.SLIDESHOW_CLASS_NAME = "ez-slideshow";
  EZSlides.SLIDE_CLASS_NAME = "ez-slide";

  var SLIDESHOW_MANAGER;

  var initialize = function() {
    SLIDESHOW_MANAGER = SlideshowManager.constructFromDomSearch();
    SLIDESHOW_MANAGER.initialize();
  }

  initialize();
})();