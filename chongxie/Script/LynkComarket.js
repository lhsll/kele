// 获取响应主体
let body = $response.body;

try {
    // 解析JSON格式的响应体为一个对象
    let obj = JSON.parse(body);

    // 删除"data"数据组下[siteModelRespDTO]所有相关项的数据
    if (obj && obj.data) {
        if (obj.data.siteModelRespDTO) {
            delete obj.data.siteModelRespDTO;
        }
        if (obj.data.articleDTOS) {
            delete obj.data.articleDTOS;
        }
    }

    // 将重新转换后的JSON字符串发送，包含修改后的响应体
    $done({ body: JSON.stringify(obj) });
} catch (error) {
    console.log("Error: " + error.message);
    $done(); // 发生错误时，保持原始响应体不变
}