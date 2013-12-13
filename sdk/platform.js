platform = (function(domain, appId) {

    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket
    var accelerometerPushUrl = "http://" + domain +  "/receivers/hackathon/" + appId + "/accelerometer"
    var accelerometerWebSocketUrl = "ws://" + domain +  "/stream/hackathon/" + appId + "/AccelerometerEvent"

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
            websocket(accelerometerWebSocketUrl, callback)
        },
        receiveAccelerometerChanges: function(callback) {
            var oldX = null
            var oldY = null
            var oldZ = null
            this.receiveAccelerometer(function(event){
                if (oldX != null) {
                    callback({
                        "userId": event.userId,
                        "dx": event.x - oldX,
                        "dy": event.y - oldY,
                        "dz": event.z - oldZ
                    })
                }
                oldX = event.x
                oldY = event.y
                oldZ = event.z
            })
        }
    }

})