$(document).ready(function () {
    $('.header__middle-search form label input').on('input', function () {
        $('.header__middle-search').addClass('active')
        $('.header__middle-search-reset').addClass('show');
    });
    /* search */

    $('.header__middle-search form label input').on('input', CheckSearch);

    $('.header__middle-search form label input').on('click', function () {
        $('.header__middle-search-reset').addClass('show').find('span').text('Отмена');
        $('.header__middle-search form label i').addClass('active');
    });

    $('.js-checkSearch').on('click', function () {
        if ($('.header__middle-search form label input').val() !== '') {
            $('.header__middle-search-reset').show().find('span').text('Отмена');;
            $('.header__middle-search form label input').val('').focus();
        }
        else {
            $('.header__middle-search').removeClass('active');
            $('.header__middle-search-reset').removeClass('show');
            $('.header__middle-search form label i').removeClass('active');
            closeMobileSearch();
        }
    });

    function CheckSearch() {
        if ($(this).val() !== '') {
            $('.header__middle-search-reset').find('span').text('Сбросить');
            $('.header__middle-search-reset').show();
            return true;
        }
        else {
            $('.header__middle-search-reset').find('span').text('Отмена');
            return false;
        }
    }
    /* search end*/

    /* datepicker */
    var elementPick = document.querySelector('.header__middle-date');
    pickmeup.defaults.locales['ru'] = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };
    pickmeup(elementPick, {
        format: 'Y-m-d',
        mode: 'range',
        locale: 'ru',
        title_format: 'B',
        dateFormat: 'dd.mm.yy',
        min: new Date,
        next: '<i class="i-ARROW"></i>',
        prev: '<i class="i-ARROW i-ARROW-left"></i>'
    });

    $('.pickmeup').appendTo($('.header__middle-date'));
    $('.pick-btn').insertBefore($('.pickmeup .pmu-instance'));
    $('.pick-accept').insertAfter($('.pickmeup .pmu-instance'));

    $(elementPick).on('click', function (e) {
        e.preventDefault();
        $(this).addClass('active');
        if ($('.header__middle-center').hasClass('full-width')) {
            $('.pickmeup').addClass('left');
        }
        else {
            $('.pickmeup').removeClass('left');
        }
    })

    elementPick.addEventListener('pickmeup-hide', function (e) {
        $(this).removeClass('active');
    })

    elementPick.addEventListener('pickmeup-change', function (e) {
        $('#first-date').val(e.detail.formatted_date[0]);
        $('#second-date').val(e.detail.formatted_date[1]);
        $('.pick-btn-item').removeClass('active');
    })

    $('#three-days').on('click', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        var dateNow = new Date();
        var threeDay = new Date(dateNow.setDate(dateNow.getDate() + 2));
        pickmeup(elementPick).set_date([new Date(), threeDay]);
        var result = pickmeup(elementPick).get_date(true);
        $('#first-date').val(result[0]);
        $('#second-date').val(result[1]);
    });

    $('#week').on('click', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        var dateNow = new Date();
        var week = new Date(dateNow.setDate(dateNow.getDate() + 6));
        pickmeup(elementPick).set_date([new Date(), week]);
        var result = pickmeup(elementPick).get_date(true);
        $('#first-date').val(result[0]);
        $('#second-date').val(result[1]);
    });

    $('#weekend').on('click', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        var dateNow = new Date();
        var saturday = new Date(dateNow.setDate(dateNow.getDate() + 5));
        var sunday = new Date(dateNow.setDate(saturday.getDate() + 1));
        pickmeup(elementPick).set_date([saturday, sunday]);
        var result = pickmeup(elementPick).get_date(true);
        $('#first-date').val(result[0]);
        $('#second-date').val(result[1]);
    });

    /* end datepicker */
    function showMobileSearch() {
        $('.header__middle-search').addClass('active');
        $('.header__middle-center').addClass('full-width');
        $('.header__middle-logo, .header__middle-right').addClass('hide');
    }
    function closeMobileSearch() {
        $('.header__middle-search').removeClass('active');
        $('.header__middle-center').removeClass('full-width');
        $('.header__middle-logo, .header__middle-right').removeClass('hide');
    }
    if ($(window).width() < 1024) {
        $('.header__middle-search form label i').on('click', function (e) {
            $(this).closest('form').find('input').focus();
            showMobileSearch();
            $('.header__middle-search-reset').addClass('show').find('span').text('Отмена');
        });
    }

    /* slider line */
    $('.slider-line__content-top-item').on('click', function () {
        var videoSrcWebm = $(this).attr('data-src-webm');
        var videoSrcMp4 = $(this).attr('data-src-mp4');
        var Link = $(this).attr('data-link');
        $(this).addClass('active').siblings().removeClass('active');
        $('.slider-line__video').find('video').fadeOut(function () {
            $('.slider-line__video').find('video').attr('src', videoSrcWebm).fadeIn();
            $('.slider-line__video').find('video').attr('src', videoSrcMp4).fadeIn();
        });
        $('.slider-line__content-top-btn').attr('href', Link);
        $('.slider-line__text p').text(Link);
    });
    /* end slider line */


    /* slider-main */
    var autoplay = 10000;
    var progressBar = $('.slider-main__item-active .slider-main__item-right-nav-progress-line');
    function clearAnimate() {
        progressBar.stop(true);
        progressBar.css({
            width: 0 + 'px'
        });
        progressBar = $('.slider-main__item-active .slider-main__item-right-nav-progress-line');
    }
    function animateLine() {
        clearAnimate()
        progressBar.animate({
            width: 100 + '%'
        }, autoplay, function () {
            sliderMain.slideNext();
            clearAnimate();
            animateLine();
        });
    }
    function ChangeBannerImg() {
        var currentBannerImg = $('.slider-main__item-active').attr('data-banner');
        $('.slider-main__banner img').fadeOut(300, function () {
            $('.slider-main__banner img').attr('src', currentBannerImg).fadeIn(300);
        });
    }
    $('.slider-main__item-right-nav-btn-next').on('click', function () {
        sliderMain.slideNext();
        ChangeBannerImg();
        clearAnimate();
        animateLine();
    });
    $('.slider-main__item-right-nav-btn-prev').on('click', function () {
        sliderMain.slidePrev();
        ChangeBannerImg();
        clearAnimate();
        animateLine();
    });
    var sliderMain = new Swiper('.js-slider-main', {
        direction: 'horizontal',
        slidesPerView: 6,
        spaceBetween: 30,
        speed: 2000,
        allowTouchMove: false,
        slidesOffsetBefore: 300,
        slideActiveClass: 'slider-main__item-active',
        loop: true,
        pagination: {
            el: '.slider-main__item-right-nav-fraction',
            type: 'fraction',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                slidesOffsetBefore: 50,
            },
            768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                slidesOffsetBefore: 50,
            },
            1000: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            1400: {
                slidesPerView: 5,
                slidesPerGroup: 1,
            }
        },
        on: {
            init: function () {
                $('.slider-main__item .btn-slider').removeClass('active');
                $('.slider-main__item-active .btn-slider').addClass('active');
                animateLine();
            },
            slideChangeTransitionStart: function () {
                $('.slider-main__item .btn-slider').removeClass('active');
                $('.slider-main__item-active .btn-slider').addClass('active');
                ChangeBannerImg();
            },
        },
    });
    /* end slider-main */

    var sliderSkip = new Swiper('.js-slider-skip', {
        direction: 'horizontal',
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        speed: 700,
        freeMode: true,
        navigation: {
            nextEl: '.slider-skip .slider-top__nav-item-next',
            prevEl: '.slider-skip .slider-top__nav-item-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            900: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            1300: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            }
        }
    });

    var sliderNews = new Swiper('.js-slider-news', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        speed: 700,
        navigation: {
            nextEl: '.slider-news .slider-top__nav-item-next',
            prevEl: '.slider-news .slider-top__nav-item-prev',
        },
    });
    var sliderNewsImg = new Swiper('.js-slider-news-img', {
        slidesPerView: 1,
        speed: 700,
        nested: true,
        navigation: {
            nextEl: '.js-slider-news-img .slider-type-big__item-btn-right',
            prevEl: '.js-slider-news-img .slider-type-big__item-btn-left',
        },
        pagination: {
            el: '.js-slider-news-img .slider-type-big__item-top-nav',
            type: 'fraction',
        },
    });

    var sliderTypePopular = new Swiper('.js-slider-popular', {
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 3,
        slidesOffsetAfter: 100,
        freeMode: true,
        speed: 700,
        navigation: {
            nextEl: '.slider-popular .slider-top__nav-item-next',
            prevEl: '.slider-popular .slider-top__nav-item-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            950: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }
        }
    });

    var sliderMeloman = new Swiper('.js-slider-meloman', {
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 700,
        navigation: {
            nextEl: '.slider-meloman .slider-top__nav-item-next',
            prevEl: '.slider-meloman .slider-top__nav-item-prev',
        },
    });

    var sliderBanner = new Swiper('.js-slider-banner', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 1000,
        navigation: {
            nextEl: '.js-slider-banner .slider-type-big__item-btn-right',
            prevEl: '.js-slider-banner .slider-type-big__item-btn-left',
        },
        pagination: {
            el: '.js-slider-banner .slider-type-big__item-top-nav',
            type: 'fraction',
        },
        slideActiveClass: 'slider-type-big__item-active',
        on: {
            init: function () {
                var timer = setTimeout(function () {
                    $('.slider-type-big__item-active').find('.slider-type-big__item-content-place, .slider-type-big__item-content-title,.slider-type-big__item-content-date,.slider-type-big__item-content-bottom, .slider-type-big__item-top-hashtag').addClass('animated fadeInRight');
                }, 300);
                $('.slider-type-big__item').find('.slider-type-big__item-content-place, .slider-type-big__item-content-title,.slider-type-big__item-content-date,.slider-type-big__item-content-bottom, .slider-type-big__item-top-hashtag').removeClass('animated fadeInRight');
            },
            slideNextTransitionStart: function () {
                $('.slider-type-big__item').find('.slider-type-big__item-content-place, .slider-type-big__item-content-title,.slider-type-big__item-content-date,.slider-type-big__item-content-bottom,.slider-type-big__item-top-hashtag').removeClass('animated fadeInRight');
                var timer = setTimeout(function () {
                    $('.slider-type-big__item-active').find('.slider-type-big__item-content-place, .slider-type-big__item-content-title,.slider-type-big__item-content-date,.slider-type-big__item-content-bottom,.slider-type-big__item-top-hashtag').addClass('animated fadeInRight');
                }, 300);
            },
            slidePrevTransitionStart: function () {
                $('.slider-type-big__item').find('.slider-type-big__item-content-place, .slider-type-big__item-content-title,.slider-type-big__item-content-date,.slider-type-big__item-content-bottom,.slider-type-big__item-top-hashtag').removeClass('animated fadeInRight');
                var timer = setTimeout(function () {
                    $('.slider-type-big__item-active').find('.slider-type-big__item-content-place, .slider-type-big__item-content-title,.slider-type-big__item-content-date,.slider-type-big__item-content-bottom,.slider-type-big__item-top-hashtag').addClass('animated fadeInRight');
                }, 300);
            }
        }
    });

    var sliderTheatre = new Swiper('.js-slider-theatre', {
        direction: 'horizontal',
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        speed: 700,
        freeMode: true,
        navigation: {
            nextEl: '.theatre .slider-top__nav-item-next',
            prevEl: '.theatre .slider-top__nav-item-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            900: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            1300: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            }
        }
    });

    var sliderСollections = new Swiper('.js-slider-collections', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        speed: 700,
        navigation: {
            nextEl: '.collections .slider-top__nav-item-next',
            prevEl: '.collections .slider-top__nav-item-prev',
        },
    });

    $('.m-menu-btn').on('click', function () {
        $('.m-menu').toggleClass('open');
        $('.header__middle').toggleClass('open-menu');
        $('html').toggleClass('fix');
        $(this).toggleClass('active');
        $('.header__middle-logo object svg use').css({
            fill: 'white'
        })
    });
    $('.m-menu__link').on('click', function (e) {
        if ($(this).siblings('.m-menu__sublist').length) {
            e.preventDefault();
            $(this).parent().toggleClass('open');
        }
    });
    $('.m-menu__geo').on('click', function () {
        $(this).toggleClass('open');
    });

    $('.js-open-filter-list').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active')
        $('.js-open-range').removeClass('active').siblings('.filter__price-range').removeClass('open');
        $('.filter__section-wrap').toggleClass('open');
    });
    $('.js-open-range').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.js-open-filter-list').removeClass('active').siblings('.filter__section-wrap').removeClass('open');
        $('.filter__price-range').toggleClass('open');
    });
    $('.filter__price-range').on('click', function (e) {
        e.stopPropagation();
        $('.filter__price-range').addClass('open');
    });
    $('.filter__section-wrap').on('click', function (e) {
        e.stopPropagation();
        $('.filter__section-wrap').addClass('open');
    });
    $(document).on('click', function (e) {
        $('.filter__price-range, .filter__section-wrap').removeClass('open');
        $('.js-open-range, .js-open-filter-list').removeClass('active');
    });

    if ($(".js-range-slider").length) {
        var priceRange = $(".js-range-slider").ionRangeSlider({
            type: "double",
            min: 0,
            max: 3000,
            hide_from_to: true,
            hide_min_max: true,
            extra_classes: 'filter__price-range-slider-inner'
        });
        priceRange.on('change', function () {
            $('.filter__price-range-values-from input').val(`от ${$(this).data().from} ₽`);
            $('.filter__price-range-values-to input').val(`до ${$(this).data().to} ₽`);
        });
    }
    var cardTitleHidden = $('.slider-card__item-content-title-hidden');
    var cardTitle = $('.slider-card__item-content-title');
    function substrTitle() {
        cardTitle.each(function () {
            if ($(this).siblings('.slider-card__item-content-title-hidden').text().length > 50) {
                $(this).text($(this).siblings('.slider-card__item-content-title-hidden').text().substr(0, 50) + '...');
            }
            else {
                $(this).text($(this).siblings('.slider-card__item-content-title-hidden').text());
            }
        });
    }
    substrTitle();
    $('.slider-card__item').on('mouseenter', function () {
        var fullText = $(this).find('.slider-card__item-content-title-hidden').text();
        $(this).find('.slider-card__item-content-title').text(fullText).addClass('full');
    });
    $('.slider-card__item').on('mouseleave', function () {
        substrTitle();
        $(this).find('.slider-card__item-content-title').removeClass('full');
    });

    /* seo text */
    $('.seo-text-btn').on('click', function (e) {
        e.preventDefault();
        $('.seo-text-container').toggleClass('open');
        if ($('.seo-text-container').hasClass('open')) {
            $(this).text('Показать меньше');
        }
        else {
            $(this).text('Читать далее');
        }
    });

    /* header menu hover */
    $('.header__bottom-item-link').on('mouseenter', function () {
        $(this).addClass('active').siblings('.header__bottom-submenu').addClass('show');
    });
    $('.header__bottom-item-link').on('mouseleave', function () {
        $(this).removeClass('active').siblings('.header__bottom-submenu').removeClass('show');
    });
    $('.header__bottom-submenu').on('mouseenter', function () {
        $(this).siblings('.header__bottom-item-link').addClass('active');
    });
    $('.header__bottom-submenu').on('mouseleave', function () {
        $(this).siblings('.header__bottom-item-link').removeClass('active');
    });

    /* popup geo */
    function showPopupCity() {
        $('.overlay').fadeIn();
        $('.popup-city').fadeIn();
    }
    function hidePopup() {
        $('.overlay').fadeOut();
        $('.popup').fadeOut();
    }
    $('.js-open-popup-city').on('click', function (e) {
        e.preventDefault();
        showPopupCity();
    });
    $('.popup .i-close , .js-close-popup').on('click', function (e) {
        e.preventDefault();
        hidePopup();
    });

    /* mask phone */
    var phoneFields = document.querySelectorAll('[data-phone]');
    if (phoneFields.length) {
        phoneFields.forEach(function (el) {
            IMask(el, { mask: '+{7}(000)000-00-00' });
        });
    }

    /* popup call */
    function showPopupCall() {
        $('.overlay').fadeIn();
        $('.popup-call').fadeIn();
    }
    $('.js-open-popup-call').on('click', function (e) {
        e.preventDefault();
        showPopupCall();
    });

    /* popup ok */
    function showPopupOk() {
        $('.overlay').fadeIn();
        $('.popup-call').fadeOut();
        $('.popup-ok').fadeIn();
    }
    $('.js-send-popup-call').on('click', function (e) {
        e.preventDefault();
        showPopupOk();
    });

    /* header fix */
    $(window).on('scroll', function (e) {
        var bodyCoords = document.body.getBoundingClientRect();
        var headerCoords = document.querySelector('.header').getBoundingClientRect();
        if (-bodyCoords.top - 50 >= headerCoords.height) {
            $('.header').addClass('fix');
        }
        else {
            $('.header').removeClass('fix');
        }
    });
    /* header fix end */

    /* slider event-detail */
    var sliderEventDetail = new Swiper('.js-slider-event', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 700,
        navigation: {
            nextEl: '.event__slider-nav-item--next',
            prevEl: '.event__slider-nav-item--prev',
        }
    });
    /* slider event-detail end */

    $('.js-open-event-desc-text').on('click', function (e) {
        e.preventDefault();
        $(this).siblings().toggleClass('open');
        if ($(this).siblings().hasClass('open')) {
            $(this).text('Скрыть')
        }
        else {
            $(this).text('Читать далее')
        }
    });

    /* select-ticket */
    $('.select-ticket__item-toggler').on('click', function () {
        $(this).toggleClass('active').closest('.select-ticket__item').find('.select-ticket__cards').toggleClass('open');
        if ($(this).hasClass('active')) {
            $(this).find('.select-ticket__item-toggler-txt span').text('Скрыть ')
        }
        else {
            $(this).find('.select-ticket__item-toggler-txt span').text('Показать ')
        }
    });
    /* select-ticket end */

    /* anchor */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(id).offset().top - 200
        }, 500);
    });
    /* anchor end */

    /* event gallery */
    $('.js-event-gallery').on('click', function (e) {
        e.preventDefault();
        $(this).lightGallery({
            dynamic: true,
            dynamicEl: [
                {
                    "src": 'img/event-1.png',
                    'thumb': 'img/event-1.png',
                },
                {
                    "src": 'img/slider-type-big/1.png',
                    'thumb': 'img/slider-type-big/1.png',
                },
                {
                    "src": 'img/slider-type-big/full.png',
                    'thumb': 'img/slider-type-big/full.png',
                }
            ]
        });
    });
    $('.js-event-gallery-video').on('click', function (e) {
        e.preventDefault();
        $(this).lightGallery({
            dynamic: true,
            dynamicEl: [
                {
                    html: '<video class="lg-video-object lg-html5" autoplay controls preload="none"><source src="video/2-mp4.mp4" type="video/mp4">Your browser does not support HTML5 video</video>'
                },
            ]
        });
    });
    /* event gallery end */

    /* timer */
    /* function timer() {
        var nowDate = new Date();
        var achiveDate = new Date('2019,12,10');
        var result = (achiveDate - nowDate) + 1000;
        var seconds = Math.floor((result / 1000) % 60);
        var minutes = Math.floor((result / 1000 / 60) % 60);
        var hours = Math.floor((result / 1000 / 60 / 60) % 24);
        var days = Math.floor(result / 1000 / 60 / 60 / 24);
        if (seconds < 10) seconds = '0' + seconds;
        if (minutes < 10) minutes = '0' + minutes;
        if (hours < 10) hours = '0' + hours;
        var elDays = document.querySelector('.event__short-timer-item--days p');
        var elHours = document.querySelector('.event__short-timer-item--hours p');
        var elMinutes = document.querySelector('.event__short-timer-item--minutes p');
        elDays.innerHTML = days;
        elHours.innerHTML = hours;
        elMinutes.innerHTML = minutes;
        setTimeout(timer, 1000);
    }
    timer(); */
    /* timer end */

    /* validator */
    function Fields(el, pattern) {
        this.el = document.querySelector(el);
        this.pattern = pattern;
        let self = this;
        this.validate = function () {
            let validator = self.pattern.test(this.el.value);
            return validator;
        }
        this.getEl = function () {
            return self.el;
        }
    }
    
    function validateForm() {
        let errors = false; 
        
        var nameInp = new Fields('input[name="name"]', /.+/ig);

        var emailInp = new Fields('input[name="email"]', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        var phoneInp = new Fields('input[name="phone"]', /.{16}/ig);

        if (nameInp.validate() == false) {
            errors = true;
            nameInp.getEl().classList.add('error');
        }
        else {
            nameInp.getEl().classList.remove('error');
        }

        if (emailInp.validate() == false) {
            errors = true;
            emailInp.getEl().classList.add('error');
        }
        else {
            emailInp.getEl().classList.remove('error');
        }

        if (phoneInp.validate() == false) {
            errors = true;
            phoneInp.getEl().classList.add('error');
        }
        else {
            phoneInp.getEl().classList.remove('error');
        }
        if (errors) {
            console.log('fields error');
        }
        else {
            showPopupOk();
        }
    }
    $('.js-contacts-form').on('submit', function(e){
        e.preventDefault();
        validateForm();
    });
    $('.js-form-checkout').on('submit', function(e){
        e.preventDefault();
        validateForm();
    });
    /* validator end */

    /* promocode */
    function showPopupPromocode(){
        $('.cart__promocode').fadeIn();
    }
    function closePopupPromocode(){
        $('.cart__promocode').fadeOut();
    }
    $('body').on('click', closePopupPromocode);

    $('.cart__promocode').on('click', function(e){
        e.stopPropagation();
        showPopupPromocode();
    });

    $('.js-open-promocode').on('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        showPopupPromocode();
    });
    $('.js-close-promocode').on('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        closePopupPromocode();
    });
    /* promocode end */
});