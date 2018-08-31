class cMove_dead implements iMove_behaviour {

    private fish : cGame_object;

    constructor(fish : cGame_object) {
        this.fish = fish;
    }

    public move() {
        this.fish.position_y = this.fish.position_y - 1;
    }
}