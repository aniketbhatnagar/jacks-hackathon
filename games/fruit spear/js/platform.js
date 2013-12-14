platform = (function(domain, appId) {

    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket
    var accelerometerPushUrl = "http://" + domain +  "/receivers/hackathon/" + appId + "/accelerometer"
    var accelerometerWebSocketUrl = "ws://" + domain +  "/stream/hackathon/" + appId + "/AccelerometerEvent"
    var tilPushUrl = "http://" + domain +  "/receivers/hackathon/" + appId + "/tilt"
    var tiltWebSocketUrl = "ws://" + domain +  "/stream/hackathon/" + appId + "/TiltEvent"
    var accelerometerWebSocket = null
    var tiltWebSocket = null

    var usersSeen = {}
    var userJoinCallbacks = new Array();

    var ajax = function(url, method, data, callback) {
       $.ajax({
          type: method,
          url: url,
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
            if (usersSeen[event.userId] == null) {
                for (i=0; i < userJoinCallbacks.length; i++) {
                    userJoinCallbacks[i](event.userId)
                }
                usersSeen[event.userId] = {}
            }
            callback(event)
        }
        return socket
    }

    return {
        sendAccelerometer: function(data, callback) {
            ajax(accelerometerPushUrl, "PUT", data, callback)
        },

        sendTilt: function(data, callback) {
            ajax(tilPushUrl, "PUT", data, callback)
        },

        receiveAccelerometer: function(callback) {
            accelerometerWebSocket = websocket(accelerometerWebSocketUrl, callback)
            return accelerometerWebSocket
        },
        receiveTilt: function(callback) {
            tiltWebSocket = websocket(tiltWebSocketUrl, callback)
            return tiltWebSocket
        },
        receiveTiltBucketed: function(bucket, callback) {
            this.receiveTilt(function(event){
                callback({
                    "userId": event.userId,
                    "tiltLR": event.tiltLR - event.tiltLR % bucket,
                    "tiltFB": event.tiltFB- event.tiltFB % bucket,
                    "dir": event.dir - event.dir % bucket,
                    "timestamp": event.timestamp
                })
            })
        },
        stopTilt: function() {
            if (tiltWebSocket != null) {
                tiltWebSocket.close()
            }
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
                if (oldX[event.userId] != null) {
                    callback({
                        "userId": event.userId,
                        "dx": event.x - oldX[event.userId],
                        "dy": event.y - oldY[event.userId],
                        "dz": event.z - oldZ[event.userId]
                    })
                }
                oldX[event.userId] = event.x
                oldY[event.userId] = event.y
                oldZ[event.userId] = event.z
            })
        },
        registerUserJoins: function(callback) {
            userJoinCallbacks.push(callback)
        }
    }

})