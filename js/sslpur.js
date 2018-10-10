/**
 * 根据 域名类型 获取 域名个数
 * @param  {object} count  单域名，多域名，通配符，代码签名对应的个数
 * @param  {string} domainType 域名类型
 */
function getCount(count,domainType) {
    // console.log("getCount")
    let currentCount = count[domainType];
    $("#domain_count").empty();
    for(let i=0;i<currentCount.length;i++){
        if (i === 0) {
            tempHtml = '<a class="buy_click active" data-id="' + currentCount[i]+'"><p class="text">' + currentCount[i] + '个</p></a>';
        } else {
            tempHtml = '<a class="buy_click" data-id="' + currentCount[i] + '"><p class="text">' + currentCount[i] + '个</p></a>';
        }
        $("#domain_count").append(tempHtml);
    }
    getPrice();
    // 重新绑定事件
    // 证书类型
    $("#ssl_type > a").unbind().click(function () {
        ssltypeClick($(this).attr("id"));
    })
    // 证书类型
    $("#ssl_domain_type > a").unbind().click(function () {
        domaintypeClick($(this).attr("id"));
    })
    // 域名个数
    $("#domain_count > a").unbind().click(function () {
        domaincountClick($(this).attr("data-id"));
    })
    $(".buy_list .buy_list_block .buy_click").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
}

/**
 * 定位到对应配置
 * @param  {array} packInfo 跳转过来的ssl配置信息
 */
function locate(packInfo){
    let packObject = {}
    packInfo.forEach(function(value,key){
        let tempKey = value.split("=")[0];
        let tempValue = value.split("=")[1];
        packObject[tempKey] = tempValue;
        switch (tempKey){
            case "brand":
            // $('#'+tempValue+'').click();
            $('#'+tempValue+'').addClass("active").siblings().removeClass("active");
            break;
            case "type":
            $('#'+packObject.brand+'-'+tempValue+'').click();
            // $('#'+packObject.brand+'-'+tempValue+'').addClass("active").siblings().removeClass("active");
            break;
            case "domaintype":
            $('#'+tempValue+'').click();
            break;
        }
    })
}
/**
 * 获取对应配置对象
 * @param  {array} packInfo 跳转过来的ssl配置信息
 */
function getPackInfoObj(packInfo){
    let packObject = {}
    packInfo.forEach(function(value,key){
        let tempKey = value.split("=")[0];
        let tempValue = value.split("=")[1];
        packObject[tempKey] = tempValue;
    })
    return packObject;
}



/**
 * 初始化ssl信息
 * @param  {string} brand 证书品牌
 */
function init(brand,isFirst) {
    let currentSSLType = ssl[brand];
    let currentDomainType = [];
    $("#ssl_type").empty();
    $("#ssl_domain_type").empty();
    for (let i = 0; i < currentSSLType.length; i++) {
        let tempHtml;
        if (i === 0) {
            tempHtml = '<a class="buy_click active" id="' + brand + '-' + i +'"><p class="text" >'+ currentSSLType[i].name + '</p></a>';
        } else {
            tempHtml = '<a class="buy_click" id="' + brand + '-' + i +'"><p class="text">' + currentSSLType[i].name + '</p></a>';
        }
        $("#ssl_type").append(tempHtml);
        currentDomainType = currentSSLType[0].domainType;
    }
    for (let i = 0; i < currentDomainType.length; i++) {
        let tempHtml;
        if (i === 0) {
            tempHtml = '<a class="buy_click active" id="' + currentDomainType[i].id +'"><p class="text">' + currentDomainType[i].name + '</p></a>';
        } else {
            tempHtml = '<a class="buy_click" id="' + currentDomainType[i].id +'"><p class="text">' + currentDomainType[i].name + '</p></a>';
        }
        $("#ssl_domain_type").append(tempHtml);
    }
    let packInfo = location.search?location.search.split('?')[1].split('&'):'';//url携带的参数信息
    if(!packInfo || !isFirst){
        getCount(count, currentDomainType[0].id);
    }
    if(packInfo && isFirst){
        setTimeout(()=>{
             locate(packInfo);
         },50)
    }
    //证书品牌
    $("#ssl_brand > a").unbind().click(function() {
        let brand = $(this).attr("id");
        init(brand,false);
    })
    //证书种类
    $("#ssl_type > a").unbind().click(function() {
        ssltypeClick($(this).attr("id"));
    })
    //域名类型
    $("#ssl_domain_type > a").unbind().click(function() {
        domaintypeClick($(this).attr("id"));
    })
    //购买时长
    $("#buytime_count > a").unbind().click(function () {
        getPrice();
    })
    $(".buy_list .buy_list_block .buy_click").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
}
/**
 * 点击证书类型
 * @param {string} idInfo 所属证书品牌信息 
 */
function ssltypeClick(idInfo) {
    let brand = idInfo.split('-')[0];
    let index = idInfo.split('-')[1];
    $("#ssl_domain_type").empty();
    let currentDomainType = ssl[brand][index].domainType;
    for (let i = 0; i < currentDomainType.length; i++) {
        let tempHtml;
        if (i === 0) {
            tempHtml = '<a class="buy_click active" id="' + currentDomainType[i].id +'"><p class="text">' + currentDomainType[i].name + '</p></a>';
        } else {
            tempHtml = '<a class="buy_click" id="' + currentDomainType[i].id +'"><p class="text">' + currentDomainType[i].name + '</p></a>';
        }
        $("#ssl_domain_type").append(tempHtml);
    }
    getCount(count, currentDomainType[0].id);
}
/**
 * 点击域名类型
 * @param {string} type 域名类型 
 */
function domaintypeClick(type) {
    getCount(count, type);
}

/**
 * 点击域名个数
 */
function domaincountClick() {
    getPrice();
}
/**
 * 点击购买个数
 */
function buycountClick(){
    //获得文本框对象
    var t = $(".num");
    //初始化数量为1,并失效减
    $('.buy_subtract').attr('disabled', true).addClass("img_grey1");
    //数量增加操作
    $(".buy_add").click(function() {
        // 给获取的val加上绝对值，避免出现负数
        t.val(Math.abs(parseInt(t.val())) + 1);
        getPrice();
        if (parseInt(t.val()) != 1) {
            $('.buy_subtract').attr('disabled', false).removeClass("img_grey1");
        };
        if (parseInt(t.val()) >= 10) {
            $('.buy_add').attr('disabled', true).addClass("img_grey2");
        };
    })
    //数量减少操作
    $(".buy_subtract").click(function() {
        t.val(Math.abs(parseInt(t.val())) - 1);
        getPrice();
        if (parseInt(t.val()) == 1) {
            $('.buy_subtract').attr('disabled', true).addClass("img_grey1");
        };
        if (parseInt(t.val()) < 10) {
            $('.buy_add').attr('disabled', false).removeClass("img_grey2");
        }
    })
}

$(function () {
    let packInfo = location.search?location.search.split('?')[1].split('&'):'';//url携带的参数信息
    if(packInfo){
        let packInfoObj = getPackInfoObj(packInfo);
        init(packInfoObj.brand,true);
    } else {
        init('Symantec',true);
    }
    $(".buy_list .buy_list_block .buy_click").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    //点击购买数量
    buycountClick();
});



