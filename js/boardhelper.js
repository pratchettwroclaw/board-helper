var boardHelper = {
    update: function() {
        boardHelper.render({
            board: boardHelper.generateEmptyBoard($("#board-size").val())
        });
    },
    render: function(b) {
        console.log(b);
        var template = $('#template').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, b);
        $('#board').html(rendered);
    },
    generateEmptyBoard: function(sizeText) {
        var retval = [];
        var size = boardHelper.parseSizeText(sizeText);
        if (size == null) return null;
        for (var i=0;i<size[1];i++) {
            retval[i] = new Array(size[0]);
        }
        return retval;
    },
    parseSizeText: function(sizeText) {
        var res = sizeText.split("*");
        if (res.length !== 2) return null;
        res[0] = parseInt(res[0]);
        res[1] = parseInt(res[1]);
        if (isNaN(res[0]) || isNaN(res[1])) return null;
        return res;
    }
}

module.exports.boardHelper = boardHelper;
