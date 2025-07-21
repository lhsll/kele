const url = $request.url;
const body = $response.body;
let modifiedBody = body;

// 统一处理配置接口
if (url.includes("mtop.cainiao.app.e2e.engine.page.fetch")) {
  try {
    const obj = JSON.parse(modifiedBody);
    const data = obj.data?.data;
    
    // 通过URL参数区分配置类型
    const getUrlParam = (name) => {
      const match = url.match(new RegExp(`[?&]${name}=([^&]*)`));
      return match ? decodeURIComponent(match[1]) : null;
    };
    
    const pageId = getUrlParam("data") ? JSON.parse(getUrlParam("data"))?.pageId : null;
    
    // 标签页配置处理 (pageId=1300)
    if (pageId == 1300 && data && typeof data === 'object') {
      const positionsToKeep = ["0", "4"];
      Object.keys(data).forEach(key => {
        if (!positionsToKeep.includes(data[key]?.position)) {
          delete data[key];
        }
      });
      
      if (obj.data?.global?.event) {
        obj.data.global.event.tid = "modified_" + Date.now();
      }
      modifiedBody = JSON.stringify(obj);
    } 
    // 首页配置处理 (pageId=1100)
    else if (pageId == 1100 && data?.data) {
      const targetData = data.data;
      
      // 1. 清空搜索提示文案
      targetData.mainSearch?.bizData?.searchContents?.forEach(item => {
        item.hintText = "";
      });
      
      // 2. 处理金刚区
      const kingkongIndex = targetData.operationList?.findIndex(
        op => op.type === "kingkong"
      );
      
      if (kingkongIndex > -1) {
        const kingkong = targetData.operationList[kingkongIndex];
        
        // 2.1 移除物换物功能
        if (kingkong.bizData?.items) {
          kingkong.bizData.items = kingkong.bizData.items.filter(
            item => item.key !== "exchange_old_things"
          );
        }
        
        // 2.2 清理埋点参数
        kingkong.bizData?.items?.forEach(item => {
          ["adUtArgs", "utLdArgs", "exposureEvent", "bubbleAdUtArgs"].forEach(
            field => delete item[field]
          );
        });
      }
      
      // 3. 移除图标功能区
      targetData.operationList = targetData.operationList?.filter(
        op => op.type !== "icons"
      );
      
      // 4. 移除轮播图区域
      targetData.operationList = targetData.operationList?.filter(
        op => op.type !== "banner_area"
      );
      
      modifiedBody = JSON.stringify(obj);
    }
  } catch (error) {
    console.log(`配置处理错误: ${error.message}`);
  }
}

$done({ body: modifiedBody });