// 获取响应主体
let body = $response.body;

// 解析 JSON 格式的响应体为一个对象
let obj = JSON.parse(body);

// 使用筛选函数过滤出 "id" 属性值为 "ZXYY" 的项
obj.data.tabs = obj.data.tabs.filter(tab => tab.id === "ZXYY");

// 将重新转换后的 JSON 字符串发送包含修改后的响应体
$done({ body: JSON.stringify(obj) });