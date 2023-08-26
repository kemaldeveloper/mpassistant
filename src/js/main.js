// RESPONSIVE

// Breakpoints
const breakpoints = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xsm: 375,
};

// Media quires
const MQ = {
  wWidth: 0,
  isXL: false,
  isLG: false,
  isMD: false,
  isSM: false,
  isXSM: false,
  updateState: function () {
    this.wWidth = $(window).width();

    for (let key in breakpoints) {
      this['is' + key.toUpperCase()] = this.wWidth <= breakpoints[key];
    }
  },
};

MQ.updateState();

$(window).on('load', function () {
  //
});

$(window).on('resize', function () {
  MQ.updateState();
});

// COMMON FUNCTIONS

// Popup opener
$('.js-popup').on('click', function (event) {
  event.preventDefault();
  let popupID = $(this).attr('href');

  mfpPopup(popupID);
});

// Mobile menu toggle
$('.js-menu').on('click', function () {
  $(this).toggleClass('is-active');
  $('.menu').toggleClass('is-opened');
});

// Phone input mask
$('input[type="tel"]').inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
});

// E-mail Ajax Send
// $('form').on('submit',function (e) {
//   e.preventDefault();

//   let form = $(this);
//   let formData = {};
//   formData.data = {};

//   // Serialize
//   form.find('input, textarea').each(function () {
//     let name = $(this).attr('name');
//     let title = $(this).attr('data-name');
//     let value = $(this).val();

//     formData.data[name] = {
//       title: title,
//       value: value,
//     };

//     if (name === 'subject') {
//       formData.subject = {
//         value: value,
//       };
//       delete formData.data.subject;
//     }
//   });

//   $.ajax({
//     type: 'POST',
//     url: 'mail/mail.php',
//     dataType: 'json',
//     data: formData,
//   }).done(function (data) {
//     if (data.status === 'success') {
//       if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
//         form.find('.form-result').addClass('form-result--success');
//       } else {
//         mfpPopup('#success');
//       }

//       setTimeout(function () {
//         if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
//           form.find('.form-result').removeClass('form-result--success');
//         }
//         $.magnificPopup.close();
//         form.trigger('reset');
//       }, 3000);
//     } else {
//       alert('Ajax result: ' + data.status);
//     }
//   });
//   return false;
// });

const mfpPopup = function (popupID, source) {
  // https://dimsemenov.com/plugins/magnific-popup/
  $.magnificPopup.open({
    items: { src: popupID },
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button type="button" class="mfp-close">&times;</button>',
    mainClass: 'mfp-fade-zoom',
    // callbacks: {
    // 	open: function() {
    // 		$('.source').val(source);
    // 	}
    // }
  });
};

const initServicesTabs = () => {
  const tabLink = $('.tab-nav__link');
  const tabContentItem = $('.tab-content__item');

  tabContentItem.not(tabContentItem.first()).hide();

  tabLink.first().addClass('tab-nav__link--active');

  tabLink.on('click', (e) => {
    e.preventDefault();
    const currentElement = $(e.currentTarget);
    const id = currentElement.attr('href').replace('#', '');
    const currentTabContentItem = $(`.tab-content__item[data-id='${id}']`);

    currentElement.closest('.tab-nav__wrap').find('.tab-nav__link').removeClass('tab-nav__link--active');
    currentElement.addClass('tab-nav__link--active');

    tabContentItem.not(currentTabContentItem).fadeOut(0);
    currentTabContentItem.fadeIn(500);
  });
};

initServicesTabs();

function filterBtnSwitcher() {
  const filterBtn = $('.filter-btn');
  const filterBtnParent = $('.filter');

  filterBtnParent.find(filterBtn.first()).addClass('active');

  filterBtn.on('click', function (e) {
    e.preventDefault();
    filterBtn.closest(filterBtnParent).find(filterBtn).removeClass('active');
    $(this).addClass('active');
  });
}

filterBtnSwitcher();

new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 40,
  autoHeight: false,
  navigation: {
    nextEl: '.feedbacks-next',
    prevEl: '.feedbacks-prev',
  },
});

const text = $('.feedbacks__text p');

const textHide = () => {
  text.each(function (i, item) {
    const currentText = item.textContent.length;

    if (currentText > 400) {
      $(item).parent().addClass('active');
      $(item).closest('.feedbacks__item').find('.feedbacks__text').after('<span id="moreText">Читать полностью</span>');
    }
  });
};

textHide();

const textShow = () => {
  text.each(function (i, item) {
    const moreTextBtn = $(item).closest('.feedbacks__item').find('#moreText');

    moreTextBtn.on('click', function () {
      if ($(item).parent().hasClass('active')) {
        $(item).parent().removeClass('active');
        $(this).addClass('active');
        $(this).text('Скрыть');
      } else {
        $(item).parent().addClass('active');
        $(this).removeClass('active');
        $(this).text('Читать полностью');
      }
    });
  });
};

$(document).ready(function () {
  textShow();
});
