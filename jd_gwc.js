/*
 2 16 * * 2 jd_gwc.js
 https://github.com/FKPYW/dongge
*/
const $ = new Env('加购物车抽奖');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let activityIdList = [
    'C01680B02B82AC8B8E621A584F0DB8FB',
    '536F593C0999D7D048AD091021C9D16B',
    'D72335C81E5DDDF1A09BDB9F604C3BC1',
    'D4D824D46D9224DAAFC2C75F05C26788',
    'ACE4FF2ED7A0DAB1E08280CEC6B6A04B',
    '2F4A0BCF03E4A066BE2DEB09B146CA40',
    '8430E0CB0CF7FEDB15D4DBA242995BC3',
    '2850C9F48618513C2B9727E0C1E7270B',
    'C10C2E6F8F96D5798EBE1714EA3A9956',
    '77A6C7B5C2BC9175521931ADE8E3B2E0',
    '159A90F2A8D750F7D35CE9DE1AFA3307',
    '691E78CFCCF2DA98ED8A9B9188DFB85E',
    '0FBA296839E8609F99B01BC32D96F31A',
    'EE0BB539FFC80E7EA3E964FF7A995B4E',
    '0A46C10886F7C3F1235CF7B719C867D4',
    '4F471950C4C51361CB26B3331ED72809',
    '7BFC5F07A6B28D4519AE588E33DDE39C',
    '89AE5B69198259B06BDEB16151C644EE',
    '2F99BBFE8E2CCD45B6C869ED759A04E3',
    'AF326DC298ED172FDC23CC535CE73AA8',
    'EE269CEA103F43EC5EDC2B18628BD528',
    'A9A7CF12B2AF31EF2EE5924447C33468',
    '42A285C9C5D1534C20978D2E9979DBD6',
    '1B5F8BB5E0418297BA2FB25F49E918BF',
    'D68EF02C1665BD1A94DF731208293E76',
    '42CFBB89E4E1F8684637B2D661AB4704',
    'E221234ED20E53DC7192281D7BE1019A',
    '5E28E1FEB7CB28B4765B5A52ED9C62A6',
    '50B3098774E9B38AE24B1EEC93BB6F98',
    '3BFE4ABC26A127BCF7C83D77F640A9B3',
    '21CDE01EE6E1BE7DBD39F763F192229A',
    '8F9497016D84EE98F56E0F830AC8921B',
    '9E6034F4A60088A97427701990163E27',
    'BF2ACB3369C4AEEE6C9842A874FD7A51',
    '487620FBF323257468FD04017EE8971A',
    'B2C14AAB7335BC43D9362435808CE306',
    'C15FDE1894B91E915CE228390339C91A',
    'C6EFAC21516822A33AD8FEAF0BE13DFF',
    '832EBE63F3F1A79265A7CBF2845D174E',
    '7C7E11EACECC7803E32F6953B4F2F8D3',
    '5E89923278C4AAE248D07EC1BE067AE6',
    '428C0AD729EF849AF5738A5280A75E31',
    '8FF6A69CF93F30BD34AB3F3FF333BD73',
    '08D41B7B7A8F9632A340AD08786506F5',
    'E80C81A8ADB2D7EE692EEC2334D3EDC0',
    'D9E9701E3C8E69C2334164BC18559F21',
    'F627F8C4FD342F77BE4FD498F01CC4D7',
    '0803DA29EB99E9E3DB8C46612A138E7F',
    '4DC40D2D48F8FF5B1046C664E3F6169A',
    '1427219CD330F4527F73B506AD21BB28',
    '49C2337C1382F8C61D0BB407BC8F31DF',
    'A7191FA60B21498D4747F48D86BC8E54',
    '5F53CEBB0FA88990760660ABA7DD2E5B',
    '419F2D51AB18659945B5A63CDB7FF912',
    'CA672BC1B0756D62B9EBE54607B1667E',
    'DF1DDD97639697439AA6C4E2FBCF7A6E',
    '3EE5FF0F06B593B2C27385016277FF60',
    'A61079C4B07BD4BFDB8C4ACC5C3CC6CB',
    '737646C9DCBCB867A041A86C90420986',
    '94E6508E1CA1FD968194D0F48A74F720',
    '51881C1D5D0E66BFFC23E4BC5BB4A184',
    '47847768F75C91932E314B40EACAF0FC',
    '60DD49090385A1A6C591E53A3C6D871B',
    '2B1F0D4BED2428F91111AD259819C36C',
    '888BA24E643DB95D83242AD122237CA9',
    '64497490861CE4A861F8E23B685EAB62',
    '4AFA050A83B2E67AD6FB4DE75B98065C',
    'B5910E8C0EBA3605D7E437D1DBBF06F9',
    '7BE625A6BC5F290AD66EFC28E7F8E54C',
    '3315075D0E7815034A4D5ED831D0FEA8',
    'A8D4F16E7F14C9EE93C7D5309FE47A9A',
    '55B32C4D416DB5758ABBAE06AD2D39DB',
    '86D72BB52CF4BC4916B53393C7C44C08',
    'A1808796905EFB4D3D8ACABC7B2F8CA2',
    'f46601936b40496b97a85de2b5ab97eb',
    '6BCC205B25270572E4A32C186CF64FD3',
    '4F37014201BFDC5990703BF3EC7F75EB',
    '782114FD4AAF2AC1CE2EB304F0594407',
    '09E4730770FD2E15F9C60365F7FEA6E4',
    'F9B8049642804B1F44191069127BDE02',
    '61B1E1B1BB07FB5E5ECA78AA74E15449',
    '4F2FCF413D78C84557AE23C15C970930',
    '12EAA416E9149E10909CD7E3C0BB6F34',
    'D44B13ECCEE19F03D4BAEF9E8B24BC49',
    '0D4984246EDC192C69FF7FA63ECD3A3E',
    'FF5AA3D3839E7898546C4D50FED878FD',
    '2C7846818F0216300CB6BEC38C04E7B4',
    '8AB01333DF4B6FF21A575366DF903118',
    '12464E3333D6922A4FFE124C7AD482C3',
    'C0016520E8BB9D2538933A00819F3CC0',
    '4D540618E59A78ED602D99CFE85F3B75',
    '5ED00E457EAE57F71FE01579F0B40831',
    '4ED3FE1C9D3A74E53C5DA81ED5BCBC5F',
    '29BCA86F092760D560B8551938BA2490',
    'E97744BD2A82F277FF28A524796FD0BA',
    '65C244AE5E863C74171EA356C570DF19',
    'E0BDA3494C2B73A1B8B19EF68BE03BED',
    'A2278DA060D3C419ABFEC4D1F78D4DCA',
    'E53744C140FA778C1BEE4857B83EDE26',
    '60C498A09B1B6738A788FB1F0A2C230D',
    '748D9841A7E776B65CBD1860C6E9E738',
    '5a6b770e30fc48b6aad3aa84c83f44d0',
    'FF45CCF13555923D891040BD0ABAF093',
    'EF39DD14994863B96D690DB2583CFCAB',
    'F6117F205D59999EEF701017AF22BA37',
    'A2DBF6F052891BF5A5A304E1F5E0FDBD',
    '0C711ED52FA74D2277AC841C6889E2D9',
    'D4B06E1E78B2CEDBE66988B1D55D6668',
    '501105E4C2FAB2A9FF760A554063E769',
    'B063F6A702EC3348B32A0A1E9597E6B6',
    'D879F954059F29F253499B20D99AE4BE',
    '53378560A6BC7E91EB143DE59183F67F',
    'C745848FA4229E40650DFB665926FF52',
    'BAF9B6778B9A8781D8C757A95F8727E4',
    'DF3273004EC7C0B85B42E0610D67A2B6',
    '4ABF8E15EA11D5C98981E6D82271873C',
    '6566612CCFFE90580FACFB021F013776',
    '9F3C4342F76E45421D2DCBFEF92BEF3D',
    '403DD6DBB9A174620E31671B5B622864',
    '3285678EF5DE6F69958C5F2AA094A230',
    '095AD6AC7B0D3CCE718E0FF70C3D8987',
    'C1B7F96174F149837C901A9F751E4FAB',
    '476418E00DD752CF4AA993A6935B948C',
    '3936FE5AB36786145CB7D8183CFA9EDC',
    'F2861C062C4DD7298C579DC5BF919514',
    'DCA992427270AB797A5C733C7C28B46E',
    '4C34492F3809E036AFCBA4E20877FF7E',
    '571326FCBFAF6491B43E369927140E13',
    '52C2A8DFFEC2B9E67E6196256937190D',
    'C3F9BBD6203A2643DE395380EE65B81A',
    '40C0478A4FB39B37BF8B0BC48B72B307',
    '90DBDCF221EB4DD1398173570BA43D79',
    '656D446DFD39129FD9FDF756B665FAF8',
    '8C948D47F16152C967E9D3762EA94A17',
    'C56EB03890D49C47260E3EE7567500E7',
    'F5F2CC1499F5CED67F6ADE1BD55708BC',
    '8D22BBA7AD04FCCF7E5CE9AEC6623510',
    '665C21158E3B02960DF73BF673E9D4A1',
    '586F58BDC83BD12857F2A4263581C2DD',
    '6BCE755655BF493F03477DAA733A3287',
    'E7C494ACA90A9DF4D41756DC4CC220C5',
    '402185927DFC35163AC4F6CB287842B9',
    '20BA9F84056EC832A976C28D72B5D9F5',
    '5BD7D5B7E35254364FA9D940015A415B',
    '5CEA5DF2F0E5683CA46B265425C074C2',
    '30035831BD9C92DC836E9E1B7378A023',
    '303A0BA7F57B4E1FC942675975ED0151',
    'AA226E2B1AFB5B4868A77F0126CFBDAF',
    '7E271F2C1F9C27D5B2C42BB564333F6E',
    '76ECBA03AA731AD6D03247C2D191FF2E',
    '050EE63114420B1939083A12FBD3C23D',
    '1928ADD5B7268ABE39B6443BE6D20A67',
    '834F65597B5FBCD4CB2363804B47491E',
    '523AA5A8756FB6AE2FBA1DA7A95CB737',
    'B86C53A180FB940AFFF1572AE96F42FB',
    'EE6DE772604455E297CE876A5946F8C9',
    '69560686231B457C0303A85229E5B5EF',
    '6E8BAF85794808C80C94C15C36EE7A1A',
    '88542B779EE72DB2B74890597DB4D373',
    '4A5FF15FE2305E9396B7BA7CDB2DAFDD',
    '218EDC57B012478F19CE8003D412A899',
    'BEE739D7FA69F512765C5156AB6A635A',
    'A37570368A30D465DAA28989AE8C3FC5',
    '89EF58A5D05864547B3EA38A46D6EA18',
    '55A0321A8F43B11B147C89A3CD0DA6BB',
    '5B6B4ED4959F38BEFE8E89FFDC735C94',
    'BD03C7C11BF51E86A777F171C4EAD527',
    '89B4E92C6E3997F0430548795F6435CC',
    'C2424C1B064CDFDDF7DB10CB19EC66D7',
    '474695AA9E0D6EDB8C26D5B0BFF032D8',
    '8CD92C1A52EF9BCB019FFCBF2A328733',
    '4141D8360BA13408B64511572FF23918',
    '532F0D7047802129CB77F32F88ABBABD',
    'BC1E3A48EA8E208B21B41856AA605569',
    'C460BAD88D6D984EA97B9F68C35993A0',
    '20E4870C0B0BDE430FB45E7DD5A6DFB1',
    '04F5D14FEFE9933D847D15FF87977989',
    'FD63C688066799B5298DB8D992A1ECC2',
    'EF858E42DC3D954D665D5B39285B0D2E',
    'D818AAB64354199189FDAB59C4B0C892',
    '7F309C1BC5CA08E0FDD78D8A6A0207DE',
    'FC2D2AA957FBB4B360C0802C948FD4BF',
    '5068544AD61AA472FAF59D171D762474',
    '65F12E65F33F1846F45CFC5843C947EC',
    'FF94641EC5ADD27DC632F3BDA8A69166',
    '241D5497E7E287F407D27E90AEC860D6',
    '51FEAA205F7A2C2B4D7BDE70F617AF18',
    'BF6367C4C247D055D66419845DF6EE23',
    '9A80E139DC411B3CB72EB5E27FC29632',
    '011BAF6E366D356E7694B0999CE3DE03',
    'A51BB67CA65830B5909D3ACF48CB0774',
    '7884B94075A8EBA2AA520E6705D70CB1',
    '35404129AB860E4EA01510481349DB16',
    '8568917506B251EEBAB7010267A05FBF',
    '214AC4293DAE8D4D68862E2EDC707F8B',
    '47A97233E0C79C1A220FAA6504D65FE6',
    '2A8794EC8DA4659DDDA0DF0E1A2AF4AF',
    'EE0F607C8873B8971790EAA7974A3993',
    'B8521E27675E21717A39B138CAF50C06',
    'E34B00E6AD891EF4E1E8385FDBC6E401',
    'D548E25D778217A1A5D6CB19C2111A17',
    '4ECDABEC56B43F2D9569427A1F7DBBA0',
    '3B517D2C504039B311FDCF756E3D7852',
    'E9AF521EE370878F8DB90976B203CBCD',
    '49BEF6277C3C78C202728EF2116EB0E4',
    'E12DFC576EBBD23434D9251728BBB5CA',
    'FFEDBA2474BB523E9578577B340C4BFF',
    '3311F0E84A880CBC8A0E5F35F6440189',
    'C259F5B0A88688570C51639E4D94C42D',
    '70DD294B69A449175FC9532F4836B7F1',
    'A1E0F96C1D9DB38AE87202E13CE1FD1F',
    'CA95907B74C2EE1DCAF2DE01E583CBB4',
    'B629F43D0A582C504E192C72FF378831',
    '8DB69C36F1564759BAFB74053231966F',
    'EC884B7914C0115A4DB6ABDBD85B90E2',
    '24ABC7F1D5360C407F685C0BB47FF134',
    'FF4F129DCC784213D60828C5FC58E8EF',
    '8b682e1b3bb94ae58615acdea95310e0',
    'E42751CEDE3F226EA34C2D83F0E35FF0',
    'A6DB38A197C503A5E9F1DA994680CA39',
    '38AC31F5B8E70321385A46ABDB624198',
    '6F4CF3F4EA9C52D1DA88EEC661962ADA',
    'E5B2DAB8FF34364A2B85677741F7C72E',
    '47C1EA91BBBCBB4B0C064E00A6EA0F0B',
    '136B240B105650B2A64AC9210DD90485',
    '2E0FF4CEE80D7E2ED4B426C3F2DE05D4',
    '96E31ACD1B06F1F1CEE4D5B74A526C3D',
    '017ADCC3E1B9C1D6C21ED9BD3C71B5E3',
    '81145517E76EE3AC3B33ED88EC35066B',
    'C48451EBC6AB974347A2AAEA7F2984CB',
    '2E6CEE2C697FBE3A08ED4663C52F6552',
    'BD69C162ED4132D02AA9121CEE09F96F',
    '0BC8DD418E64D11837AA95714040E5A3',
    '6C9031587BD9E8A2D054F14CCCF2BC7A',
    '795A0CC9AE2ACE5885693FADA764247D',
    'C79FFE7A51BA9D9BD4E043A8E2D1B244',
    '338790D25F8D59195B65EF3E2A1E4CD6',
    '03AABB2E488684617A7E6F772FB16E98',
    '6701681195F7DD3B38ECB2FA03C54A85',
    'C9743EE025F4D1C6EBA18FEE1F64D79D',
    'C4ADE9C21603C087ADE297694AE01EBD',
    'D08613B3004DE07601036C93CDEA98DF',
    'B81EBB1048E214B59F8624F75223CCCE',
    '409282AD1073D64377B4A2B852F9D130',
    '0FCE1975D7A168F5BE2DE89BF2AA784D',
    'BC1DF69256EA314A344D284179FF59F4',
    '377112B8F4A9FB4F83D9FCE798325F09',
    '9E2F2B62044E1AC059180A38BE06507D',
    'C19201D1BBFABECF9184E970DF985F62',
    '97455509FC1A68264DE6B26C81050B1E',
    '6F1B7196CFDBFE0A537426071142E46D',
    'B0CDAD8C420967F817DB43FC7BD81C28',
    '48A165EE5710A5FEC57924F596BBDEC8',
    '16F2C8581749EF9560FC93268642BE11',
    '6944A51C99E42ECEDE9342EC38CA72AF',
    '66CF54C9CE9E5C160A4829B6365FD4D1',
    '7C54152DC667122C4B12E46399927418',
    'E575D5FAA90E6544FBB53BDFF2EA152D',
    '332A5C04F0943ABF6E1599A858398F3A',
    'F2C551E5A6744AD9AE0B4AF9951EF548',
    '04C1BFD099B0D647DCA2B2B6C5007DC7',
    '1479B95DECE6CBB0138317E0645F0AD9',
    'FF84AF5198F429649B914218834A0347',
    '704AA4F24C835D385D58D577D1A1DAD6',
    '9D403EAE6AA5DF6D4975D54C76BACA89',
    '4E24C6945AC8E96560C4CF1E5052EA0A',
    'B685405E9A4EA2A6280EA3CC03A74F89',
    '8D0F38412FF025C89777297F234495E9',
    '8C6790A6D69D124D4BA2582D0E548273',
    '2C5DC415376BC37B394A556FD03C8DE0',
    '66B56C8A0B09535489CC1ED12F2F9EAB',
    '148034A75DA33DADA598C0374B7249C1',
    'C2474C3BBEE31ACBF932DAE76A13D060',
    '7263D8D7D6F498FF1348A7D1C3E20614',
    '9733D22956A8FA2F5DDC4F584CCFD4DD',
    '13126645fcb2477fa1090a94cb7f3ca2',
    'C0943B853925636493C1CDCABCDFD4A5',
    '1D20149579A180C42E303D913575AA41',
    'eaf0e5313fa1484db90c3fc467af33e5',
    'B5866282287CA2B4D085ECDDE7A70D97',
    '021A2EFF290781D2A8E789F1BB8A6251',
    '310FC65FD88107E6EDB8EE0EA3FB1053',
    '82D08D141755B51A62B6D91A3F977CF7',
    'FC937CCFACF4A03AB5A05E9D85467E43',

]
let lz_cookie = {}

if (process.env.ACTIVITY_ID && process.env.ACTIVITY_ID != "") {
    activityId = process.env.ACTIVITY_ID;
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
let removeSize = process.env.JD_CART_REMOVESIZE || 20; // 运行一次取消多全部已关注的商品。数字0表示不取关任何商品
let isRemoveAll = process.env.JD_CART_REMOVEALL || true;    //是否清空，如果为false，则上面设置了多少就只删除多少条
$.keywords = process.env.JD_CART_KEYWORDS || []
$.keywordsNum = 0;
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    activityIdList = await getActivityIdList('https://raw.githubusercontent.com/FKPYW/dongge/master/code/wxCollectionActivity.json')
    for(let a in activityIdList){
        activityId = activityIdList[a];
        console.log("开起第 "+ a +" 个活动，活动id："+activityId)
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i]
                originCookie = cookiesArr[i]
                newCookie = ''
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                await checkCookie();
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                if (!$.isLogin) {
                    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                    if ($.isNode()) {
                        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    }
                    continue
                }
                authorCodeList = [
                    'b5d9535918264a4f92fff9d314d7db81',
                ]
                $.bean = 0;
                $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
                $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                $.authorCode = authorCodeList[random(0, authorCodeList.length)]
                $.authorNum = `${random(1000000, 9999999)}`
                $.activityId = activityId
                $.activityUrl = `https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/${$.authorNum}?activityId=${$.activityId}&shareUuid=${encodeURIComponent($.authorCode)}&adsource=null&sid=&un_area=`
                $.drawInfoName = false
                $.getPrize = null;
                await addCart();
                if($.drawInfoName === false || $.getPrize === null){
                    break
                } else if($.getPrize != null && !$.getPrize.includes("京豆")){
                    break
                }
                await $.wait(3000)
                await requireConfig();
                do {
                    await getCart_xh();
                    $.keywordsNum = 0
                    if($.beforeRemove !== "0"){
                        await cartFilter_xh(venderCart);
                        if(parseInt($.beforeRemove) !== $.keywordsNum) await removeCart();
                        else {
                            console.log('由于购物车内的商品均包含关键字，本次执行将不删除购物车数据')
                            break;
                        }
                    } else break;
                } while(isRemoveAll && $.keywordsNum !== $.beforeRemove)
                if ($.bean > 0) {
                    message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`
                }
            }
        }
        await $.wait(3000)
    }
    if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '', `\n`);
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


async function addCart() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK()
    await getToken();
    await task('customer/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', `venderId=${$.venderId}&code=6&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=tg_xuanFuTuBiao`, 1);
            // await task('wxActionCommon/getUserInfo', `pin=${encodeURIComponent($.secretPin)}`, 1)
            await task('activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            if ($.activityContent.drawInfo.name.includes("京豆")) {
                $.log("-> 加入购物车")
                for(let i in $.activityContent.cpvos){
                    await $.wait(3000)
                    await task('addCart', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&productId=${$.activityContent.cpvos[i].skuId}`)
                }
                $.log("-> 抽奖")
                await $.wait(3000)
                await task('getPrize', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            } else {
                $.log("未能成功获取到活动信息")
            }
        } else {
            $.log("没有成功获取到用户信息")
        }
    } else {
        $.log("没有成功获取到用户鉴权信息")
    }
}

function task(function_id, body, isCommon = 0) {
    return new Promise(resolve => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {

                    if (data) {
                        data = JSON.parse(data);
                        if (resp['headers']['set-cookie']) {
                            cookie = `${originCookie};`
                            for (let sk of resp['headers']['set-cookie']) {
                                lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                            }
                            for (const vo of Object.keys(lz_cookie)) {
                                cookie += vo + '=' + lz_cookie[vo] + ';'
                            }
                        }
                        if (data.result) {
                            switch (function_id) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    $.activityShopId = data.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = data.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes("京豆")
                                    break;
                                case 'addCart':
                                    console.log(data.data)
                                    break
                                case 'getPrize':
                                    console.log(data.data.name)
                                    $.getPrize = data.data.name;
                                    await notify.sendNotify($.name, data.data.name, '', `\n`);
                                    break
                                default:
                                    $.log(JSON.stringify(data))
                                    break;
                            }
                        }
                    } else {
                        $.log("京东没有返回数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzkj-isv.isvjcloud.com/${function_id}` : `https://lzkj-isv.isvjcloud.com/wxCollectionActivity/${function_id}`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.comm',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie
        },
        body: body

    }
}

function getMyPing() {
    let opt = {
        url: `https://lzkj-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.com',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie,
        },
        body: `userId=${$.activityShopId}&token=${$.token}&fromType=APP&riskType=1`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                    if (data) {
                        data = JSON.parse(data)
                        if (data.result) {
                            $.log(`你好：${data.data.nickname}`)
                            $.pin = data.data.nickname;
                            $.secretPin = data.data.secretPin;
                        } else {
                            $.log(data.errorMessage)
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }

        })
    })
}
function getFirstLZCK() {
    return new Promise(resolve => {
        $.get({ url: $.activityUrl }, (err, resp, data) => {
            try {
                if (err) {
                    console.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function getToken() {
    let opt = {
        url: `https://api.m.jd.com/client.action?functionId=isvObfuscator`,
        headers: {
            Host: 'api.m.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
            Connection: 'keep-alive',
            Cookie: cookie,
            'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: `body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === "0") {
                            $.token = data.token
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function random(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}
function requireConfig(){
    return new Promise(resolve => {
        if($.isNode() && process.env.JD_CART){
            if(process.env.JD_CART_KEYWORDS){
                $.keywords = process.env.JD_CART_KEYWORDS.split('@')
            }
        }
        resolve()
    })
}
function getCart_xh(){
    console.log('正在获取购物车数据...')
    return new Promise((resolve) => {
        const option = {
            url: 'https://p.m.jd.com/cart/cart.action?fromnav=1&sceneval=2',
            headers: {
                "Cookie": cookie,
                "User-Agent": "jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)",
            },
        }
        $.get(option, async(err, resp, data) => {
            try{
                data = JSON.parse(getSubstr(data, "window.cartData = ", "window._PFM_TIMING"));
                $.areaId = data.areaId;   // locationId的传值
                $.traceId = data.traceId; // traceid的传值
                venderCart = data.cart.venderCart;
                postBody = 'pingouchannel=0&commlist=';
                $.beforeRemove = data.cartJson.num
                console.log(`获取到购物车数据 ${$.beforeRemove} 条`)
            } catch(e){
                $.logErr(e, resp);
            } finally{
                resolve(data);
            }
        });
    })
}
function cartFilter_xh(cartData){
    console.log("正在整理数据...")
    let pid;
    $.pushed = 0
    for(let cartJson of cartData){
        if($.pushed === removeSize) break;
        for(let sortedItem of cartJson.sortedItems){
            if($.pushed === removeSize) break;
            pid = typeof (sortedItem.polyItem.promotion) !== "undefined" ? sortedItem.polyItem.promotion.pid : ""
            for(let product of sortedItem.polyItem.products){
                if($.pushed === removeSize) break;
                let mainSkuName = product.mainSku.name
                $.isKeyword = false
                $.isPush = true
                for(let keyword of $.keywords){
                    if(mainSkuName.indexOf(keyword) !== -1){
                        $.keywordsNum += 1
                        $.isPush = false
                        $.keyword = keyword;
                        break;
                    } else $.isPush = true
                }
                if($.isPush){
                    let skuUuid = product.skuUuid;
                    let mainSkuId = product.mainSku.id
                    if(pid === "") postBody += `${mainSkuId},,1,${mainSkuId},1,,0,skuUuid:${skuUuid}@@useUuid:0$`
                    else postBody += `${mainSkuId},,1,${mainSkuId},11,${pid},0,skuUuid:${skuUuid}@@useUuid:0$`
                    $.pushed += 1;
                } else {
                    console.log(`\n${mainSkuName}`)
                    console.log(`商品已被过滤，原因：包含关键字 ${$.keyword}`)
                    $.isKeyword = true
                }
            }
        }
    }
    postBody += `&type=0&checked=0&locationid=${$.areaId}&templete=1&reg=1&scene=0&version=20190418&traceid=${$.traceId}&tabMenuType=1&sceneval=2`
}
function removeCart(){
    console.log('正在删除购物车数据...')
    return new Promise((resolve) => {
        const option = {
            url: 'https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax',
            body: postBody,
            headers: {
                "Cookie": cookie,
                "User-Agent": "jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)",
                "referer": "https://p.m.jd.com/",
                "origin": "https://p.m.jd.com/"
            },
        }
        $.post(option, async(err, resp, data) => {
            try{
                data = JSON.parse(data);
                $.afterRemove = data.cartJson.num
                if($.afterRemove < $.beforeRemove){
                    console.log(`删除成功，当前购物车剩余数据 ${$.afterRemove} 条\n`)
                    $.beforeRemove = $.afterRemove
                } else {
                    console.log('删除失败')
                    console.log(data.errMsg)
                    isRemoveAll = false;
                }
            } catch(e){
                $.logErr(e, resp);
            } finally{
                resolve(data);
            }
        });
    })
}
function getSubstr(str, leftStr, rightStr){
    let left = str.indexOf(leftStr);
    let right = str.indexOf(rightStr, left);
    if(left < 0 || right < left) return '';
    return str.substring(left + leftStr.length, right);
}
function getActivityIdList(url) {
    return new Promise(resolve => {
        const options = {
            url: `${url}?${new Date()}`, "timeout": 10000, headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                if (data) data = JSON.parse(data)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}
function checkCookie() {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            "Host": "me-api.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br",
        }
    };
    return new Promise(resolve => {
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.retcode === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data.retcode === "0" && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
