/// <reference path="game_object.ts"/>

class cPlayer extends cGame_object
{
    public speed: number;
    public cooldown: number;

    private observers: iObserver[] = [];

    constructor(){
        super("player");

        this.speed = 0;
        this.cooldown = 0;
        this.position_x = 500;
        this.position_y = 10;

        window.addEventListener("keydown", (e:KeyboardEvent) => this.key_down(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.key_up(e));

        this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px)`
    }    

    public update():void {

        if (this.cooldown > 0) {
            this.cooldown = this.cooldown -1;
        }

        this.position_x = this.position_x + this.speed;
        this.player_window_collision();

        if(this.speed == -5) {
            this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px) scaleX(-1)`;
        } else if(this.speed == 5) {
            this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px)`;
        }
    }

    public add_observer(o:iObserver):void {
        this.observers.push(o)
    }

    public remove_observer(observer:iObserver):void {
        let index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
        
    public notify_observers():void {

        this.observers.forEach((observer) => {
            observer.notify()
        })
    }

    key_down(event:KeyboardEvent):void {

        switch(event.keyCode){
        case 37:
            this.speed = -5;
            break
        case 39:
            this.speed = 5;
            break
        case 32:
            if (this.cooldown == 0) {
                this.cooldown = 30
                cGame.get_instance().feed()
                break
            }            
        }
    }
    
    key_up(event:KeyboardEvent):void { 
        switch(event.keyCode){
        case 37:
            this.speed = 0;
            break
        case 39:
            this.speed = 0;
            break
        }
    } 
}