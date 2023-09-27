// 获取响应主体
let body = $response.body;

// 将响应主体解析为 JSON 对象
let obj = JSON.parse(body);

// 使用筛选函数过滤出 "id" 属性值为 "ZXYY" 的项
obj.data.tabs = obj.data.tabs.filter(tab => tab.id === "ZXYY");

// 将修改后的 JSON 对象转换回 JSON 字符串
let modifiedBody = JSON.stringify(obj);

// 使用 $done() 函数将修改后的响应返回到原始请求
$done({ body: modifiedBody });