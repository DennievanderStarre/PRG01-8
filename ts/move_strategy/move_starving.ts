class cMove_starving implements iMove_behaviour {

    private fish : cGame_object;

    constructor(fish : cGame_object) {
        this.fish = fish;
    }

    public move() {
        this.fish.position_x = this.fish.position_x + (this.fish.speed / 4);
    }
}