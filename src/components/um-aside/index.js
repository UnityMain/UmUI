import UmAside from './src/index';

UmAside.install = function (Vue) {
  Vue.component(UmAside.name, UmAside);
};

export default UmAside;