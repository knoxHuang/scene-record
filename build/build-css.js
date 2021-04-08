const { exec } = require('child_process');

exec('lessc statics/index.less > dist/index.css', (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`build:css done`);
});
