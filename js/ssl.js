/*sec banner*/
var width = $(".domain_banner").width();
var i = -1;
var timer = 0;
var n;

$(function() {
    n = $('.domain_banner ul li').length;
    move();
    timer = setInterval("move()", 8000);
    $(".domain_banner ul li").hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval("move()", 8000);
    });
    $('.banner_nav dl dd').click(function() {
        var ddIndex = $(this).index() - 1;
        i = ddIndex;
        move();
    });
});

function move() {
    var g = n;
    i++;
    $('.baner_01_a').css({
        "top": "40px",
        opacity: 0
    });
    $('.baner_01_b').css({
        "top": "420px",
        opacity: 0
    });
    if (i >= g) {
        i = 0;
    };
    if (i < g) {
        $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
        $('.domain_banner ul li').eq(i).fadeIn(800).siblings().fadeOut();
        $('.baner_01_a').animate({
            "top": "100px",
            opacity: 1
        }, 900, function() {
            $('.baner_01_b').animate({
                "top": "280px",
                opacity: 1
            }, 800)
        });
    };
};

var cMenu = {
    getSecMenuBoxTop: function(nIndex) {
        var nH = 335;
        // if(nIndex == 1) nH = 0;
        if ($("#sec_menu" + nIndex + "_cur").offset() != undefined) {
            var boxh = $("#sec_menu" + nIndex + "_cur").offset().top - nH;
            return boxh;
        }
        return 335;
    },
    selChange: function(nIndex) {
        var boxh = cMenu.getSecMenuBoxTop(nIndex);
        if ($(window).scrollTop() >= boxh) {
            $(".nav_fix li").eq(nIndex - 1).addClass('active').siblings().removeClass('active');
        }
        if (nIndex == 1) {
            if ($(window).scrollTop() >= boxh) {
                $(".nav_fix").addClass('fixed');
                $(".web_sl h1").css("background", "#fff");
            } else {
                $(".nav_fix").removeClass('fixed');
                $(".nav_fix").children('li').removeClass('active').eq(0).addClass('active');
                $(".web_sl h1").css("background", "#f5f5f5")
            }
        }
    },
    selMenuClick: function(nIndex) {
        var boxH = cMenu.getSecMenuBoxTop(nIndex);
        // console.log(nIndex +"==="+boxH);
        $(".nav_fix li").eq(nIndex - 1).unbind("click").click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            $("html,body").animate({
                scrollTop: boxH
            }, 500);
            return false;
        });
    },
    secMenuScroll: function() {
        $(window).scroll(function() {
            cMenu.selChange(1);
            cMenu.selChange(2);
            cMenu.selChange(3);
            cMenu.selChange(4);
            cMenu.selChange(5);

        });
        cMenu.selMenuClick(1);
        cMenu.selMenuClick(2);
        cMenu.selMenuClick(3);
        cMenu.selMenuClick(4);
        cMenu.selMenuClick(5);
    }
};
/*end*/

