// 获取响应主体
let body = $response.body;

try {
  // 解析 JSON 格式的响应体为一个对象
  let obj = JSON.parse(body);

  // 删除"data"数据组下所有相关项的数据
  if (obj.hasOwnProperty("data")) {
    delete obj.data;
  }

  // 最后使用$done()将重新转换后的 JSON 字符串发送包含修改后的响应体
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("解析响应体失败：" + e.message);
  $done({});
}