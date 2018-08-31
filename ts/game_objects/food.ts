/// <reference path="game_object.ts"/>

class cFood extends cGame_object
{
    constructor(player : cGame_object){
        super("food");

        this.position_x = player.position_x + (player.element.clientWidth / 2);
        this.position_y = player.position_y + player.element.clientHeight;

        this.draw();
    }    

    public update() : void {
        this.position_y = this.position_y += 2;
        this.food_window_collision();
        this.draw();
    }

    public draw():void {
        this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px)`;
    }
}