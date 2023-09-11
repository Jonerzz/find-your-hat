
class Hat {
    constructor(rows, cols){
        this.rows = rows,
        this.cols = cols,
        this.field = [],
        this.hatPos;
        this.playerPos;
        this.won = false;
        this.lost = false;
    }

    createField(rows, cols){

        let row = [];
        
        this.hatPos = [0, Math.floor(Math.random() * cols)];    //randomly set hat position at top somewhere
        this.playerPos = [rows - 1, Math.floor(Math.random() * cols)];  //randomly set playerposition at bottom somewhere

        if(rows <= 40 && cols <= 40){               //create rows according to arguments and push row col amount of times
            for (let i = 0; i < rows; i++){
                for (let j = 0; j < cols; j++ ){
                    row.push(this.randElement());
                }
                this.field.push(row);
                row = [];
            }

        } else {
            throw new Error("Too many rows/cols")
        }
        
        this.field[this.playerPos[0]][this.playerPos[1]] = "*";   //place player and hat positions on to finished field
        this.field[this.hatPos[0]][this.hatPos[1]] = "^"


        return this.field
    }

    randElement(){
        return Math.random() > 0.35 ? "░" : "O";    //return random element for the field
    }

    print(){
     
        for(let i = 0; i < this.rows; i++){
            console.log(this.field[i].join(""))     //join every line of the array using a loop
        }
    }

    updatePlayer(direction){


        direction = direction.toLowerCase();
        
        
        switch(direction) {
            case "u":
                this.playerPos[0]--;
                break;
            case "r":
                this.playerPos[1]++;
                break;
            case "l":
                this.playerPos[1]--;
                break;
            case "d":
                this.playerPos[0]++;
                break;
        }
        if(this.field[this.playerPos[0]][this.playerPos[1]] === "O"){
            this.field[this.playerPos[0]][this.playerPos[1]] = "*";
            this.lost = true
            console.log("You lose")
        } else {
            this.field[this.playerPos[0]][this.playerPos[1]] = "*";
        }
        
    }


    checkValidPath(){
        let visited = [];
        let field = this.field;
        let x = this.playerPos[0] //create shorter variable for player X and y Positions
        let y = this.playerPos[1]
        visited.push([x,y])
        let popped;
        this.print();
        
     
       while(visited.length > 0){              //loop until checked every route or found maze end
      
        if (field[0][this.hatPos[1]] === "C"){
            this.resetMaze();
            return true;
        }


        if(x !== 0){
           if(field[x -1][y] === "░" || field[x -1][y] === "^"){
            x--;
            field[x][y] = "C";
            visited.push([x,y])
            continue;
            
           } 
        }
        if(y !== this.rows - 1){
           if(field[x][y+1] === "░" || field[x][y+1] === "^"){
            y++
            field[x][y] = "C"
            visited.push([x,y])
            continue;
           }
        }
        if(y !== 0){
           if (field[x][y-1] === "░" || field[x][y-1] === "^"){
            y--;
            field[x][y] = "C"
            visited.push([x,y])
            continue;
           }
        }
        if (x !== this.cols - 1){
           if(field[x+1][y] === "░" || field[x+1][y] === "^"){
            x++;
            field[x][y] = "C"
            visited.push([x,y])
            continue;
           }
        }

        popped = visited.pop();
        x = popped[0]
        y = popped[1]
        }

        return false;
    }

    resetMaze(){ //clear maze of "C's" after checking valid path so its back to normal
        
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                if(this.field[i][j] === "C"){
                    this.field[i][j] = "░"
                }
            }
        }
        this.field[0][this.hatPos[1]] = "^";
    }
    
}

module.exports = {Hat}


