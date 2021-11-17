var WebRTC = require("wrtc");

const connection = new WebRTC.RTCPeerConnection();

connection.onicecandidate = (e) => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
  console.log(JSON.stringify(connection.localDescription) + "\n");
};

connection.ondatachannel = (e) => {
  const receiveChannel = e.channel;

  receiveChannel.onmessage = (msg) =>
    console.log("New message from Client: " + msg.data);
  receiveChannel.onopen = () => {
    console.log("Connection OPEN");
    receiveChannel.send("hello world");
  };

  connection.channel = receiveChannel;
};

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Offer: ", (offer) => {
  connection.setRemoteDescription(JSON.parse(offer));
  connection.createAnswer().then((answer) => {
    connection.setLocalDescription(answer);
    // console.log(JSON.stringify(answer));
  });
});
