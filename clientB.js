var WebRTC = require("wrtc");

const offer = {
  type: "offer",
  sdp: "v=0\r\no=- 3002747712490870603 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 52307 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 192.168.1.8\r\na=candidate:3464333309 1 udp 2122262783 2804:29b8:5042:170e:65fc:6499:b2ca:8e99 52305 typ host generation 0 network-id 2\r\na=candidate:3018107458 1 udp 2122197247 2804:29b8:5042:170e:b830:8928:b6da:36c5 52306 typ host generation 0 network-id 3\r\na=candidate:4278134664 1 udp 2122129151 192.168.1.8 52307 typ host generation 0 network-id 1\r\na=candidate:2999745851 1 udp 2122063615 192.168.56.1 52308 typ host generation 0 network-id 4\r\na=candidate:559267639 1 udp 2122005759 ::1 52309 typ host generation 0 network-id 6\r\na=candidate:1510613869 1 udp 2121932543 127.0.0.1 52310 typ host generation 0 network-id 5\r\na=candidate:2164161293 1 tcp 1518283007 2804:29b8:5042:170e:65fc:6499:b2ca:8e99 49523 typ host tcptype passive generation 0 network-id 2\r\na=candidate:4251408050 1 tcp 1518217471 2804:29b8:5042:170e:b830:8928:b6da:36c5 49524 typ host tcptype passive generation 0 network-id 3\r\na=candidate:2960972664 1 tcp 1518149375 192.168.1.8 49525 typ host tcptype passive generation 0 network-id 1\r\na=candidate:4233069003 1 tcp 1518083839 192.168.56.1 49526 typ host tcptype passive generation 0 network-id 4\r\na=candidate:1876313031 1 tcp 1518025983 ::1 49527 typ host tcptype passive generation 0 network-id 6\r\na=candidate:344579997 1 tcp 1517952767 127.0.0.1 49528 typ host tcptype passive generation 0 network-id 5\r\na=ice-ufrag:uhv1\r\na=ice-pwd:NHV+CdJtq7g7+KPyriVnMG9q\r\na=ice-options:trickle\r\na=fingerprint:sha-256 09:11:7A:FF:B9:73:13:A9:27:47:51:29:59:C3:5A:AE:9A:D5:6C:CE:FD:C1:9D:E8:61:11:01:08:58:28:09:58\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

const localConn = new WebRTC.RTCPeerConnection();

localConn.onicecandidate = () =>
  console.log(
    "New ICE Candidate: SDP - " + JSON.stringify(localConn.localDescription)
  );

localConn.ondatachannel = (e) => {
  localConn.dataChannel = e.channel;
  localConn.dataChannel.onmessage = (msg) =>
    console.log("New messagem from Client: " + msg.data);
  localConn.dataChannel.onopen = () => console.log("Connection OPEN");
};

localConn.setRemoteDescription(offer).then(console.log("Offer set."));

localConn.createAnswer().then((answer) => {
  localConn.setLocalDescription(answer);
  console.log("answer created");
});
