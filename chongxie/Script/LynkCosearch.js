const body = $response.body; // 获取响应主体

try {
    // 解析 JSON 响应体为对象
    var obj = JSON.parse(body);

    // 检查是否有 "data" 数据组
    if (obj.data && obj.data.pageDetailList) {
        // 遍历 "pageDetailList" 数组，删除指定项
        obj.data.pageDetailList = obj.data.pageDetailList.filter(function(item) {
            return item.cptCode !== "1013" &&
                   item.cptCode !== "1016" &&
                   item.cptCode !== "1001" &&
                   item.cptCode !== "1014";
        });
    }

    // 将修改后的 JSON 对象重新转换为字符串
    var modifiedData = JSON.stringify(obj);

    // 使用 $done() 方法发送包含修改后的响应体的响应
    $done({body: modifiedData});
} catch (error) {
    console.log('处理响应时出错：' + error);
    $done();
}