const path= require("path");

module.exports = {
    entry: "./src/client/js/main.js",//the file name that you wanna convert using webpack.
    //webpack is a converter. Sometime google chrome can understand the javascript code that you write but other browsers cannot.
    //webpack can convert the code you write in ES6 for example, into the oldest code(오래된 문법).
    mode:"development",//여기서 mode는 "개발중" 이라고 써놓은 것. 이를 따로 설정하지않으면 default로 "production" 즉, "완성품"으로 코드를 변환하여 assets/js에 저장한다.
    output : {
        filename:"main.js",
        path: path.resolve(__dirname,"assets", "js"),//바꾸고자하는 파일을 변환한 후 어느파일에 저장할지 경로를 설정. path는 상대경로가 아닌 절대경로로 써야함(모든 경로를 다써야한다는 뜻).
        //__dirname은 User부터 wetube까지 모든 경로를 User/username/~~~/wetube까지 써놓은 변수이다. 자바스크립트가 글로벌 변수로 이미 설정한 변수임.
        //그래서 ~~~/wetube/assets/js/main.js로 저장됨. filename이 main.js이니까
    },
    module: {
        rules: [
            {
                test: /\.js$/,//확장자가 .js인 javascript파일을 다루겠다는 것.
                use: {//여기까지는 고정 이 밑에는 어떤 loader를 사용하느냐에 따라 다르다. 바벨로더를 사용하였지만 다른 로더로 사용하면 변환된 결과물 파일도 다르게 보일것이다.
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ],
                    },
                  },
            },
        ],
    },
};