$(document).ready(function(){
        // invoke the carousel
        $('#myCarousel').carousel({
          interval:6000
        });

        // scroll slides on mouse scroll 
        $('#myCarousel').bind('mousewheel DOMMouseScroll', function(e){

                if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                        $(this).carousel('prev');
                }
                else{
                        $(this).carousel('next');
                }
        });

        //scroll slides on swipe for touch enabled devices 

        $("#myCarousel").on("touchstart", function(event){

                var yClick = event.originalEvent.touches[0].pageY;
                $(this).one("touchmove", function(event){

                        var yMove = event.originalEvent.touches[0].pageY;
                        if( Math.floor(yClick - yMove) > 1 ){
                                $(".carousel").carousel('next');
                        }
                        else if( Math.floor(yClick - yMove) < -1 ){
                                $(".carousel").carousel('prev');
                        }
                });
                $(".carousel").on("touchend", function(){
                        $(this).off("touchmove");
                });
        });
            
});
            
//animated  carousel start
$(document).ready(function(){
            
        //to add  start animation on load for first slide 
        $(function(){
            $.fn.extend({
                    animateCss: function (animationName) {
                            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                            this.addClass('animated ' + animationName).one(animationEnd, function() {
                                    $(this).removeClass(animationName);
                            });
                    }
            });
                     $('.item1.active img').animateCss('slideInDown');
                     $('.item1.active h2').animateCss('zoomIn');
                     $('.item1.active p').animateCss('fadeIn');

        });

        //to start animation on  mousescroll , click and swipe            
            
            
        $("#myCarousel").on('slide.bs.carousel', function () {
           $.fn.extend({
                   animateCss: function (animationName) {
                           var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                           this.addClass('animated ' + animationName).one(animationEnd, function() {
                                   $(this).removeClass(animationName);
                           });
                   }
           });

       // add animation type  from animate.css on the element which you want to animate

           $('.item1 img').animateCss('slideInDown');
           $('.item1 h2').animateCss('zoomIn');
           $('.item1 p').animateCss('fadeIn');

           $('.item2 img').animateCss('slideInDown');
           $('.item2 h2').animateCss('zoomIn');
           $('.item2 p').animateCss('fadeIn');

           $('.item3 img').animateCss('slideInDown');
           $('.item3 h2').animateCss('zoomIn');
           $('.item3 p').animateCss('fadeIn');


       });
});

$(document).ready(function () {
    $(".btn-select").each(function (e) {
        var value = $(this).find("ul li.selected").html();
        if (value != undefined) {
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
    });
});

$(document).on('click', '.btn-select', function (e) {
    e.preventDefault();
    var ul = $(this).find("ul");
    if ($(this).hasClass("active")) {
        if (ul.find("li").is(e.target)) {
            var target = $(e.target);
            target.addClass("selected").siblings().removeClass("selected");
            var value = target.html();
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
        ul.hide();
        $(this).removeClass("active");
    }
    else {
        $('.btn-select').not(this).each(function () {
            $(this).removeClass("active").find("ul").hide();
        });
        ul.slideDown(300);
        $(this).addClass("active");
    }
});

$(document).on('click', function (e) {
    var target = $(e.target).closest(".btn-select");
    if (!target.length) {
        $(".btn-select").removeClass("active").find("ul").hide();
    }
});
