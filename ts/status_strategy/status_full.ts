class cStatus_full implements iStatus_style {

    private fish : cGame_object;
 
    constructor(fish : cGame_object) {
        this.fish = fish;
    }

    public style() {
        this.fish.status_element.style.color = `green`;
        this.fish.status_element.innerHTML = this.fish.name + " is full";
    }
}