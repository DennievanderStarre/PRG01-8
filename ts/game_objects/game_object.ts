abstract class cGame_object 
{
    public element: HTMLElement;
    public container: HTMLElement;

    public status_element: HTMLElement;

    public name: string;
    public position_x: number;
    public position_y: number;
    public speed: number;
    public hunger_level: number;
    public hunger_rate: number;
    public starvation_point: number;

    public sound: any;

    public constructor( element: string ){
        
        this.element = document.createElement(element);
        this.container = document.getElementById("container");
        this.container.appendChild(this.element);
    }

    public player_window_collision():void {
        if(this.position_x + this.element.clientWidth > this.container.clientWidth) {
            this.position_x = this.container.clientWidth - this.element.clientWidth;
        }

        if (this.position_x < 0) {
            this.position_x = 0;
        }
    }
    
    public fish_window_collision():void {
        if(this.position_x + this.element.clientWidth > this.container.clientWidth) {
            this.position_x = this.container.clientWidth - this.element.clientWidth;
            this.speed = this.speed * -1;
        }

        if (this.position_x < 0) {
            this.position_x = 0;
            this.speed = this.speed * -1;
        }

        if (this.position_y < 0 ) {
            this.position_y = 0;
        }
    }

    public food_window_collision():void {
        if (this.position_y > (this.container.clientHeight - this.element.clientHeight)) {
            this.element.remove();
        }
    }

    public increase_hunger_level():void {      
        this.hunger_level += this.hunger_rate;
    }

    public notify():void {
        let standard_speed = this.speed;
        let speed_buff = 2;
        if( standard_speed == this.speed) {
            this.speed = this.speed * speed_buff;

            setTimeout(() => { 
                this.speed = this.speed / speed_buff;
            }, 120);
        }
    }

    public update():void {
        
    }

    public draw() {
        if(this.speed < 0) {
            this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px)`;
        } else if(this.speed > 0) {
            this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px) scaleX(-1)`;
        } else if(this.speed == 0) {
            this.element.style.transform = `translate(${this.position_x}px, ${this.position_y}px) scaleY(-1)`;
        }
    }
}