let obj = JSON.parse($response.body);

if (obj.data) {
    obj.data.vipType = 1024;
    obj.data.vipLabelLevel = 999;
    obj.data.vipLabel = "荣耀捐赠会员";
    obj.data.username = "喜欢喝可乐";
    obj.data.avatarUrl = "https://raw.githubusercontent.com/lhsll/Sta/main/Picture/touxiang.PNG";
}

$done({ body: JSON.stringify(obj) });