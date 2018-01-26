$(function() {

    var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
    // adGame.changeLanguage(currentLang, languageType);

    adGame.changeLanguage('en-US', languageType);
    // DefaultLanguage = ''
    var ws = document.documentElement.clientHeight;

    var ww = ws * 750 / 1334;
    document.documentElement.style.fontSize = ww / 15 + "px";
    console.log(ws);
    $('.sec').css('width', ww + 'px');
    $('.progress-bar').addClass('animal');

    setTimeout(function() {
        adGame.changeSec(function() {
            $('.sec-2').show();
            adGame.sec1BodyClick();

        });

    }, 2000)


    // adGame.stepOne();

});


window.onresize = function() {
    var ws = document.documentElement.clientHeight;

    var ww = ws * 750 / 1334;
    document.documentElement.style.fontSize = ww / 15 + "px";
    $('.sec').css('width', ww + 'px');
}

var DefaultLanguage = 'enUS';

var languageType = {
    // 汉语
    'zhCN': {

    },
    // 繁体
    'zhTW': {

    },
    // 韩语
    'ko': {

    },
    // 日语
    'ja': {

    },
    // 英语
    'enUS': {
        'sec1': {
            'p1': 'You have three troops.',
            'p2': 'Please arrange them to crash the ',
            'p3': 'enemy castle!'
        },

        // 引导
        'sec3YinDaoP1': {
            'sec3P1': 'Now put Knights in the',
            'sec3P2': 'array.',
            'sec3P3': ''
        },
        'sec3YinDaoP2': {
            'sec3P1': 'Good! Then footmen.',
            'sec3P2': '',
            'sec3P3': ''
        },
        'sec3YinDaoP3': {
            'sec3P1': 'Finally, Archers!',
            'sec3P2': '',
            'sec3P3': ''
        },
        'sec3YinDaoP4': {
            'sec3P1': 'Now let us crush them!',
            'sec3P2': '',
            'sec3P3': ''
        },

        // 攻击
        'fight': 'Attack',
        // 胜利失败
        'result': {
            'win': 'Score',
            'fail': 'LOSE'
        },
        'sec4': {
            'win': {
                'p1': 'Congratulations on winning!',
                'p2': 'More challenges await.',
                'p3': 'Play now for free!'
            },
            'lose': {
                'p1': 'Want to get revenge',
                'p2': 'in the game? ',
                'p3': 'Play now for free!'
            }

        },
        // 按钮
        btnlangeage: {
            'playAgain': 'Try Again',
            'download': 'Download'
        }

    }
}
var img = {
    'qb': {
        'color': 'images/qb-color.png',
        'noColor': 'images/qb.png'
    },
    'bub': {
        'color': 'images/bub-color.png',
        'noColor': 'images/bub.png'
    },
    'gjs': {
        'color': 'images/gjs-color.png',
        'noColor': 'images/gjs.png'
    }
}

var adGame = {
    clickType: 'qb', //点击顺序   ['骑兵 qb','步兵bub','弓箭兵gjs']  ,
    clickNum: 1,
    alrearyHaveBing: ['sec3-army1-finger', 'sec3-army2-finger', 'sec3-army3-finger'],
    sec3P1: $('.sec3-p1'),
    sec3P2: $('.sec3-p2'),
    sec3P3: $('.sec3-p3'),
    changeSec: function(fun) {
        $('.sec').hide();
        fun();
    },

    // 修改语言-具体
    publicChange: function(language) {

        $('.sec-2-p1').text(language.sec1.p1);
        $('.sec-2-p2').text(language.sec1.p2);
        $('.sec-2-p3').text(language.sec1.p3);



        $('.fight-btn-span').text(language.fight);

        $('.p-again').text(language.btnlangeage.playAgain);
        $('.p-down').text(language.btnlangeage.download);
        $('.textdownload').text(language.btnlangeage.download);

    },
    // 判断语言
    changeLanguage: function(type, language) {
        var languages = '';
        switch (type) {
            case 'zh-CN':
                DefaultLanguage = 'zhCN';
                languages = language.zhCN;

                break;
            case 'zh-TW':
                DefaultLanguage = 'zhTW';
                languages = language.zhTW;
                break;
            case 'ko':
                break;
            case 'ko-KR':
                break;
            case 'ja':
                break;
            case 'ja-JP':
                break;
            case 'en-US':
                DefaultLanguage = 'enUS'
                languages = language.enUS;
                break;
            default:
                break;
        }

        adGame.publicChange(languages);

    },

    // sec1 全局点击
    sec1BodyClick: function() {
        $('.sec-2').on('click', function() {
            adGame.stepMethod1();
        });
    },

    // step1
    stepOne: function() {

        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP1.sec3P3);
        $('.sec3-Bing-finger').show();
        $('.sec3-layer-finger').hide();
        $('.qb-bing').on('click', function() {


            $('.sec3-Bing-finger, .sec-3-layer').hide();
            $('.army3-finger').show();
            $('.qb-bing').unbind();
            $('.set-bing-click1').on('click', function() {
                var _this = $(this);
                _this.data('value', '1');
                _this.data('type', 'sec4-qb-animation');
                _this.data('spantype', 'sec4-qb');


                var arr = adGame.alrearyHaveBing;
                arr.splice(arr.indexOf(_this.data('finger')), 1);

                var ids = '#' + _this.data('id');
                var $qb = $('.qb-animate'); //移动的步兵
                var _showqb = $(ids + ' span'); //摆放的步兵
                /**
                 * 
                 * @param {*} dic 
                 * dic.strclass 兵移动的动画
                 * dic.time 定时器时间
                 */
                var oneSetData = function(dic) {
                    $qb.show().addClass(dic.strclass);
                    setTimeout(function() {
                        $qb.hide().removeClass(dic.strclass);
                        _showqb.addClass('sec3-qb');
                        adGame.stepTwo();
                    }, dic.time)
                };
                var dic = {};
                switch (_this.prop('id')) {
                    case 'div1':
                        dic = {
                            strclass: 'qb-animate-up1',
                            time: 900
                        }
                        break;
                    case 'div2':
                        dic = {
                            strclass: 'qb-animate-up2',
                            time: 800
                        }
                        break;
                    case 'div3':
                        dic = {
                            strclass: 'qb-animate-up3',
                            time: 700
                        }
                        break;
                }
                oneSetData(dic);
            });
        });
    },
    // step 2
    stepTwo: function() {
        $('.set-bing-click1').unbind();
        $('.army3-finger').hide();

        // 引导  layer
        $('.sec-3-layer').show();
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP2.sec3P3);

        $('.sec3-Bing-finger').show().addClass('sec3-Bing-finger-step2');

        $('.qb-bing').attr('src', img.qb.noColor);
        $('.bub-bing').attr('src', img.bub.color);
        $('.bub-bing').on('click', function() {
            $('.sec3-Bing-finger, .sec-3-layer').hide();

            adGame.alrearyHaveBing.forEach(function(element) {
                $('.' + element).show();
            });

            $('.bub-bing').unbind();
            $('.set-bing-click1').on('click', function() {







                var _this = $(this);
                console.log(_this.data('value'))
                if (_this.data('value') == '0') {
                    _this.data('value', '1');
                    _this.data('type', 'sec4-bub-animation');
                    _this.data('spantype', 'sec4-bub');
                    var ids = '#' + _this.data('id');

                    var arr = adGame.alrearyHaveBing;
                    arr.splice(arr.indexOf(_this.data('finger')), 1);

                    var $bub = $('.bub-animate'); //移动的步兵
                    var _showbub = $(ids + ' span'); //摆放的步兵
                    /**
                     * 
                     * @param {*} dic 
                     * dic.strclass 兵移动的动画
                     * dic.time 定时器时间
                     */
                    var twoSetData = function(dic) {
                        $bub.show().addClass(dic.strclass);
                        setTimeout(function() {
                            $bub.hide().removeClass(dic.strclass);
                            _showbub.addClass('sec3-bub');
                            adGame.stepThree();
                        }, dic.time)
                    };
                    var dic = {};
                    switch (_this.prop('id')) {
                        case 'div1':
                            dic = {
                                strclass: 'bub-animate-up1',
                                time: 1000
                            }
                            break;
                        case 'div2':
                            dic = {
                                strclass: 'bub-animate-up2',
                                time: 600
                            }
                            break;
                        case 'div3':
                            dic = {
                                strclass: 'bub-animate-up3',
                                time: 600
                            }
                            break;
                    }

                    twoSetData(dic);
                }

            });
        });

    },
    // step 3
    stepThree: function() {
        $('.set-bing-click1').unbind();
        $('.army3-finger').hide();

        // 引导  layer
        $('.sec-3-layer').show();
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP3.sec3P3);

        $('.sec3-Bing-finger').show().addClass('sec3-Bing-finger-step3');

        $('.bub-bing').attr('src', img.bub.noColor);
        $('.gjs-bing').attr('src', img.gjs.color);
        $('.gjs-bing').on('click', function() {
            $('.sec3-Bing-finger, .sec-3-layer').hide();

            var clas = adGame.alrearyHaveBing[0];
            var ids = '#' + $('.' + clas).data('id');
            var $gjs = $('.gjs-animate'); //移动的弓箭兵
            var _showgjs = $(ids + ' span');



            /**
             * 
             * @param {*} dic 
             * dic.obj1  要展示兵的  div
             * dic.obj2 移动的弓箭兵
             * dic.obj3 要展示兵 的  span
             * dic.strclass  兵移动的动画
             * dic.time   定时器时间
             *  
             */
            var setData = function(dic) {
                dic.obj1.data('spantype', 'sec4-gjs');
                dic.obj1.data('type', 'sec4-gjs-animation');
                dic.obj2.show().addClass(dic.strclass);
                setTimeout(function() {
                    dic.obj2.hide().removeClass(dic.strclass);
                    dic.obj3.addClass('sec3-gjs');
                    adGame.stepfour();
                }, dic.time)

            }



            console.log(clas)
            var dic = {};
            switch (clas) {
                case 'sec3-army1-finger':
                    dic = {
                        obj1: $('#div1'),
                        obj2: $gjs,
                        obj3: _showgjs,
                        strclass: 'gjs-animate-up1',
                        time: 1000
                    }
                    break;
                case 'sec3-army2-finger':

                    dic = {
                        obj1: $('#div2'),
                        obj2: $gjs,
                        obj3: _showgjs,
                        strclass: 'gjs-animate-up2',
                        time: 800
                    }
                    break;
                case 'sec3-army3-finger':
                    dic = {
                        obj1: $('#div3'),
                        obj2: $gjs,
                        obj3: _showgjs,
                        strclass: 'gjs-animate-up3',
                        time: 400
                    }

                    break;
                default:
                    break;
            }
            setData(dic);
            $('.gjs-bing').unbind();

        });

    },
    stepfour: function() {
        $('.sec-3-layer, .sec3-layer-finger').show();
        adGame.sec3P1.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P1);
        adGame.sec3P2.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P2);
        adGame.sec3P3.text(languageType[DefaultLanguage].sec3YinDaoP4.sec3P3);

        $('.sec-3-layer').on('click', function() {
            adGame.stepMethod3();
        });
    },
    stepFive: function() {
        $('.sec').hide();
        $('.sec-4').show();
        $('.sec-4-yup').addClass('y-up-hide');
        $('.sec-4-ydown').addClass('y-dowm-hide');


        var sec4BADiv1 = $('.sec4-bing-army-div1'); //第一排
        var sec4BADiv2 = $('.sec4-bing-army-div2'); //第二排
        var sec4BADiv3 = $('.sec4-bing-army-div3'); //第三排

        var sec4BADiv1Span = $('.sec4-bing-army-div1 span'); //第一排 兵
        var sec4BADiv2Span = $('.sec4-bing-army-div2 span'); //第二排 兵
        var sec4BADiv3Span = $('.sec4-bing-army-div3 span'); //第三排 兵

        var sec4BADiv1SodierFirst = $('.sec4-bing-army-div1 .soldier-li-first'); //第一排 第一个兵血量
        var sec4BADiv1SodierSecond = $('.sec4-bing-army-div1 .soldier-li-second'); //第一排 第二个兵血量
        var sec4BADiv1SodierThird = $('.sec4-bing-army-div1 .soldier-li-third'); // 第一排 第三个兵血量


        var sec4BADiv2SodierFirst = $('.sec4-bing-army-div2 .soldier-li-first'); //第二排 第一个兵血量
        var sec4BADiv2SodierSecond = $('.sec4-bing-army-div2 .soldier-li-second'); //第二排 第二个兵血量
        var sec4BADiv2SodierThird = $('.sec4-bing-army-div2 .soldier-li-third'); // 第二排 第三个兵血量



        var sec4BADiv3SodierFirst = $('.sec4-bing-army-div3 .soldier-li-first'); //第三排 第一个兵血量
        var sec4BADiv3SodierSecond = $('.sec4-bing-army-div3 .soldier-li-second'); //第三排 第二个兵血量
        var sec4BADiv3SodierThird = $('.sec4-bing-army-div3 .soldier-li-third'); // 第三排 第三个兵血量


        // 兵种判断条件
        var qb = 'sec4-qb';
        var bub = 'sec4-bub';
        var gjs = 'sec4-gjs';


        var span_arr = [];
        var arr_anima = [];
        $('.set-bing-click1').each(function(index, ele) {
            console.log($(ele).data('type'));
            span_arr.push($(ele).data('spantype'));
            arr_anima.push($(ele).data('type'));
        });
        console.log(JSON.stringify(span_arr, null, 2))
        console.log(JSON.stringify(arr_anima, null, 2))


        sec4BADiv1Span.addClass(span_arr[0]);
        sec4BADiv2Span.addClass(span_arr[1]);
        sec4BADiv3Span.addClass(span_arr[2]);





        setTimeout(function() {
            // $('.fight-btn-div').show();
            $('.fight-btn-div').show().on('click', function() {


                sec4BADiv1.addClass('invasions-div1');
                sec4BADiv2.addClass('invasions-div2');
                sec4BADiv3.addClass('invasions-div3');

                sec4BADiv1Span.addClass(arr_anima[0]);
                sec4BADiv2Span.addClass(arr_anima[1]);
                sec4BADiv3Span.addClass(arr_anima[2]);

                $(this).hide();
                var type = 0;


                if (span_arr[0] === qb && span_arr[1] === bub && span_arr[2] === gjs) {
                    type = 1;
                }
                if (span_arr[0] === qb && span_arr[1] === gjs && span_arr[2] === bub) {
                    type = 2;
                }

                if (span_arr[0] === bub && span_arr[1] === gjs && span_arr[2] === qb) {
                    type = 3;
                }
                if (span_arr[0] === bub && span_arr[1] === qb && span_arr[2] === gjs) {
                    type = 4
                }

                if (span_arr[0] === gjs && span_arr[1] === bub && span_arr[2] === qb) {
                    type = 5;
                }

                if (span_arr[0] === gjs && span_arr[1] === qb && span_arr[2] === bub) {
                    type = 6;
                }

                switch (type) {
                    case 1:
                        console.log('骑兵-步兵-弓箭兵');

                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood8');
                            sec4BADiv1SodierSecond.addClass('blood8');
                            sec4BADiv1SodierThird.addClass('blood8');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {
                                // 第二阶段 血量状态
                                $('.monster-div1').hide(); //怪一 消失

                                sec4BADiv1.addClass('invasions-div11');
                                sec4BADiv2.addClass('invasions-div22');
                                sec4BADiv3.addClass('invasions-div32');


                                setTimeout(function() {

                                    // 第一排血量 
                                    sec4BADiv1SodierFirst.addClass('blood4');
                                    sec4BADiv1SodierSecond.addClass('blood4');
                                    sec4BADiv1SodierThird.addClass('blood4');

                                    // 第二排兵
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood6');
                                    sec4BADiv2SodierThird.addClass('blood6');

                                    $('.monster-div2,.monster-div3').addClass('blood8'); //怪二 怪三 血量


                                    setTimeout(function() {


                                        // 第二排兵血量
                                        sec4BADiv2SodierFirst.addClass('blood4');
                                        sec4BADiv2SodierSecond.addClass('blood4');
                                        sec4BADiv2SodierThird.addClass('blood4');
                                        $('.monster-div2,.monster-div3').addClass('blood2'); //怪二 怪三 血量

                                        setTimeout(function() {
                                            //  第一排血量 
                                            sec4BADiv1SodierFirst.addClass('blood2');
                                            sec4BADiv1SodierSecond.addClass('blood2');
                                            sec4BADiv1SodierThird.addClass('blood2');
                                            // 第二排血量
                                            sec4BADiv2SodierFirst.addClass('blood2');
                                            sec4BADiv2SodierSecond.addClass('blood2');
                                            sec4BADiv2SodierThird.addClass('blood2');
                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三 血量


                                            setTimeout(function() {
                                                adGame.resultWin(1);
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 1500);
                                            }, 1000)
                                        }, 1200)

                                    }, 1000);
                                }, 500);

                            }, 400);
                        }, 1300);

                        break;
                    case 2:


                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood6');
                            sec4BADiv1SodierSecond.addClass('blood8');
                            sec4BADiv1SodierThird.addClass('blood6');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood6');
                            sec4BADiv2SodierSecond.addClass('blood6');
                            sec4BADiv2SodierThird.addClass('blood6');

                            setTimeout(function() {
                                // 第二阶段 血量状态
                                $('.monster-div1').hide(); //怪一 消失

                                sec4BADiv1.addClass('invasions-div11');
                                sec4BADiv2.addClass('invasions-div22');
                                sec4BADiv3.addClass('invasions-div32');




                                // setTimeout(function() {
                                // setTimeout(function() {
                                //     sec4BADiv1SodierSecond.css('visibility', 'hidden');
                                // }, 300);

                                setTimeout(function() {

                                    // 第一排血量 
                                    sec4BADiv1SodierFirst.addClass('blood2');
                                    sec4BADiv1SodierSecond.addClass('blood6');
                                    sec4BADiv1SodierThird.addClass('blood2');

                                    // 第二排兵
                                    sec4BADiv2SodierFirst.addClass('blood4');
                                    sec4BADiv2SodierSecond.addClass('blood4');
                                    sec4BADiv2SodierThird.addClass('blood4');


                                    $('.monster-div2,.monster-div3').addClass('blood8'); //怪二 怪三 血量


                                    setTimeout(function() {
                                        // 第一排兵血量
                                        sec4BADiv1SodierFirst.css('visibility', 'hidden');
                                        sec4BADiv1SodierThird.css('visibility', 'hidden');
                                        sec4BADiv1SodierSecond.addClass('blood4');
                                        $('.monster-div2,.monster-div3').addClass('blood4'); //怪二 怪三 血量
                                        setTimeout(function() {

                                            // 第一排兵血量
                                            sec4BADiv1SodierSecond.addClass('blood2');
                                            // 第二排血量
                                            sec4BADiv2SodierFirst.addClass('blood2');
                                            sec4BADiv2SodierSecond.addClass('blood2');
                                            sec4BADiv2SodierThird.addClass('blood2');
                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三 

                                            setTimeout(function() {
                                                adGame.resultWin(2);
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 1500)
                                            }, 1000);
                                        }, 1000)
                                    }, 1000);
                                }, 800);

                            }, 400);
                        }, 1300);


                        break;
                    case 3:
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood6');
                            sec4BADiv1SodierSecond.addClass('blood8');
                            sec4BADiv1SodierThird.addClass('blood6');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood6');
                            sec4BADiv2SodierSecond.addClass('blood6');
                            sec4BADiv2SodierThird.addClass('blood6');

                            setTimeout(function() {
                                // 第二阶段 血量状态
                                $('.monster-div1').hide(); //怪一 消失

                                sec4BADiv1.addClass('invasions-div11');
                                sec4BADiv2.addClass('invasions-div22');
                                sec4BADiv3.addClass('invasions-div32');




                                // setTimeout(function() {
                                // setTimeout(function() {
                                //     sec4BADiv1SodierSecond.css('visibility', 'hidden');
                                // }, 300);

                                setTimeout(function() {

                                    // 第一排血量 
                                    sec4BADiv1SodierFirst.addClass('blood2');
                                    sec4BADiv1SodierSecond.addClass('blood6');
                                    sec4BADiv1SodierThird.addClass('blood2');

                                    // 第二排兵
                                    sec4BADiv2SodierFirst.addClass('blood4');
                                    sec4BADiv2SodierSecond.addClass('blood4');
                                    sec4BADiv2SodierThird.addClass('blood4');


                                    $('.monster-div2,.monster-div3').addClass('blood8'); //怪二 怪三 血量


                                    setTimeout(function() {
                                        // 第一排兵血量
                                        sec4BADiv1SodierFirst.css('visibility', 'hidden');
                                        sec4BADiv1SodierThird.css('visibility', 'hidden');
                                        sec4BADiv1SodierSecond.addClass('blood4');
                                        $('.monster-div2,.monster-div3').addClass('blood4'); //怪二 怪三 血量
                                        setTimeout(function() {

                                            // 第一排兵血量
                                            sec4BADiv1SodierSecond.addClass('blood2');
                                            // 第二排血量
                                            sec4BADiv2SodierFirst.addClass('blood2');
                                            sec4BADiv2SodierSecond.addClass('blood2');
                                            sec4BADiv2SodierThird.addClass('blood2');
                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三 

                                            setTimeout(function() {
                                                adGame.resultWin(3);
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 1500)
                                            }, 1000);
                                        }, 1000)
                                    }, 1000);
                                }, 800);

                            }, 400);
                        }, 1300);

                        break;
                    case 4:
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');
                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood8');
                            sec4BADiv1SodierSecond.addClass('blood6');
                            sec4BADiv1SodierThird.addClass('blood8');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {
                                // 第二阶段 血量状态
                                $('.monster-div1').hide(); //怪一 消失

                                sec4BADiv1.addClass('invasions-div11');
                                sec4BADiv2.addClass('invasions-div22');
                                sec4BADiv3.addClass('invasions-div32');




                                // setTimeout(function() {
                                // setTimeout(function() {
                                //     sec4BADiv1SodierSecond.css('visibility', 'hidden');
                                // }, 300);

                                setTimeout(function() {

                                    // 第一排血量 
                                    sec4BADiv1SodierFirst.addClass('blood6');
                                    sec4BADiv1SodierSecond.addClass('blood2');
                                    sec4BADiv1SodierThird.addClass('blood6');

                                    // 第二排兵
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood6');
                                    sec4BADiv2SodierThird.addClass('blood6');


                                    // $('.monster-div2,.monster-div3').addClass('blood8'); //怪二 怪三 血量


                                    setTimeout(function() {
                                        // 第一排兵血量
                                        sec4BADiv1SodierFirst.addClass('blood4');
                                        sec4BADiv1SodierThird.addClass('blood4');
                                        sec4BADiv1SodierSecond.css('visibility', 'hidden');
                                        $('.monster-div2,.monster-div3').addClass('blood6 blood8'); //怪二 怪三 血量
                                        sec4BADiv2SodierFirst.addClass('blood4');
                                        sec4BADiv2SodierSecond.addClass('blood4');
                                        sec4BADiv2SodierThird.addClass('blood4');
                                        setTimeout(function() {

                                            // 第一排兵血量
                                            sec4BADiv1SodierSecond.addClass('blood2');
                                            // 第二排血量

                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三 

                                            setTimeout(function() {
                                                adGame.resultWin(4);
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 1500)
                                            }, 1000);
                                        }, 1000)
                                    }, 1000);
                                }, 800);

                            }, 400);
                        }, 1300);
                        break;
                    case 5:
                        console.log("弓箭手-步兵-骑兵")
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');

                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood4');
                            sec4BADiv1SodierSecond.addClass('blood4');
                            sec4BADiv1SodierThird.addClass('blood4');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {
                                $('.monster-div1').hide(); //怪一 消失
                                sec4BADiv1.hide();

                                sec4BADiv2.addClass('invasions-div24');
                                sec4BADiv3.addClass('invasions-div35');

                                setTimeout(function() {
                                    // 第二排兵
                                    // 怪
                                    // $('.monster-div1').addClass('blood4');
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood6');
                                    sec4BADiv2SodierThird.addClass('blood6');

                                    sec4BADiv3SodierFirst.addClass('blood8');
                                    sec4BADiv3SodierSecond.addClass('blood8');
                                    sec4BADiv3SodierThird.addClass('blood8');


                                    setTimeout(function() {
                                        sec4BADiv2SodierFirst.addClass('blood4');
                                        sec4BADiv2SodierSecond.addClass('blood2');
                                        sec4BADiv2SodierThird.addClass('blood4');
                                        $('.monster-div2,.monster-div3').addClass('blood6 blood8');
                                        setTimeout(function() {

                                            sec4BADiv2SodierFirst.addClass('blood2');
                                            sec4BADiv2SodierSecond.css('visibility', 'hidden');
                                            sec4BADiv2SodierThird.addClass('blood2');
                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三
                                            setTimeout(function() {
                                                adGame.resultWin(5);
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 1500)
                                            }, 1000)
                                        }, 700)
                                    }, 800);
                                }, 1000)

                            }, 1000);
                        }, 1300);
                        break;
                    case 6:
                        setTimeout(function() {
                            // 第一阶段 接触  血量状态

                            // 怪
                            $('.monster-div1').addClass('blood4');

                            // 第一排兵
                            sec4BADiv1SodierFirst.addClass('blood4');
                            sec4BADiv1SodierSecond.addClass('blood4');
                            sec4BADiv1SodierThird.addClass('blood4');

                            // 第二排兵
                            sec4BADiv2SodierFirst.addClass('blood8');
                            sec4BADiv2SodierSecond.addClass('blood8');
                            sec4BADiv2SodierThird.addClass('blood8');

                            setTimeout(function() {
                                $('.monster-div1').hide(); //怪一 消失
                                sec4BADiv1.hide();

                                sec4BADiv2.addClass('invasions-div24');
                                sec4BADiv3.addClass('invasions-div35');

                                setTimeout(function() {
                                    // 第二排兵
                                    // 怪
                                    // $('.monster-div1').addClass('blood4');
                                    sec4BADiv2SodierFirst.addClass('blood6');
                                    sec4BADiv2SodierSecond.addClass('blood6');
                                    sec4BADiv2SodierThird.addClass('blood6');

                                    sec4BADiv3SodierFirst.addClass('blood8');
                                    sec4BADiv3SodierSecond.addClass('blood8');
                                    sec4BADiv3SodierThird.addClass('blood8');


                                    setTimeout(function() {
                                        sec4BADiv2SodierFirst.addClass('blood4');
                                        sec4BADiv2SodierSecond.addClass('blood2');
                                        sec4BADiv2SodierThird.addClass('blood4');
                                        $('.monster-div2,.monster-div3').addClass('blood6 blood8');
                                        setTimeout(function() {

                                            sec4BADiv2SodierFirst.addClass('blood2');
                                            sec4BADiv2SodierSecond.css('visibility', 'hidden');
                                            sec4BADiv2SodierThird.addClass('blood2');
                                            $('.monster-div2,.monster-div3').hide(); //怪二 怪三
                                            setTimeout(function() {
                                                adGame.resultWin(6);
                                                setTimeout(function() {
                                                    adGame.stepMethod4();
                                                }, 1500)
                                            }, 1000)
                                        }, 700)
                                    }, 800);
                                }, 1000)

                            }, 1000);
                        }, 1300);
                        break;
                    default:
                        break;
                }
            });

        }, 1000)
    },

    stepMethod1: function() {
        $('.yun-up').addClass('y-up-appear');
        $('.yun-down').addClass('y-dowm-appear');

        setTimeout(function() {
            adGame.changeSec(function() {
                $('.sec-3').show();
                $('.sec-3-yup').addClass('y-up-hide');
                $('.sec-3-ydown').addClass('y-dowm-hide');
                $(".sec-2").unbind();
                // adGame.sec2BodyClick();
                adGame.stepOne();
            });
        }, 2000)
    },

    stepMethod3: function() {

        $('.yun-up-3').addClass('y-up-appear');
        $('.yun-down-3').addClass('y-dowm-appear');
        $('.sec-3-layer').unbind();
        setTimeout(function() {
            adGame.stepFive();
        }, 2000)
    },

    // 胜利
    resultWin: function(type) {
        $('.bg-model,.result-text').show();
        $('.rusult-img').show();
        $('.result-span').text(languageType[DefaultLanguage].result.win);

        var dic = languageType[DefaultLanguage].sec4.win;
        $('.sec4-p1').text(dic.p1);
        $('.sec4-p2').text(dic.p2);
        $('.sec4-p3').text(dic.p3);

        switch (type) {
            case 1:
                $('.reselt-score').text('100');
                break;
            case 2:
            case 3:
                $('.reselt-score').text('80');
                break;

            case 4:
                $('.reselt-score').text('90');
                break;
            case 5:
            case 6:
                $('.reselt-score').text('60');
                break;



        }




    },


    stepMethod4: function() {
        $('.fight-btn-div').unbind();
        $('.rusult-img,.result-text').hide();
        $('.sec-tips').show();
        if (adGame.clickNum === 3) {
            $('.sec-tips-1').hide();
            $('.sec-tips-3').show();
        } else {
            $('.sec-tips-1').show();
        }

        $('.sec-4').unbind();
    }
}

// 再玩一次
function playAgain() {
    adGame.clickNum += 1;
    $('body').unbind();

    $('.yun-up').removeClass('y-up-appear');
    $('.yun-down').removeClass('y-dowm-appear');
    $('.sec-3-yup').removeClass('y-up-hide');
    $('.sec-3-ydown').removeClass('y-dowm-hide');
    $('.yun-up-3').removeClass('y-up-appear');
    $('.yun-down-3').removeClass('y-dowm-appear');

    $('.qb-bing').attr('src', 'images/qb-color.png');
    $('.bub-bing').attr('src', 'images/bub.png');
    $('.gjs-bing').attr('src', 'images/gjs.png');
    $('.bing-army-img').attr('src', 'images/17.png');

    $('.sec3-Bing-finger').hide().removeClass('sec3-Bing-finger-step2 sec3-Bing-finger-step3');

    $('.set-bing-click1').each(function(index, ele) {
        $(ele).data('value', '0');
        $(ele).data('type', '');
        $(ele).data('spantype', '');
    });

    $('.sec4-bing-army-div span').removeClass('sec4-qb sec4-bub sec4-gjs sec4-qb-animation sec4-bub-animation sec4-gjs-animation');
    $('.set-bing-click1 span').removeClass('sec3-qb sec3-bub sec3-gjs');
    $('.sec4-bing-army-div1').removeClass('invasions-div1 invasions-div11');
    $('.sec4-bing-army-div2').removeClass('invasions-div2 invasions-div22 invasions-div23 invasions-div24');
    $('.sec4-bing-army-div3').removeClass('invasions-div3 invasions-div32 invasions-div33 invasions-div34 invasions-div35 invasions-div36');

    $('.qb-animate').removeClass('qb-animate-up1,qb-animate-up2,qb-animate-up3');
    $('.bub-animate').removeClass('bub-animate-up1,bub-animate-up2,bub-animate-up3');
    $('.gjs-animate').removeClass('gjs-animate-up1,gjs-animate-up2,gjs-animate-up3');

    $('.sec4-bing-army-div1, .sec4-bing-army-div2, .sec4-bing-army-div3, .monster-div1, .monster-div2, .monster-div3').show();
    $('.sec4-bing-army-div1 .soldier-li , .sec4-bing-army-div2 .soldier-li, .sec4-bing-army-div3 .soldier-li').css('visibility', 'visible');
    $('.monster-div1,.monster-div2,.monster-div3').removeClass('blood2 blood4 blood6 blood8');

    $('.sec4-bing-army-div1 .soldier-li').removeClass('blood2 blood4 blood6 blood8'); //第一排 兵血量
    $('.sec4-bing-army-div2 .soldier-li').removeClass('blood2 blood4 blood6 blood8');; //第二排 兵血量
    $('.sec4-bing-army-div3 .soldier-li').removeClass('blood2 blood4 blood6 blood8');; //第三排 兵血量






    $('.sec-4-hide').hide();
    adGame.clickType = 'qb';
    adGame.alrearyHaveBing = ['sec3-army1-finger', 'sec3-army2-finger', 'sec3-army3-finger'];
    adGame.changeSec(function() {
        $('.sec-2').show();
        setTimeout(function() {
            adGame.sec1BodyClick();
        }, 1000)
    });
}