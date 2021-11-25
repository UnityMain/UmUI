<template>
  <div class="um-table">
    <table cellspacing="0" cellpadding="0" border="1">
      <thead>
        <um-button
          type="primary"
          @click="exportExcel"
          disabled
          icon="iconfont icon-jianshao"
          >输出</um-button
        >
        <tr v-for="(ta, tkey) in tableHead" :key="tkey">
          <th
            v-for="(col, ckey) in ta"
            width="120"
            :key="ckey"
            :colspan="col.colspan"
            :rowspan="col.rowspan"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, dkey) in data" :key="dkey">
          <td v-for="(tc, tcKey) in tableCol" :key="tcKey">
            {{ d[tc] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { export_fuza_json_to_excel } from "@/utils/Export2Excel";
export default {
  name: "um-table",
  props: {
    column: {
      type: Array,
      require: true,
    },
    data: {
      type: Array,
    },
  },
  data() {
    return {
      tableHead: [],
      tableCol: [],
      depWidth: 0,
      cloneColumn: [],
    };
  },
  created: function() {
    this.cloneColumn = JSON.parse(JSON.stringify(this.column));
    this.getMaxDepth(this.cloneColumn);
    this.getMaxBreadth(this.cloneColumn);
  },
  methods: {
    exportExcel() {
      console.log(this.column);
      export_fuza_json_to_excel(this.column, this.data, "导出");
    },
    getMaxDepth(tree) {
      if (tree) {
        tree.forEach((node) => {
          if (node.children) {
            this.getMaxDepth(node.children);
          } else {
            this.tableCol.push(node.prop);
          }
          if (node.children) {
            if (this.depWidth == 0) {
              this.depWidth = node.children.length;
            } else {
              this.depWidth = this.depWidth + (node.children.length - 1);
            }
            node.colspan = this.depWidth;
          }
        });
      }
    },
    getMaxBreadth(tree) {
      let stack = tree;
      let i = 1;
      let j = 1;
      let k = 0;
      if (stack) {
        let col = [];
        while (stack.length != 0) {
          let item = stack.shift();
          //给一级root添加等级
          if (!item.level) {
            item.level = 1;
          }
          //如果等级不变，则继续在当前行添加标签
          if (j == item.level) {
            col.push({
              label: item.label,
            });
          }
          //否则创建下一行标签
          else {
            this.tableHead.push(col);
            col = [];
            col.push({
              label: item.label,
            });
            j = i;
            k = 0;
          }
          col[k].level = j;
          if (item.children) {
            col[k].colspan = item.colspan;
            i++;
            item.children.forEach((ele) => {
              ele.level = i;
              stack.push(ele);
            });
          } else {
            col[k].isChild = true;
          }
          //当前已经是最后一级
          if (stack.length == 0) {
            this.tableHead.push(col);
          }
          k++;
        }
        this.tableHead.forEach((ele) => {
          ele.forEach((e) => {
            if (e.isChild) {
              e.rowspan = i - e.level + 1;
            }
            // console.log(e);
          });
        });
        // console.log(this.tableHead)
      }
    },
  },
};
</script>
<style scoped>
.um-table {
  width: 100%;
  height: 100%;
}
.um-table table {
  border: none;
  color: #606266;
  margin: auto;
  text-align: center;
}
.um-table th {
  border: 1px solid black;
  border-radius: 5px;
  background: #9fdee3;
}
</style>
