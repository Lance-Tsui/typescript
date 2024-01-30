
import { Cat } from "./cat";

import { Star } from "./star"

import { Circle } from "./circle"

import { Square } from "./square";

import { DisplayList } from "./displaylist";

import { Message } from "./message";

import { CATCOLORS, CATEYE, EDGE, FILLCOLORS, LINECLR, RADSTEP, STARCLR } from './constant';


export class Game {
    canvas: HTMLCanvasElement | null;
    gc: CanvasRenderingContext2D | null;
    mode: string;
    message: Message;
    cardList: DisplayList;
    displayList: DisplayList;
    numPairs: number;

    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.canvas.style.setProperty("background", "darkgrey");
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.gc = this.canvas.getContext("2d");
        this.message = new Message(1);
        this.mode = "start";
        this.cardList = new DisplayList();
        this.displayList = new DisplayList();
        this.numPairs = 1;
    }

    gameText(numPairs?: number){
        if(this.gc && this.canvas) {
            this.gc.font = "24px sans-serif";
            this.gc.textAlign = "center";
            this.gc.textBaseline = "middle";
            this.gc.fillStyle = "white";
            if (numPairs) {
                this.numPairs = numPairs;
                this.message.updateNumPairs(this.numPairs);
            }
            this.gc.fillText(this.message.getMessage(), this.canvas.width / 2, this.canvas.height / 5);
        }
    }

    calculateEvenColumns(canvasWidth: number): number {
        const totalCardWidth = 86;
        const availableWidth = canvasWidth - 10;
        let columns = Math.floor(availableWidth / (totalCardWidth + 10)); 
      
        if (columns % 2 !== 0) {
          columns--;
        }
      
        return columns;
    }


    initGame(numPairs?: number) {
        if (this.gc && this.canvas) {
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.displayList.clear();
            const cols = this.calculateEvenColumns(this.canvas.width);
            console.log(cols);
            if (!numPairs) {
                numPairs = 1;
            } else {
                this.numPairs = numPairs;
                this.message.updateNumPairs(numPairs);
            }

            
            this.gameText(numPairs);

            const cardWidth = 86;
            const cardHeight = 86;
            const gap = 10;

            const totalWidth = cols * (cardWidth + gap) ; // 修正 totalWidth 的计算s

            for (let i = 0; i < this.numPairs * 2; i++) {
                var pair = Math.floor(i / 2);
                const row = Math.floor(i / cols);
                const col = i % cols;
            
                // 对于每一行，计算这一行的卡片总宽度
                const cardsInThisRow = Math.min(cols, this.numPairs * 2 - row * cols);
                const totalWidthThisRow = (cardsInThisRow - 1) * (cardWidth + gap);
            
                // 计算这一行的起始 x 坐标
                const startXThisRow = (this.canvas.width - totalWidthThisRow) / 2;
                
                // 计算卡片的 x 和 y 坐标
                const x = startXThisRow + col * (cardWidth + gap);
                const y = this.canvas.height / 3 + row * (cardHeight + gap);
                if (pair < 5){
                    const color = CATCOLORS[Math.floor(i / 2)];
                    const cateye = CATEYE[Math.floor(i / 2)];
                    const cat = new Cat(x, y, color, cateye, false, false);
                    this.displayList.add(cat);
                }

                else if (pair < 10) {
                    const outrad = RADSTEP[Math.floor(i / 2) - 5][0];
                    const innrad = RADSTEP[Math.floor(i / 2) - 5][1];
                    const lnclr = LINECLR[Math.floor(i / 2) - 5]
                    const fillcolor = FILLCOLORS[Math.floor(i / 2) - 5];
                    const circle = new Circle(x, y, outrad, innrad, lnclr, 3, fillcolor, false, false);
                    this.displayList.add(circle);
                } else {
                    const edge = EDGE[Math.floor(i / 2) - 10];
                    const side = STARCLR[Math.floor(i / 2) - 10];
                    const star = new Star(x, y, 35, 13, edge, side, "black", 3, false, false);
                    this.displayList.add(star);
                }

            }

            this.displayList.draw(this.gc);
        }
    }

    

    playGame(click?: boolean, mousex?: number, mousey?: number){
        if (this.gc && this.canvas) {
            
            const cols = this.calculateEvenColumns(this.canvas.width);
            
            if (click && mousex && mousey) {
                this.displayList.forEach(item => {
                    item.setHover(false);
                    if (item.isMouseOver(mousex, mousey)) {

                        item.setHidden(!item.isHidden());
                    }
                });
                this.displayList.draw(this.gc);
            } else if (mousex && mousey) {
                this.displayList.forEach(item => {
                    item.setHover(false);
                    if (item.isMouseOver(mousex, mousey)) {
                        item.setHover(true);
                    }
                });
                this.displayList.draw(this.gc);
            } else {
                const cardWidth = 86;
                const cardHeight = 86;
                const gap = 10;

                for (var i = 0; i < this.numPairs * 2; i++) {
                    const row = Math.floor(i / cols);
                    const col = i % cols;
                
                    const cardsInThisRow = Math.min(cols, this.numPairs * 2 - row * cols);
                    const totalWidthThisRow = (cardsInThisRow - 1) * (cardWidth + gap);
                
                    const startXThisRow = (this.canvas.width - totalWidthThisRow) / 2;
                    
                    const x = startXThisRow + col * (cardWidth + gap);
                    const y = this.canvas.height / 3 + row * (cardHeight + gap);
                    var color = '';
                    var cateye = '';
                    
                    if (i % 2 == 0) {
                        color = CATCOLORS[i % 5];
                        cateye = CATEYE[i % 5];
                    } else {
                        color = CATCOLORS[(i - 1) % 5];
                        cateye = CATEYE[(i - 1) % 5];
                    }

                    const card = new Cat(x, y, color, cateye, true, false);
                    this.displayList.add(card);
                }
                this.displayList.draw(this.gc);
            }
        }
    }


    toggleMode(mode: string) {
        if (mode == "play") {
            this.mode = "play";
            this.updateCanvas();
        } else if (mode == "start") {
            this.mode = "start";
            this.updateCanvas();
        }
    }

    addPairs() {
        if (this.mode == "start") {
            this.initGame(Math.min(this.numPairs + 1, 15));
        }
    }

    removePairs() {
        if (this.mode == "start") {
            this.initGame(Math.max(this.numPairs - 1, 1));
        }
    }

    switchMode() {
        if (this.gc && this.canvas) {
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameText(this.numPairs);
        }
    }

    updateCanvas(width?: number, height?: number, input?: string) {

        if (width && height && this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        }

        if(this.gc && this.canvas) {

            if (this.mode == "start") {
                this.initGame(this.numPairs);
            } else {
                this.playGame(undefined, undefined, undefined);
            }
        }
    }
}
