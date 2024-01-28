
import { Cat } from "./cat";

import { Star } from "./star"

import { Circle } from "./circle"

import { Square } from "./square";

import { DisplayList } from "./displaylist";

import { Message } from "./message";


export class Game {
    canvas: HTMLCanvasElement | null;
    gc: CanvasRenderingContext2D | null;
    isPlayMode: boolean;

    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.canvas.style.setProperty("background", "darkgrey");
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.gc = this.canvas.getContext("2d");

        this.isPlayMode = false;
    }

    initGame(numPairs?: number) {
        if (this.gc && this.canvas) {
            // get graphics context
            const x = this.canvas.width / 2;
            const y = this.canvas.height / 4;
            this.gc.font = "24px sans-serif";
            this.gc.textAlign = "center";
            this.gc.textBaseline = "middle";
            this.gc.fillStyle = "white";
            const message = new Message(1);
            if (numPairs) {
                message.updateNumPairs(numPairs);
            }
            this.gc.fillText(message.getMessage(), x, y);

            const displayList = new DisplayList();


            const cat1 = new Cat(x - 50 , y * 2, "#CEA242");
            const cat2 = new Cat(x + 50, y * 2, "#CEA242");
            const star = new Star(100, 100, 50, 20, 6, "gold", "black", 3);

            
            displayList.add(cat1);
            displayList.add(cat2);
            // displayList.add(star);

            const fillColors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FFD1BA', '#E7FFAC'];
            const circle = new Circle(x, y * 2, 48, 12, 'black', 3, fillColors);
            // displayList.add(circle);

            // displayList.add(new Square(60, 50, 80, "white", "black", 3));
            // displayList.add(new Square(190, 50, 80, "white", "black", 3));
            displayList.draw(this.gc);
        }
    }

    togglePlayMode() {
        this.isPlayMode = !this.isPlayMode;
        this.updateCanvas();
    }

    updateCanvas(width?: number, height?: number) {

        

        if (width && height && this.canvas) {
            this.canvas.width = width;

            this.canvas.height = height;
        }

        if(this.gc && this.canvas) {
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (!this.isPlayMode) {

                this.initGame(); // Position these cards as needed
            }
        }
    }
}
