// 获取响应主体
let body = $response.body;

// 解析JSON格式的响应体为一个对象
let obj = JSON.parse(body);

// 保留数据组下 "title": "默认分组" 和 "title": "我的分组" 所有相关项的数据
let groups = obj.groups;
let newGroups = [];

for (let group of groups) {
  if (group.title === "默认分组" || group.title === "我的分组") {
    newGroups.push(group);
  }
}

// 更新响应体中的数据
obj.groups = newGroups;

// 将重新转换后的JSON字符串发送包含修改后的响应体
$done({ body: JSON.stringify(obj) });