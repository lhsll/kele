let body = $response.body;

let obj = JSON.parse(body);

let newDataList = []; 

obj.data.appTabAppDetailDTOList.forEach(item => {
  if(item.tabName === '首页') {
    newDataList.push(item);
  }
});

obj.data.appTabAppDetailDTOList = newDataList;

// 新增逻辑
obj.data.searchBaseInfoItemDTOList = [];

body = JSON.stringify(obj); 

$done({body});