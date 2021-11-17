var WebRTC = require("wrtc");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const connection = new WebRTC.RTCPeerConnection();
let dataChannel = connection.createDataChannel("dataChannel");

connection.onicecandidate = (e) => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
  console.log(JSON.stringify(connection.localDescription) + "\n");
};

connection
  .createOffer()
  .then((offer) => {
    connection.setLocalDescription(offer);
  })

  .then(() => {
    readline.question("Answer: ", (answer) => {
      connection.setRemoteDescription(JSON.parse(answer)).then(() => {
        console.log("setRemoteDescription");
      });
    });
  });

dataChannel.onmessage = (msg) => console.log("New msg: " + msg.data);
dataChannel.onOpen = () => console.log("Connection Open.");
dataChannel.onClose = () => console.log("Connection Closed.");
