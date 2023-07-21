// Surge脚本，将名为"search_faxian"的数据返回为空
$done({
  body: JSON.stringify({
    "error_msg": "",
    "data": {
      "search_faxian": {}
    }
  })
});