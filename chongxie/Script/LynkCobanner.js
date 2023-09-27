// 获取响应主体
let body = $response.body;

try {
    // 解析 JSON 格式的响应体为一个对象
    let obj = JSON.parse(body);

    // 检查是否存在 "componentCode" 为 "banner" 的数据字段
    if (obj && obj.length > 0) {
        obj = obj.filter(item => item.componentCode !== "banner");
    }

    // 使用 $done() 将重新转换后的 JSON 字符串发送包含修改后的响应体
    $done({ body: JSON.stringify(obj) });
} catch (error) {
    console.log("An error occurred: " + error);
    $done({});
}