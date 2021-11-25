import UmContainer from './src/index';

UmContainer.install = function (Vue) {
  Vue.component(UmContainer.name, UmContainer);
};

export default UmContainer;