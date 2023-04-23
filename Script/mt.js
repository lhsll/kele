// 将响应体解析为JSON对象
let obj = JSON.parse($response.body);
// 将 JSON 字符串解析为 JavaScript 对象并存储在变量 obj 中
const obj = JSON.parse(jsonString);
// 从 obj 对象中删除 data 属性
delete obj.data;
// 使用 $done() 函数将更改后的响应返回到原始请求
$done({response: JSON.stringify(obj)});