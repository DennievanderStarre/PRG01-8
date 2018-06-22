class cFish {
    private name: string;
    private position_x: number;
    private position_y: number;
    private hunger_level: number;
    public image: HTMLImageElement;

    constructor(_name: string, _position_x: number, _position_y: number, _hunger_level: number, _image: string){
        this.name = _name;
        this.position_x = _position_x;
        this.position_y = _position_y;
        this.hunger_level = _hunger_level;
        this.image = <HTMLImageElement>document.getElementById(_image);
    }
    
    public draw = () : void => {
        console.log(this.image);
        console.log(this.position_x);
        console.log(this.position_y);
        ctx.drawImage(this.image, this.position_x, this.position_y, 20, 20);
    }

    public swim = () : void => {

    }
}