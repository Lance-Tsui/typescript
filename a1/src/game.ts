
import { Cat } from "./cat";

import { Star } from "./star"

import { Circle } from "./circle"

import { Square } from "./square";

import { DisplayList } from "./displaylist";

import { Message } from "./message";


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
            this.gc.fillText(this.message.getMessage(), this.canvas.width / 2, this.canvas.height / 4);
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
                const row = Math.floor(i / cols);
                const col = i % cols;
            
                // 对于每一行，计算这一行的卡片总宽度
                const cardsInThisRow = Math.min(cols, this.numPairs * 2 - row * cols);
                const totalWidthThisRow = (cardsInThisRow - 1) * (cardWidth + gap);
            
                // 计算这一行的起始 x 坐标
                const startXThisRow = (this.canvas.width - totalWidthThisRow) / 2;
                
                // 计算卡片的 x 和 y 坐标
                const x = startXThisRow + col * (cardWidth + gap);
                const y = this.canvas.height / 2 + row * (cardHeight + gap);
            
                const card = new Cat(x, y, "#CEA242", false, false);
                this.displayList.add(card);
            }

            
            /*
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
            */
            this.displayList.draw(this.gc);
        }
    }

    playGame(click?: boolean, mousex?: number, mousey?: number, numPairs?: number){
        if (this.gc && this.canvas) {
            this.displayList.clear();
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.gameText(numPairs);

            const cols = this.calculateEvenColumns(this.canvas.width);
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
                const row = Math.floor(i / cols);
                const col = i % cols;
            
                // 对于每一行，计算这一行的卡片总宽度
                const cardsInThisRow = Math.min(cols, this.numPairs * 2 - row * cols);
                const totalWidthThisRow = (cardsInThisRow - 1) * (cardWidth + gap);
            
                // 计算这一行的起始 x 坐标
                const startXThisRow = (this.canvas.width - totalWidthThisRow) / 2;
                
                // 计算卡片的 x 和 y 坐标
                const x = startXThisRow + col * (cardWidth + gap);
                const y = this.canvas.height / 2 + row * (cardHeight + gap);
            
                const card = new Cat(x, y, "#CEA242", true, false);
                this.displayList.add(card);
                if (click) {
                    if(mousex && mousey) {
    
                        this.displayList.forEach(item => {
                            if (item.isMouseOver(mousex, mousey)) {
                                item.setHidden(false);
                            }
                        });
    
                    }
                } else {
                    if(mousex && mousey) {
                        this.displayList.forEach(item => item.setHover(false));
    
                        this.displayList.forEach(item => {
                            if (item.isMouseOver(mousex, mousey)) {
                                item.setHover(true);
                            }
                        });
    
                    }
                }
            }
            this.displayList.draw(this.gc);
            /*
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
            */
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
        this.displayList.clear();
    }

    updateCanvas(width?: number, height?: number, input?: string) {

        if (width && height && this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        }

        if(this.gc && this.canvas) {

            if (this.mode != "play") {
                this.initGame(this.numPairs);
            } else {
                this.playGame();
            }
        }
    }
}
