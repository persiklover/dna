$(function() {

  function scrollTo(selector, cb) {
    $("html").animate({
      scrollTop: $(selector).offset().top + 5 + 'px'
    }, 500, cb);
  }

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    scrollTo( $(this).attr('href') );
  });

  $(`input[type="tel"]`).mask("+7 (999) 999-9999");

  var currentStep = 1;
  var $formFooter = $(".js-form-footer");
  function onFromSliderChanged(event) {
    // Provided by the core
    var element   = event.target;         // DOM element, in this example .owl-carousel
    var name      = event.type;           // Name of the event, in this example dragged
    var namespace = event.namespace;      // Namespace of the event, in this example owl.carousel
    var items     = event.item.count;     // Number of items
    var item      = event.item.index + 1; // Position of the current item
    // Provided by the navigation plugin
    var pages     = event.page.count;     // Number of pages
    var page      = event.page.index;     // Position of the current page
    var size      = event.page.size;      // Number of items per page

    $formFooter.show();

    var title = "Заказать DNA DROP";

    if (item == 6 || item == 7 || item == 9) {
      $formFooter.hide();
    }

    if (item >= 7) {
      title = "Оформление подарочного сертификата";
    }
    else if (item == 6) {
      title = "Оформление заказа завершено";
    }
    else if (item >= 2) {
      title = "Заказ Кулона";
    }

    currentStep = item;

    $(".js-form-title").text(title);
  }

  // Слайдер формы заказа
  const $formSlider = $(".js-form-slider");
  $formSlider
    .addClass("owl-carousel")
    .owlCarousel({
      nav:    false,
      dots:   false,
      items:  1,
      margin: 35,
      mouseDrag: false,
      touchDrag: false,
      onInitialized: onFromSliderChanged,
      autoHeight: true
    })
    .on("changed.owl.carousel", onFromSliderChanged);

  $(".js-select-pedant").click(function(e) {
    e.preventDefault();
  });

  $(".js-form-reset").click(function(e) {
    e.preventDefault();
    $formSlider.trigger("to.owl.carousel", [0, 0]);
  });

  $(".js-form-nav-btn").click(function(e) {
    e.preventDefault();
    $formSlider.trigger("to.owl.carousel", [$(this).attr("data-to") - 1, 0]);
  });

  $(".js-form-next").click(function(e) {
    e.preventDefault();

    // Проверяем, заполнены ли все required поля
    var $currentStepContainer = $(".form-step-" + currentStep);
    var requiredElements = $currentStepContainer.find("[required]");

    var valid = true;
    if (requiredElements.length) {
      for (var i = 0; i < requiredElements.length; i++) {
        var element = requiredElements[i];
        element.checkValidity();

        if (!element.validity.valid) {
          $(element).addClass("error");
          valid =  false;
        }
        else {
          $(element).removeClass("error")
        }
      }
    }
    
    if (valid) {
      $formSlider.trigger("next.owl.carousel", 0);
    }
  });

  $(".js-form-prev").click(function(e) {
    e.preventDefault();
    $formSlider.trigger("prev.owl.carousel", 0);
  });

  // custom-radiogroup start
  $(".js-custom-radiogroup input").click(function() {
    $(this).parents(".js-custom-radiogroup")
      .find(".js-custom-radiogroup-cover")
      .addClass("hidden")
      .filter(`[data-type="${this.value}"]`)
      .removeClass("hidden");
  });
  // custom-radiogroup end

  // Блок с зазумленной картинкой START
  var $zoomImage     = $(".js-zoom-img");
  var $zoomContainer = $(".js-zoom-container");
  var $zoomCloseBtn =  $(".js-zoom-close");

  $zoomCloseBtn.click(function(e) {
    e.preventDefault();
    $zoomContainer.attr("hidden", "");
  });

  $(".js-zoom-btn").click(function(e) {
    e.preventDefault();
    var $image = $(this).parents(".custom-radiogroup").find(".custom-radiogroup-cover:not(.hidden)");
    if ($image[0].tagName != "IMG") {
      $image = $image
        .find(".owl-item.active")
        .find("img");
    }

    $zoomContainer.removeAttr("hidden");

    $zoomImage.prop("src", $image.prop("src"));
    $zoomImage.prop("alt", $image.prop("alt"));
  });
  // Блок с зазумленной картинкой START

  // Слайдер выобра формы кулона
  $(".js-pedant-type-slider")
    .addClass("owl-carousel")
    .owlCarousel({
      loop:   true,
      nav:    true,
      dots:   true,
      items:  1,
      margin: 1,
      mouseDrag: false,
      touchDrag: false,
    });

  // Радио-кнопки, связанные с кулоном
  $(".js-pedant-type-radio").click(function() {
    $(".js-pedant-type").text(this.value);
    $(".js-pedant-price").text(this.dataset.price);
  });

  $(".js-pedant-color-radio").click(function() {
    $(".js-pedant-color").text(this.value);
  });

  $(".js-pedant-material-radio").click(function() {
    $(".js-pedant-material").text(this.value);
  });

  // Радио-кнопки, связанные с сертификатом
  $(".js-certificate-type-radio").click(function() {
    $(".js-certificate-type").text(this.value);
    $(".js-certificate-price").text(this.dataset.price);
  });

  $(".js-reciever-email-input").blur(function() {
    $(".js-reciever-mail").text(this.value);
  });
  
  $(".js-author-email-input").blur(function() {
    $(".js-author-mail").text(this.value);
  });

});
