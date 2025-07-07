function modifyJSON(json) {
    // 1. 修改物换物的气泡提示
    const kingkong = json?.data?.data?.data?.operationList?.find(op => op.type === "kingkong");
    if (kingkong) {
        const exchangeItem = kingkong?.bizData?.items?.find(item => item.key === "exchange_old_things");
        if (exchangeItem) {
            // 删除气泡文本和相关广告字段
            delete exchangeItem.bubbleText;
            delete exchangeItem.bubbleAdUtArgs;
        }
    }

    // 2. 清空图标功能区
    const icons = json?.data?.data?.data?.operationList?.find(op => op.type === "icons");
    if (icons) {
        icons.bizData.items = [];
    }

    // 3. 清空横幅广告区
    const bannerArea = json?.data?.data?.data?.operationList?.find(op => op.type === "banner_area");
    if (bannerArea) {
        bannerArea.bizData.items = [];
    }

    // 4. 递归删除所有广告相关字段
    const removeAds = (obj) => {
        if (!obj || typeof obj !== "object") return;
        
        Object.keys(obj).forEach(key => {
            // 删除广告监测相关字段
            if (key.includes("ad") || key.includes("adv") || key.includes("ut") || key.includes("monitor")) {
                delete obj[key];
            } 
            // 递归处理子对象
            else if (typeof obj[key] === "object") {
                removeAds(obj[key]);
            }
        });

        // 特殊处理事件数组
        ["exposureEvent", "tapEvent"].forEach(eventKey => {
            if (Array.isArray(obj[eventKey])) {
                obj[eventKey] = obj[eventKey].filter(event => 
                    !["AD", "MONITOR", "UT"].includes(event?.actionType)
                );
            }
        });
    };

    removeAds(json);
    return json;
}

// 示例使用（Surge环境）
const modifiedBody = modifyJSON($response.body);
$done({ body: JSON.stringify(modifiedBody) });