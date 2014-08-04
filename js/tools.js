var speedSlider  = 500;     // скорость смены слайда на главной странице
var periodSlider = 5000;    // период автоматической смены слайда на главной страницы ("0" - автоматическая смена отключена)

var timerSlider  = null;
var cursorOnArea = false;

(function($) {

    $(document).ready(function() {

        // адрес в шапке
        $('.address-text a').click(function(e) {
            $.scrollTo($(this).attr('href'), 500);
            e.preventDefault();
        });

        // переключение блоков
        $('.header-menu li a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLi.hasClass('active')) {
                $('.header-menu li.active').removeClass('active');
                curLi.addClass('active');
                switch (curLink.attr('href')) {
                    case '#area':
                        $('#plans').hide();
                        $('#area').show();
                        $('.pref-open').removeClass('pref-open');
                        break;
                    case '#plans':
                        $('#area').hide();
                        $('#plans').show();
                        $('.area-info-open').removeClass('area-info-open');
                        $('.pref-open').removeClass('pref-open');
                        break;
                }
            }
            e.preventDefault();
        });

        var curHeight = $(window).height() - 198;
        if (curHeight < 431) {
            curHeight = 431;
        }

        $('#area, #area li').css({'min-height': curHeight});

        // заказ обратного звонка
        $('.header-callback, .bottom-callback a').click(function(e) {
            $('.window').show();
            $('.window').css({'margin-top': -$('.window').height() / 2});
            $('.overlay').show();
            e.preventDefault();
        });

        // слайдер
        $('.area-content').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            if (periodSlider > 0) {
                $(window).load(function(e) {
                    $('.area-shadow').fadeOut(function() {
                        if (!cursorOnArea) {
                            timerSlider = window.setTimeout(sliderNext, periodSlider);
                        }
                    });
                    $('.area-ctrl').fadeIn();
                    if (window.location.hash != '') {
                        $('a[href="' + window.location.hash + '"]').click();
                    }
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

        $('.area-ctrl a').live('click', function(e) {
            if (!$(this).hasClass('active')) {
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
            }

            e.preventDefault();
        });

        // тарифы
        $('.plans-ctrl ul li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.plans-ctrl ul li').index(curLi);
                $('.plans-ctrl ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.plans-content').removeClass('active');
                $('.plans-content').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        $('.plans-tabs-menu ul li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.plans-tabs-menu ul li').index(curLi);
                $('.plans-tabs-menu ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.plans-tabs-content').removeClass('active');
                $('.plans-tabs-content').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        // события
        $('.events-content').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            curSlider.find('ul').width(240 * curSlider.find('li').length);
        });

        $('.events-next').click(function(e) {
            var curSlider = $('.events-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 4;

                if (curIndex >= curSlider.find('li').length - 4) {
                    curIndex = curSlider.find('li').length - 4;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 240}, 500, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.events-prev').click(function(e) {
            var curSlider = $('.events-content');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 4;

                if (curIndex < 0) {
                    curIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 240}, 500, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        // премущества
        $('.pref-info:last').addClass('pref-info-right');

        $('.pref-link').click(function(e) {
            var curPref = $(this).parent();
            if (curPref.hasClass('pref-open')) {
                curPref.removeClass('pref-open');
            } else {
                $('.pref-open').removeClass('pref-open');
                curPref.addClass('pref-open');
            }
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.pref').length == 0) {
                $('.pref-open').removeClass('pref-open');
            }
        });

        // подсказка в полях формы
        $('.open-input input, .area-form input, .add-form input').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.open-input input, .area-form input, .add-form input').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.open-input input, .area-form input, .add-form input').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        // checkbox
        $('.open-checkbox input:checked').parent().addClass('checked');
        $('.open-checkbox div').click(function() {
            var curSpan = $(this).find('span');
            curSpan.toggleClass('checked');
            curSpan.find('input').prop('checked', curSpan.hasClass('checked')).trigger('change');
        });

        // валидация формы открытой недели
        $('.open-form form').validate();

        // валидация формы бесплатного дня
        $('.area-form form').validate();

        // валидация формы бесплатного дня
        $('.add-form form').validate();

        // меню подвале
        $('.footer-menu').eq(0).find('a').click(function(e) {
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
                    $.scrollTo($('#events'), 500);
                    break;
                case '#about':
                    $.scrollTo($('#about'), 500);
                    break;
                case '#feedback':
                    $('.window').show();
                    $('.window').css({'margin-top': -$('.window').height() / 2});
                    $('.overlay').show();
                    break;
            }
            e.preventDefault();
        });

        // тарифы на главной
        if (Modernizr.touch) {
            $('.main-plans-item').addClass('mobile');
            $('.main-plans-item').click(function() {
                var curBlock = $(this);
                if (curBlock.hasClass('active')) {
                    curBlock.removeClass('active');
                } else {
                    $('.main-plans-item').removeClass('active');
                    curBlock.addClass('active');
                }
            });

            $(document).click(function(e) {
                if ($(e.target).parents().filter('.main-plans-item').length == 0 && !$(e.target).hasClass('main-plans-item')) {
                    $('.main-plans-item').removeClass('active');
                }
            });
        }

        // окно формы
        $('.main-plans-item-order a, .plans-tabs-descr-order a, .plans-table-head-order a').click(function(e) {
            $('.window').show();
            $('.window').css({'margin-top': -$('.window').height() / 2});
            $('.overlay').show();
            e.preventDefault();
        });

        $('.window-close').click(function(e) {
            $('.window').hide();
            $('.overlay').hide();
            e.preventDefault();
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

        // тариф в виде таблицы
        $('.plans-table-group').each(function() {
            $(this).prev().addClass('plans-table-group-pre');
        });

        $('.plans-table tr:last').addClass('plans-table-tr-last');

        $('.plans-table tbody tr:first-child td span').parent().css({'vertical-align': 'middle'});

        if (Modernizr.touch) {
            $('.plans-table tr').each(function() {
                $(this).find('td:gt(0)').click(function() {
                    var curTD = $(this);
                    if (curTD.hasClass('hover')) {
                        $('.plans-table th').removeClass('hover');
                        $('.plans-table td').removeClass('hover');
                    } else {
                        $('.plans-table th').removeClass('hover');
                        $('.plans-table td').removeClass('hover');
                        var curTR = curTD.parent();
                        var curIndex = curTR.find('td').index($(this));
                        $('.plans-table th').eq(curIndex).addClass('hover');
                        $('.plans-table tr').each(function() {
                            $(this).find('td').eq(curIndex).addClass('hover');
                        });
                    }
                });

                $(this).find('th:gt(0)').click(function() {
                    var curTD = $(this);
                    if (curTD.hasClass('hover')) {
                        $('.plans-table th').removeClass('hover');
                        $('.plans-table td').removeClass('hover');
                    } else {
                        $('.plans-table th').removeClass('hover');
                        $('.plans-table td').removeClass('hover');
                        var curTR = curTD.parent();
                        var curIndex = curTR.find('th').index($(this));
                        $('.plans-table th').eq(curIndex).addClass('hover');
                        $('.plans-table tr').each(function() {
                            $(this).find('td').eq(curIndex).addClass('hover');
                        });
                    }
                });

                $(document).click(function(e) {
                    if ($(e.target).parents().filter('.plans-table').length == 0) {
                        $('.plans-table th').removeClass('hover');
                        $('.plans-table td').removeClass('hover');
                    }
                });
            });
        } else {
            $('.plans-table tr').each(function() {
                $(this).find('td:gt(0)').hover(
                    function() {
                        var curTD = $(this);
                        var curTR = curTD.parent();
                        var curIndex = curTR.find('td').index($(this));
                        $('.plans-table th').eq(curIndex).addClass('hover');
                        $('.plans-table tr').each(function() {
                            $(this).find('td').eq(curIndex).addClass('hover');
                        });
                    },

                    function() {
                        var curTD = $(this);
                        var curTR = curTD.parent();
                        var curIndex = curTR.find('td').index($(this));
                        $('.plans-table th').eq(curIndex).removeClass('hover');
                        $('.plans-table tr').each(function() {
                            $(this).find('td').eq(curIndex).removeClass('hover');
                        });
                    }
                );

                $(this).find('th:gt(0)').hover(
                    function() {
                        var curTD = $(this);
                        var curTR = curTD.parent();
                        var curIndex = curTR.find('th').index($(this));
                        $('.plans-table th').eq(curIndex).addClass('hover');
                        $('.plans-table tr').each(function() {
                            $(this).find('td').eq(curIndex).addClass('hover');
                        });
                    },

                    function() {
                        var curTD = $(this);
                        var curTR = curTD.parent();
                        var curIndex = curTR.find('th').index($(this));
                        $('.plans-table th').eq(curIndex).removeClass('hover');
                        $('.plans-table tr').each(function() {
                            $(this).find('td').eq(curIndex).removeClass('hover');
                        });
                    }
                );
            });
        }

        // полоса "наверх"
        $(document).mousemove(function(e) {
            if (e.pageX > $(window).width() - 90) {
                $('.up').show();
            } else {
                $('.up').hide();
            }
        });

        $('.up').click(function() {
            $.scrollTo(0, 500);
        });

        // отзывы
        $('.responses-content').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var newHTML = '';
            curSlider.find('li').each(function() {
                newHTML += '<a href="#"></a>';
            });
            $('.responses-ctrl').html(newHTML);
            $('.responses-ctrl a:first').addClass('active');
        });

        $('#responses').on('click', '.responses-ctrl a', function(e) {
            var curSlider = $('.responses-content');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.responses-ctrl a').index($(this));

                $('.responses-ctrl a.active').removeClass('active');
                $('.responses-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(function() {
                    curSlider.find('li').eq(curIndex).fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
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

    // блоки тарифов на главной
    $(window).bind('load', function() {
        var curMax = 0;
        $('.main-plans-item-inner').each(function() {
            if ($(this).height() > curMax) {
                curMax = $(this).height();
            }
        });
        $('.main-plans-item-inner').css({'min-height': curMax});
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