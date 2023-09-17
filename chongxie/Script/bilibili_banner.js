const url = $request.url;
const response = $response;

if (!response.body) {
  $done({});
} else {
  try {
    const obj = JSON.parse(response.body);

    if (url.includes("/x/v2/feed/index") && obj.data?.items) {
      obj.data.items = obj.data.items.filter((item) => {
        const { card_type, card_goto } = item;
        if (card_type && card_goto) {
          const bannerConditions = card_type.includes("banner") && card_goto.includes("banner");
          const adConditions = ["cm_v1", "cm_v2"].includes(card_type) &&
            ["ad_av", "ad_inline_3d", "ad_inline_eggs", "ad_player", "ad_web_gif", "ad_web_s"].includes(card_goto);
          const liveConditions = card_type === "small_cover_v9" && card_goto === "live";
          const gameAdConditions = card_type === "small_cover_v10" && card_goto === "game";
          const creativePromoConditions = card_type === "cm_double_v9" && card_goto === "ad_inline_av";
          const documentaryConditions = card_type === "ogv_small_cover" && card_goto === "bangumi";
          const pgcConditions = card_type === "small_cover_v2" && card_goto === "pgc";

          // 组合各种条件
          const shouldFilter = bannerConditions || adConditions || liveConditions || gameAdConditions ||
            creativePromoConditions || documentaryConditions || pgcConditions;

          return !shouldFilter; // 返回不满足条件的内容
        }
        return true; // 保留其他内容
      });

      // 重新设置响应的主体为处理后的 JSON 字符串
      response.body = JSON.stringify(obj);
    }
  } catch (error) {
    console.error("Error parsing response:", error);
  }

  $done({ body: response.body });
}