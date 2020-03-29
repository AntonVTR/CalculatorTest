const wdio = require("webdriverio");
const { opts } = require('./settings');

var driver;

async function init() {
    driver = await wdio.remote(opts);

    exports.fd1 = await driver.findElement('accessibility id', 'inputFieldLeft');
    exports.fd2 = await driver.findElement('accessibility id', 'inputFieldRight');
    exports.add = await driver.findElement('accessibility id', 'additionButton');
    exports.sub = await driver.findElement('accessibility id', 'subtractButton');
    exports.mult = await driver.findElement('accessibility id', 'multiplicationButton');
    exports.div = await driver.findElement('accessibility id', 'divisionButton');
    exports.rst = await driver.findElement('accessibility id', 'resetButton');
    exports.res = await driver.findElement('accessibility id', 'resultTextView');
}

// bad practice, but element.click() and others doesn't work in Android emulator 
async function tapSum() {
    driver.touchPerform([
        { action: 'press', options: { x: 116, y: 236 } },
        { action: 'release' }
    ]);
}
async function tapSub() {
    driver.touchPerform([
        { action: 'press', options: { x: 258, y: 236 } },
        { action: 'release' }
    ]);
}

async function tapMult() {
    driver.touchPerform([
        { action: 'press', options: { x: 394, y: 236 } },
        { action: 'release' }
    ]);
}

function tapDiv() {
    driver.touchPerform([
        { action: 'press', options: { x: 507, y: 236 } },
        { action: 'release' }
    ]);
}

function tapRst() {
    driver.touchPerform([
        { action: 'press', options: { x: 660, y: 236 } },
        { action: 'release' }
    ]);
}

async function setCheckText(el, text) {
    driver.elementSendKeys(el.ELEMENT, text);
    await driver.getElementAttribute(el.ELEMENT, 'text').then((attr) => {
        assert.equal(attr, text);
    });
}
async function validateText(el, text) {
    await driver.getElementAttribute(el.ELEMENT, 'text').then((attr) => {
        assert.equal(attr, text);
    });
}
async function validateTextNotEqual(el, text) {
    await driver.getElementAttribute(el.ELEMENT, 'text').then((attr) => {
        assert.notEqual(attr, text);
    });
}

module.exports = init // = init;
module.exports = tapSum //= tapSum;
module.exports = tapDiv // = tapDiv;
module.exports = tapMult // = tapMult;
module.exports = tapSub // = tapSub;
module.exports = tapRst // = tapRst;
module.exports = setCheckText // = setCheckText;
module.exports = validateText // = validateText;
exports = validateTextNotEqual // = validateTextNotEqual;


//exports.driver //= driver;