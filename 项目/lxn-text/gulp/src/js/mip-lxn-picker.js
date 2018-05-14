/**
 * @file mip-lxn-picker 组件
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var Picker = require('./picker');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    function pickerMaskOpen(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
    }

    function pickerMaskClose(element) {
        var picker = element.querySelector('.picker');
        picker.classList.remove('open');
        var elementParentNode = element.parentNode;
        setTimeout(function () {
            if (elementParentNode.tagName === 'MIP-FIXED') {
                util.css(elementParentNode, {
                    height: 'auto'
                });
            }
            util.css(element, {
                height: 'auto'
            });
        }, 300);
    }

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    customElement.prototype.build = function () {
        var element = this.element;

        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        var pickerType = params.pickerType || 'time';

        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = pickerType;
        element.appendChild(input);

        if (pickerType === 'time') {
            params = util.fn.extend(params, {
                successCallback: function (val) {
                    input.value = val.value;
                    window.MIP.setData({
                        orderInfo: val.value
                    });
                    pickerMaskClose(element);
                },
                cancelCallback: function () {
                    pickerMaskClose(element);
                },
                createCallback: function () {
                    var mask = element.querySelector('.picker-mask');
                    mask.addEventListener('click', function (e) {
                        pickerMaskClose(element);
                        element.myPicker.hidePicker();
                    });
                }
            });
        }
        else if (pickerType === 'city') {
            params = util.fn.extend(params, {
                successCallback: function (val) {
                    input.value = val.value;
                    var ids = val.code.split(',');
                    // 如果更换城市，需要重新选择POI
                    var userSelectedPOI = window.m.userSelectedPOI;
                    if (input.value !== window.m.userSelectedCityName) {
                        userSelectedPOI = '';
                    }
                    window.MIP.setData({
                        userSelectedCityName: val.value,
                        userSelectedProvinceId: ids[0],
                        userSelectedCityId: ids[1],
                        userSelectedPOI: userSelectedPOI
                    });
                    pickerMaskClose(element);
                },
                cancelCallback: function () {
                    pickerMaskClose(element);
                },
                createCallback: function () {
                    var mask = element.querySelector('.picker-mask');
                    mask.addEventListener('click', function (e) {
                        pickerMaskClose(element);
                        element.myPicker.hidePicker();
                    });
                }
            });
        }

        this.addEventAction('open', function () {
            // 城市数据
            if (pickerType === 'city') {
                var mipPickerCities = storage.get('mip-picker-cities');
                var mipPickerCitiesDate = parseInt(storage.get('mip-picker-cities-date'), 10);
                var nowDate = +new Date();
                // 七天之内不请求 7*24*60*60*1000=604800000
                if ((nowDate - mipPickerCitiesDate <= 604800000) && mipPickerCities) {
                    params = util.fn.extend(params, {
                        data: JSON.parse(mipPickerCities)
                    });
                    element.myPicker = new Picker(params, element);
                    pickerMaskOpen(element);
                }
                else {
                    // 移除数据
                    storage.rm('mip-picker-cities');
                    storage.rm('mip-picker-cities-date');
                    var url = element.dataset.api;
                    // 请求数据
                    fetchJsonp(url, {
                        jsonpCallback: 'callback'
                    }).then(function (res) {
                        return res.json();
                    }).then(function (res) {
                        if (!res.status) {
                            params = util.fn.extend(params, {
                                data: res.data
                            });
                            element.myPicker = new Picker(params, element);
                            pickerMaskOpen(element);
                            // 存本地，避免下次请求
                            storage.set('mip-picker-cities', JSON.stringify(res.data));
                            storage.set('mip-picker-cities-date', +new Date());
                        }
                    });
                }
            }
            else {
                element.myPicker = new Picker(params, element);
                pickerMaskOpen(element);
            }
        });

        this.addEventAction('close', function () {
            pickerMaskClose(element);
            element.myPicker.hidePicker();
        });
    };

    return customElement;
});
