class cStatus_hungry implements iStatus_style {

    private fish : cGame_object;
 
    constructor(fish : cGame_object) {
        this.fish = fish;
    }

    public style() {
        this.fish.status_element.style.color = `yellow`;
        this.fish.status_element.innerHTML = this.fish.name + " is hungry";
    }
}