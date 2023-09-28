// 解析响应体为一个数组
let data = JSON.parse($response.body);

// 筛选只保留含"type": "user"数据组中所有相关项的数据
let filteredData = [data[0], data[1].filter(item => item.type === "user")];

// 使用$done()将重新转换后的JSON字符串发送包含修改后的响应体
$done({ body: JSON.stringify(filteredData) });