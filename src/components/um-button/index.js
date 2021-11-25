import UmButton from './src/index';

UmButton.install = function (Vue) {
  Vue.component(UmButton.name, UmButton);
};

export default UmButton;