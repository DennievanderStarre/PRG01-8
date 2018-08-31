var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cGame = (function () {
    function cGame() {
        this.fish_array = [];
        this.food_array = [];
        this.player = new cPlayer();
        this.fish_array.push(new cGold_fish(this.player), new cBlue_fish(this.player), new cSilver_fish(this.player));
        this.music = new Howl({
            src: ['build/sounds/soundtrack.mp3'],
            loop: true
        });
        this.music.play();
        this.game_loop();
    }
    cGame.get_instance = function () {
        if (!cGame.instance) {
            cGame.instance = new cGame();
        }
        return cGame.instance;
    };
    cGame.prototype.game_loop = function () {
        var _this = this;
        var game_over = this.check_death_status();
        if (game_over == true) {
            this.music.pause();
            this.sound = new Howl({
                src: ['build/sounds/game_over.mp3']
            });
            this.sound.play();
        }
        else {
            requestAnimationFrame(function () { return _this.game_loop(); });
            this.player.update();
            for (var _i = 0, _a = this.fish_array; _i < _a.length; _i++) {
                var fish = _a[_i];
                fish.update();
                for (var _b = 0, _c = this.food_array; _b < _c.length; _b++) {
                    var food = _c[_b];
                    food.update();
                    if (this.check_collision(fish, food)) {
                        if (fish.hunger_level >= 10) {
                            this.sound = new Howl({
                                src: ['build/sounds/feed.mp3']
                            });
                            this.sound.play();
                            fish.hunger_level -= 10;
                            food.element.remove();
                        }
                    }
                }
            }
        }
    };
    cGame.prototype.feed = function () {
        this.sound = new Howl({
            src: ['build/sounds/food.mp3']
        });
        this.sound.play();
        if (this.food_array.length >= 0) {
            this.food_array.push(new cFood(this.player));
        }
        this.player.notify_observers();
    };
    cGame.prototype.check_collision = function (fish, food) {
        var fish_bounding_box = fish.element.getBoundingClientRect();
        var food_bounding_box = food.element.getBoundingClientRect();
        return (fish_bounding_box.left <= food_bounding_box.right &&
            food_bounding_box.left <= fish_bounding_box.right &&
            fish_bounding_box.top <= food_bounding_box.bottom &&
            food_bounding_box.top <= fish_bounding_box.bottom);
    };
    cGame.prototype.check_death_status = function () {
        var dead_fish = 0;
        for (var _i = 0, _a = this.fish_array; _i < _a.length; _i++) {
            var fish = _a[_i];
            if (fish.hunger_level >= fish.starvation_point) {
                dead_fish++;
            }
        }
        if (dead_fish == 3) {
            var retry_button = document.createElement("button");
            retry_button.innerHTML = "Retry";
            retry_button.id = "retry_button";
            if (!document.getElementById("retry_button")) {
                var container = document.getElementById("sidebar");
                container.appendChild(retry_button);
            }
            retry_button.addEventListener('click', function () {
                window.location.reload();
            });
            return true;
        }
    };
    return cGame;
}());
window.onload = function () {
    cGame.get_instance();
};
var cGame_object = (function () {
    function cGame_object(element) {
        this.element = document.createElement(element);
        this.container = document.getElementById("container");
        this.container.appendChild(this.element);
    }
    cGame_object.prototype.player_window_collision = function () {
        if (this.position_x + this.element.clientWidth > this.container.clientWidth) {
            this.position_x = this.container.clientWidth - this.element.clientWidth;
        }
        if (this.position_x < 0) {
            this.position_x = 0;
        }
    };
    cGame_object.prototype.fish_window_collision = function () {
        if (this.position_x + this.element.clientWidth > this.container.clientWidth) {
            this.position_x = this.container.clientWidth - this.element.clientWidth;
            this.speed = this.speed * -1;
        }
        if (this.position_x < 0) {
            this.position_x = 0;
            this.speed = this.speed * -1;
        }
        if (this.position_y < 0) {
            this.position_y = 0;
        }
    };
    cGame_object.prototype.food_window_collision = function () {
        if (this.position_y > (this.container.clientHeight - this.element.clientHeight)) {
            this.element.remove();
        }
    };
    cGame_object.prototype.increase_hunger_level = function () {
        this.hunger_level += this.hunger_rate;
    };
    cGame_object.prototype.notify = function () {
        var _this = this;
        var standard_speed = this.speed;
        var speed_buff = 2;
        if (standard_speed == this.speed) {
            this.speed = this.speed * speed_buff;
            setTimeout(function () {
                _this.speed = _this.speed / speed_buff;
            }, 120);
        }
    };
    cGame_object.prototype.update = function () {
    };
    cGame_object.prototype.draw = function () {
        if (this.speed < 0) {
            this.element.style.transform = "translate(" + this.position_x + "px, " + this.position_y + "px)";
        }
        else if (this.speed > 0) {
            this.element.style.transform = "translate(" + this.position_x + "px, " + this.position_y + "px) scaleX(-1)";
        }
        else if (this.speed == 0) {
            this.element.style.transform = "translate(" + this.position_x + "px, " + this.position_y + "px) scaleY(-1)";
        }
    };
    return cGame_object;
}());
var cBlue_fish = (function (_super) {
    __extends(cBlue_fish, _super);
    function cBlue_fish(_player) {
        var _this = _super.call(this, "blue_fish") || this;
        _this.name = "Rainbow";
        _this.speed = 2;
        _this.hunger_level = 0;
        _this.hunger_rate = 1;
        _this.starvation_point = 90;
        _this.position_x = 20;
        _this.position_y = 350;
        _this.move_behaviour = new cMove_full(_this);
        _this.status = new cStatus_full(_this);
        setInterval(function () {
            _this.increase_hunger_level();
        }, 1000);
        _this.player = _player;
        _this.player.add_observer(_this);
        _this.status_element = document.createElement("fish_status");
        _this.status_element.innerHTML = _this.name + " is full";
        _this.status_container = document.getElementById("sidebar");
        _this.status_container.appendChild(_this.status_element);
        return _this;
    }
    cBlue_fish.prototype.update = function () {
        if (this.hunger_level < this.starvation_point / 4) {
            this.move_behaviour = new cMove_full(this);
            this.status = new cStatus_full(this);
        }
        else if (this.hunger_level >= this.starvation_point) {
            this.speed = 0;
            this.move_behaviour = new cMove_dead(this);
            this.status = new cStatus_dead(this);
            this.player.remove_observer(this);
        }
        else if (this.hunger_level >= this.starvation_point / 2) {
            this.move_behaviour = new cMove_starving(this);
            this.status = new cStatus_starving(this);
        }
        else if (this.hunger_level >= this.starvation_point / 4) {
            this.move_behaviour = new cMove_hungry(this);
            this.status = new cStatus_hungry(this);
        }
        this.move_behaviour.move();
        this.status.style();
        this.fish_window_collision();
        this.draw();
    };
    return cBlue_fish;
}(cGame_object));
var cFood = (function (_super) {
    __extends(cFood, _super);
    function cFood(player) {
        var _this = _super.call(this, "food") || this;
        _this.position_x = player.position_x + (player.element.clientWidth / 2);
        _this.position_y = player.position_y + player.element.clientHeight;
        _this.draw();
        return _this;
    }
    cFood.prototype.update = function () {
        this.position_y = this.position_y += 2;
        this.food_window_collision();
        this.draw();
    };
    cFood.prototype.draw = function () {
        this.element.style.transform = "translate(" + this.position_x + "px, " + this.position_y + "px)";
    };
    return cFood;
}(cGame_object));
var cGold_fish = (function (_super) {
    __extends(cGold_fish, _super);
    function cGold_fish(_player) {
        var _this = _super.call(this, "gold_fish") || this;
        _this.name = "Hornygold";
        _this.speed = 4;
        _this.hunger_level = 0;
        _this.hunger_rate = 1;
        _this.starvation_point = 60;
        _this.position_x = 20;
        _this.position_y = 200;
        _this.move_behaviour = new cMove_full(_this);
        _this.status = new cStatus_full(_this);
        setInterval(function () {
            _this.increase_hunger_level();
        }, 1000);
        _this.player = _player;
        _this.player.add_observer(_this);
        _this.status_element = document.createElement("fish_status");
        _this.status_element.innerHTML = _this.name + " is full";
        _this.status_container = document.getElementById("sidebar");
        _this.status_container.appendChild(_this.status_element);
        return _this;
    }
    cGold_fish.prototype.update = function () {
        if (this.hunger_level < this.starvation_point / 4) {
            this.move_behaviour = new cMove_full(this);
            this.status = new cStatus_full(this);
        }
        else if (this.hunger_level >= this.starvation_point) {
            this.speed = 0;
            this.move_behaviour = new cMove_dead(this);
            this.status = new cStatus_dead(this);
            this.player.remove_observer(this);
        }
        else if (this.hunger_level >= this.starvation_point / 2) {
            this.move_behaviour = new cMove_starving(this);
            this.status = new cStatus_starving(this);
        }
        else if (this.hunger_level >= this.starvation_point / 4) {
            this.move_behaviour = new cMove_hungry(this);
            this.status = new cStatus_hungry(this);
        }
        this.move_behaviour.move();
        this.status.style();
        this.fish_window_collision();
        this.draw();
    };
    return cGold_fish;
}(cGame_object));
var cPlayer = (function (_super) {
    __extends(cPlayer, _super);
    function cPlayer() {
        var _this = _super.call(this, "player") || this;
        _this.observers = [];
        _this.speed = 0;
        _this.cooldown = 0;
        _this.position_x = 500;
        _this.position_y = 10;
        window.addEventListener("keydown", function (e) { return _this.key_down(e); });
        window.addEventListener("keyup", function (e) { return _this.key_up(e); });
        _this.element.style.transform = "translate(" + _this.position_x + "px, " + _this.position_y + "px)";
        return _this;
    }
    cPlayer.prototype.update = function () {
        if (this.cooldown > 0) {
            this.cooldown = this.cooldown - 1;
        }
        this.position_x = this.position_x + this.speed;
        this.player_window_collision();
        if (this.speed == -5) {
            this.element.style.transform = "translate(" + this.position_x + "px, " + this.position_y + "px) scaleX(-1)";
        }
        else if (this.speed == 5) {
            this.element.style.transform = "translate(" + this.position_x + "px, " + this.position_y + "px)";
        }
    };
    cPlayer.prototype.add_observer = function (o) {
        this.observers.push(o);
    };
    cPlayer.prototype.remove_observer = function (observer) {
        var index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    };
    cPlayer.prototype.notify_observers = function () {
        this.observers.forEach(function (observer) {
            observer.notify();
        });
    };
    cPlayer.prototype.key_down = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speed = -5;
                break;
            case 39:
                this.speed = 5;
                break;
            case 32:
                if (this.cooldown == 0) {
                    this.cooldown = 30;
                    cGame.get_instance().feed();
                    break;
                }
        }
    };
    cPlayer.prototype.key_up = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speed = 0;
                break;
            case 39:
                this.speed = 0;
                break;
        }
    };
    return cPlayer;
}(cGame_object));
var cSilver_fish = (function (_super) {
    __extends(cSilver_fish, _super);
    function cSilver_fish(_player) {
        var _this = _super.call(this, "silver_fish") || this;
        _this.name = "Silver";
        _this.speed = 6;
        _this.hunger_level = 0;
        _this.hunger_rate = 2;
        _this.starvation_point = 120;
        _this.position_x = 20;
        _this.position_y = 500;
        _this.move_behaviour = new cMove_full(_this);
        _this.status = new cStatus_full(_this);
        setInterval(function () {
            _this.increase_hunger_level();
        }, 1000);
        _this.player = _player;
        _this.player.add_observer(_this);
        _this.status_element = document.createElement("fish_status");
        _this.status_element.innerHTML = _this.name + " is full";
        _this.status_container = document.getElementById("sidebar");
        _this.status_container.appendChild(_this.status_element);
        return _this;
    }
    cSilver_fish.prototype.update = function () {
        if (this.hunger_level < this.starvation_point / 4) {
            this.move_behaviour = new cMove_full(this);
            this.status = new cStatus_full(this);
        }
        else if (this.hunger_level >= this.starvation_point) {
            this.speed = 0;
            this.move_behaviour = new cMove_dead(this);
            this.status = new cStatus_dead(this);
            this.player.remove_observer(this);
        }
        else if (this.hunger_level >= this.starvation_point / 2) {
            this.move_behaviour = new cMove_starving(this);
            this.status = new cStatus_starving(this);
        }
        else if (this.hunger_level >= this.starvation_point / 4) {
            this.move_behaviour = new cMove_hungry(this);
            this.status = new cStatus_hungry(this);
        }
        this.move_behaviour.move();
        this.status.style();
        this.fish_window_collision();
        this.draw();
    };
    return cSilver_fish;
}(cGame_object));
var cMove_dead = (function () {
    function cMove_dead(fish) {
        this.fish = fish;
    }
    cMove_dead.prototype.move = function () {
        this.fish.position_y = this.fish.position_y - 1;
    };
    return cMove_dead;
}());
var cMove_full = (function () {
    function cMove_full(fish) {
        this.fish = fish;
    }
    cMove_full.prototype.move = function () {
        this.fish.position_x = this.fish.position_x + this.fish.speed;
    };
    return cMove_full;
}());
var cMove_hungry = (function () {
    function cMove_hungry(fish) {
        this.fish = fish;
    }
    cMove_hungry.prototype.move = function () {
        this.fish.position_x = this.fish.position_x + (this.fish.speed / 2);
    };
    return cMove_hungry;
}());
var cMove_starving = (function () {
    function cMove_starving(fish) {
        this.fish = fish;
    }
    cMove_starving.prototype.move = function () {
        this.fish.position_x = this.fish.position_x + (this.fish.speed / 4);
    };
    return cMove_starving;
}());
var cStatus_dead = (function () {
    function cStatus_dead(fish) {
        this.fish = fish;
    }
    cStatus_dead.prototype.style = function () {
        this.fish.status_element.style.color = "red";
        this.fish.status_element.innerHTML = this.fish.name + " is dead :(";
    };
    return cStatus_dead;
}());
var cStatus_full = (function () {
    function cStatus_full(fish) {
        this.fish = fish;
    }
    cStatus_full.prototype.style = function () {
        this.fish.status_element.style.color = "green";
        this.fish.status_element.innerHTML = this.fish.name + " is full";
    };
    return cStatus_full;
}());
var cStatus_hungry = (function () {
    function cStatus_hungry(fish) {
        this.fish = fish;
    }
    cStatus_hungry.prototype.style = function () {
        this.fish.status_element.style.color = "yellow";
        this.fish.status_element.innerHTML = this.fish.name + " is hungry";
    };
    return cStatus_hungry;
}());
var cStatus_starving = (function () {
    function cStatus_starving(fish) {
        this.fish = fish;
    }
    cStatus_starving.prototype.style = function () {
        this.fish.status_element.style.color = "orange";
        this.fish.status_element.innerHTML = this.fish.name + " is starving!";
    };
    return cStatus_starving;
}());
//# sourceMappingURL=main.js.map