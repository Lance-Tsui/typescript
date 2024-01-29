
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
    message: Message;
    displayList: DisplayList;

    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.canvas.style.setProperty("background", "darkgrey");
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.gc = this.canvas.getContext("2d");
        this.message = new Message(1);
        this.isPlayMode = false;
        this.displayList = new DisplayList();
    }

    gameText(numPairs?: number){
        if(this.gc && this.canvas) {
            if (numPairs) {
                this.message.updateNumPairs(numPairs);
            }
            this.gc.fillText(this.message.getMessage(), this.canvas.width / 2, this.canvas.height / 4);
        }
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

            if (numPairs) {
                this.message.updateNumPairs(numPairs);
            }
            this.gc.fillText(this.message.getMessage(), x, y);

            const displayList = new DisplayList();


            const cat1 = new Cat(x - 50 , y * 2, "#CEA242", false, false);
            const cat2 = new Cat(x + 50, y * 2, "#CEA242", false, false);
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

    playGame(click?: boolean, mousex?: number, mousey?: number, numPairs?: number){
        if (this.gc && this.canvas) {

            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const x = this.canvas.width / 2;
            const y = this.canvas.height / 4;
            this.gameText(numPairs);
            const displayList = new DisplayList();
            

            const cat1 = new Cat(x - 50 , y * 2, "#CEA242", true, false);
            const cat2 = new Cat(x + 50, y * 2, "#CEA242", true, false);
            const star = new Star(100, 100, 50, 20, 6, "gold", "black", 3);

            
            displayList.add(cat1);
            displayList.add(cat2);
            if (click) {
                if(mousex && mousey) {

                    displayList.forEach(item => {
                        if (item.isMouseOver(mousex, mousey)) {
                            item.setHidden(false);
                        }
                    });

                }
            } else {
                if(mousex && mousey) {
                    displayList.forEach(item => item.setHover(false));

                    displayList.forEach(item => {
                        if (item.isMouseOver(mousex, mousey)) {
                            item.setHover(true);
                        }
                    });

                }
            }
            displayList.draw(this.gc);
        }
    }




    togglePlayMode(mode: boolean) {
        if (mode == false) {
            this.isPlayMode = true;
            this.updateCanvas();
        } else {
            this.isPlayMode = false;
            this.updateCanvas();
        }
    }

    updateCanvas(width?: number, height?: number) {

        

        if (width && height && this.canvas) {
            this.canvas.width = width;

            this.canvas.height = height;
        }

        if(this.gc && this.canvas) {
            if (!this.isPlayMode) {
                this.initGame();
            } else {
                this.playGame();
            }
        }
    }
}
