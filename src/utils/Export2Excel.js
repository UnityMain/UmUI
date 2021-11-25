/* eslint-disable */
import XLSX from 'xlsx'
// import xlsx2 from 'xlsx2'

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } });
      }
      ;

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = { v: data[R][C] };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";

  var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });

  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "test.xlsx")
}

export function export_json_to_excel(th, jsonData, defaultTitle) {

  /* original data */

  var data = jsonData;
  data.unshift(th);
  var ws_name = "SheetJS";

  var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /*设置worksheet每列的最大宽度*/
  const colWidth = data.map(row => row.map(val => {
    /*先判断是否为null/undefined*/
    if (val == null) {
      return { 'wch': 10 };
    }
    /*再判断是否为中文*/
    else if (val.toString().charCodeAt(0) > 255) {
      return { 'wch': val.toString().length * 2 };
    } else {
      return { 'wch': val.toString().length };
    }
  }))
  /*以第一行为初始值*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch'];
      }
    }
  }
  ws['!cols'] = result;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
  var title = defaultTitle || 'excel-list'
  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), title + ".xlsx")
}


/**
 * 导出复杂表头表格
 * @param {Array} columns 表头列表
 * @param {Array} jsonData 数据列表
 * @param {String} filename 文件名称
 */
export function export_fuza_json_to_excel(columns, jsonData, filename) {
  var ws_name = "SheetJS";
  //新建工作簿
  var wb = new Workbook()
  var ws = {};
  //深拷贝
  let col = JSON.parse(JSON.stringify(columns));
  //深度优先遍历的方式转换数据
  var data = deepTraversal(col);
  var excel = [];
  //表头内容拼接
  data.header.forEach(element => {
    excel.push(element);
  });
  //数据内容拼接
  for (var j = 0; j < jsonData.length; j++) {
    var arr = [];
    for (var i = 0; i < data.prop.length; i++) {
      arr.push((jsonData[j])[data.prop[i]])
    }
    excel.push(arr);
  }
  //二维数据转工作簿数据
  ws = XLSX.utils.aoa_to_sheet(excel);
  //合并单元格操作
  let merges = [];
  //走过的地图
  let map = [];
  let flag = true;
  for (var y = 0; y < data.header.length; y++) {
    for (var x = 0; x < data.header[y].length; x++) {
      let maxY = data.header.length;
      let maxX = data.header[y].length;
      if (flag) {
        map = getErWeiArr(maxX, maxY);
        flag = false;
      }
      if (map[y][x]) {
        continue;
      }
      //下
      if ((y + 1) < maxY &&
        data.header[y + 1][x] === null) {
        //定义合并条件
        let m = { s: {}, e: {} };
        m.s.r = y; m.s.c = x;
        //继续往下走，覆盖空内容，直到不为空
        for (var yy = (y + 1); yy < maxY; yy++) {
          if (data.header[yy][x] === null) {
            data.header[yy][x] = data.header[y][x];
            map[yy][x] = true;
          } else {
            break;
          }
        }
        m.e.r = yy - 1; m.e.c = x;
        merges.push(m);
      }
      //右
      else if ((x + 1) < maxX &&
        data.header[y][x + 1] === null) {
        //定义合并条件
        let m = { s: {}, e: {} };
        m.s.r = y; m.s.c = x;
        //继续往右走，覆盖空内容，直到不为空
        for (var xx = (x + 1); xx < maxX; xx++) {
          if (data.header[y][xx] === null) {
            data.header[y][xx] = data.header[y][x];
            map[y][xx] = true;
          } else {
            break;
          }
        }
        m.e.r = y; m.e.c = xx - 1;
        merges.push(m);
      }
      //不存在向左或向上行走的可能
    }
  }

  ws['!merges'] = merges;
  ws['!cols'] = [
    { wpx: 300 }
  ]
  Object.getOwnPropertyNames(ws).forEach(element => {
    if (element != '!ref' && element != '!merges')
      ws[element].s = {
        alignment: {
          horizontal: "center",
          vertical: "center"
        }
      }
  });
  //工作簿转换为电子表格文件下载
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
  var title = filename || 'excel-list'
  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), title + ".xlsx")

}

/**
 * 深度优先遍历多叉树
 * @param {Array} node 表头多叉树
 */
function deepTraversal(node) {
  //所有节点列表
  let nodes = [];
  //最后一级的标题
  let labels = [];
  //最后一级的参数名
  let props = [];
  //表格头
  let header = [];
  if (node != null) {
    let erwei = getErWeiArr(50, 8);
    //同来存放将来要访问的节点
    let stack = node;
    let x = 0;
    let maxY = 0;
    let maxX = 0;
    while (stack.length != 0) {
      //正在访问的节点
      let item = stack.shift();
      nodes.push(item);
      let childrens = item.children;
      let y = item.level;
      if (!y) {
        y = 0;
      }
      erwei[y][x] = item.label;
      maxY
      if (!childrens) {
        labels.push(item.label);
        props.push(item.prop);
        childrens = [];
        x++;
      } else {
        if (!item.level) {
          item.level = 0;
        }
      }
      //将现在访问点的节点的子节点存入stack，供将来访问
      for (let i = childrens.length - 1; i >= 0; i--) {
        let lv = (item.level + 1);
        childrens[i].level = lv;
        if (maxY < lv) {
          maxY = lv;
        }
        stack.unshift(childrens[i]);
        if (i == 0) {
          childrens[childrens.length - 1].islast = true;
        }
      }
    }
    maxX = props.length;
    maxY++;
    header = getErWeiArr(maxX, maxY);
    for (var i = 0; i < header.length; i++) {
      for (var j = 0; j < header[i].length; j++) {
        header[i][j] = erwei[i][j];
      }
    }
  }
  let sheet = {}
  sheet.label = labels;
  sheet.header = header;
  sheet.prop = props;
  sheet.node = nodes;
  return sheet;
}

/**
 * 生成二维数组
 * @param {Number} y x坐标
 * @param {Number} x y坐标
 */
function getErWeiArr(y, x) {
  var pos = new Array();
  for (var i = 0; i < x; i++) {
    pos[i] = new Array();
    for (var j = 0; j < y; j++) {
      pos[i][j] = null; //0表示只有一个空的红圈
    }
  }
  return pos;
}

/**
 * 读取本地excel文件
 * @param {File} file dom接收文件流
 * @param {Function} callback 回调函数
 */
export function readWorkbookFromLocalFile(file, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, { type: 'binary' });
    if (callback) callback(workbook);
  };
  reader.readAsBinaryString(file);
}