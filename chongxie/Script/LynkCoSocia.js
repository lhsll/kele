// 获取响应主体
let body = $response.body;

// 解析JSON格式的响应体为一个对象
let obj = JSON.parse(body);

// 检查是否存在"data"数据组
if (obj.data && obj.data.recommendedTopics) {
    // 删除"data"数据组下的"recommendedTopics"相关项
    delete obj.data.recommendedTopics;
}

// 将重新转换后的JSON字符串发送，包含修改后的响应体
$done({ body: JSON.stringify(obj) });