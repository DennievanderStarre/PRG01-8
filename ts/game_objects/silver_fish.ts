/// <reference path="game_object.ts"/>

class cSilver_fish extends cGame_object
{
    private move_behaviour: iMove_behaviour;
    private status: iStatus_style;
    private player: cPlayer;

    private status_container: HTMLElement;

    constructor( _player : cPlayer){
        super("silver_fish");

        this.name = "Silver";
        this.speed = 6;
        this.hunger_level = 0;
        this.hunger_rate = 2;
        this.starvation_point = 120;

        this.position_x = 20;
        this.position_y = 500;

        this.move_behaviour = new cMove_full(this);
        this.status = new cStatus_full(this);

        setInterval(() => { 
            this.increase_hunger_level();
        }, 1000);

        this.player = _player;
        this.player.add_observer(this);

        this.status_element = document.createElement("fish_status");
        this.status_element.innerHTML = this.name + " is full";
        this.status_container = document.getElementById("sidebar");
        this.status_container.appendChild(this.status_element);
    }    

    public update() : void {
        if(this.hunger_level < this.starvation_point / 4) {
            this.move_behaviour = new cMove_full(this);
            this.status = new cStatus_full(this);
        } else if(this.hunger_level >= this.starvation_point) {
            this.speed = 0;
            this.move_behaviour = new cMove_dead(this);
            this.status = new cStatus_dead(this);
            this.player.remove_observer(this);
        } else if(this.hunger_level >= this.starvation_point / 2) {
            this.move_behaviour = new cMove_starving(this);
            this.status = new cStatus_starving(this);
        } else if(this.hunger_level >= this.starvation_point / 4) {
            this.move_behaviour = new cMove_hungry(this);
            this.status = new cStatus_hungry(this);
        }

        this.move_behaviour.move();
        this.status.style();
        this.fish_window_collision();
        this.draw();
    }
}