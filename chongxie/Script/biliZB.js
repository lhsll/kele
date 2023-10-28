// 获取响应主体
let body = $response.body;

// 解析 JSON 格式的响应体为一个对象
let obj = JSON.parse($response.body);

// 保留"data"数据组下的指定"biz_id"数据项
let keepBizIds = [997, 998, 2, 16, 3];
if (obj.data && obj.data.outer_list) {
    obj.data.outer_list = obj.data.outer_list.filter(item => keepBizIds.includes(item.biz_id));
}

// 保留"interaction_list"数据组中"biz_id"为32的相关项
if (obj.data && obj.data.interaction_list) {
    obj.data.interaction_list = obj.data.interaction_list.filter(item => item.biz_id === 32);
}

// 去除广告
if (obj.data) {
    obj.data.activity_banner_info = undefined;
    obj.data.shopping_info = { is_show: 0 };
}

$done({ body: JSON.stringify(obj) });