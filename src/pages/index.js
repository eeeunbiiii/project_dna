import React from 'react';
import { useRouter } from 'next/router';
import BoardsIndex from './boards';

const HomePage = () => {
  const router = useRouter();

  // 예시로 루트 URL('/')에 접속하면 BoardsIndex 컴포넌트를 렌더링합니다.
  // 필요에 따라 다른 경로에 다른 컴포넌트를 연결할 수 있습니다.
  if (router.pathname === '/') {
    return <BoardsIndex />;
  }

  return null;
};

export default HomePage;
