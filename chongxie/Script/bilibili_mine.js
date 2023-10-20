const url = $request.url;
const response = JSON.parse($response.body);

if (url.includes("/x/v2/account/mine")) {
  // 我的页面
  // 不同版本的项目列表
  const itemList = new Set([
    396, 397, 398, 399, 407, 410, 494, 495, 496, 497, 500, 501
  ]);

  if (response.data?.sections_v2) {
    response.data.sections_v2.forEach((section) => {
      // 过滤项目
      section.items = section.items.filter((item) => itemList.has(item.id));

      // 清空或修改属性
      section.button = {};
      section.tip_icon = "";
      section.be_up_title = "";
      section.tip_title = "";

      if (["推荐服务", "更多服务", "创作中心","成为大会员"].includes(section.title)) {
        section.title = "";
        section.type = "";
      }
    });

    // 设置本地会员标识
    if (response.data.vip.status !== 1) {
      response.data.vip_type = 2;
      response.data.vip.type = 2;
      response.data.vip.status = 1;
      response.data.vip.vip_pay_type = 1;
      response.data.vip.due_date = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
      response.data.vip.role = 3;
    }
  }
}

// 返回修改后的响应体
$done({ body: JSON.stringify(response) });