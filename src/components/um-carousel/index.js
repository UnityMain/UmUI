import UmCarousel from './src/index';

UmCarousel.install = function (Vue) {
  Vue.component(UmCarousel.name, UmCarousel);
};

export default UmCarousel;