var cFish = (function () {
    function cFish(_name, _position_x, _position_y, _hunger_level, _image) {
        var _this = this;
        this.draw = function () {
            console.log(_this.image);
            console.log(_this.position_x);
            console.log(_this.position_y);
            ctx.drawImage(_this.image, _this.position_x, _this.position_y, 20, 20);
        };
        this.swim = function () {
        };
        this.name = _name;
        this.position_x = _position_x;
        this.position_y = _position_y;
        this.hunger_level = _hunger_level;
        this.image = document.getElementById(_image);
    }
    return cFish;
}());
var canvas;
var ctx;
var fish_array = new Array();
function game_loop() {
    requestAnimationFrame(game_loop);
    var fish;
    for (var i = 0; i < fish_array.length; i++) {
        fish = fish_array[i];
        fish.draw();
    }
}
window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    fish_array.push(new cFish("Bob", 40, 20, 0, "gold-fish"));
    fish_array.push(new cFish("Dave", 5, 15, 0, "gold-fish"));
    fish_array.push(new cFish("Julia", 95, 30, 1, "gold-fish"));
    game_loop();
};
//# sourceMappingURL=main.js.map