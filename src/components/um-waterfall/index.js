import UmWaterfall from './src/index';

UmWaterfall.install = function (Vue) {
  Vue.component(UmWaterfall.name, UmWaterfall);
};

export default UmWaterfall;