## 功能 ##

#price.js文件
- [1]根据配置获取价格，采用ajax，POST方法，传参：goodsInfoArray，返回参数currentPriceInfo
function getPrice() {}

- [2]购买跳转链接拼接，拼接参数：goodsInfoObject
function buySSL(goodsInfoObject){}

## 主要介绍 ##
|-- price.js                  // 获取实时价格&立即购买
|-- sslpur.js                 // 根据产品数据展示ssl证书页面
|-- ssl.json                  // SSL产品数据备份