<template>
  <div id="kcb"
       class="um-syllabus">
    <table border=7
           frame=void
           align=center
           width=100%
           height=100px
           cellspacing=0px
           cellpadding=10px
           style="padding:30px;">
      <um-button type="primary"
                 v-on:click="print"
                 :disabled="isEdit">打印</um-button>
      <um-button type="primary"
                 v-on:click="isEdit?isEdit=false:isEdit=true">{{isEdit==true?'查看':'编辑'}}</um-button>
      <um-button type="primary"
                 v-on:click="exportJson">输出Json</um-button>
      <caption style="font-size:20px;margin-bottom:30px">班级课程表</caption>
      <tr height=50px
          align=center>
        <th width=110px
            class="tb_bt"
            colspan="2"
            style="position:relative;">
          <span style="position: absolute;top:5px;right:15px;">星期</span>
          <span style="position: absolute;bottom:5px;left:15px">课次</span>
        </th>
        <th v-for="today in syllabus.week"
            :key="today.key"
            class="tb_bt">
          <font>
            {{today}}
          </font>
        </th>
      </tr>
      <!-- 课程表 -->
      <tbody v-for="(time,tkey) in syllabus.time"
             :key="tkey">
        <tr height=40px
            align=center
            v-for="(course,ckey) in time.course"
            :key="ckey">
          <td width="120"
              :rowspan="time.course.length"
              v-if="ckey==0">
            <input class="um-input"
                   style="width: 120px;"
                   type="text"
                   placeholder="时间段"
                   v-model="time.name"
                   v-if="isEdit" />
            <div v-if="!isEdit">{{time.name}}</div>
            <i v-if="tkey==0&&isEdit"
               class="iconfont icon-tianjia"
               @click="addTime()"></i>
            <i v-if="tkey!=0&&isEdit"
               class="iconfont icon-jianshao"
               @click="delTime(tkey)"></i>
          </td>
          <td width="140"
              class="tb_bt"
              style="cursor:pointer">
            <font><b>第 {{course.sort}} 节 <br />
                <div v-if="isEdit">
                  <input v-model="course.startTime" />
                  <input v-model="course.endTime" />
                </div>
                <p v-if="!isEdit"
                   style="text-align:center">（{{course.startTime}} - {{course.endTime}} ）</p>
              </b></font>
          </td>
          <td v-for="(item,index) in course.name"
              :key="index"
              style="position: relative;">
            <input type="text"
                   class="um-input kecheng"
                   v-model="course.name[index]"
                   v-if="isEdit" />
            <div v-if="!isEdit">{{item}}</div>
            <i v-if="isEdit&&index==syllabus.week.length-1&&ckey!=0"
               class="iconfont icon-jianshao badge del-color"
               @click="delCourse(time,ckey)"></i>
            <i v-if="isEdit&&index==syllabus.week.length-1&&ckey==0"
               class="iconfont icon-tianjia badge add-color"
               @click="addCourse(time)"></i>
          </td>
        </tr>
        <tr height=40px
            align=center>
          <td colspan="10">
            <input type="text"
                   class="um-input wuxiu"
                   placeholder="请输入过渡时期"
                   v-model="time.endInfo"
                   v-if="isEdit" />
            <div v-if="!isEdit">{{time.endInfo}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'um-syllabus',
  props: {
    syllabus: {
      type: Object,
      required: true
    }
  },
  computed: {
    showClass: {
      get: function () {
        return function (course, index) {
          index++;
          for (let i = 0; i < course.class.length; i++) {
            if (course.class[i].week == index) {
              return course.class[i].name
            }
          }
        }
      },
      set: function (data) {
        let isExist = false;
        for (let i = 0; i < course.class.length; i++) {
          if (course.class[i].week == index) {
            isExist = true;
            return course.class[i].name
          }
        }
        if (!isExist) {
        }
      }

    }
  },
  data () {
    return {
      isEdit: true,
    }
  },
  methods: {
    exportJson () {
      console.log(JSON.stringify(this.syllabus));
    },
    change (event, index) {
      this.showClass = {
        value: event.target.value,
        index: index
      };
    },
    print (event) {
      let headHtml = document.head.innerHTML;
      let kcbHtml = document.getElementById("kcb").innerHTML;
      let printHtml = headHtml + kcbHtml;

      var my_window = window.open("", "调起打印");
      my_window.document.write(printHtml)
      my_window.print();
      my_window.close();
    },
    addTime () {
      let i = this.syllabus.time.push({
        name: '',
        course: []
      });
      this.addCourse(this.syllabus.time[i - 1]);
    },
    delTime (index) {
      this.syllabus.time.splice(index, 1);
      this.sortCourse()
    },
    addCourse (time) {
      const demo = {
        sort: '',
        startTime: '',
        endTime: '',
        name: []
      }
      for (let i = 0; i < this.syllabus.week.length; i++) {
        demo.name.push('')
      }
      time.course.push(demo)
      this.sortCourse()
    },
    sortCourse () {
      let sort = 1
      this.syllabus.time.forEach(time => {
        time.course.forEach(course => {
          course.sort = sort
          sort++
        })
      })
    },
    delCourse (time, key) {
      time.course.splice(key, 1)
      this.sortCourse()
    },
  }
}
</script>

<style scoped>
.um-syllabus {
  background-color: white;
}
.tb_bt {
  color: #6d6666;
  font-weight: bold;
}
.um-input {
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  outline-color: transparent;
  box-shadow: none;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: "STKaiti";
  background: none;
}
.kecheng {
  width: 100%;
  height: 100%;
  padding: 0 10px;
}
.wuxiu {
  height: 100%;
  padding: 0 10px;
}
.badge {
  position: absolute;
  font-size: 18px;
  cursor: pointer;
  right: 0px;
}
.del-color {
  color: #f82c11;
}
.add-color {
  color: #54e661;
}
@page {
  size: auto;
  margin: 0mm;
}
</style>