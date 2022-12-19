const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ver1. 모든 서버에서 보내는 요청 수락
app.use(cors());

// ver2. 특정 서버에서 보내는 요청만 수락
// let corsOptions = {
//   origin: 'http://localhost:3000', // 자신이 허용할 도메인 추가
//   credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근 - 다른 도메인간 쿠키 공유 허락 옵션 (서버간 도메인 다른 경우 이 옵션 없으면 로그인 안될수도)
// };
// app.use(cors(corsOptions)); // 모든 도메인에서 제한 없이 해당 서버에 요청 보내고 응답 받기 가능

const todoRouter = require('./routes/todo');
app.use('/api', todoRouter); // 기본주소: localhost:PORT/api

// app.get('*', (req, res) => {
//   res.send('404 Error!!!');
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
