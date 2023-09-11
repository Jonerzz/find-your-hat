const {Hat} = require('./FindHat.js')
const prompt = require("prompt-sync")({ sigint: true });

function playGame(){
    let rows = prompt("How many rows?: ")
    let cols = prompt("How many cols?: ")

    if (rows < 0 || rows >= 40 || cols < 0 || cols >= 40){
        throw new Error("Invalid cols/rows")
    }

    let game = new Hat(rows,cols);

    game.createField(rows, cols);

    if(!game.checkValidPath()){
        while(!game.checkValidPath()){
            game.createField(rows, cols);
            
        }   
        
    }
    console.clear();
    game.print();

    while(!game.won && !game.lost){
        game.updatePlayer(prompt("Which direction u/l/d/r?: "));
        console.clear();
        game.print();

    }

}

playGame();

