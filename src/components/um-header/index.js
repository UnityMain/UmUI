import UmHeader from './src/index';

UmHeader.install = function (Vue) {
  Vue.component(UmHeader.name, UmHeader);
};

export default UmHeader;