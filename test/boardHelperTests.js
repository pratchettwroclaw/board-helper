var b = require("../js/boardhelper.js");

module.exports = {
    "parseSizeText" : function(test) {
        test.deepEqual(b.boardHelper.parseSizeText("2*2"),[2,2]);
        test.deepEqual(b.boardHelper.parseSizeText("4*2"),[4,2]);
        test.deepEqual(b.boardHelper.parseSizeText("2*4"),[2,4]);
        test.deepEqual(b.boardHelper.parseSizeText("1029*9999999"),[1029,9999999]);
        test.strictEqual(b.boardHelper.parseSizeText("4*2*10"),null);
        test.strictEqual(b.boardHelper.parseSizeText("cokolwiek"),null);
        test.strictEqual(b.boardHelper.parseSizeText("2*cokolwiek"),null);
        test.strictEqual(b.boardHelper.parseSizeText("cokolwiek*2"),null);
        test.done();
    },
    "generateEmptyBoard" : function(test) {
        test.deepEqual(b.boardHelper.generateEmptyBoard("2*2"),[[,],[,]]);
        test.deepEqual(b.boardHelper.generateEmptyBoard("whatever"),null);
        test.done();
    }
}
