class Menu {
    constructor(){
        this.background = loadImage("assets/menu_background.png");
        this.title = loadImage("assets/title.png");
        this.play = loadImage("assets/play.png");
        this.lvl1 = loadImage("assets/lvl-1.png");
        this.lvl2 = loadImage("assets/lvl-2.png");
        this.lvl3 = loadImage("assets/lvl-3.png");
    }

    drawMenu(){
        image(this.background, 0, 0, width, height);
        image(this.title, width/5, height/5, 3*width/5);
        image(this.play, 7*width/16, 3*height/5);
    }

    drawLevels(){
        image(this.background, 0, 0, width, height);
        image(this.lvl1, width/7, height/3, width/7);
        image(this.lvl2, 3*width/7, height/3, width/7);
        image(this.lvl3, 5*width/7, height/3, width/7);
    }
}