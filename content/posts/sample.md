---
layout: default
title: マークダウンの高度な使い方
site_title: リッチなMarkdownサイト
author: 開発者
date: 2023-04-12
---

# マークダウンの高度な使い方

**投稿日**: <%= date %>  
**著者**: <%= author %>

<div class="tags">
  <span class="tag is-primary">マークダウン</span>
  <span class="tag is-info">チュートリアル</span>
  <span class="tag is-success">Web開発</span>
</div>

## はじめに

マークダウンは、文書作成のための軽量マークアップ言語です。このポストでは、マークダウンの基本的な構文から高度な使い方まで解説します。また、Bulma CSSとhighlight.jsを組み合わせることで、見栄えの良いコンテンツを簡単に作成する方法も紹介します。

<div class="notification is-warning is-light">
  <strong>注意</strong>: このポストはmarkdown-itの機能に焦点を当てています。他のマークダウンパーサーでは一部の構文が異なる場合があります。
</div>

## 基本的なマークダウン構文

### 見出し

マークダウンでは、`#` の数で見出しのレベルを指定します。

```markdown
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6
```

### テキストスタイル

```markdown
*イタリック* または _イタリック_
**ボールド** または __ボールド__
~~打ち消し線~~
```

結果:
*イタリック* または _イタリック_
**ボールド** または __ボールド__
~~打ち消し線~~

### リスト

#### 順序なしリスト

```markdown
- 項目1
- 項目2
  - ネストされた項目
  - もう一つのネストされた項目
- 項目3
```

#### 順序付きリスト

```markdown
1. 最初の項目
2. 2番目の項目
3. 3番目の項目
```

### リンクと画像

```markdown
[リンクテキスト](http://example.com)
![代替テキスト](http://example.com/image.jpg)
```

## 高度なマークダウン機能

### テーブル

```markdown
| 名前 | 説明 | バージョン |
|------|------|----------|
| markdown-it | マークダウンパーサー | 13.0.1 |
| Bulma | CSSフレームワーク | 0.9.4 |
| highlight.js | コードハイライト | 11.8.0 |
```

結果:

| 名前 | 説明 | バージョン |
|------|------|----------|
| markdown-it | マークダウンパーサー | 13.0.1 |
| Bulma | CSSフレームワーク | 0.9.4 |
| highlight.js | コードハイライト | 11.8.0 |

### コードブロック

言語を指定することで、シンタックスハイライトが適用されます:

#### JavaScript

```javascript
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

console.log(calculateFactorial(5)); // 120
```

#### Python

```python
def calculate_factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * calculate_factorial(n - 1)

print(calculate_factorial(5))  # 120
```

#### CSS

```css
.code-block {
  position: relative;
  margin: 1.5em 0;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  overflow: hidden;
}

.code-header {
  background-color: #2d2d2d;
  color: #ffffff;
  font-family: monospace;
  padding: 0.5rem 1rem;
}
```

### 引用

```markdown
> これは引用です。
> 複数行にまたがる引用もできます。
>
> 段落を分けることもできます。
```

結果:
> これは引用です。
> 複数行にまたがる引用もできます。
>
> 段落を分けることもできます。

## Bulmaコンポーネントの活用

マークダウン内にHTMLを直接記述することで、Bulmaのコンポーネントを利用できます。

### カード

<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      コンポーネント
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      Bulmaのカードコンポーネントは、様々な情報をまとめて表示するのに便利です。
      <br>
      <time datetime="2023-04-12">2023年4月12日</time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">保存</a>
    <a href="#" class="card-footer-item">編集</a>
    <a href="#" class="card-footer-item">削除</a>
  </footer>
</div>

### プログレスバー

<progress class="progress is-primary" value="60" max="100">60%</progress>

### タブ

<div class="tabs is-boxed">
  <ul>
    <li class="is-active"><a>画像</a></li>
    <li><a>音楽</a></li>
    <li><a>動画</a></li>
    <li><a>ドキュメント</a></li>
  </ul>
</div>

## まとめ

<div class="message is-info">
  <div class="message-header">
    <p>ポイント</p>
  </div>
  <div class="message-body">
    <p>マークダウンとBulma CSSを組み合わせることで、以下のようなメリットがあります：</p>
    <ul>
      <li>シンプルな構文で文書を作成できる</li>
      <li>美しいスタイリングが簡単に適用できる</li>
      <li>highlight.jsによるコードハイライトで可読性が向上</li>
      <li>HTMLを直接書くことで複雑なコンポーネントも利用可能</li>
    </ul>
  </div>
</div>

<div class="columns">
  <div class="column">
    <div class="notification is-primary">
      マークダウンの基本を学ぶことで、ドキュメントやブログ記事をスピーディーに作成できます。
    </div>
  </div>
  <div class="column">
    <div class="notification is-link">
      BulmaのようなCSSフレームワークを活用して、デザイン性の高いコンテンツを実現しましょう。
    </div>
  </div>
  <div class="column">
    <div class="notification is-success">
      コードハイライト機能で、プログラミング関連の記事を読みやすく魅力的にできます。
    </div>
  </div>
</div>

---

<footer class="footer" style="padding: 1.5rem;">
  <div class="content has-text-centered">
    <p>
      <strong>著者:</strong> <%= author %> | <strong>公開日:</strong> <%= date %>
    </p>
  </div>
</footer>