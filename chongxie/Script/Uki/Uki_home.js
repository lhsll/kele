// 获取响应主体
let 内容 = $response.内容;

// 解析 JSON 格式的响应体为一个对象
let obj = JSON.parse(body);

// 使用筛选函数过滤出 "id" 属性值为 "ZXYY" 的项
obj.data.tab = obj.data.tab.filter(tab => tab.id === "ZXYY");

// 将重新转换后的 JSON 字符串发送包含修改后的响应体
$done({ 内容: JSON.stringify(obj) });
