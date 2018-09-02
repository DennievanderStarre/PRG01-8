class KeyInput {
    public keyCallback: { [keycode: number]: () => void; } = {};
    public keyDown: { [keycode: number]: boolean; } = {};
    private static instance : KeyInput;

    private constructor() {
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    };

    public static getInstance() {
        if (! KeyInput.instance) {
            KeyInput.instance = new KeyInput()
        }
        return KeyInput.instance
    };

    public keyboardDown = (event: KeyboardEvent): void => {
        event.preventDefault();
        this.keyDown[event.keyCode] = true;
    };

    public keyboardUp = (event: KeyboardEvent): void => {
        this.keyDown[event.keyCode] = false;
    };

    public addKeycodeCallback = (keycode: number, f: () => void): void => {
        this.keyCallback[keycode] = f;
        this.keyDown[keycode] = false;
    };

    public inputLoop = (): void => {
        for (let key in this.keyDown) {
            let isPressed: boolean = this.keyDown[key];
            if (isPressed) {
                let callback: () => void = this.keyCallback[key];
                if (callback != null) {
                    callback();
                }
            }
        }
    }
}
