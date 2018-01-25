var view_id = ''; //画面ID
var mqtt;
var reconnectTimeout = 2000;
var clientID = '123';
var restart = false;
var mqtt;

function MQTTconnect() {
    mqtt = new Paho.MQTT.Client(
        "192.168.2.2",
        61614,
        String(parseInt(Math.random() * 100,
            10)));

    var options = {
        // timeout: 3,
        useSSL: false,
        cleanSession: false,
        onSuccess: function() {
            subscribeView();
        },
        onFailure: function(message) {
            console.log("connect Failure");
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    // options.userName = "username";
    // options.password = "password";
    mqtt.connect(options);

}

//订阅画布消息
function subscribeView() {
    console.log('连接成功');
    console.log('view_id' + view_id)
    restart = true;
    mqtt.subscribe('Bayax/Push/' + view_id);
}

$(function() {
    setInterval(function() {
        if (Number(view_id) > 0 && mqtt) {

            var message6 = new Paho.MQTT.Message(view_id);
            message6.destinationName = 'Bayax/View/' + clientID;
            message6.qos = 0;
            mqtt.send(message6);
            console.log('页面id：' + view_id)
        }

    }, 3000);
});

//重新链接MQTT服务器
function onConnectionLost(response) {
    console.log("connect Lost:" + JSON.stringify(response, null, 2));
    setTimeout(MQTTconnect, reconnectTimeout);
};
//接受消息
function onMessageArrived(messages) {}