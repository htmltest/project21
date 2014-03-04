var speedSlider  = 500;     // скорость смены слайда на главной странице
var periodSlider = 5000;    // период автоматической смены слайда на главной страницы ("0" - автоматическая смена отключена)

var timerSlider  = null;
var cursorOnArea = false;

(function($) {

    $(document).ready(function() {

        // адрес в шапке
        $('.address-text a').click(function() {
            $.scrollTo($(this).attr('href'), 500);
            return false;
        });

        // переключение блоков
        $('.header-menu li a').click(function() {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLi.hasClass('active')) {
                $('.header-menu li.active').removeClass('active');
                curLi.addClass('active');
                switch (curLink.attr('href')) {
                    case '#area':
                        $('#plans, #events').hide();
                        $('#area').show();
                        $('.pref-open').removeClass('pref-open');
                        break;
                    case '#plans':
                        $('#area, #events').hide();
                        $('#plans').show();
                        $('.area-info-open').removeClass('area-info-open');
                        $('.pref-open').removeClass('pref-open');
                        break;
                    case '#events':
                        $('#area, #plans').hide();
                        $('#events').show();
                        $('.area-info-open').removeClass('area-info-open');
                        $('.pref-open').removeClass('pref-open');
                        break;
                }
            }
            return false;
        });

        var curHeight = $(window).height() - 198;
        if (curHeight < 431) {
            curHeight = 431;
        }

        $('#area, #area li').css({'min-height': curHeight});

        // слайдер
        $('.area-content').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            var curHTML = '';
            curSlider.find('li').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.area-ctrl').html(curHTML);
            $('.area-ctrl a:first').addClass('active');

            if (periodSlider > 0) {
                $(window).load(function(e) {
                    $('.area-shadow').fadeOut(function() {
                        if (!cursorOnArea) {
                            timerSlider = window.setTimeout(sliderNext, periodSlider);
                        }
                    });
                });
            }
        });

        $(document).mousemove(function(e) {
            if ($(e.target).parents().filter('#area').length == 1) {
                cursorOnArea = true;
                window.clearTimeout(timerSlider);
                timerSlider = null;
            } else {
                if (periodSlider > 0 && cursorOnArea) {
                    cursorOnArea = false;
                    timerSlider = window.setTimeout(sliderNext, periodSlider);
                }
            }
        });

        // информация по пространству
        $('.area-icon').click(function() {
            var curInfo = $(this).parent();
            if (curInfo.hasClass('area-info-open')) {
                curInfo.removeClass('area-info-open');
            } else {
                $('.area-info-open').removeClass('area-info-open');
                curInfo.addClass('area-info-open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.area-info').length == 0) {
                $('.area-info-open').removeClass('area-info-open');
            }
        });

        $('.area-ctrl a').live('click', function() {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            var curSlider = $('.area-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.area-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                $('.area-ctrl a.active').removeClass('active');
                $('.area-ctrl a').eq(newIndex).addClass('active');
                curSlider.find('ul li').eq(curIndex).css({'z-index': 1});
                curSlider.find('ul li').eq(newIndex).css({'z-index': 'auto', 'left': 0, 'top': 0}).show();
                curSlider.find('ul li').eq(curIndex).fadeOut(speedSlider, function() {
                    curSlider.find('ul li').eq(curIndex).find('.area-info-open').removeClass('area-info-open');
                    curSlider.data('disableAnimation', true);
                    if (periodSlider > 0) {
                        if (!cursorOnArea) {
                            timerSlider = window.setTimeout(sliderNext, periodSlider);
                        }
                    }
                });
            }

            return false;
        });

        // тарифы
        $('.plans-ctrl ul li a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.plans-ctrl ul li').index(curLi);
                $('.plans-ctrl ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.plans-content').removeClass('active');
                $('.plans-content').eq(curIndex).addClass('active');
            }
            return false;
        });

        $('.plans-tabs-menu ul li a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.plans-tabs-menu ul li').index(curLi);
                $('.plans-tabs-menu ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.plans-tabs-content').removeClass('active');
                $('.plans-tabs-content').eq(curIndex).addClass('active');
            }
            return false;
        });

        // события
        $('.events-content').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
            curSlider.find('li:lt(4)').addClass('active');
        });

        $('.events-next').click(function() {
            var curSlider = $('.events-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 4;

                if (curIndex >= curSlider.find('li').length - 4) {
                    curIndex = curSlider.find('li').length - 4;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('li').removeClass('active');
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, 500, function() {
                    curSlider.find('li').eq(curIndex).addClass('active');
                    curSlider.find('li').eq(curIndex + 1).addClass('active');
                    curSlider.find('li').eq(curIndex + 2).addClass('active');
                    curSlider.find('li').eq(curIndex + 3).addClass('active');
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            return false;
        });

        $('.events-prev').click(function() {
            var curSlider = $('.events-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 4;

                if (curIndex < 0) {
                    curIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('li').removeClass('active');
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, 500, function() {
                    curSlider.find('li').eq(curIndex).addClass('active');
                    curSlider.find('li').eq(curIndex + 1).addClass('active');
                    curSlider.find('li').eq(curIndex + 2).addClass('active');
                    curSlider.find('li').eq(curIndex + 3).addClass('active');
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            return false;
        });

        // премущества
        $('.pref-link').click(function() {
            var curPref = $(this).parent();
            if (curPref.hasClass('pref-open')) {
                curPref.removeClass('pref-open');
            } else {
                $('.pref-open').removeClass('pref-open');
                curPref.addClass('pref-open');
            }
            return false;
        });

        // подсказка в полях формы
        $('.open-input input').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.open-input input').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.open-input input').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        // валидация формы открытой недели
        $('.open-form form').validate();

        // меню подвале
        $('.footer-menu').eq(0).find('a').click(function() {
            var curHref = $(this).attr('href');
            switch (curHref) {
                case '#area':
                    $.scrollTo(0, 500);
                    $('.header-menu li a[href="#area"]').trigger('click');
                    break;
                case '#plans':
                    $.scrollTo(0, 500);
                    $('.header-menu li a[href="#plans"]').trigger('click');
                    break;
                case '#events':
                    $.scrollTo(0, 500);
                    $('.header-menu li a[href="#events"]').trigger('click');
                    break;
                case '#about':
                    $.scrollTo($('#about'), 500);
                    break;
            }
            return false;
        });

        // окно формы
        $('.area-order').click(function() {
            $('.window').show();
            $('.window').css({'margin-top': -$('.window').height() / 2});
            $('.overlay').show();
            return false;
        });

        $('.window-close').click(function() {
            $('.window').hide();
            $('.overlay').hide();
            return false;
        });

        $('.overlay').click(function() {
            $('.window').hide();
            $('.overlay').hide();
        });

        $('body').bind('keypress keydown', function(e) {
            if (e.keyCode == 27) {
                $('.window').hide();
                $('.overlay').hide();
            }
        });

    });

    // пространство
    $(window).bind('load resize', function() {
        var curWidth  = $(window).width();
        var curHeight = $(window).height() - 198;
        if (curHeight < 431) {
            curHeight = 431;
        }

        $('#area, #area li').css({'min-height': curHeight});
        $('.area-img').each(function() {
            var curImg = $(this);
            curImg.css({'width': 'auto', 'height': 'auto'});
            var curImgWidth = curImg.width();
            var curImgHeight = curImg.height();

            var newImgWidth = curWidth;
            var newImgHeight = curImgHeight * newImgWidth / curImgWidth;

            if (newImgHeight < curHeight) {
                newImgHeight = curHeight;
                newImgWidth = curImgWidth * newImgHeight / curImgHeight;
            }

            curImg.css({'width': newImgWidth, 'height': newImgHeight, 'left': '50%', 'top': '50%', 'margin-left': -newImgWidth / 2, 'margin-top': -newImgHeight / 2});
            $('.area-inner').css({'width': newImgWidth, 'height': newImgHeight, 'left': '50%', 'top': '50%', 'margin-left': -newImgWidth / 2, 'margin-top': -newImgHeight / 2});

            var diffX = newImgWidth / curImgWidth;
            var diffY = newImgHeight / curImgHeight;

            curImg.parent().find('.area-info').each(function() {
                var curBlock = $(this);
                if (curBlock.data('curX')) {
                    var curX = curBlock.data('curX');
                    var curY = curBlock.data('curY');
                } else {
                    var curX = Number(curBlock.css('left').replace('px', ''));
                    var curY = Number(curBlock.css('top').replace('px', ''));
                    curBlock.data('curX', curX);
                    curBlock.data('curY', curY);
                }
                var newX = curX * diffX;
                var newY = curY * diffY;
                curBlock.css({'left': newX, 'top': newY});
            });
        });
    });

    // блоки раздела "о нас"
    $(window).bind('load', function() {
        var curMax = 0;
        $('.about-author-text').each(function() {
            if ($(this).height() > curMax) {
                curMax = $(this).height();
            }
        });
        $('.about-author-text').css({'min-height': curMax});
    });

    // переход к следующему слайду
    function sliderNext() {
        window.clearTimeout(timerSlider);
        timerSlider = null;

        var curSlider = $('.area-content');
        if (curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex == curSlider.find('ul li').length) {
                newIndex = 0;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);
            $('.area-ctrl a.active').removeClass('active');
            $('.area-ctrl a').eq(newIndex).addClass('active');
            curSlider.find('ul li').eq(curIndex).css({'z-index': 1});
            curSlider.find('ul li').eq(newIndex).css({'z-index': 'auto', 'left': 0, 'top': 0}).show();
            curSlider.find('ul li').eq(curIndex).fadeOut(speedSlider, function() {
                curSlider.find('ul li').eq(curIndex).find('.area-info-open').removeClass('area-info-open');
                curSlider.data('disableAnimation', true);
                if (periodSlider > 0) {
                    if (!cursorOnArea) {
                        timerSlider = window.setTimeout(sliderNext, periodSlider);
                    }
                }
            });
        }
    }

})(jQuery);