// Inspired on: http://codepen.io/Thibka/pen/mWGxNj (Vanilla JS)


// Interfaces
interface ColorTheme {
    background: string;
    colors: string[];
};

interface Coordinate2D {
    x: number;
    y: number;
}

interface WindowSize {
    width: number;
    height: number;
}

interface CanvasProps {
    width: number;
    height: number;
    center: Coordinate2D;
};


// Initialization Variables
const canvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
const birthPlatform = document.querySelector('body') as HTMLBodyElement;
const pageContent = document.querySelector(".hide") as HTMLElement;
const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
const animationFrame = getAnimationFrame();
const windowSize = getWindowSize();
const canvas = {
    _Width: windowSize.width,
    _Height: windowSize.height,
    _Center: getWindowCenter(windowSize),
    get width() {
        return this._Width;
    },
    get height() {
        return this._Height;
    },
    get center() {
        return this._Center;
    },
    set update(props: CanvasProps) {
        this._Width = props.width;
        this._Height = props.height;
        this._Center = props.center;
    },
}


// Configuration Variables
const stars: Star[] = [];
const starCount = getStarCount(canvas.width);
const createStarCount = 14;
const minStarCount = starCount - 1;
const starVelocity = 1;


// Runtime Variables
const basicAnimation = {
    currentState: true,
    get state() {
        return this.currentState;
    },
    set state(newState) {
        this.currentState = newState
    },
};
const endAnimation = {
    currentState: false,
    endAnimation() {
        pageContent.style.visibility = "visible";
    },
    get state() {
        return this.currentState;
    },
    set state(newState) {
        this.currentState = newState;
        if (newState === true) {
            this.endAnimation();
        };
    },
};


// Color Themes
const GalacticTeaTheme: ColorTheme = {
    /* Galactic Tea - http://www.colourlovers.com/palette/1586746/Galactic_Tea */
    background: '#080808',
    colors: [
        'rgba(74,49,89,',
        'rgba(130,91,109,',
        'rgba(185,136,131,',
        'rgba(249,241,204,',
    ],
};

const colorThemes = [
    GalacticTeaTheme,
];

const activeColorTheme = getColorTheme();


// Utility Functions

/**
 * Get the size of the browser window.
 * @return {WindowSize} Size of the window.
 */
function getWindowSize(): WindowSize {
    return {
        width: window.innerWidth || 
                document.documentElement.clientWidth || 
                document.body.clientWidth,
        height: window.innerHeight || 
                document.documentElement.clientHeight ||
                document.body.clientHeight,
    };
};


/**
 * Get the center point of the window.
 * @param  {WindowSize} window The window size.
 * @return {Coordinate2D} The center of the window.
 */
function getWindowCenter(window: WindowSize): Coordinate2D {
    return {
        x: ~~(window.width /2),
        y: ~~(window.height / 2),
    };
};


/**
 * Get the animation frame.
 * @return {function} A callback function to update the AnimationFrame.
 */
function getAnimationFrame() {
    return (window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame);
};


/**
 * Get the amount of stars to initialize.
 * @param  {number} canvasWidth The width of the canvas.
 * @return {150 | 120 | 80} Amount of stars in relation to the canvasWidth.
 */
function getStarCount(canvasWidth: number): 150 | 120 | 80 {
    if (canvasWidth > 1200) return 150;
    else if (canvasWidth > 800) return 120;
    else return 80;
};


/**
 * Get the color theme to be used.
 * @param  {number} chosenTheme The index of the theme to be used, 
 *                              If randomTheme is set to false.
 * @param  {boolean} randomTheme If true, a random theme will be returned.
 * @return {ColorTheme} The chosen color theme.
 */
function getColorTheme(chosenTheme: number = 0, randomTheme: boolean = false): ColorTheme {
    return (randomTheme) ?
                chooseRandom(colorThemes) :
                colorThemes[chosenTheme];
};


/**
 * Set the canvas properties.
 * @param  {HTMLCanvasElement} canvas The canvas element to set.
 * @param  {string} width The width to set on the canvas.
 * @param  {string} height The height to set on the canvas.
 */
function setCanvas(canvas: HTMLCanvasElement, width: string, height: string) {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.style.backgroundColor = activeColorTheme.background;
};


/**
 * Check if a number N is in a defined range.
 * @param  {number} n The number to check.
 * @param  {number[]} range The range of numbers to check.
 * @return {boolean} True if N is in the range, otherwise False.
 */
function inRange(n: number, range: number[]): boolean {
    range.sort((a, b) => a - b);
    return ( n >= range[0] && n <= range[range.length - 1]);
};


/**
 * Create a range of numbers.
 * @param  {number} start The number where the range should start.
 * @param  {number} end The number where the range should end.
 * @return {number[]} The range of numbers between start and end.
 */
function range(start: number, end: number): number[] {
    const range = [];
    while (start < end) {
        range.push(start);
        start++;
    };
    return range;
}


/**
 * Get a random integer between a defined minimum and maximum,
 * except any number inside the except array.
 * @param  {number} min Define a minimum limit for the random number.
 * @param  {number} max Define a maximum limit for the random number.
 * @param  {number[]} except Define a range between min and max which 
 *                           which the random number should not belong to.
 * @return {number} A random integer that follows defined restrictions.
 */
function getRandomInt(min: number, max: number, except: number[]=[]): number {
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return inRange(randomInt, except)
                    ? getRandomInt(min, max, except)
                    : randomInt;
};


/**
 * Get a random item from an array.
 * @param  {any[]} except The array to choose from.
 * @return {any} A random item of the given array.
 */
function chooseRandom(arr: any[]): any {
    return arr[getRandomInt(0, arr.length - 1)];
};


/**
 * Convert degrees to radians.
 * @param  {number} deg An angle in degrees.
 * @return {number} Converted angle in radians.
 */
function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
};


// Star
class Star {
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    velocity: number;
    alpha: number;
    alphaReduction: number;
    color: string;
    direction: number;
    turner: number;
    turnerAmp: number;
    age: number;
    changeDirectionFrequency: number;
    shadowBlur: number;
    center: boolean;
    hidden: boolean;

    /**
     * Initialize a new Star.
     * @param  {number} id The ID of the new Star.
     * @returns {Star} A Star Object.
     */
    constructor (id: number) {
        this.id = id;
        this.width = getRandomInt(3,6);
        this.height = this.width;
        this.x = getRandomInt(0, (canvas.width - this.width));
        this.y = getRandomInt(0, (canvas.height - this.height));
        this.velocity = (this.width <= 4) ? starVelocity * 2 : starVelocity;
        this.alpha = 1;
        this.alphaReduction = getRandomInt(1, 3) / 1000;
        this.color = chooseRandom(activeColorTheme.colors);
        this.direction = getRandomInt(0, 360);
        this.turner = chooseRandom([1, -1]);
        this.turnerAmp = getRandomInt(1, 2);
        this.age = 0;
        this.changeDirectionFrequency = getRandomInt(1, 200);
        this.shadowBlur = getRandomInt(5, 25);
        this.center = false;
        this.hidden = false;
    };

    /**
     * Supports behavior for the standard movement of the Star.
     */
    move() {
        const nextRawPoint: Coordinate2D = {
            x: this.x + Math.cos(degToRad(this.direction)) * this.velocity,
            y: this.y + Math.sin(degToRad(this.direction)) * this.velocity,
        };

        const nextPoint = this.marginBounce(nextRawPoint);

        this.x = nextPoint.x;
        this.y = nextPoint.y;

        this.age++;
        this.reduceAlpha();
        
        this.changeDirection();

        this.render();
    };

    /**
     * Supports behavior to move the Star towards the center of the universe.
     * Set this.center to true if the star is in the center.
     */
    moveToCenter() {
        this.velocity = starVelocity * 5.8;
        this.directionToCenter();

        const nextPoint: Coordinate2D = {
            x: this.x + Math.cos(degToRad(this.direction)) * this.velocity,
            y: this.y + Math.sin(degToRad(this.direction)) * this.velocity,
        };

        this.x = nextPoint.x;
        this.y = nextPoint.y;

        this.inCenter(canvas.center);

        this.age++;
        this.reduceAlpha();

        this.render();
    };

    /**
     * Supports behavior to move the Star towards infinite.
     * Set this.hidden to true once the star is outside of the observable universe.
     */
    moveStraight() {
        this.velocity = starVelocity * getRandomInt(7,70);
        
        const nextPoint: Coordinate2D = {
            x: this.x + Math.cos(degToRad(this.direction)) * this.velocity,
            y: this.y + Math.sin(degToRad(this.direction)) * this.velocity,
        };

        this.x = nextPoint.x;
        this.y = nextPoint.y;

        this.isHidden();

        this.age++;
        this.reduceAlpha();

        this.render()
    };

    /**
     * Check if the expected next point will move out of the observable
     * universe, if so bounce the star back into the it.
     * @param {Coordinate2D} nextPoint The next Point where the star
     *                                 is expected to move to.
     * @returns {Coordinate2D} The definitive next Point where the
     *                         star will move to.
     */
    marginBounce(nextPoint: Coordinate2D): Coordinate2D {
        if (nextPoint.x >= (canvas.width - this.width)) {
            nextPoint.x = canvas.width - this.width;
            this.direction = getRandomInt(130, 230);
        } else if (nextPoint.x <= 0) {
            nextPoint.x = 0;
            this.direction = getRandomInt(0, 360, [60, 300]);
        } else if (nextPoint.y >= (canvas.height - this.height)) {
            nextPoint.y = canvas.height - this.height;
            this.direction = getRandomInt(220, 320);
        } else if (nextPoint.y <= 0) {
            nextPoint.y = 0;
            this.direction = getRandomInt(40, 140);
        };
        return nextPoint;
    };

    /**
     * When age is equal to the changeDirectionFrequency,
     * change the direction of the star.
     */
    changeDirection() {
        if (this.age == this.changeDirectionFrequency) {
            this.turner = (this.turner === -1) ? 1 : -1;
            this.turnerAmp = getRandomInt(1, 2);
            this.age = 0;
            this.changeDirectionFrequency = getRandomInt(1, 200);
        };

        this.direction += this.turner * this.turnerAmp;
    };

    /**
     * Find the direction to the center based on the current
     * point in the universe where the star stands in.
     */
    directionToCenter() {
        const center = canvas.center;
        // Find direction to center
        if(this.x > center.x && this.y > center.y) {
            this.direction = getRandomInt(-5,5) + (Math.atan(Math.abs(this.y - center.y) / 
                                        Math.abs(this.x - center.x)) * (180 / Math.PI)) + 180;
        } else if (this.x < center.x && this.y > center.y) {
            this.direction = getRandomInt(-5,5) + 360 - (Math.atan(Math.abs(this.y - center.y) / 
                                        Math.abs(this.x - center.x)) * (180 / Math.PI));
        } else if (this.x < center.x && this.y < center.y) {
            this.direction = getRandomInt(-5,5) + Math.atan(Math.abs(this.y - center.y) / 
                                        Math.abs(this.x - center.x)) * (180 / Math.PI);
        } else if (this.x > center.x && this.y < center.y) {
            this.direction = getRandomInt(-5,5) + 180 - (Math.atan(Math.abs(this.y - center.y) / 
                                        Math.abs(this.x - center.x)) * (180 / Math.PI));
        };
    };

    /**
     * If currently in the center, set this.center to true.
     * @param {Coordinate2D} center The center of the observable universe.
     */
    inCenter(center: Coordinate2D) {
        if (inRange(~~this.x, range(center.x - 5, center.x + 5)) &&
            inRange(~~this.y, range(center.y - 5, center.y + 5))) {
            this.center = true;
        };
    };

    /**
     * If currently hidden, set this.hidden to true.
     */
    isHidden() {
        if (this.x > canvas.width || this.x < 0 || this.y < 0 || this.y > canvas.height) {
            this.hidden = true;
        };
    };

    /**
     * Reduce the Alpha. If Alpha becomes negative, die.
     */
    reduceAlpha() {
        if (this.id > minStarCount) {
            this.alpha -= this.alphaReduction;
            if (this.alpha <= 0) return this.die();
        };
    };

    /**
     * Render the current state of the star on the universe.
     */
    render() {
        context.beginPath();

        context.fillStyle = `${this.color}${this.alpha})`;
        context.arc(this.x + (this.width / 2),
                    this.y + (this.height / 2),
                    this.width / 2, 0, 2 * Math.PI, false);
        context.shadowColor = `${this.color}${this.alpha})`;
        context.shadowBlur = this.shadowBlur;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fill();
    };

    /**
     * Initialize Self-destruction mechanism.
     */
    die() {
        delete stars[this.id];
    };

};


// Animations

/**
 * Animates the standard movement of the Star.
 */
function animateBasic() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    const starsOrder = [...stars.filter(a => !!a)];

    for (const star of starsOrder) {
        try {
            stars[star.id - 1].move();
        } catch {};
    };

    if (basicAnimation.state) animationFrame(animateBasic);
};


/**
 * Animates the Star moving towards the center of the universe.
 * @returns Call animateExplosion once all stars are in center.
 */
function animateBigBang() {
    basicAnimation.state = false;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    const starsOrder = [...stars.filter(a => !!a)];

    const ready = countCentered(starsOrder);
    if (ready === starsOrder.length) return animateExplosion();

    for (const star of starsOrder) {
        /*Catch the possibility that a Star will die*/
        try {
            stars[star.id - 1].moveToCenter();
        } catch {};
    };

    animationFrame(animateBigBang);
};


/**
 * Animates the Star moving towards infinite.
 * @returns Set endAnimation.state to true once all of the
 *          Stars are outside of the observable universe.
 */
function animateExplosion() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    const starsOrder = [...stars.filter(a => !!a)];

    const ready = countHidden(starsOrder);
    if (ready === starsOrder.length) return endAnimation.state = true;

    for (const star of starsOrder) {
        /*Catch the possibility that a Star will die*/
        try {
            stars[star.id - 1].moveStraight();
        } catch {};
    };

    if (!endAnimation.state) animationFrame(animateExplosion);
};


// Integration Functions

/**
 * Initializes the population of Stars based of starCount config.
 */
function initializePopulation() {
    for (let i = 1; i <= starCount; i++) {
        stars.push(new Star(i));
    };
};


/**
 * Gives birth to a new population of Stars.
 * @param  {MouseEvent} event The mouseEvent object.
 * @param  {number} quantity The size of the new population.
 */
function giveBirth(event: MouseEvent, quantity: number) {
    const index = stars.length + 1;
    stars.push(new Star(index));
    stars[index - 1].x = event.pageX;
    stars[index - 1].y = event.pageY;

    if (quantity > 1) giveBirth(event, quantity - 1);
};


/**
 * Counts the amount of stars currently centered in the universe.
 * @param  {Star[]} array The array of Stars.
 * @return  {number} The amount of stars in the center.
 */
function countCentered(array: Star[]): number {
    let ready = 0;
    for (const star of array) {
        if (star.center) {
            ready++;
        };
    };
    return ready;
};


/**
 * Counts the amount of Stars currently outside of the observable universe.
 * @param  {Star[]} array The array of Stars.
 * @return  {number} The amount of stars outside of the observable universe.
 */
function countHidden(array: Star[]) {
    let ready = 0;
    for (const star of array) {
        if (star.hidden) {
            ready++;
        };
    };
    return ready;
};


// Event Listeners

/**
 * Initializes the default behavior as the browser window loads.
 * If the class "hide" is set, automatically animate the Big Bang.
 */
window.onload = () => {
    birthPlatform.style.overflow = "hidden";
    setCanvas(canvasElement, String(windowSize.width), String(windowSize.height));

    initializePopulation();
    animateBasic();
    if (pageContent) {
        // If "hide" class is present, animate the Big Bang
        animateBigBang();
    };
};


/**
 * Enables the creation of new Star populations by clicking
 * on the birthPlatform.
 */
birthPlatform.onclick = (e: MouseEvent) => {
    giveBirth(e, createStarCount);
};


/**
 * Resets the canvas element to adjust to the window when it is resized.
 */
birthPlatform.onresize = () => {
    const windowSize = getWindowSize();
    canvas.update = {
        width: windowSize.width,
        height: windowSize.height,
        center: getWindowCenter(windowSize),
    };
    setCanvas(canvasElement, String(windowSize.width), String(windowSize.height));
};
