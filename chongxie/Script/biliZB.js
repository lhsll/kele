let body = $response.body;
let obj = JSON.parse(body);

if (obj.data && obj.data.outer_list) {
    obj.data.outer_list = obj.data.outer_list.filter(item => {
        let title = item.title;
        return !["魔法奇遇", "守护圣殿", "帮玩订单", "购物车", "荣耀等级"].includes(title);
    });
}

if (obj.data) {
    obj.data.activity_banner_info = undefined;
    obj.data.shopping_info = { is_show: 0 };
}

$done({ body: JSON.stringify(obj) });