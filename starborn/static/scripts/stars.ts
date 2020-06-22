// Inspired on: (Vanilla JS) http://codepen.io/Thibka/pen/mWGxNj

interface ColorTheme {
    background: string;
    colors: string[];
};

interface Coordinates2D {
    x: number;
    y: number;
};

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const birthPlatform = document.querySelector('body') as HTMLBodyElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const [canvasWidth, canvasHeight] = getCanvas();
const animationFrame = getAnimationFrame();

const stars: Star[] = [];
const starCount = 150;
const createStarCount = 14;
const minStarCount = 149;
const starVelocity = 1;

/* Galactic Tea - http://www.colourlovers.com/palette/1586746/Galactic_Tea */
const GalacticTeaTheme: ColorTheme = {
    background: '#080808',
    colors: [
        'rgba(74,49,89,',
        'rgba(130,91,109,',
        'rgba(185,136,131,',
        'rgba(249,241,204,',
    ],
};

const colorThemes: ColorTheme[] = [
    GalacticTeaTheme,
];

const randomColorTheme = false;

const usingColorTheme: ColorTheme = (randomColorTheme) ?
                                    chooseRandom(colorThemes) :
                                    colorThemes[0]; // Choosen Color Theme


//RunTime Variables
let basicAnimation = true;
let endAnimation = false;


function getCanvas() {
    const canvasWidth = (window.innerWidth || 
                         document.documentElement.clientWidth || 
                         document.body.clientWidth);
    const canvasHeight = (window.innerHeight || 
                          document.documentElement.clientHeight ||
                          document.body.clientHeight);

    return [String(canvasWidth), String(canvasHeight)];
};


function getAnimationFrame() {
    return(window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame);
};


function setCanvas(canvas: HTMLCanvasElement, width: string, height: string) {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.style.backgroundColor = usingColorTheme.background;
};


function inRange(n: number, range: number[]): boolean {
    range.sort((a, b) => a - b);
    return ( n >= range[0] && n <= range[range.length - 1]);
};


function range(start: number, end: number): number[] {
    const range = [];
    while (start < end) {
        range.push(start);
        start++;
    };
    return range;
}


function getRandomInt(min: number, max: number, exept: number[]=[]): number {
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (inRange(randomInt, exept)) {
        return getRandomInt(min, max, exept);
    } else {
        return randomInt;
    }
};


function chooseRandom(arr: any[]) {
    return arr[getRandomInt(0, arr.length - 1)];
};


function isEven(n: number): boolean {
    return !(n % 2);
};


function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
};


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

    constructor (id: number) {
        this.id = id;
        this.width = getRandomInt(3,6);
        this.height = this.width;
        this.x = getRandomInt(0, (canvas.width - this.width));
        this.y = getRandomInt(0, (canvas.height - this.height));
        this.velocity = (this.width <= 4) ? starVelocity * 2 : starVelocity;
        this.alpha = 1;
        this.alphaReduction = getRandomInt(1, 3) / 1000;
        this.color = chooseRandom(usingColorTheme.colors);
        this.direction = getRandomInt(0, 360);
        this.turner = chooseRandom([1, -1]);
        this.turnerAmp = getRandomInt(1, 2);
        this.age = 0;
        this.changeDirectionFrequency = getRandomInt(1, 200);
        this.shadowBlur = getRandomInt(5, 25);
        this.center = false;
        this.hidden = false;
    };

    move() {
        let next_x = this.x + Math.cos(degToRad(this.direction)) * this.velocity;
        let next_y = this.y + Math.sin(degToRad(this.direction)) * this.velocity;

        // Behavior when hitting Canvas limits
        if (next_x >= (canvas.width - this.width)) {
            next_x = canvas.width - this.width;
            this.direction = getRandomInt(130, 230);
        } else if (next_x <= 0) {
            next_x = 0;
            this.direction = getRandomInt(0, 360, [60, 300]);
        } else if (next_y >= (canvas.height - this.height)) {
            next_y = canvas.height - this.height;
            this.direction = getRandomInt(220, 320);
        } else if (next_y <= 0) {
            next_y = 0;
            this.direction = getRandomInt(40, 140);
        };

        this.x = next_x;
        this.y = next_y;

        this.age++;
        
        if (this.age == this.changeDirectionFrequency) {
            this.turner = (this.turner === -1) ? 1 : -1;
            this.turnerAmp = getRandomInt(1, 2);
            this.age = 0;
            this.changeDirectionFrequency = getRandomInt(1, 200);
        };

        this.direction += this.turner * this.turnerAmp;

        return this.update()
    };

    moveToCenter() {
        this.velocity = starVelocity * 5.8;
        // Get center
        const center_x = Math.floor(canvas.width /2);
        const center_y = Math.floor(canvas.height / 2);
        // Find direction to center
        if(this.x > center_x && this.y > center_y) {
            this.direction = getRandomInt(-5,5) + (Math.atan(Math.abs(this.y - center_y) / Math.abs(this.x - center_x)) * (180 / Math.PI)) + 180;
        } else if (this.x < center_x && this.y > center_y) {
            this.direction = getRandomInt(-5,5) + 360 - (Math.atan(Math.abs(this.y - center_y) / Math.abs(this.x - center_x)) * (180 / Math.PI));
        } else if (this.x < center_x && this.y < center_y) {
            this.direction = getRandomInt(-5,5) + Math.atan(Math.abs(this.y - center_y) / Math.abs(this.x - center_x)) * (180 / Math.PI);
        } else if (this.x > center_x && this.y < center_y) {
            this.direction = getRandomInt(-5,5) + 180 - (Math.atan(Math.abs(this.y - center_y) / Math.abs(this.x - center_x)) * (180 / Math.PI));
        };

        const next_x = this.x + Math.cos(degToRad(this.direction)) * this.velocity;
        const next_y = this.y + Math.sin(degToRad(this.direction)) * this.velocity;

        this.x = next_x;
        this.y = next_y;


        if (inRange(Math.floor(this.x), range(center_x - 5, center_x + 5))) {
            this.center = true;
        }

        this.age++;

        return this.update()
    };

    moveAway() {
        // Moves out of the canvas and sets hidden to true once the star is out of the canvas.
        this.velocity = starVelocity * getRandomInt(7,70);

        const next_x = this.x + Math.cos(degToRad(this.direction)) * this.velocity;
        const next_y = this.y + Math.sin(degToRad(this.direction)) * this.velocity;

        this.x = next_x;
        this.y = next_y;

        this.age++;

        if (this.x > canvas.width || this.x < 0 || this.y < 0 || this.y > canvas.height) {
            this.hidden = true;
        }

        return this.update()
    };

    update() {

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

        if (this.id > minStarCount) {
            this.alpha -= this.alphaReduction;
            if (this.alpha <= 0) return this.die();
        };
    };

    die() {
        delete stars[this.id];
    };

};


function initializePopulation() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star(i));
    };
};


function animateBasic() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    const starsOrder = [...stars.filter(a => !!a)];

    // Sort by Y property in order to generate the Z-Index.
    starsOrder.sort((a, b) => a.y - b.y);

    for (const star of starsOrder) {
        stars[star.id].move();
    };

    if (basicAnimation) animationFrame(animateBasic);
};


function animateBigBang() {
    basicAnimation = false;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    const starsOrder = [...stars.filter(a => !!a)];

    // Sort by Y property in order to generate the Z-Index.
    starsOrder.sort((a, b) => a.y - b.y);

    let ready = 0;
    for (const star of starsOrder) {
        if (star.center) {
            ready++;
        };
    };

    if (ready === starsOrder.length) return animateExplosion();

    for (const star of starsOrder) {
        try {
            stars[star.id].moveToCenter();
        } catch {/*catching the possibility that and id will expire between
                   validation and action. In this case, do nothing.*/};
    };

    animationFrame(animateBigBang);
};


function animateExplosion() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    const starsOrder = [...stars.filter(a => !!a)];

    // Sort by Y property in order to generate the Z-Index.
    starsOrder.sort((a, b) => a.y - b.y);

    

    let ready = 0;
    for (const star of starsOrder) {
        if (star.hidden) {
            ready++;
        };
    };

    if (ready === starsOrder.length) return endAnimation = true;

    for (const star of starsOrder) {
        try {
            stars[star.id].moveAway();
        } catch {/*catching the possibility that and id will expire between
                   validation and action. In this case, do nothing.*/};
    };

    if (!endAnimation) animationFrame(animateExplosion);
};


function giveBirth(event: MouseEvent, quantity: number) {
    const index = stars.length;
    stars.push(new Star(index));
    stars[index].x = event.offsetX;
    stars[index].y = event.offsetY;

    if (quantity > 1) giveBirth(event, quantity - 1);
};


function start() {
    initializePopulation();
    animateBasic();
};


// Event Listeners
window.onload = () => {
    birthPlatform.style.overflow = "hidden";
    setCanvas(canvas, canvasWidth, canvasHeight);
    start();
};


birthPlatform.onclick = (e: MouseEvent) => {
    giveBirth(e, createStarCount);
};


birthPlatform.onresize = () => {
    const [canvasWidth, canvasHeight] = getCanvas();
    setCanvas(canvas, canvasWidth, canvasHeight);
};