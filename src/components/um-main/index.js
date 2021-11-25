import UmMain from './src/index';

UmMain.install = function (Vue) {
  Vue.component(UmMain.name, UmMain);
};

export default UmMain;