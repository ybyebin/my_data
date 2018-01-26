$(function() {

    var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
    adGame.changeLanguage(currentLang, languageType);
    var ws = document.documentElement.clientHeight;

    var ww = ws * 750 / 1334;
    document.documentElement.style.fontSize = ww / 15 + "px";
    $('.sec').css('width', ww + 'px');
    $('.progress-bar').addClass('animal');

    setTimeout(function() {
        console.log('123')
        adGame.secHide();
        adGame.enemyCome();

    }, 2000)



});

var languageType = {
    // 汉语
    zhCN: {
        'textdownload': '下载游戏',
        'textplayagaingame': '再试一次',
        'creatownCountry': '想要创建属于自己的王国吗？',
        'pDialogue1': '报！前方发现敌方',
        'pDialogue21': '弓箭手方阵',
        'pDialogue22': '重骑兵方阵',
        'pDialogue23': '长枪兵方阵',
        'pDialogue3': '请国王招募士兵，准备迎敌',
        'textzhaomu': '招 募',
        'textfight': '迎 战',
        'textExplationZm': '招募', //小的
        'textNameGJ': '弓箭手',
        'textExplationGJ': '使用弓箭手对抗长枪兵会有奇效',
        'textNameCQ': '长枪兵',
        'textExplationCQ': '使用长枪兵对抗重骑兵会有奇效',
        'textNameZQ': '重骑兵',
        'textExplationZQ': '使用重骑兵对抗弓箭手会有奇效',
        'pTalk1': '犯我疆土者,',
        'pTalk2': '虽远必诛！',
        'pTalk3': '消灭入侵者！',
        'textSuccess': '成功',
        'textDefault': '失败',
        'pTalkWin': '我们的英雄凯旋了',
        'pTalkDefault1': '撤退',
        'pTalkDefault2': '君子报仇，十年不晚！',
    },
    // 繁体
    'zhTW': {
        'textdownload': '立即下載',
        'textplayagaingame': '再试一次',
        'creatownCountry': '你想創造屬於自己的帝國嗎？',
        'pDialogue1': '報告領主！前方有',
        'pDialogue21': '百萬射手來襲',
        'pDialogue22': '重騎兵來襲',
        'pDialogue23': '長矛兵來襲',
        'pDialogue3': '請號召士兵，準備迎戰！',
        'textzhaomu': '招  募',
        'textfight': '戰 爭',
        'textExplationZm': '招募', //小的
        'textNameGJ': '弓箭手',
        'textExplationGJ': '弓箭手對長矛兵有更高的攻擊力',
        'textNameCQ': '長矛兵',
        'textExplationCQ': '長矛兵對重騎兵有更高的攻擊力',
        'textNameZQ': '重騎兵',
        'textExplationZQ': '重騎兵對弓箭手有更高的攻擊力',
        'pTalk1': '所有傷及我百姓的人,',
        'pTalk2': '都要受到應有的懲罰,',
        'pTalk3': '無一例外。',
        'textSuccess': '勝利',
        'textDefault': '戰敗',
        'pTalkWin': '英雄凱旋而歸！',
        'pTalkDefault1': '開始撤退,',
        'pTalkDefault2': '君子報仇十年不晚！',

    },
    // 韩语
    ko: {
        'textdownload': '다운로드',
        'textplayagaingame': '다시 플레이하세요',
        'creatownCountry': '나만의 왕국을 만들고 싶으세요?',
        'pDialogue1': '군주님! 전방을 확인하세요!',
        'pDialogue21': '궁병이 다가오고 있습니다! ',
        'pDialogue22': '중기병이 다가오고 있습니다!',
        'pDialogue23': '창병이 다가오고 있습니다! ',
        'pDialogue3': '부대를 준비하세요! ',
        'textzhaomu': '모집',
        'textfight': '전장',
        'textExplationZm': '모집', //小的
        'textNameGJ': '궁수',
        'textExplationGJ': '궁수는 창병에 추가 피해를 줍니다',
        'textNameCQ': '창병',
        'textExplationCQ': '창병은 중갑 기병에 추가 피해를 줍니다',
        'textNameZQ': '중갑 기병',
        'textExplationZQ': '중갑 기병은 궁수에 추가 피해를 줍니다',
        'pTalk1': '내 영토를 침범하는 자,',
        'pTalk2': '그 누구든 처단할 것입니다!',
        'pTalk3': '',
        'textSuccess': '승리',
        'textDefault': '패배',
        'pTalkWin': '히어로들이 돌아왔습니다!',
        'pTalkDefault1': '후퇴하세요!,',
        'pTalkDefault2': '다음 기회를 도모하세요!',
    },
    // 日语
    ja: {
        'textdownload': '今すぐダウンロード',
        'textplayagaingame': 'リトライ',
        'creatownCountry': 'あなたの帝国をつくってみないか？',
        'pDialogue1': '国王殿！何万もの',
        'pDialogue21': '獵兵部隊がこっちに',
        'pDialogue22': '重騎兵部隊',
        'pDialogue23': 'マスケット銃兵部隊',
        'pDialogue3': 'がこっちに向かっています！',
        'textzhaomu': '招 集',
        'textfight': '戦争',
        'textExplationZm': '招集', //小的
        'textNameGJ': '獵兵',
        'textExplationGJ': '獵兵は、マスケット銃兵に対して高いダメージを発揮します',
        'textNameCQ': 'マスケット銃兵',
        'textExplationCQ': 'マスケット銃兵は、重騎兵に対して高いダメージを発揮します',
        'textNameZQ': '重騎兵',
        'textExplationZQ': '重騎兵は、獵兵に対して高いダメージを発揮します',
        'pTalk1': 'やられたらやり返す。',
        'pTalk2': '倍返しだ！',
        'pTalk3': '',
        'textSuccess': '勝利',
        'textDefault': '敗北',
        'pTalkWin': '英雄たちの凱旋だ！',
        'pTalkDefault1': '撤退だ！',
        'pTalkDefault2': '後日再戦しよう！',
    },
    // 英语
    enUS: {
        'textdownload': 'Download',
        'textplayagaingame': 'Play Again',
        'creatownCountry': 'Want to build your ',
        'creatownCountry2': 'own kingdom?',
        'pDialogue1': 'Your highness!Thousands of',
        'pDialogue21': 'enemy Archers',
        'pDialogue22': 'enemy Heavy Cavalries',
        'pDialogue23': 'enemy Spearmen',
        'pDialogue31': 'are heading towards us!', //弓箭兵
        'pDialogue32': 'are heading towards us!', //重骑兵
        'pDialogue33': 'are heading towards us!', //长枪兵
        'textzhaomu': 'Recruit',
        'textfight': 'War',
        'textExplationZm': 'Recruit', //小的
        'textNameGJ': 'Archer',
        'textExplationGJ': 'Archer deals extra damage to Spearman',
        'textNameCQ': 'Spearman',
        'textExplationCQ': 'Spearman deals extra damage to Heavy Cavalry',
        'textNameZQ': 'Heavy Cavalry',
        'textExplationZQ': 'Heavy Cavalry deals extra damage to Archer',
        'pTalk1': 'Anyone who harms our people',
        'pTalk2': 'will be punished,',
        'pTalk3': ' wherever they are!',
        'textSuccess': 'Victory',
        'textDefault': 'Defeat',
        'pTalkWin': 'Our heroes are back!',
        'pTalkDefault1': 'Retreat!',
        'pTalkDefault2': 'Fight them another day!',
    }
}

var adGame = {
        //敌军来袭
        enemyCome: function() {
            var random_num = TheRandomNumber(1, 3);
            adGame.randomEnemy = random_num;
            // adGame.typeArr.push(random_num);
            $('.sec-2-' + random_num).show();
            $('.page-1-enemy-appear').addClass('appear');
            setTimeout(function() {
                $('.div-zhaomu').show();
            }, 1000)
        },
        secHide: function() {
            $('.sec,.div-zhaomu,.div-fight').hide();
        },
        divBingHide: function() {
            $('.div-bing').hide();
            $('.div-explation-text').hide();
        },
        divBingShow: function(shows) {
            $(shows.bingClass).show();
            $(shows.TextClass).show();
        },
        fightResult: function(type) {
            $('.sec').hide();
            if (type === 'success') {
                $('.sec-success').show();
            } else {
                $('.sec-fail').show();
            }
            setTimeout(function() {
                $('.sec').hide();
                $('.sec-last').show();
                if (adGame.clickNum === 3) {
                    $('.div-have-a-btn').hide();
                    $('.div-have-a-btn2').show();
                }
            }, 1500)
        },
        randomEnemy: 0, //来袭兵种 1弓箭兵 2 重骑兵 3长枪兵
        changeArmy: 0, // 选择兵种 1弓箭兵 2 重骑兵 3长枪兵
        warResult: 0, // 战争结果  3,4,8
        clickNum: 1, //游戏次数,
        typeArr: [],
        // 修改语言-具体
        publicChange: function(language) {
            // 顶部下载+结束下载
            $('.textdownload').text(language.textdownload);
            // 再玩一次
            $('.text-playagain-game').text(language.textplayagaingame);
            // 想要创建属于自己的国家吗
            $('.creat-own-city1').text(language.creatownCountry);
            //报告领主
            $('.p-dialogue-1').text(language.pDialogue1);
            // 三种来袭兵种
            $('.p-dialogue-2-1').text(language.pDialogue21);
            $('.p-dialogue-2-2').text(language.pDialogue22);
            $('.p-dialogue-2-3').text(language.pDialogue23);
            // 招募士兵准备迎敌
            $('.p-dialogue-3').text(language.pDialogue3);

            // 招募+ 大的按钮
            $('.text-zhaomu').text(language.textzhaomu);
            // 迎战
            $('.text-fight').text(language.textfight);

            // 招募-小按钮
            $('.text-explation-zm').text(language.textExplationZm);
            // 选择三种兵种
            $('.text-name-gj').text(language.textNameGJ);
            $('.text-name-cq').text(language.textNameCQ);
            $('.text-name-zq').text(language.textNameZQ);
            // 三种兵种的解释
            $('.text-explation-gj').text(language.textExplationGJ);
            $('.text-explation-cq').text(language.textExplationCQ);
            $('.text-explation-zq').text(language.textExplationZQ);

            // 背景口号  犯我疆土者。。。。
            $('.p-talk-1').text(language.pTalk1);
            $('.p-talk-2').text(language.pTalk2);
            $('.p-talk-3').text(language.pTalk3);

            // 成功  失败
            $('.text-success').text(language.textSuccess);
            $('.text-default').text(language.textDefault);

            // 背景口号 凯旋
            $('.p-talk-win').text(language.pTalkWin); //凯旋

            // 背景口号 失败 
            $('.p-talk-default-1').text(language.pTalkDefault1);
            $('.p-talk-default-2').text(language.pTalkDefault2);
        },
        // 判断语言
        changeLanguage: function(type, language) {
            switch (type) {
                case 'zh-CN':
                    var languages = language.zhCN;
                    adGame.publicChange(languages);
                    break;
                case 'zh-TW':
                    var languages = language.zhTW;
                    adGame.publicChange(languages);

                    break;
                case 'ko':

                    var languages = language.ko;
                    adGame.publicChange(languages);
                    $('.a-download').addClass('a-download-ko');
                    $('.textdownload').addClass('textdownload-us');

                    $('.p-dialogue-2-1').addClass('p-dialogue-2-ko');
                    $('.p-dialogue-2-2').addClass('p-dialogue-2-ko');
                    $('.p-dialogue-2-3').addClass('p-dialogue-2-ko');
                    $('.p-dialogue-3').addClass('p-dialogue-3-ko');
                    $('.text-explation').addClass('text-explation-ko'); //适配

                    $('.p-talk-1').addClass('p-talk-1-ko');
                    $('.p-talk-2').addClass('p-talk-2-ko');


                    break;
                case 'ko-KR':

                    var languages = language.ko;
                    adGame.publicChange(languages);
                    $('.a-download').addClass('a-download-ko');
                    $('.textdownload').addClass('textdownload-us');

                    $('.p-dialogue-2-1').addClass('p-dialogue-2-ko');
                    $('.p-dialogue-2-2').addClass('p-dialogue-2-ko');
                    $('.p-dialogue-2-3').addClass('p-dialogue-2-ko');
                    $('.p-dialogue-3').addClass('p-dialogue-3-ko');
                    $('.text-explation').addClass('text-explation-ko'); //适配

                    $('.p-talk-1').addClass('p-talk-1-ko');
                    $('.p-talk-2').addClass('p-talk-2-ko');


                    break;
                case 'ja':
                    var languages = language.ja;
                    adGame.publicChange(languages);
                    $('.a-download').addClass('a-download-ja');
                    $('.textdownload').addClass('textdownload-ja');
                    $('.text-explation').addClass('text-explation-ja'); //适配
                    $('.p-talk-1').addClass('p-talk-1-ja');
                    $('.p-talk-2').addClass('p-talk-2-ja');

                    $('.creat-own-city1').addClass('creat-own-city-ja');
                    break;
                case 'ja-JP':
                    var languages = language.ja;
                    adGame.publicChange(languages);
                    $('.a-download').addClass('a-download-ja');
                    $('.textdownload').addClass('textdownload-ja');
                    $('.text-explation').addClass('text-explation-ja'); //适配
                    $('.p-talk-1').addClass('p-talk-1-ja');
                    $('.p-talk-2').addClass('p-talk-2-ja');
                    $('.creat-own-city1').addClass('creat-own-city-ja');


                    break;
                case 'en-US':
                    var languages = language.enUS;
                    adGame.publicChange(languages);

                    // 想要创建属于自己的国家吗
                    $('.creat-own-city1').addClass('creat-own-city1-us');
                    $('.creat-own-city2').text(languages.creatownCountry2).addClass('creat-own-city2-us');



                    $('.a-download').addClass('a-download-us');
                    $('.textdownload').addClass('textdownload-us');
                    $('.text-explation').addClass('text-explation-us'); //适配
                    // $('.p-dialogue').addClass('p-dialogue-page1-us');

                    $('.p-dialogue-3-1').text(language.enUS.pDialogue31);
                    $('.p-dialogue-3-2').text(language.enUS.pDialogue32);
                    $('.p-dialogue-3-3').text(language.enUS.pDialogue33);
                    $('.p-talk-1').addClass('p-dialogue-us');
                    $('.p-talk-2').addClass('p-dialogue-us');;
                    $('.p-talk-3').addClass('p-dialogue-us');;

                    break;
                default:
                    var languages = language.enUS;
                    adGame.publicChange(languages);
                    $('.a-download').addClass('a-download-us');
                    $('.textdownload').addClass('textdownload-us');
                    $('.text-explation').addClass('text-explation-us'); //适配

                    $('.p-dialogue-3-1').text(language.enUS.pDialogue31);
                    $('.p-dialogue-3-2').text(language.enUS.pDialogue32);
                    $('.p-dialogue-3-3').text(language.enUS.pDialogue33);
                    $('.p-talk-1').addClass('p-dialogue-us');
                    $('.p-talk-2').addClass('p-dialogue-us');;
                    $('.p-talk-3').addClass('p-dialogue-us');;

                    break;
            }

        }
    }
    // 敌军来袭-招募
$('.div-zhaomu').on('click', function(ev) {　　　
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    console.log(target.nodeName.toLowerCase())
    if (target.nodeName.toLowerCase() == 'span') {　　　
        adGame.secHide();
        $('.sec-3').show();
        adGame.divBingHide();
        // 判断敌军-(随机)显示相应的克制兵种　　

        var type = TheRandomNumber(1, 3);　
        switch (type) {
            case 1: //弓箭兵
                var shows = {
                    bingClass: '.div-bing-zq',
                    TextClass: '.div-explation-text-zq'
                }
                adGame.divBingShow(shows);
                adGame.changeArmy = 2;
                break;
            case 2: //重骑兵
                var shows = {
                    bingClass: '.div-bing-cq',
                    TextClass: '.div-explation-text-cq'
                }
                adGame.divBingShow(shows);
                adGame.changeArmy = 3;
                break;
            case 3: //长枪兵
                var shows = {
                    bingClass: '.div-bing-gj',
                    TextClass: '.div-explation-text-gj'
                }
                adGame.divBingShow(shows);
                adGame.changeArmy = 1;
                break;
            default:
                break;
        }　　　　　　　　
    }
});
// 选择兵种
$('.div-bing-small img').on('click', function() {
    if ($(this).hasClass('select')) {
        console.log('不用切换')
    } else {
        switch ($(this).data('type')) {
            case 'zqb':
                adGame.divBingHide();
                var shows = {
                    bingClass: '.div-bing-zq',
                    TextClass: '.div-explation-text-zq'
                }
                adGame.divBingShow(shows);
                adGame.changeArmy = 2;
                break;
            case 'cqb':
                adGame.divBingHide();
                var shows = {
                    bingClass: '.div-bing-cq',
                    TextClass: '.div-explation-text-cq'
                }
                adGame.divBingShow(shows);
                adGame.changeArmy = 3;
                break;
            case 'gjb':
                adGame.divBingHide();
                var shows = {
                    bingClass: '.div-bing-gj',
                    TextClass: '.div-explation-text-gj'
                }
                adGame.divBingShow(shows);
                adGame.changeArmy = 1;
                break;
            default:
                break;
        }
    }
});
// 选择兵种-招募
$('.text-explation-zm').on('click', function() {
    $('.page-1-enemy-my').removeClass('invasions');
    var types = 0;
    var armyNum = adGame.randomEnemy;
    switch (adGame.changeArmy) {
        case 1:
            if (armyNum === 1) {
                types = 1;
            } else if (armyNum === 2) {
                types = 2;
            } else {
                types = 3;
            }
            break;
        case 2:
            if (armyNum === 1) {
                types = 4;
            } else if (armyNum === 2) {
                types = 5;
            } else {
                types = 6;
            }
            break;
        case 3:
            if (armyNum === 1) {
                types = 7;
            } else if (armyNum === 2) {
                types = 8;
            } else {
                types = 9;
            }
            break;
        default:
            break;

    }
    adGame.warResult = types;
    adGame.secHide();
    $('.sec-4-' + types).show();
    setTimeout(function() {
        $('.div-fight').show();
    }, 1000)


});

// 迎战
$('.text-fight').on('click', function() {
    console.log(adGame.warResult)

    $('.page-1-enemy-my').addClass('invasions');
    setTimeout(function() {
        switch (adGame.warResult) {
            case 3:
            case 4:
            case 8:
                adGame.fightResult('success');
                break;
            default:
                adGame.fightResult('fail');
                break;
        }
    }, 1000)

});

// 再玩一次
$('.a-play-again').on('click', function() {
    console.log('点击')
    adGame.clickNum += 1;
    adGame.secHide();
    adGame.enemyCome();

});
// 随机数
function TheRandomNumber(n, m) {
    return Math.round(Math.random() * (m - n) + n)
}