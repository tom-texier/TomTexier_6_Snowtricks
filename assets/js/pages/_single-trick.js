const slick = require('slick-carousel');

export function init()
{
    initMediaSlider();
}

export function initMediaSlider()
{
    $('#medias-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
        arrows: true,
        lazyLoad: 'ondemand',
        prevArrow: '<span class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i></span>',
        nextArrow: '<span class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i></span>',
    });
}