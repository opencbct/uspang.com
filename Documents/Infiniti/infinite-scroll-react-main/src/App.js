import "./App.css";

// 무한 스크롤 컴포넌트를 가져온다.
import InfiniteScroll from "react-infinite-scroll-component";

// 리액트 훅을 가져온다.
import { useEffect, useState } from "react";

// Comment 컴포넌트를 가져온다.
import Comment from "./components/Comment";

// Loader 컴포넌트를 가져온다.
import Loader from "./components/Loader";

// EndMsg 컴포넌트를 가져온다.
import EndMsg from "./components/EndMsg";

// parseArgs 함수를 가져온다.
import { parseArgs } from 'node:util';

// npm start를 실행할 때 발생하는 문제를 해결하기 위한 코드입니다.

// 필요한 모듈을 불러옵니다.
const express = require('express');

// Express 애플리케이션을 생성합니다.
const app = express();

// 서버가 요청을 받을 포트 번호를 설정합니다.
const port = 3000;

// 루트 경로에 대한 GET 요청을 처리합니다.
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// ./src/App.js 파일에서 발생한 SyntaxError: Identifier 'InfiniteScroll' has already been declared 오류입니다.
// InfiniteScroll 식별자가 이미 선언되었습니다. (11번째 줄, 7번째 열)

// InfiniteScroll 컴포넌트를 이미 선언했는데, 다시 선언하려고 하면 오류가 발생합니다.
// 이 오류를 해결하기 위해서는 InfiniteScroll 컴포넌트를 한 번만 선언해야 합니다.


// 서버를 시작하고 지정된 포트에서 요청을 수신합니다.
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

// 웹 서버를 생성하기 위해 http 모듈을 불러옵니다.
const http = require('http');

// 웹 서버를 생성합니다.
const server = http.createServer((req, res) => {
  // 요청이 들어오면 응답으로 200 상태 코드와 'Hello, World!' 메시지를 보냅니다.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

// 서버를 지정한 포트 번호로 실행합니다.
server.listen(3000, 'localhost', () => {
  // 서버가 실행되면 콘솔에 메시지를 출력합니다.
  console.log('서버가 http://localhost:3000/ 에서 실행 중입니다.');
});

function App() {
  const [items, setItems] = useState([]);

  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);

  useEffect(() => {
    const getComments = async () => {
      // 댓글을 가져오는 비동기 함수를 정의합니다.
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
        // json server를 사용할 경우 아래 url을 사용합니다.
        // `http://localhost:3004/comments?_page=1&_limit=20`
      );
      // 응답을 받아옵니다.
      const data = await res.json();
      // 받아온 데이터를 state에 저장합니다.
      setItems(data);
    };

    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
      // For json server use url below
      // `http://localhost:3004/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
      sethasMore(false);
    }
    setpage(page + 1);
  };
  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMsg />}
    >
      <div className="container">
        <div className="row m-2">
          {items.map((item) => {
            return <Comment key={item.id} item={item} />;
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default App;


