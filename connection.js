const { localConn } = require("./clientA.js");

const answer = {
  type: "answer",
  sdp: "v=0\r\no=- 879613257972371466 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 58776 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP6 2804:29b8:5042:170e:65fc:6499:b2ca:8e99\r\nb=AS:30\r\na=candidate:3464333309 1 udp 2122262783 2804:29b8:5042:170e:65fc:6499:b2ca:8e99 58776 typ host generation 0 network-id 2\r\na=ice-ufrag:rqBy\r\na=ice-pwd:yqinUTUknbATr2FKhZl/y0Ze\r\na=ice-options:trickle\r\na=fingerprint:sha-256 14:B7:FC:8F:7B:7B:85:DE:26:C6:AE:7B:23:D5:36:FF:8F:31:61:A0:BA:15:7C:6F:C2:7B:F1:65:87:1B:5D:F8\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

localConn.createOffer().then((offer) => localConn.setLocalDescription(offer));

