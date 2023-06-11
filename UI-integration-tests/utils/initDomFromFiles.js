
module.exports = function initDomFromFiles(htmlPath, jsPath) {
    const fs = require("fs");
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open();
    document.write(html);
    document.close();
    jest.isolateModules(function () {
        require(jsPath);
    });
}