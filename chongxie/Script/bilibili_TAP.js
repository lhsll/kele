const url = $request.url;
const response = JSON.parse($response.body);

// 检查网址是否包含特定路径
if (url.includes("/x/resource/show/tab")) {
  // 如果网址包含"/x/resource/show/tab"，则执行以下逻辑

  // 处理标签页
  if (response.data.tab) {
    // 过滤掉不是"直播"或"推荐"的标签项
    response.data.tab = response.data.tab.filter(
      (item) =>
        item.name === "直播" ||
        item.name === "推荐"
    );
  }

  // 处理顶部图标
  if (response.data.top) {
    // 设置一个消息图标项
    response.data.top = [
      {
        id: 176,
        icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
        tab_id: "消息Top",
        name: "消息",
        uri: "bilibili://link/im_home",
        pos: 1
      }
    ];
  }

  // 处理底部图标
  if (response.data.bottom) {
    // 过滤掉"发布"、"会员购"和"節目"的图标项
    response.data.bottom = response.data.bottom.filter(
      (item) =>
        !(
          item.name === "发布" ||
          item.name === "会员购" ||
          item.name === "節目" ||
          item.name === "双11"
        )
    );
  }

  // 返回修改后的响应体
  $done({ body: JSON.stringify(response) });
} else {
  // 如果不是特定路径的请求，直接返回原始响应体
  $done({ body: JSON.stringify(response) });
}