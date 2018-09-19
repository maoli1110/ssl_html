/**
 * Created by caiyinsi on 2017/3/16.
 */
(function($) {
    $.fn.YFNav = function(options) {
        // default options
        var defaults = {
        };
        options = $.extend(defaults, options);
        // main
        // return this.each(function() {
            var objParentUl = $(this).find("ul.nav_list");

            objParentUl.append("<li class='nav_line'></li>");

            var objMagicLine = objParentUl.find(".nav_line");//涓嬮潰婊氬姩鐨勭嚎
            var objMagicLineInitPos = objParentUl.find("li:first");

            var nMagicLineTop = objMagicLineInitPos.position().top +  objMagicLineInitPos.outerHeight()-objMagicLine.outerHeight();
            objMagicLine.width(0).css("left", objMagicLineInitPos.position().left).css("top",nMagicLineTop );
            var objLiContent = objParentUl.find("li .nav_list_box"); //鍒楄〃

            objParentUl.find("li").find("a:first").hover(function() {
                var el = $(this);
                var leftPos = el.position().left;
                var newWidth = el.parent().width();

                objMagicLine.stop().animate({
                    left: leftPos,
                    width: newWidth
                },100);
                el.next(".nav_list_box").slideDown(300);
            },function() {
                objMagicLine.stop().animate({
                    width: 0
                });
                $(this).next(".nav_list_box").hide();
            });
            objLiContent.mouseover(function(){
                $(this).show();
                $(this).parent('li').addClass('nav_active');
                var parentLi = $(this).parent('li');

                objMagicLine.css("border", "1px red solid;");
                objMagicLine.stop().animate({
                    left: parentLi.position().left,
                    width: parentLi.width()
                });

            });
            objLiContent.mouseout(function(){
                $(this).hide();
                objMagicLine.stop().animate({
                    width: 0
                },100);
                $(this).parent('li').removeClass('nav_active');
            });

            var js_nav_bt = objLiContent.find(".list_main_l a");
            js_nav_bt.mouseenter(function(){
                $(this).addClass("selected").siblings().removeClass("selected");
                var js_nav_bt_cur = js_nav_bt.index(this);
                objLiContent.find(".list_main_content").children().eq(js_nav_bt_cur).show().siblings().hide();
            });

        // });
    };
})(jQuery);



