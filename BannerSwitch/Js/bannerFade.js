(function ($) {
    $.fn.bannerFade = function (settings) {
        var param = $.extend({
            interval: 5000,   //间隔5秒切换一次
            speed: 500,    //0.5秒切换完成
            isHoverStop: false,    //悬浮其上停止计时器，移动端一定要是false
            callback: null   //动画完成后的回调，参数一：当前banner索引
        }, settings || {});

        var ul = this.find('ul');
        var ulLi = ul.children('li');
        var ol = this.find('ol');
        var index = 0;//当前索引
        var length = ulLi.length;//banner 总数量
        //生成按钮
        for (var i = 0; i < length; i++) { ol.append('<li index="' + i + '"></li>'); }
        ol.css("margin-left", -ol.width() / 2);
        var olLi = ol.children('li');
        olLi.eq(0).addClass('bannerFadeCurBtn');
        //绑定按钮单击事件
        olLi.on('click', function () { clearInterval(tims); tims = setInterval(function () { change(index + 1); }, param.interval); change(parseInt($(this).attr('index'))); });
        //计时器
        var tims = setInterval(function () { change(index + 1); }, param.interval);
        //悬浮其上停止计时器
        if (param.isHoverStop) { this.hover(function () { clearInterval(tims); }, function () { tims = setInterval(function () { change(index + 1); }, param.interval); }); }
        //执行动画
        function change(i) {
            ulLi.stop(true, true);//停止动画
            i = i >= length ? 0 : i <= -1 ? length - 1 : i;
            if (i == index) { return; }
            olLi.removeClass('bannerFadeCurBtn');
            olLi.eq(i).addClass('bannerFadeCurBtn');
            ulLi.eq(index).fadeOut(param.speed);
            index = i;
            ulLi.eq(i).fadeIn(param.speed, function () {
                if (param.callback) { param.callback(i); }
            });
        }
    }
})(jQuery);