<template>
  <div style="width:100%;">
    <div style="width:90%;">
      <select name="type">
        <option value="image">图片</option>
        <option value="video">视频</option>
        <option value="voice">语音</option>
        <option value="news">图文</option>
      </select>
      <input type="number" name="offset" />
      <input type="number" name="count" />
      <button v-on:click="queryScCount">提交</button>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      clientHeight: 0,
    };
  },
  watch: {},
  methods: {
    queryScCount() {
      axios({
        method: "post",
        url: "/wx/demo",
        params: {
          partId: 123456,
        },
      });

      /* axios
        .get("/wx/batchgetMaterial")

        .then(function(response) {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        }); */
    },
  },
  created() {},
  mounted() {},
  updated() {},
};
</script>
<style scoped></style>
