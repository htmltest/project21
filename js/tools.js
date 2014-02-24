(function($) {

    $(document).ready(function() {

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
                        break;
                    case '#plans':
                        $('#area, #events').hide();
                        $('#plans').show();
                        break;
                    case '#events':
                        $('#area, #plans').hide();
                        $('#events').show();
                        break;
                }
            }
            return false;
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

    });

    // пространство
    $(window).bind('load resize', function() {
        var curWidth  = $(window).width();
        var curHeight = $(window).height() - 290;
        if (curHeight < 431) {
            curHeight = 431;
        }

        $('#area').css({'min-height': curHeight});
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

            $('.area-info').each(function() {
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

})(jQuery);