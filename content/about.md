---
layout: default
title: サイトについて
site_title: リッチなMarkdownサイト
---

# サイトについて

## このプロジェクトについて

このサイトは、**markdown-it**と**Bulma CSS**を使用して作られた静的サイトです。Jekyll風のシステムを構築して、マークダウンファイルからHTMLへの変換を行っています。

## 主な機能

- **YAMLフロントマター**によるメタデータ管理
- **Bulma CSS**フレームワークによる美しいデザイン
- **highlight.js**によるコードハイライト
- **EJSテンプレート**によるレイアウトシステム
- 静的ファイルの自動コピー

## 技術スタック

このプロジェクトは以下の技術を使用しています：

<div class="notification is-info is-light">
  <div class="columns">
    <div class="column">
      <h4>フロントエンド</h4>
      <ul>
        <li>Bulma CSS</li>
        <li>Font Awesome</li>
        <li>highlight.js</li>
      </ul>
    </div>
    <div class="column">
      <h4>バックエンド</h4>
      <ul>
        <li>Node.js</li>
        <li>markdown-it</li>
        <li>EJS</li>
        <li>front-matter</li>
      </ul>
    </div>
  </div>
</div>

## コードサンプル

Node.jsでマークダウンファイルを処理する核となるコード：

```javascript
// マークダウン処理の核心部分
processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // フロントマターを解析
  const { attributes, body } = frontMatter(content);
  
  // マークダウンをHTMLに変換
  const htmlContent = this.md.render(body);
  
  // レイアウトを適用
  const layout = attributes.layout || 'default';
  const finalHtml = this.applyLayout(layout, {
    content: htmlContent,
    ...attributes
  });
  
  // HTMLファイルを書き出し
  // ...
}
```

## 今後の展開

<div class="box">
  <article class="message is-success">
    <div class="message-header">
      <p>開発ロードマップ</p>
    </div>
    <div class="message-body">
      <ol>
        <li>ブログ投稿向けの日付別アーカイブ機能</li>
        <li>タグとカテゴリーのサポート</li>
        <li>検索機能の実装</li>
        <li>コメントシステムの統合</li>
        <li>パフォーマンス最適化</li>
      </ol>
    </div>
  </article>
</div>

## 連絡先

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="プロフィール画像">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">開発者</p>
        <p class="subtitle is-6">@developer</p>
      </div>
    </div>
    <div class="content">
      <p>お問い合わせは以下からお願いします：</p>
      <div class="buttons">
        <a class="button is-primary">
          <span class="icon">
            <i class="fas fa-envelope"></i>
          </span>
          <span>メール</span>
        </a>
        <a class="button is-info">
          <span class="icon">
            <i class="fab fa-twitter"></i>
          </span>
          <span>Twitter</span>
        </a>
        <a class="button is-dark">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </div>
</div>