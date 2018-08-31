class cStatus_dead implements iStatus_style {

    private fish : cGame_object;
 
    constructor(fish : cGame_object) {
        this.fish = fish;
    }

    public style() {
        this.fish.status_element.style.color = `red`;
        this.fish.status_element.innerHTML = this.fish.name + " is dead :(";
    }
}