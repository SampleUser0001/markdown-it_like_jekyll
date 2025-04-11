// enhanced-usage.js
const JekyllLikeMarkdown = require('./enhanced-jekyll-like-system');
const path = require('path');

// プロジェクトディレクトリ設定
const contentDir = path.join(__dirname, 'content');
const layoutsDir = path.join(__dirname, 'layouts');
const outputDir = path.join(__dirname, '_site');
const staticDir = path.join(__dirname, 'static');

// インスタンス作成
const jekyll = new JekyllLikeMarkdown({
  layoutsDir,
  outputDir,
  staticDir
});

// サイト全体をビルド
jekyll.build(contentDir);

console.log('サイトビルド完了！');
console.log(`サイトは ${outputDir} に生成されました`);