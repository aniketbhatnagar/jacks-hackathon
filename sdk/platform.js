platform = (function(domain, appId) {

    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket
    var accelerometerPushUrl = "http://" + domain +  "/receivers/hackathon/" + appId + "/accelerometer"
    var accelerometerWebSocketUrl = "ws://" + domain +  "/stream/hackathon/" + appId + "/AccelerometerEvent"
    var accelerometerWebSocket = null

    var ajax = function(url, method, data, callback) {
       $.ajax({
          type: method,
          url: accelerometerPushUrl,
          contentType: "text/json",
          data: JSON.stringify(data),
		  error: function(jqXHR, textStatus, errorThrown) {
			console.log("ajax error - " + jqXHR.status + " " + textStatus + " - " + errorThrown);
		  }
      });
    }

    var websocket = function(url, callback) {
        var socket = new WS(url)
        socket.onmessage = function(socketEvent) {
            var event = JSON.parse(socketEvent.data)
            callback(event)
        }
        return socket
    }

    return {
        sendAccelerometer: function(data, callback) {
            ajax(accelerometerPushUrl, "PUT", data, callback)
        },

        receiveAccelerometer: function(callback) {
            accelerometerWebSocket = websocket(accelerometerWebSocketUrl, callback)
            return accelerometerWebSocket
        },
        stopAccelerometer: function() {
            if (accelerometerWebSocket != null) {
                accelerometerWebSocket.close()
            }
        },
        receiveAccelerometerChanges: function(callback) {
            var oldX = {}
            var oldY = {}
            var oldZ = {}
            this.receiveAccelerometer(function(event){
                if (oldX['userId'] != null) {
                    callback({
                        "userId": event.userId,
                        "dx": event.x - oldX['userId'],
                        "dy": event.y - oldY['userId'],
                        "dz": event.z - oldZ['userId']
                    })
                }
                oldX['userId'] = event.x
                oldY['userId'] = event.y
                oldZ['userId'] = event.z
            })
        },
        receiveAccelerometerGestures: function(callback) {
            //var
        }
    }

})