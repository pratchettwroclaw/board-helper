var b = require("../js/boardhelper.js").boardHelper;

// Distance calculation from StackOverflow: http://stackoverflow.com/a/1502821

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.y - p1.y);
  var dLong = rad(p2.x - p1.x);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.y)) * Math.cos(rad(p2.y)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

module.exports = {
    "parseSizeText" : function(test) {
        test.deepEqual(b.parseSizeText("2*2"),{width: 2, height: 2});
        test.deepEqual(b.parseSizeText("4*2"),{width: 4, height: 2});
        test.deepEqual(b.parseSizeText("2*4"),{width: 2, height: 4});
        test.deepEqual(b.parseSizeText("1029*9999999"),{width: 1029, height: 9999999});
        test.strictEqual(b.parseSizeText("4*2*10"),null);
        test.strictEqual(b.parseSizeText("cokolwiek"),null);
        test.strictEqual(b.parseSizeText("2*cokolwiek"),null);
        test.strictEqual(b.parseSizeText("cokolwiek*2"),null);
        test.done();
    },
    "generateBoardWrongInputGivesNull" : function(test) {
        test.deepEqual(b.generateBoard("whatever"),null);
        test.deepEqual(b.generateBoard("3*3*3"),null);
        test.done();
    },
    "generateBoardStressTest" : function(test) {
        var NUMBER_OF_TRIES = 1000;
        var DISTANCE = 2;
        for (var i=0;i<NUMBER_OF_TRIES;i++) {
            var a = b.generateBoard("10*10", 2, DISTANCE);
            test.ok(getDistance(a[0], a[1]) > DISTANCE);
            test.ok(a.length <= 2);
        }
        test.done();
    },
    "calcGoldStressTest": function(test) {
        var NUMBER_OF_TRIES = 10;
        var SUM_OF_GOLD = 10000;
        for (var i=0; i<NUMBER_OF_TRIES; i++) {
            var boards = b.calcGold([{},{}], SUM_OF_GOLD, 0.85);
            var sum = 0;
            boards.forEach(function(x){ sum = sum + x.gold;});
            test.equal(sum, SUM_OF_GOLD);
        }
        test.done();
    }
}
