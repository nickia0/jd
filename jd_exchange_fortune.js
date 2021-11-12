let common = require("./function/common");
let $ = new common.env('京喜财富岛红包兑换');
let min = 2,
    help = $.config[$.filename(__filename)] || Math.min(min, $.config.JdMain) || min;
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdpingou;iPhone;4.11.0;13.7;a3b4e844090b28d5c38e7529af8115172079be4d;network/wifi;model/iPhone8,1;appBuild/100591;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/568;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'referer': 'https://st.jingxi.com/fortune_island/index2.html',
    }
});
$.readme = `
0 * * * * task ${$.runfile}
exprot ${$.runfile}=2  #如需增加兑换账号,在这边修改人数
如果有红包,会显示正在兑换
`
eval(common.eval.mainEval($));
async function prepare() {
    $.thread = 1
}
async function main(id) {
    let token = jxAlgo.token(id.user)
    let url = `https://m.jingxi.com/jxbfd/user/ExchangeState?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=1628157961921&ptag=7155.9.47&dwType=2&_stk=_cfd_t%2CbizCode%2CdwEnv%2CdwType%2Cptag%2Csource%2CstrZone&_ste=1`
    let dec = await jxAlgo.dec(url);
    dec.cookie = id.cookie
    await $.curl(dec, 'ExchangeState')
    console.log($.ExchangeState.iRet)
    for (let i of $.ExchangeState.hongbao) {
        if (i.dwState == 0) {
            console.log("正在兑换:", i.strPrizeName);
            url = `https://m.jingxi.com/jxbfd/user/ExchangePrize?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=1628157961563&ptag=7155.9.47&dwType=3&dwLvl=${i.dwLvl}&ddwPaperMoney=${i.ddwPaperMoney}&strPoolName=${$.ExchangeState.hongbaopool}&strPgtimestamp=${token.strPgtimestamp}&strPhoneID=${token.strPhoneID}&strPgUUNum=${token.strPgUUNum}&_stk=_cfd_t%2CbizCode%2CddwPaperMoney%2CdwEnv%2CdwLvl%2CdwType%2Cptag%2Csource%2CstrPgUUNum%2CstrPgtimestamp%2CstrPhoneID%2CstrPoolName%2CstrZone&_ste=1`
            dec = await jxAlgo.dec(url)
            dec.cookie = id.cookie
            await $.curl(dec)
            console.log($.source)
            if ($.source.iRet == 0) {
                $.notices(`成功兑换:${i.strPrizeName}`, id.user)
            }
            await $.wait(1000)
        }
    }
}
async function work(url, source = '') {
    let dec = await jxAlgo.dec(url)
    let html = await $.curl(dec, source)
}