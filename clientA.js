// Conexão entre Client A e Client B:
//  1) Client A cria o SDP e seta como LOCAL DESCRIPTION (OFFER);
//  2) Client B pega o OFFER e seta como REMOTE DESCRIPTION;
//  3) Client B cria uma resposta e seta como LOCAL DESCRIPTION e manda o SDP p/ o Client A (ANSWER);
//  4) Client A seta a Answer como REMOTE DESCRIPTION;
//  5) Conexão criada;

var WebRTC = require("wrtc");

const answer = {
  type: "answer",
  sdp: "v=0\r\no=- 2595932278104094516 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 58365 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 192.168.1.8\r\nb=AS:30\r\na=candidate:3464333309 1 udp 2122262783 2804:29b8:5042:170e:65fc:6499:b2ca:8e99 58363 typ host generation 0 network-id 2\r\na=candidate:3018107458 1 udp 2122197247 2804:29b8:5042:170e:b830:8928:b6da:36c5 58364 typ host generation 0 network-id 3\r\na=candidate:4278134664 1 udp 2122129151 192.168.1.8 58365 typ host generation 0 network-id 1\r\na=candidate:2999745851 1 udp 2122063615 192.168.56.1 58366 typ host generation 0 network-id 4\r\na=candidate:559267639 1 udp 2122005759 ::1 58367 typ host generation 0 network-id 6\r\na=candidate:1510613869 1 udp 2121932543 127.0.0.1 58368 typ host generation 0 network-id 5\r\na=candidate:2164161293 1 tcp 1518283007 2804:29b8:5042:170e:65fc:6499:b2ca:8e99 49482 typ host tcptype passive generation 0 network-id 2\r\na=candidate:4251408050 1 tcp 1518217471 2804:29b8:5042:170e:b830:8928:b6da:36c5 49486 typ host tcptype passive generation 0 network-id 3\r\na=candidate:2960972664 1 tcp 1518149375 192.168.1.8 49490 typ host tcptype passive generation 0 network-id 1\r\na=candidate:4233069003 1 tcp 1518083839 192.168.56.1 49494 typ host tcptype passive generation 0 network-id 4\r\na=candidate:1876313031 1 tcp 1518025983 ::1 49498 typ host tcptype passive generation 0 network-id 6\r\na=candidate:344579997 1 tcp 1517952767 127.0.0.1 49502 typ host tcptype passive generation 0 network-id 5\r\na=ice-ufrag:+sXn\r\na=ice-pwd:DiPF9V63WRkwfqoaqUqj7HQe\r\na=ice-options:trickle\r\na=fingerprint:sha-256 83:9C:0D:FB:D7:D0:3E:F3:3F:B9:E4:13:EB:F7:E4:59:2D:93:F0:D1:19:B6:40:52:3B:32:83:C7:5F:A2:1B:34\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

const localConn = new WebRTC.RTCPeerConnection();
const dataChannel = localConn.createDataChannel("chinnel");

dataChannel.onmessage = (msg) => console.log("New msg: " + msg.data);
dataChannel.onOpen = () => console.log("Connection Open.");

localConn.onicecandidate = () => {};
console.log(
  "New ICE Candidate: SDP - " + JSON.stringify(localConn.localDescription)
);

localConn
  .createOffer()

  .then((offer) => {
    console.log("set local description");
    localConn.setLocalDescription(offer);
  })

  .then(() => {
    localConn.setRemoteDescription(answer);
    console.log("setRemoteDescription");
  });

// localConn
//   .setRemoteDescription(answer)
//   .then((a) => console.log("setRemoteDescription"));
