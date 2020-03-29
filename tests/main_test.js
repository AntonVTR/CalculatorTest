const assert = require('chai').assert;
const performance = require('perf_hooks');
const { fd1, fd2, add, sub, mult, div, rst, res, init, tapRst, tapMult, tapSum, setCheckText, validateText, validateTextNotEqual } = require('./elements');
var { driver } = require('./elements');
//var driver;
//let fd1, fd2, add, sub, mult, div, rst, res;

describe('Calculator', function() {

    this.timeout(50000);

    before(async function() {
        //driver = await wdio.remote(opts);
        await init();
        //var t0 = performance.now();
    });
    beforeEach(async function() {
        await tapRst();
    });
    after(async function() {
        var t1 = performance.now();
        console.log("Call to Tests took " + (t1 - t0) + " milliseconds.");
        await driver.deleteSession();

    });
    it('Intefece validation', async function() {
        await validateText(add, '+');
        await validateText(sub, '-');
        await validateText(mult, '*');
        await validateText(div, '/');
        await validateText(rst, 'RESET');
        await validateText(res, '');
    });
    it('Round up field 1', async function() {
        await setCheckText(fd1, 3.1453)
        await validateText(sub, '-');
        await validateText(mult, '*');
        await validateText(div, '/');
        await validateText(rst, 'RESET');
        await validateText(res, '');
    });
    it('Infinity test', async function() {
        let v = '1111111111111111111111111111111111111111'; //max val+1 bocome infinity
        await setCheckText(fd1, v);
        await setCheckText(fd2, v);
        await tapSum();
        await validateText(res, 'Infinity + Infinity = Infinity');
        await tapRst();
    });
    it.skip('Max value ', async function() {
        let v = '111111111111111111111111111111111111111'; // max val
        await setCheckText(fd1, v);
        await setCheckText(fd2, v);
        await tapSum();
        await validateTextNotEqual(res, 'Infinity + Infinity = Infinity');
        await tapRst();

    });
    it.skip('Max result val ', async function() {
        let v = '100000000000000000000'; // max val
        await setCheckText(fd1, v);
        await setCheckText(fd2, v);
        await tapMult();
        await validateText(res, v + '.00 + ' + v + '.00 = Infinity');
        await tapRst();

    });

    it('summ small field1 Natural field2 Natural', async function() {
        await setCheckText(fd1, '1');
        await setCheckText(fd2, '1');
        await tapSum();
        await validateText(res, "1.00 + 1.00 = 2.00")
        await tapRst();
    });
    it('summ small field1 Natural field2 Natural 0', async function() {
        await setCheckText(fd1, '1');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "1.00 + 0.00 = 1.00")
        await tapRst();
    });
    it('summ small field1 Natural field2 Integer negative', async function() {
        await setCheckText(fd1, '1');
        await setCheckText(fd2, '-4');
        await tapSum();
        await validateText(res, "1.00 + -4.00 = -3.00")
        await tapRst();
    });
    it('summ small field1 Natural field2 Rational positive', async function() {
        await setCheckText(fd1, '1');
        await setCheckText(fd2, '3.84');
        await tapSum();
        await validateText(res, "1.00 + 3.84 = 4.84")
        await tapRst();
    });
    it('summ small field1 Natural field2 Rational negative', async function() {
        await setCheckText(fd1, '1');
        await setCheckText(fd2, '-3.84');
        await tapSum();
        await validateText(res, "1.00 + -3.84 = -2.84")
        await tapRst();
    });
    it('summ small field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3.84');
        await tapSum();
        await validateText(res, "0.00 + 3.84 = 3.84")
        await tapRst();
    });
    it('summ small field1 Natural 0 field2 Rational negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3.84');
        await tapSum();
        await validateText(res, "0.00 + -3.84 = -3.84")
        await tapRst();
    });
    it('summ small field1 Natural 0 field2 Natural', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3');
        await tapSum();
        await validateText(res, "0.00 + 3.00 = 3.00")
        await tapRst();
    });
    it('summ small field1 Natural 0 field2 Natural 0', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "0.00 + 0.00 = 0.00")
        await tapRst();
    });
    it('summ small field1 Natural 0 field2 Integer negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3');
        await tapSum();
        await validateText(res, "0.00 + -3.00 = -3.00")
        await tapRst();
    });
    it('summ small field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3.84');
        await tapSum();
        await validateText(res, "0.00 + 3.84 = 3.84")
        await tapRst();
    });
    it('summ small field1 Integer negative field2 Natural', async function() {
        await setCheckText(fd1, '-3');
        await setCheckText(fd2, '2');
        await tapSum();
        await validateText(res, "-3.00 + 2.00 = -1.00")
        await tapRst();
    });
    it('summ small field1 Integer negative field2 Natural 0', async function() {
        await setCheckText(fd1, '-3');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "-3.00 + 0.00 = -3.00")
        await tapRst();
    });
    it('summ small field1 Integer negative field2 Integer negative', async function() {
        await setCheckText(fd1, '-3');
        await setCheckText(fd2, '-2');
        await tapSum();
        await validateText(res, "-3.00 + -2.00 = -5.00")
        await tapRst();
    });
    it('summ small field1 Integer negative field2 Rational negative', async function() {
        await setCheckText(fd1, '-3');
        await setCheckText(fd2, '-2.15');
        await tapSum();
        await validateText(res, "-3.00 + -2.15 = -5.15")
        await tapRst();
    });
    it('summ small field1 Integer negative field2 Rational positive', async function() {
        await setCheckText(fd1, '-3');
        await setCheckText(fd2, '2.15');
        await tapSum();
        await validateText(res, "-3.00 + 2.15 = -0.85")
        await tapRst();
    });
    it('summ small field1 Rational positive field2 Natural', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '2');
        await tapSum();
        await validateText(res, "3.25 + 2.00 = 5.25")
        await tapRst();
    });
    it('summ small field1 Rational positive field2 Natural 0', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "3.25 + 0.00 = 3.25")
        await tapRst();
    });
    it('summ small field1 Rational positive field2 Integer negative', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '-2');
        await tapSum();
        await validateText(res, "3.25 + -2.00 = 1.25")
        await tapRst();
    });
    it('summ small field1 Rational positive field2 Rational positive', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '4.35');
        await tapSum();
        await validateText(res, "3.25 + 4.35 = 7.60")
        await tapRst();
    });
    it('summ small field1 Rational positive field2 Rational negative', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '-4.35');
        await tapSum();
        await validateText(res, "3.25 + -4.35 = -1.10")
        await tapRst();
    });
    it('summ small field1 Rational negative field2 Natural', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '4');
        await tapSum();
        await validateText(res, "-3.25 + 4.00 = 0.75")
        await tapRst();
    });
    it('summ small field1 Rational negative field2 Natural 0', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "-3.25 + 0.00 = -3.25")
        await tapRst();
    });
    it('summ small field1 Rational negative field2 Integer negative', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '-5');
        await tapSum();
        await validateText(res, "-3.25 + -5.00 = -8.25")
        await tapRst();
    });
    it('summ small field1 Rational negative field2 Rational positive', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '2.15');
        await tapSum();
        await validateText(res, "-3.25 + 2.15 = -1.10")
        await tapRst();
    });
    it('summ small field1 Rational negative field2 Rational negative', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '-2.15');
        await tapSum();
        await validateText(res, "-3.25 + -2.15 = -5.40")
        await tapRst();
    });
    //big
    it('summ big field1 Natural field2 Natural', async function() {
        await setCheckText(fd1, '1111111111111111111111111');
        await setCheckText(fd2, '1111111111111111111111111');
        await tapSum();
        await validateText(res, "1111111111111111111111111.00 + 1111111111111111111111111.00 = 2222222222222222222222222.00")
        await tapRst();
    });
    it('summ big field1 Natural field2 Natural 0', async function() {
        await setCheckText(fd1, '1111111111111111111111111');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "1111111111111111111111111.00 + 0.00 = 1111111111111111111111111.00")
        await tapRst();
    });
    it('summ big field1 Natural field2 Integer negative', async function() {
        await setCheckText(fd1, '1111111111111111111111111');
        await setCheckText(fd2, '-4444444444444444444444444');
        await tapSum();
        await validateText(res, "1111111111111111111111111.00 + -4444444444444444444444444.00 = -3333333333333333333333333.00")
        await tapRst();
    });
    it('summ big field1 Natural field2 Rational positive', async function() {
        await setCheckText(fd1, '1111111111111111111111111');
        await setCheckText(fd2, '3333333333333333333333333.84');
        await tapSum();
        await validateText(res, "1111111111111111111111111.00 + 3333333333333333333333333.84 = 4444444444444444444444444.84")
        await tapRst();
    });
    it('summ big field1 Natural field2 Rational negative', async function() {
        await setCheckText(fd1, '1111111111111111111111111');
        await setCheckText(fd2, '-3333333333333333333333333.84');
        await tapSum();
        2222222222222222222222222
        await validateText(res, "1111111111111111111111111.00 + -3333333333333333333333333.84 = -2222222222222222222222222.16")
        await tapRst();
    });
    it('summ big field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3333333333333333333333333.84345');
        await tapSum();
        await validateText(res, "0.00 + 3333333333333333333333333.84 = 3333333333333333333333333.84")
        await tapRst();
    });
    it('summ big field1 Natural 0 field2 Rational negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3333333333333333333333333.84');
        await tapSum();
        await validateText(res, "0.00 + -3333333333333333333333333.84 = -3333333333333333333333333.84")
        await tapRst();
    });
    it('summ big field1 Natural 0 field2 Natural', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3333333333333333333333333');
        await tapSum();
        await validateText(res, "0.00 + 3333333333333333333333333.00 = 3333333333333333333333333.00")
        await tapRst();
    });
    it('summ big field1 Natural 0 field2 Natural 0', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "0.00 + 0.00 = 0.00")
        await tapRst();
    });
    it('summ big field1 Natural 0 field2 Integer negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3333333333333333333333333');
        await tapSum();
        await validateText(res, "0.00 + -3333333333333333333333333.00 = -3333333333333333333333333.00")
        await tapRst();
    });
    it('summ big field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3333333333333333333333333.84');
        await tapSum();
        await validateText(res, "0.00 + 3333333333333333333333333.84 = 3333333333333333333333333.84")
        await tapRst();
    });
    it('summ big field1 Integer negative field2 Natural', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '2222222222222222222222222');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.00 + 2222222222222222222222222.00 = -1111111111111111111111111.00")
        await tapRst();
    });
    it('summ big field1 Integer negative field2 Natural 0', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.00 + 0.00 = -3333333333333333333333333.00")
        await tapRst();
    });
    it('summ big field1 Integer negative field2 Integer negative', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '-2222222222222222222222222');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.00 + -2222222222222222222222222.00 = -5555555555555555555555555.00")
        await tapRst();
    });
    it('summ big field1 Integer negative field2 Rational negative', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '-2222222222222222222222222.15');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.00 + -2222222222222222222222222.15 = -5555555555555555555555555.15")
        await tapRst();
    });
    it('summ big field1 Integer negative field2 Rational positive', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '2222222222222222222222222.15');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.00 + 2222222222222222222222222.15 = -1111111111111111111111110.85")
        await tapRst();
    });
    it('summ big field1 Rational positive field2 Natural', async function() {
        await setCheckText(fd1, '3333333333333333333333333.25');
        await setCheckText(fd2, '2222222222222222222222222');
        await tapSum();
        await validateText(res, "3333333333333333333333333.25 + 2222222222222222222222222.00 = 5555555555555555555555555.25")
        await tapRst();
    });
    it('summ big field1 Rational positive field2 Natural 0', async function() {
        await setCheckText(fd1, '3333333333333333333333333.25');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "3333333333333333333333333.25 + 0.00 = 3333333333333333333333333.25")
        await tapRst();
    });
    it('summ big field1 Rational positive field2 Integer negative', async function() {
        await setCheckText(fd1, '33333333333333333333333333.25');
        await setCheckText(fd2, '-2222222222222222222222222');
        await tapSum();
        await validateText(res, "33333333333333333333333333.25 + -2222222222222222222222222.00 = 1111111111111111111111111.25")
        await tapRst();
    });
    it('summ big field1 Rational positive field2 Rational positive', async function() {
        await setCheckText(fd1, '3333333333333333333333333.25');
        await setCheckText(fd2, '2222222222222222222222222.35');
        await tapSum();
        await validateText(res, "3333333333333333333333333.25 + 2222222222222222222222222.35 = 5555555555555555555555555.60")
        await tapRst();
    });
    it('summ big field1 Rational positive field2 Rational negative', async function() {
        await setCheckText(fd1, '3333333333333333333333333.25');
        await setCheckText(fd2, '-2222222222222222222222222.35');
        await tapSum();
        await validateText(res, "3333333333333333333333333.25 + -2222222222222222222222222.35 = 1111111111111111111111111.10")
        await tapRst();
    });
    it('summ big field1 Rational negative field2 Natural', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '2222222222222222222222222');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.25 + 2222222222222222222222222.00 = -1111111111111111111111110.75")
        await tapRst();
    });
    it('summ big field1 Rational negative field2 Natural 0', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '0');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.25 + 0.00 = -3333333333333333333333333.25")
        await tapRst();
    });
    it('summ big field1 Rational negative field2 Integer negative', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '-2222222222222222222222222');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.25 + -2222222222222222222222222.00 = -5555555555555555555555555.25")
        await tapRst();
    });
    it('summ big field1 Rational negative field2 Rational positive', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '2222222222222222222222222.15');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.25 + 2222222222222222222222222.15 = -1111111111111111111111111.10")
        await tapRst();
    });
    it('summ big field1 Rational negative field2 Rational negative', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '-2222222222222222222222222.15');
        await tapSum();
        await validateText(res, "-3333333333333333333333333.25 + -2222222222222222222222222.15 = -5555555555555555555555555.40")
        await tapRst();
    });
    //mult
    it('mult small field1 Natural field2 Natural', async function() {
        await setCheckText(fd1, '4');
        await setCheckText(fd2, '4');
        await tapMult();
        await validateText(res, "4.00 * 4.00 = 16.00")
        await tapRst();
    });
    it('mult small field1 Natural field2 Natural 0', async function() {
        await setCheckText(fd1, '1');
        await setCheckText(fd2, '0');
        await tapMult();
        await validateText(res, "1.00 * 0.00 = 0.00")
        await tapRst();
    });
    it('mult small field1 Natural field2 Integer negative', async function() {
        await setCheckText(fd1, '2');
        await setCheckText(fd2, '-4');
        await tapMult();
        await validateText(res, "2.00 * -4.00 = -8.00")
        await tapRst();
    });
    it('mult small field1 Natural field2 Rational positive', async function() {
        await setCheckText(fd1, '2');
        await setCheckText(fd2, '3.14');
        await tapMult();
        await validateText(res, "2.00 * 3.14 = 6.28")
        await tapRst();
    });
    it('mult small field1 Natural field2 Rational negative', async function() {
        await setCheckText(fd1, '2');
        await setCheckText(fd2, '-3.14');
        await tapMult();
        await validateText(res, "2.00 * -3.14 = -6.28")
        await tapRst();
    });
    it('mult small field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3.84');
        await tapMult();
        await validateText(res, "0.00 * 3.84 = 0.00")
        await tapRst();
    });
    it('mult small field1 Natural 0 field2 Rational negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3.84');
        await tapMult();
        await validateText(res, "0.00 * -3.84 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural field2 Natural', async function() {
        await setCheckText(fd1, '10');
        await setCheckText(fd2, '3333333333333333333333333');
        await tapMult();
        await validateText(res, "10.00 * 3333333333333333333333333.00 = 33333333333333333333333330.00")
        await tapRst();
    });
    it('mult big field1 Natural field2 Natural 0', async function() {
        await setCheckText(fd1, '1111111111111111111111111');
        await setCheckText(fd2, '0');
        await tapMult();
        await validateText(res, "1111111111111111111111111.00 * 0.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural field2 Integer negative', async function() {
        await setCheckText(fd1, '2222222222222222222222222');
        await setCheckText(fd2, '-10');
        await tapMult();
        await validateText(res, "2222222222222222222222222.00 * -10.00 = -22222222222222222222222220.00")
        await tapRst();
    });
    it('mult big field1 Natural field2 Rational positive', async function() {
        await setCheckText(fd1, '10');
        await setCheckText(fd2, '3333333333333333333333333.44');
        await tapMult();
        await validateText(res, "10.00 * 3333333333333333333333333.84 = 66666666666666666666666668.88")
        await tapRst();
    });
    it('mult big field1 Natural field2 Rational negative', async function() {
        await setCheckText(fd1, '2');
        await setCheckText(fd2, '-3333333333333333333333333.44');
        await tapMult();
        2222222222222222222222222
        await validateText(res, "2.00 * -3333333333333333333333333.44 = -6666666666666666666666666.88")
        await tapRst();
    });
    it('mult big field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3333333333333333333333333.84');
        await tapMult();
        await validateText(res, "0.00 * 3333333333333333333333333.84 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural 0 field2 Rational negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3333333333333333333333333.84');
        await tapMult();
        await validateText(res, "0.00 * -3333333333333333333333333.84 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural 0 field2 Natural', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3333333333333333333333333');
        await tapMult();
        await validateText(res, "0.00 * 3333333333333333333333333.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural 0 field2 Natural 0', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '0');
        await tapMult();
        await validateText(res, "0.00 * 0.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural 0 field2 Integer negative', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '-3333333333333333333333333');
        await tapMult();
        await validateText(res, "0.00 * -3333333333333333333333333.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Natural 0 field2 Rational positive', async function() {
        await setCheckText(fd1, '0');
        await setCheckText(fd2, '3333333333333333333333333.84');
        await tapMult();
        await validateText(res, "0.00 * 3333333333333333333333333.84 = 0.00")
        await tapRst();
    });
    it('mult big field1 Integer negative field2 Natural', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '2');
        await tapMult();
        await validateText(res, "-3333333333333333333333333.00 * 2.00 = -6666666666666666666666666.00")
        await tapRst();
    });
    it('mult big field1 Integer negative field2 Natural 0', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '0');
        await tapMult();
        await validateText(res, "-3333333333333333333333333.00 * 0.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Integer negative field2 Integer negative', async function() {
        await setCheckText(fd1, '-4');
        await setCheckText(fd2, '-2222222222222222222222222');
        await tapMult();
        await validateText(res, "-4.00 * -2222222222222222222222222.00 = 8888888888888888888888888.00")
        await tapRst();
    });
    it('mult big field1 Integer negative field2 Rational negative', async function() {
        await setCheckText(fd1, '-3');
        await setCheckText(fd2, '-2222222222222222222222222.15');
        await tapMult();
        await validateText(res, "-3.00 * -2222222222222222222222222.15 = 6666666666666666666666666.45")
        await tapRst();
    });
    it('mult big field1 Integer negative field2 Rational positive', async function() {
        await setCheckText(fd1, '-3333333333333333333333333');
        await setCheckText(fd2, '2.15');
        await tapMult();
        await validateText(res, "-3333333333333333333333333.00 * 2.15 = -7166666666666666666666665.95")
        await tapRst();
    });
    it('mult big field1 Rational positive field2 Natural', async function() {
        await setCheckText(fd1, '3333333333333333333333333.25');
        await setCheckText(fd2, '2');
        await tapMult();
        await validateText(res, "3333333333333333333333333.25 * 2.00 = 6666666666666666666666666.50")
        await tapRst();
    });
    it('mult big field1 Rational positive field2 Natural 0', async function() {
        await setCheckText(fd1, '3333333333333333333333333.25');
        await setCheckText(fd2, '0');
        await tapMult();
        await validateText(res, "3333333333333333333333333.25 * 0.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Rational positive field2 Integer negative', async function() {
        await setCheckText(fd1, '33333333333333333333333333.25');
        await setCheckText(fd2, '-2');
        await tapMult();
        await validateText(res, "33333333333333333333333333.25 * -2.00 = -6666666666666666666666666.50")
        await tapRst();
    });
    it('mult big field1 Rational positive field2 Rational positive', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '2222222222222222222222222.10');
        await tapMult();
        await validateText(res, "3.25 * 2222222222222222222222222.35 = 7222222222222222222222221.83")
        await tapRst();
    });
    it('mult big field1 Rational positive field2 Rational negative', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '-2222222222222222222222222.35');
        await tapMult();
        await validateText(res, "3.25 * -2222222222222222222222222.35 = -7222222222222222222222221.83")
        await tapRst();
    });
    it('mult big field1 Rational negative field2 Natural', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '2');
        await tapMult();
        await validateText(res, "-3333333333333333333333333.25 * 2.00 = -6666666666666666666666666.50")
        await tapRst();
    });
    it('mult big field1 Rational negative field2 Natural 0', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '0');
        await tapMult();
        await validateText(res, "-3333333333333333333333333.25 * 0.00 = 0.00")
        await tapRst();
    });
    it('mult big field1 Rational negative field2 Integer negative', async function() {
        await setCheckText(fd1, '-3333333333333333333333333.25');
        await setCheckText(fd2, '-2');
        await tapMult();
        await validateText(res, "-3333333333333333333333333.25 * -2.00 = 6666666666666666666666666.50")
        await tapRst();
    });
    it('mult big field1 Rational negative field2 Rational positive', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '2222222222222222222222222.15');
        await tapMult();
        await validateText(res, "-3.25 * 2222222222222222222222222.15 = -7222222222222222222222221.83")
        await tapRst();
    });
    it('mult big field1 Rational negative field2 Rational negative', async function() {
        await setCheckText(fd1, '-3.25');
        await setCheckText(fd2, '-2222222222222222222222222.15');
        await tapMult();
        await validateText(res, "-3.25 * -2222222222222222222222222.15 = 7222222222222222222222221.83")
        await tapRst();
    });

    //round
    it('mult small field1 Rational positive field2 Rational positive Round up 9', async function() {
        await setCheckText(fd1, '3.23');
        await setCheckText(fd2, '2.13');
        await tapMult();
        await validateText(res, "3.23 * 2.13 = 6.88")
        await tapRst();
    });
    it('mult small field1 Rational positive field2 Rational positive Round up 5', async function() {
        await setCheckText(fd1, '3.25');
        await setCheckText(fd2, '2.50');
        await tapMult();
        await validateText(res, "3.25 * 2.50 = 8.13")
        await tapRst();
    });
    it('mult small field1 Rational positive field2 Rational positive Round down', async function() {
        await setCheckText(fd1, '3.21');
        await setCheckText(fd2, '2.20');
        await tapMult();
        await validateText(res, "3.21 * 2.20 = 7.06")
        await tapRst();
    });


});