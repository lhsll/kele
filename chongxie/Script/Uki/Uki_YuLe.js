// 获取响应主体
let body = $response.body;

// 解析 JSON 格式的响应体为一个对象
let obj = JSON.parse(body);

// 删除"data"数据组下所有相关项的数据
if (obj && obj.data) {
    obj.data = {};
}

// 将重新转换后的 JSON 字符串发送包含修改后的响应体
$done({ body: JSON.stringify(obj) });