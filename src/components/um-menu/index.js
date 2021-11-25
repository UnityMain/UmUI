import UmMenu from './src/index';

UmMenu.install = function (Vue) {
  Vue.component(UmMenu.name, UmMenu);
};

export default UmMenu;