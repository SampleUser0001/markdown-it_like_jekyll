---
layout: default
title: CSSフレームワークとコードハイライトのデモ
site_title: リッチなMarkdownサイト
---

# CSSフレームワークとコードハイライトのデモ

このページは、Bulma CSSフレームワークと拡張されたコードハイライト機能のデモです。

[[toc]]

## Bulmaコンポーネントの例

### カード

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Bulma CSSフレームワークを使用すると、美しいUIコンポーネントを簡単に作成できます。
      <a href="#">#css</a> <a href="#">#bulma</a>
      <br>
      <time datetime="2023-04-11">2023年4月11日</time>
    </div>
  </div>
</div>

### ボタン

<div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
  <button class="button is-info">Info</button>
  <button class="button is-success">Success</button>
  <button class="button is-warning">Warning</button>
  <button class="button is-danger">Danger</button>
</div>

## コードハイライトの例

### JavaScript

```javascript
// オブジェクト指向プログラミングの例
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `こんにちは、私は${this.name}です。${this.age}歳です。`;
  }
  
  static createAnonymous() {
    return new Person('名無し', 20);
  }
}

const alice = new Person('Alice', 25);
console.log(alice.greet()); // こんにちは、私はAliceです。25歳です。
```

### Python

```python
# データ分析のサンプルコード
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# サンプルデータの作成
np.random.seed(42)
dates = pd.date_range('20230101', periods=100)
df = pd.DataFrame(np.random.randn(100, 4), index=dates, columns=['A', 'B', 'C', 'D'])

# 累積和を計算
df_cumsum = df.cumsum()

# データの可視化
plt.figure(figsize=(12, 6))
df_cumsum.plot()
plt.title('サンプルデータの時系列分析')
plt.xlabel('日付')
plt.ylabel('値')
plt.legend(loc='best')
plt.savefig('time_series.png')
plt.show()
```

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTMLサンプル</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTMLとCSSの例</h1>
    <p>これはHTMLとCSSのサンプルコードです。</p>
    <ul>
      <li>項目1</li>
      <li>項目2</li>
      <li>項目3</li>
    </ul>
  </div>
</body>
</html>
```

## テーブルの例

| ID | 名前 | 年齢 | 職業 |
|----|------|------|------|
| 1 | 山田太郎 | 28 | エンジニア |
| 2 | 佐藤花子 | 32 | デザイナー |
| 3 | 鈴木一郎 | 45 | マネージャー |
| 4 | 高橋和子 | 24 | ライター |

## 画像の例

![プレースホルダー画像](https://via.placeholder.com/800x400)

## その他のマークダウン機能

### 引用

> 引用の例です。これはBulmaのスタイルが適用されています。
> 複数行にわたる引用もきれいに表示されます。

### リスト

- 項目1
- 項目2
  - ネストされた項目2.1
  - ネストされた項目2.2
- 項目3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3

## 別ページへのリンク

[other](other.md)

### レベル3