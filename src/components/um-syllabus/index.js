import UmSyllabus from './src/index';

UmSyllabus.install = function (Vue) {
  Vue.component(UmSyllabus.name, UmSyllabus);
};

export default UmSyllabus;