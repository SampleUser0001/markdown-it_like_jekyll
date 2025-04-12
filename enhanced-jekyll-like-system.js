// enhanced-jekyll-like-system.js
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const frontMatter = require('front-matter');
const hljs = require('highlight.js');
const ejs = require('ejs');

class JekyllLikeMarkdown {
  constructor(options = {}) {
    // Markdown-itの設定 - コードハイライトを強化
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            // 言語名を表示するためのクラスを追加
            return `<pre class="code-block"><div class="code-header">${lang}</div><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
          } catch (__) {}
        }
        // 言語が指定されていない場合や認識できない場合
        return `<pre class="code-block"><div class="code-header">code</div><code class="hljs">${this.md.utils.escapeHtml(str)}</code></pre>`;
      }
    });

    // MDリンクの拡張子をhtmlに変換するカスタム処理
    const defaultRender = this.md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    this.md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
      const token = tokens[idx];
      const hrefIndex = token.attrIndex('href');
      
      if (hrefIndex >= 0) {
        const href = token.attrs[hrefIndex][1];
        
        // .md拡張子を.htmlに変換（外部リンクやアンカーは変換しない）
        if (href && !href.startsWith('http') && !href.startsWith('#') && href.endsWith('.md')) {
          token.attrs[hrefIndex][1] = href.replace(/\.md$/, '.html');
        }
      }
      
      return defaultRender(tokens, idx, options, env, self);
    };

    // 基本プラグインはコメントアウト（必要に応じて有効化）
    // const emoji = require('markdown-it-emoji');
    // this.md.use(emoji);
    
    // const anchor = require('markdown-it-anchor');
    // this.md.use(anchor);
    
    // const toc = require('markdown-it-table-of-contents');
    // this.md.use(toc);

    this.templatesDir = options.templatesDir || path.join(process.cwd(), 'templates');
    this.layoutsDir = options.layoutsDir || path.join(process.cwd(), 'layouts');
    this.outputDir = options.outputDir || path.join(process.cwd(), '_site');
    this.staticDir = options.staticDir || path.join(process.cwd(), 'static');
    
    // 出力ディレクトリがなければ作成
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    
    // カスタムCSSディレクトリを作成
    const cssDir = path.join(this.outputDir, 'content', 'css');
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true });
    }
    
    // カスタムCSSファイルを作成
    this.createCustomCss(path.join(cssDir, 'custom.css'));
    
    // レイアウトCSSをコピー
    this.copyLayout(path.join(this.layoutsDir, 'css'), cssDir);

    // フォントファイルをコピー
    const webfontsDir = path.join(this.outputDir, 'content', 'webfonts');
    if (!fs.existsSync(webfontsDir)) {
      fs.mkdirSync(webfontsDir, { recursive: true });
    }
    this.copyLayout(path.join(this.layoutsDir, 'webfonts'), webfontsDir);
  }

  // カスタムCSSを生成
  createCustomCss(cssPath) {
    const cssContent = `
/* カスタムスタイル */
.content {
  margin-bottom: 2rem;
}

/* コードブロックのスタイル強化 */
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
  font-size: 0.85em;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #444;
  text-transform: lowercase;
}

.hljs {
  padding: 1rem !important;
  border-radius: 0 0 6px 6px;
  font-size: 0.95em;
  line-height: 1.5;
}

/* テーブルのスタイル強化 */
.content table {
  width: 100%;
  border-collapse: collapse;
}

.content table th,
.content table td {
  border: 1px solid #dbdbdb;
  padding: 0.5em 0.75em;
  vertical-align: middle;
}

.content table th {
  background-color: #f5f5f5;
}

.content table tr:hover {
  background-color: #fafafa;
}

/* 画像のレスポンシブ化 */
.content img {
  max-width: 100%;
  height: auto;
}

/* モバイル対応 */
@media screen and (max-width: 768px) {
  .content {
    padding: 0.5rem;
  }
  
  pre {
    white-space: pre-wrap;
  }
}
    `;
    
    fs.writeFileSync(cssPath, cssContent);
  }

  copyLayout(sourceDir, destDir) {
    if (!fs.existsSync(sourceDir)) {
      console.warn(`Layouts CSS directory does not exist: ${sourceDir}`);
      return;
    }
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied layout CSS: ${srcPath} -> ${destPath}`);
    });
  }

  // markdownファイルを処理する
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
    
    // 出力パスを生成
    const relativePath = path.relative(process.cwd(), filePath);
    const outputPath = path.join(
      this.outputDir,
      relativePath.replace(/\.md$/, '.html')
    );
    
    // 出力ディレクトリを作成
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // HTMLファイルを書き出し
    fs.writeFileSync(outputPath, finalHtml);
    
    console.log(`Converted: ${filePath} -> ${outputPath}`);
    
    return {
      inputPath: filePath,
      outputPath,
      metadata: attributes
    };
  }

  // レイアウトを適用する
  applyLayout(layoutName, data) {
    const layoutPath = path.join(this.layoutsDir, `${layoutName}.ejs`);
    
    if (!fs.existsSync(layoutPath)) {
      console.warn(`Layout "${layoutName}" not found, using content without layout.`);
      return data.content;
    }
    
    const layoutTemplate = fs.readFileSync(layoutPath, 'utf8');
    return ejs.render(layoutTemplate, data);
  }

  // ディレクトリ内のすべてのマークダウンファイルを処理
  processDirectory(dirPath) {
    const files = this.getAllFiles(dirPath);
    const results = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const result = this.processFile(file);
        results.push(result);
      }
    }
    
    return results;
  }

  // ディレクトリ内のすべてのファイルを再帰的に取得
  getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory does not exist: ${dirPath}`);
      return arrayOfFiles;
    }
    
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(filePath, arrayOfFiles);
      } else {
        arrayOfFiles.push(filePath);
      }
    });
    
    return arrayOfFiles;
  }

  // 静的ファイルをコピー
  copyStaticFiles(srcDir, destDir = this.outputDir) {
    if (!fs.existsSync(srcDir)) {
      console.warn(`Static directory does not exist: ${srcDir}`);
      return;
    }
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    const files = fs.readdirSync(srcDir);
    
    files.forEach(file => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyStaticFiles(srcPath, destPath);
      } else if (!file.endsWith('.md')) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    
    console.log(`Static files copied from ${srcDir} to ${destDir}`);
  }

  // サイト全体をビルド
  build(contentDir) {
    console.log('Building site...');
    
    // 静的ファイルがあればコピー
    if (fs.existsSync(this.staticDir)) {
      this.copyStaticFiles(this.staticDir, this.outputDir);
    }
    
    // マークダウンファイルを処理
    const results = this.processDirectory(contentDir);
    console.log(`Processed ${results.length} markdown files.`);
    
    // 静的コンテンツディレクトリもコピー
    this.copyStaticFiles(contentDir);
    
    console.log(`Site built successfully to ${this.outputDir}`);
    return results;
  }
}

module.exports = JekyllLikeMarkdown;
