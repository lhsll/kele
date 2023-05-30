function blockAds(request, response) {
  const responseData = JSON.parse(response.body); // 解析响应的 JSON 数据

  // 遍历 entities 数组查找匹配的广告链接
  for (const entity of responseData.entities) {
    if (entity.title === '来来来「赚点零花钱」 >>>') {
      response.status = 404; // 返回 404 响应以屏蔽广告链接
      break; // 找到匹配的链接后，停止遍历
    }
  }

  return response;
}

$done({ response: blockAds });