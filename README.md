Wetube Reloaded Notebook
Wetube Reloaded Notebook은 Nomad Coders의 Wetube Reloaded 프로젝트를 기반으로 제작됐습니다. 2022.10 ~ 2022.12 동안 유튜브 클론 6주 완성반에 참가한 결과물입니다. 이 프로젝트는 Node.js, Express, MongoDB, ES6 등을 활용하여 YouTube와 유사한 기능을 구현하였습니다. 학습 목적으로 진행되었으며, 각 커밋에는 학습한 내용이 상세하게 기록되어 있습니다.

주요 기능
사용자 인증 및 관리: 회원 가입, 로그인, 프로필 수정, 로그아웃 등.
동영상 업로드 및 관리: 동영상 업로드, 수정, 삭제, 조회.
댓글 기능: 동영상에 대한 댓글 작성, 수정, 삭제.
검색 기능: 동영상 제목을 기반으로 한 검색.

기술 스택
프론트엔드: Pug, SCSS
백엔드: Node.js, Express
데이터베이스: MongoDB
기타: Webpack, Babel

설치 및 실행 방법
1. 레포지토리 클론: git clone https://github.com/junhyung8795/wetube-reloaded-notebook.git
2. 디렉토리 이동: cd wetube-reloaded-notebook
3. 필요한 패키지 설치: npm install
4. 환경 변수 설정: 프로젝트 루트 디렉토리에 .env 파일을 생성하고, 필요한 환경 변수를 설정합니다.
5. 개발 서버 실행: npm run dev
6. 브라우저에서 확인: 브라우저에서 http://localhost:4000으로 접속하여 애플리케이션을 확인합니다.

폴더 구조
wetube-reloaded-notebook/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routers/
│   ├── views/
│   └── ...
├── .gitignore
├── README.md
├── babel.config.json
├── nodemon.json
├── package.json
└── webpack.config.js

학습 내용
이 프로젝트를 통해 다음과 같은 내용을 학습하였습니다:
Node.js와 Express를 활용한 서버 사이드 개발.
MongoDB와 Mongoose를 이용한 데이터베이스 관리.
Pug를 사용한 템플릿 엔진 활용.
Webpack과 Babel을 통한 모던 JavaScript 코드 변환 및 번들링.
MVC 패턴을 적용한 애플리케이션 구조화.

참고 자료
[Nomad Coders - Wetube Reloaded](https://github.com/nomadcoders/wetube-reloaded)




