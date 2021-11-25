import UmTable from './src/index';

UmTable.install = function (Vue) {
  Vue.component(UmTable.name, UmTable);
};

export default UmTable;