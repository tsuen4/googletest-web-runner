# GoogleTest Web Runner

[GoogleTest](https://github.com/google/googletest) で書かれたプログラムを Web 経由でビルドするアプリケーションです。
Node.js と Docker を使用しています。

送信されたソースコードを GoogleTest が動くコンテナに渡して実行し、出力を Web ページに返します。

## 使い方

Ubuntu 上で動作確認を行いました。Windows では Docker コンテナのマウント絡みでうまく動きません。

```sh
# build 'gtest_runner' container
./build_container.sh

npm install
npm start # http://localhost:3000
```

## このソースコードで設定した制限等

- multer-settings.js の upload で、受け取るファイルのサイズを 10 KB までに制限しています
- exec.js の execFile 実行部で、20 秒でタイムアウトする設定にしています
