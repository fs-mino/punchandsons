# namplate

フロントエンド開発の効率を上げるテンプレート（西村専用）

## Feature

- SASS
- スプライト画像の作成とSassファイルの出力
- JS/CSSの圧縮と最適化
- jpg/png/gif/svg/画像の圧縮
- ベンダープレフィックス付与自動化
- BrowserSync
- スタイルガイド生成
- JS/CSSソースマップ

## Dependence (TESTED)

* [NodeJS](https://nodejs.org/) v0.12.9
* [Gulp](http://gulpjs.com/) 3.9.0

## 構成

```
package.json - npmパッケージ設定ファイル
gulpfile.js - gulpファイル
/node_modules - gulpのファイルが入ってる・各自npm installでダウンロード
/html - コンパイルされたデータが入っている
/src - 開発用フォルダ
  ┣ /img - 画像を入れるフォルダ。html/assets/imgに複製される
  ┣ /js - JSフォルダ。
  ┣ /sass_pc - sass(PC用)フォルダ。ファイル名が_(アンダースコア)で始まっていないscssはhtml/assets/cssに出力される
  ┣ /sass_sp - sass(SP用)フォルダ。ファイル名が_(アンダースコア)で始まっていないscssはhtml/assets-sp/cssに出力される
  ┗ /sprites - スプライト生成フォルダ。ここに作ったフォルダがsass/sprites/_フォルダ名.scssとして出力される

```

## Get Started

### 準備

rootディレクトリを任意のディレクトリに展開し、展開したディレクトリで以下のコマンドを実行します。

```
npm install
```

### ファイル監視の実行 & サーバー起動

以下のコマンドを実行するとブラウザで開発中のページが開きます。この状態でCSSやJSを修正するとユニットテストやLintも同時に実行され、ブラウザが自動的に更新されます。

```
# ディレクトリを監視(src/pc)
gulp

# 指定ディレクトリを監視（src/spディレクトリを監視する例)
gulp -sp
```

### スプライト画像生成

複数の画像をタイル上に１枚の画像にするスプライトを自動的に生成します。images/spites以下のディレクトリごとにスプライト画像とsassファイルを出力

```
# スプライト生成
gulp sprite

# 指定ディレクトリのスプライト生成
gulp sprite -sp
```

#### 例

```
images/sprites/icon/icon-twitter.png
images/sprites/icon/icon-twitter.png
```
↓ `gulp sprite`
```
images/sprites/icon.png
sass/sprites/_icon.scss
```

スプライト画像は`images/sprites/*.png`に、sassは`sass/sprites/_*.scss`に展開されるので、作られたsassを`@import`して使用します。

#### Retinaディスプレイ用スプライト生成

ディレクトリ名の末尾を`-2x`にすることで自動的にsass上でサイズを1/2して表示されるようになります。

```
images/sprites/icon-2x/icon-twitter.png
images/sprites/icon-2x/icon-twitter.png
```

## library


## Other documentation

- [Babel](https://babeljs.io/)
- [EJS](http://www.embeddedjs.com/)
- [ESLint](http://eslint.org/)
- [FrontNote](http://frontainer.com/frontnote/)
- [HTMLHint](http://htmlhint.com/)
- [SASS](http://sass-lang.com/)
- [webpack](http://webpack.github.io/)
- [JSHint](http://jshint.com/)
- [Mocha](http://mochajs.org/)
- [PowerAssert](https://github.com/power-assert-js/power-assert)
- [Sinon](http://sinonjs.org/)

## License

The MIT License (MIT)

Copyright (c) 2015 frontainer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## History
* 0.0.1 - release