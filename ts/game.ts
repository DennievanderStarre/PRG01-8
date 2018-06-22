let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D; 
let fish_array: Array<cFish> = new Array<cFish>();

function game_loop() {
    requestAnimationFrame(game_loop);

    let fish:cFish;
    for(let i:number = 0; i < fish_array.length; i++) {
        fish = fish_array[i];
        fish.draw();
        //fish.swim();
    }
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById("canvas");
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

    fish_array.push(new cFish("Bob", 40, 20, 0, "gold-fish"));
    fish_array.push(new cFish("Dave", 5, 15, 0, "gold-fish"));
    fish_array.push(new cFish("Julia", 95, 30, 1, "gold-fish"));

    game_loop();
}
