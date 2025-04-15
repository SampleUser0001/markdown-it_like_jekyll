// watch_md.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function watchDir(dir) {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename && path.extname(filename) === '.md') {
            console.log(`変更を検出: ${path.join(dir, filename)}`);
            // ここに実行したいコマンドを追加
            exec('npm run build', (error, stdout, stderr) => {
                if (stdout) console.log(stdout);
                if (stderr) console.error(stderr);
            });
        }
    });
    
    console.log(`Watching directory: ${dir} for MD file changes`);
}

watchDir('./content');