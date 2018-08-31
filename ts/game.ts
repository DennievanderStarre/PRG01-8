class cGame 
{
    private static instance: cGame;

    private player: cPlayer;
    private fish_array: cGame_object[] = [];
    private food_array: cGame_object[] = [];

    private music: any;
    private sound: any;

    private constructor() {

        this.player = new cPlayer();

        this.fish_array.push(
            new cGold_fish(this.player),
            new cBlue_fish(this.player),
            new cSilver_fish(this.player)
        );

        this.music = new Howl({
            src: ['build/sounds/soundtrack.mp3'],
            loop: true
        });

        this.music.play();

        this.game_loop();
    }

    public static get_instance() {
        if(! cGame.instance) {
            cGame.instance = new cGame();
        }
        return cGame.instance;
    }
    
    public game_loop():void {

        let game_over = this.check_death_status();

        if( game_over == true) {
            this.music.pause();
            
            this.sound = new Howl({
                src: ['build/sounds/game_over.mp3'],
            });
    
            this.sound.play();
        } else {
            requestAnimationFrame(() => this.game_loop());
            
            this.player.update();

            for(let fish of this.fish_array) {
                fish.update();

                for(let food of this.food_array) {
                    food.update();
                    
                    if(this.check_collision(fish, food)) {    
                        if(fish.hunger_level >= 10) {
                            this.sound = new Howl({
                                src: ['build/sounds/feed.mp3'],
                            });
                            this.sound.play();

                            fish.hunger_level -= 10;
                            food.element.remove();
                        }
                    }
                }  
            }
        }
    }

    public feed() {
        this.sound = new Howl({
            src: ['build/sounds/food.mp3'],
        });

        this.sound.play();

        if(this.food_array.length >= 0) {
            this.food_array.push (
                new cFood(this.player)
            );
        }
        this.player.notify_observers();
    }

    public check_collision(fish : cGame_object, food: cGame_object) {
        let fish_bounding_box = fish.element.getBoundingClientRect(); 
        let food_bounding_box = food.element.getBoundingClientRect();
        
        return (fish_bounding_box.left <= food_bounding_box.right &&
            food_bounding_box.left <= fish_bounding_box.right &&
            fish_bounding_box.top <= food_bounding_box.bottom &&
            food_bounding_box.top <= fish_bounding_box.bottom)
    }

    public check_death_status() {
        let dead_fish = 0;
        for(let fish of this.fish_array) {
            if(fish.hunger_level >= fish.starvation_point) {
                dead_fish ++;
            }
        }
        if(dead_fish == 3) {
            let retry_button = document.createElement("button");
            retry_button.innerHTML = "Retry";
            retry_button.id = "retry_button";
            
            if(!document.getElementById("retry_button")) {
                let container = document.getElementById("sidebar");
                container.appendChild(retry_button);
            }

            retry_button.addEventListener('click', function() {
                window.location.reload();
            });

            return true;
        }
    }
}

window.onload = () => {
    cGame.get_instance();
}




