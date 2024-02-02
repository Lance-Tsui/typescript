
import { Cat } from "./cat";

import { Star } from "./star"

import { Circle } from "./circle"

import { Square } from "./square";

import { DisplayList } from "./displaylist";

import { Message } from "./message";

import { Drawable } from "./drawable";

import { CATCOLORS, CATEYE, EDGE, FILLCOLORS, LINECLR, RADSTEP, STARCLR } from './constant';


export class Game {
    public canvas: HTMLCanvasElement | null;
    public gc: CanvasRenderingContext2D | null;
    public mode: string;
    public message: Message;
    public displayList: DisplayList;
    public originalState: boolean[] = [];
    public numPairs: number;
    public clickedCards: Drawable[] = [];
    public cheat: boolean;

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
        this.displayList = new DisplayList();
        this.numPairs = 1;
        this.cheat = false;
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
            this.gc.fillText(this.message.getMessage(), this.canvas.width / 2, this.canvas.height / 6);
        }
    }

    // calculate number of even columns, to fit the size of the canvas
    calculateEvenColumns(canvasWidth: number): number {
        const totalCardWidth = 86;
        const availableWidth = canvasWidth - 10;
        let columns = Math.floor(availableWidth / (totalCardWidth + 10)); 
      
        if (columns % 2 !== 0) {
          columns--;
        }
      
        return columns;
    }

    // enter cheat mode
    enterCheat() {
        if (this.mode === 'play' && this.gc && this.canvas) {
            this.cheat = true;
            this.originalState = this.displayList.map<boolean>(card => card.isHidden());
            this.displayList.forEach(card => card.setHidden(false));
            this.redrawCanvas();
        }
    }

    // exit cheat mode
    exitCheat() {
        if (this.mode === 'play' && this.gc && this.canvas) {
            this.cheat = false;
            this.displayList.forEach((card, index) => card.setHidden(this.originalState[index]));
            this.redrawCanvas();
        }
    }

    // redraw the current canvas
    redrawCanvas() {
        if (this.gc && this.canvas) {
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameText(this.numPairs);
            this.displayList.draw(this.gc);
        }
    }

    initGame(numPairs?: number) {
        if (this.gc && this.canvas) {
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.displayList.clear();
            this.cheat = false;
            this.mode = "start";
            this.clickedCards = [];
            this.originalState = [];
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

            for (let i = 0; i < this.numPairs * 2; i++) {
                var pair = Math.floor(i / 2);
                const row = Math.floor(i / cols);
                const col = i % cols;
            
                // total width of the row
                const cardsInThisRow = Math.min(cols, this.numPairs * 2 - row * cols);
                const totalWidthThisRow = (cardsInThisRow - 1) * (cardWidth + gap);
            
                // starting x position of this row
                const startXThisRow = (this.canvas.width - totalWidthThisRow) / 2;
                
                // x and y coord of the card
                const x = startXThisRow + col * (cardWidth + gap);
                const y = this.canvas.height / 3 + row * (cardHeight + gap);
                if (pair < 5){
                    const color = CATCOLORS[Math.floor(i / 2)];
                    const cateye = CATEYE[Math.floor(i / 2)];
                    const cat = new Cat(x, y, color, cateye, false, false, true);
                    this.displayList.add(cat);
                }

                else if (pair < 10) {
                    const outrad = RADSTEP[Math.floor(i / 2) - 5][0];
                    const innrad = RADSTEP[Math.floor(i / 2) - 5][1];
                    const lnclr = LINECLR[Math.floor(i / 2) - 5]
                    const fillcolor = FILLCOLORS[Math.floor(i / 2) - 5];
                    const circle = new Circle(x, y, outrad, innrad, lnclr, 3, fillcolor, false, false, true);
                    this.displayList.add(circle);
                } else {
                    const edge = EDGE[Math.floor(i / 2) - 10];
                    const side = STARCLR[Math.floor(i / 2) - 10];
                    const star = new Star(x, y, 35, 13, edge, side, "black", 3, false, false, true);
                    this.displayList.add(star);
                }

            }

            this.displayList.draw(this.gc);
        }
    }

    winMessage(): void {
        this.mode = 'win';

        if(this.gc && this.canvas) {
            this.gc.font = "24px sans-serif";
            this.gc.textAlign = "center";
            this.gc.textBaseline = "middle";
            this.gc.fillStyle = "white";
            this.gc.fillText("You finished! Press SPACE to continue.", this.canvas.width / 2, this.canvas.height / 6);
        }
    }

    playGame(click?: boolean, mousex?: number, mousey?: number){
        
        if (this.gc && this.canvas) {
            
            const cols = this.calculateEvenColumns(this.canvas.width);
            
            if (click && mousex && mousey) {
                console.log(this.displayList);
                this.displayList.forEach(item => {
                    item.setHover(false);
                    if (item.isclickable() && item.isMouseOver(mousex, mousey)) {

                        if (!item.isHidden()) {
                            const index = this.clickedCards.findIndex(card => card === item);
                            if (index !== -1) {
                                this.clickedCards.splice(index, 1);
                            }
                            item.setHidden(true);
                        } else {
                            if (this.clickedCards.length < 2) {
                                if (!this.clickedCards.includes(item)) {
                                    this.clickedCards.push(item);
                                }

                                if (this.clickedCards.length == 1) {
                                    item.setHidden(!item.isHidden());
                                }
                                else if (this.clickedCards.length == 2) { 
                                    if (this.clickedCards[0].matches(this.clickedCards[1])) {

                                        this.displayList.remove(this.clickedCards[0]);

                                        this.displayList.remove(this.clickedCards[1]);

                                        console.log(this.displayList);
                                        
                                        if (this.clickedCards[0].getType() == "cat") {
                                            console.log("yes");
                                            const catItem = this.clickedCards[0] as Cat;
                                            this.displayList.add(new Cat(catItem.x, catItem.y, catItem.color, 
                                                catItem.position, false, false, false));
                                        }
                                        
                                        if (this.clickedCards[1].getType() == "cat") {
                                            const catItem = this.clickedCards[1] as Cat;
                                            this.displayList.add(new Cat(catItem.x, catItem.y, catItem.color, 
                                                catItem.position, false, false, false));
                                        }

                                        if (this.clickedCards[0].getType() == "circle") {
                                            const circleItem = this.clickedCards[0] as Circle;
                                            this.displayList.add(new Circle(circleItem.x, circleItem.y, 
                                                circleItem.maxRadius, circleItem.step, circleItem.strokeColor, 
                                                circleItem.lineWidth, circleItem.fillColors,
                                                false, false, false));
                                        }

                                        if (this.clickedCards[1].getType() == "circle") {
                                            
                                            const circleItem = this.clickedCards[1] as Circle;
                                            this.displayList.add(new Circle(circleItem.x, circleItem.y, 
                                                circleItem.maxRadius, circleItem.step, circleItem.strokeColor, 
                                                circleItem.lineWidth, circleItem.fillColors,
                                                false, false, false));
                                        }

                                        if (this.clickedCards[0].getType() == "star") {
                                            
                                            const starItem = this.clickedCards[0] as Star;
                                            this.displayList.add(new Star(starItem.x, starItem.y, 
                                                starItem.outerRadius, starItem.innerRadius, starItem.points, 
                                                starItem.fillColor, starItem.strokeColor, starItem.linewidth,
                                                false, false, false));
                                        }

                                        if (this.clickedCards[1].getType() == "star") {
                                            
                                            const starItem = this.clickedCards[1] as Star;
                                            this.displayList.add(new Star(starItem.x, starItem.y, 
                                                starItem.outerRadius, starItem.innerRadius, starItem.points, 
                                                starItem.fillColor, starItem.strokeColor, starItem.linewidth,
                                                false, false, false));
                                        }
                                        
                                        
                                        this.clickedCards = [];
                                    } else {
                                        item.setHidden(!item.isHidden());
                                    }
                                }
                        }
                        }
                        
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

                var coordinatesList: [number, number][] = [];

                for (var i = 0; i < this.numPairs * 2; i++) {
                    
                    const row = Math.floor(i / cols);
                    const col = i % cols;
                
                    const cardsInThisRow = Math.min(cols, this.numPairs * 2 - row * cols);
                    const totalWidthThisRow = (cardsInThisRow - 1) * (cardWidth + gap);
                
                    const startXThisRow = (this.canvas.width - totalWidthThisRow) / 2;
                    
                    const x = startXThisRow + col * (cardWidth + gap);
                    const y = this.canvas.height / 3 + row * (cardHeight + gap);
                    coordinatesList.push([x,y]);
                }

                this.shuffleCoordinates(coordinatesList);


                for (var i = 0; i < this.numPairs * 2; i++) {
                    var pair = Math.floor(i / 2);
                    if (pair < 5){
                        const color = CATCOLORS[Math.floor(i / 2)];
                        const cateye = CATEYE[Math.floor(i / 2)];
                        const cat = new Cat(coordinatesList[i][0], coordinatesList[i][1], color, cateye, true, false, true);
                        this.displayList.add(cat);
                    }
    
                    else if (pair < 10) {
                        const outrad = RADSTEP[Math.floor(i / 2) - 5][0];
                        const innrad = RADSTEP[Math.floor(i / 2) - 5][1];
                        const lnclr = LINECLR[Math.floor(i / 2) - 5]
                        const fillcolor = FILLCOLORS[Math.floor(i / 2) - 5];
                        const circle = new Circle(coordinatesList[i][0], coordinatesList[i][1], outrad, 
                            innrad, lnclr, 3, fillcolor, true, false, true);
                        this.displayList.add(circle);
                    } else {
                        const edge = EDGE[Math.floor(i / 2) - 10];
                        const side = STARCLR[Math.floor(i / 2) - 10];
                        const star = new Star(coordinatesList[i][0], coordinatesList[i][1], 35, 13, 
                            edge, side, "black", 3, true, false, true);
                        this.displayList.add(star);
                    }
                }

                this.displayList.draw(this.gc);
            }

            const allCardsUnhidden = this.displayList.every(card => !card.isHidden());
            if (this.mode == "play" && allCardsUnhidden && !this.cheat) {
                this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height / 4);
                this.mode = 'win';
    
                this.winMessage();
            }
        }
    }

    // shuffle coordinates of the cards
    shuffleCoordinates(coordinates:[number, number][] = []) {
        for (let i = coordinates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coordinates[i], coordinates[j]] = [coordinates[j], coordinates[i]];
        }
    }
    
    // getting current mode
    getMode(): string {
        return this.mode;
    }

    // three modes: play, start, and win
    toggleMode(mode: string) {
        if (mode == "play") {
            this.mode = "play";
            this.updateCanvas();
        } else if (mode == "start") {
            this.mode = "start";
            this.updateCanvas();
        } else if (mode == "win") {
            this.mode = "start";
            this.updateCanvas(undefined, undefined, undefined, true);
        }
    }

    // adding one more pair
    addPairs() {
        if (this.mode == "start") {
            this.initGame(Math.min(this.numPairs + 1, 15));
        }
    }

    // reducing one pair
    removePairs() {
        if (this.mode == "start") {
            this.initGame(Math.max(this.numPairs - 1, 1));
        }
    }

    // switching mode helper function
    switchMode() {
        if (this.gc && this.canvas) {
            this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.displayList.clear();
            this.gameText(this.numPairs);
        }
    }

    updateCanvas(width?: number, height?: number, input?: string, prev?: boolean) {

        if (width && height && this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        }

        if(this.gc && this.canvas) {

            if (this.mode == "start") {
                if (prev) {
                    this.numPairs = Math.min(this.numPairs + 1, 15);  
                }
                this.initGame(this.numPairs);

            } else {
                this.playGame(undefined, undefined, undefined);
            }
        }
    }
}
