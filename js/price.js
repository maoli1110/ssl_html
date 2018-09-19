//  获取价格所需参数(全局)
let goodsInfoArray = [{  ////ssl产品参数array
    categoryId: "",  //证书品牌
    type: "",        //证书种类
    domainType: "",  //域名类型
    domainCount: "", //域名个数
    buyCount: "",    //购买数量
    buyTime: ""      //购买时长
}];

let currentPriceInfo = { //实时的价格参数
    currentprice:'',    //当前价格
    save:''             //节省价格
};

/** 
 * 根据配置获取价格ajax
 */
function getPrice() {
    setTimeout(() => {
        getCurrentGoodsInfo() //展示当前配置信息
        goodsInfoArray = combindSSLParam(); //组装价格参数
        // console.log(goodsInfoArray,'goodsInfoArray')
        //随机生成价格返回值
        currentPriceInfo.currentprice = Math.floor(Math.random()*1000+1);
        currentPriceInfo.save = Math.floor(Math.random()*1000+1);
        $(".num_bold").text(currentPriceInfo.currentprice);
        $(".num_saving").text("省了￥"+currentPriceInfo.save);

        //========点击不同标签获取价格，正式用(post请求)=========
        // $.ajax({
        //     type: "POST",
        //     url: './price.json',
        //     data: goodsInfoArray,
        //     contentType: "application/json;charset=utf-8",
        //     dataType: 'json',//服务器返回的数据类型
        //     success: function (data, status, XMLHttpRequest) {
        //         // alert("请求成功");
        //         currentPriceInfo.currentprice = data[0].currentprice;
        //         currentPriceInfo.save = data[0].save;
        //         $(".num_bold").text(currentPriceInfo.currentprice);
        //         $(".num_saving").text("省了￥" + currentPriceInfo.save);
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         // alert("请求失败");
        //     }
        // }); 
        
    }, 50);
}

/**
 * 购买跳转链接拼接
 * @param  {object} goodsInfoObject 价格参数object
 */
function buySSL(goodsInfoObject){
    let buyUrl= 'http://localhost?action=buySSL&categoryId=' + goodsInfoObject.categoryId + '&type=' + goodsInfoObject.type + '&domainType=' + goodsInfoObject.domainType + '&buyCount=' + goodsInfoObject.buyCount + '&buyTime='+goodsInfoObject.buyCount;
    window.location.href = buyUrl;
}

//点击立即购买按钮，跳转链接
$(function(){
    $(".buy_ssl_button").click(function(){
        goodsInfoArray = combindSSLParam();
        buySSL(goodsInfoArray[0]);
    })
})

/**
 * 组合SSL参数
 * @return {array} 返回ssl产品参数
 */
function combindSSLParam(){
    let goodsInfoObject = {};
    goodsInfoObject.categoryId = $("#ssl_brand").find(".active").attr('categoryId');
    goodsInfoObject.type = $("#ssl_type").find(".active").attr("id").split('-')[0];
    goodsInfoObject.domainType = $("#ssl_domain_type").find(".active").attr("id");
    goodsInfoObject.domainCount = $("#domain_count").find(".active").attr('data-id');
    goodsInfoObject.buyCount = $(".num").val();
    goodsInfoObject.buyTime = $("#buytime_count").find(".active").attr('data-id');
    goodsInfoArray=[];
    goodsInfoArray.push(goodsInfoObject);//组装价格参数
    return goodsInfoArray;
}

/**
 * 获取当前配置&展示
 */
function getCurrentGoodsInfo() {
    // 当前配置展示
    let goodsConfig = {
        categoryId: "",  //证书品牌
        type: "",        //证书种类
        domainType: "",  //域名类型
        domainCount: "", //域名个数
        buyCount: "",    //购买数量
        buyTime: ""      //购买时长
    };
    goodsConfig.categoryId = $("#ssl_brand").find(".active>p").text();
    goodsConfig.type = $("#ssl_type").find(".active").text();
    goodsConfig.domainType = $("#ssl_domain_type").find(".active>p").text();
    goodsConfig.domainCount = $("#domain_count").find(".active>p").text();
    goodsConfig.buyCount = $(".num").val() + "个";
    goodsConfig.buyTime = $("#buytime_count").find(".active>p").text();
    $(".ssl_brand").text(goodsConfig.categoryId)
    $(".ssl_domain_type").text(goodsConfig.domainType)
    $(".buy_count").text(goodsConfig.buyCount)
    $(".ssl_type").text(goodsConfig.type)
    $(".domain_count").text(goodsConfig.domainCount)
    $(".buy_time").text(goodsConfig.buyTime)
}


