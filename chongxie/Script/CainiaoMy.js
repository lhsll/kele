// 去除菜鸟App JSON中指定模块的脚本
const removeComponents = (obj) => {
    // 删除资产卡片 (asset)
    if (obj?.data?.data?.asset) {
        delete obj.data.data.asset;
    }

    // 删除会员信息 (vip)
    if (obj?.data?.data?.vip) {
        delete obj.data.data.vip;
    }

    // 删除绿色回收 (wallet)
    if (obj?.data?.data?.wallet) {
        delete obj.data.data.wallet;
    }

    // 删除活动入口 (activity)
    if (obj?.data?.data?.activity) {
        delete obj.data.data.activity;
    }

    // 删除广告横幅 (banner)
    if (obj?.data?.data?.banner) {
        delete obj.data.data.banner;
    }

    // 清理全局事件中的abvs
    if (obj?.data?.global?.event?.abvs) {
        const keptAbvs = obj.data.global.event.abvs
            .split(',')
            .filter(abv => !abv.includes('EP_202412101059_1_717')) // 移除资产卡片相关标记
            .join(',');
        
        obj.data.global.event.abvs = keptAbvs || "";
    }

    return obj;
};

// Surge响应体处理
$done({
    body: JSON.stringify(removeComponents(JSON.parse($response.body)))
});