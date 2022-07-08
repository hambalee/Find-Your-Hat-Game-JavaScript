const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(inputBoard) {
    this.board = inputBoard
    this.height = 0
    this.width = 0
    this.randomHatPosition = [Math.floor(Math.random() * this.board[0].length), Math.floor(Math.random() * this.board.length)]
    this.randomPlayerPosition = [Math.floor(Math.random() * this.board[0].length), Math.floor(Math.random() * this.board.length)]
    this.randomPosition()
    this.end = false //boolean
    this.win = false //boolean
  }

  isFound() {
    console.log('this.playerPosition', this.playerPosition)
    console.log('this.hatPosition', this.hatPosition)
    // console.log(this.playerPosition[0] === this.hatPosition[0] && this.playerPosition[1] === this.hatPosition[1])
    const found = this.playerPosition[0] === this.hatPosition[0] && this.playerPosition[1] === this.hatPosition[1]
    if(found) {
      // console.log('is found', found)
    }
    console.log('is found', found)
  }


  randomPosition() {
    console.log(this.randomHatPosition)
    console.log(this.randomPlayerPosition)
    this.board[this.randomHatPosition[1]][this.randomHatPosition[0]] = '^'
    this.board[this.randomPlayerPosition[1]][this.randomPlayerPosition[0]] = '*'
    this.playerPosition = this.randomPlayerPosition
    this.hatPosition = this.randomHatPosition
  }

  print() {
    this.board[this.randomHatPosition[1]][this.randomHatPosition[0]] = '^'
    this.board[this.playerPosition[1]][this.playerPosition[0]] = '*'
    console.log(this.board.map( r => r.join('')).join('\n'))
    console.log(`hat position = ${this.hatPosition}`)
    console.log(`player position = ${this.playerPosition}`)
  }

  moveUp() {
    if(this.playerPosition[1] > 0) {
      this.playerPosition[1]--
    }
    this.isFound()
  }
  moveDown() {
    if(this.playerPosition[1] < this.board[0].length - 1) {
      this.playerPosition[1]++
    }
    this.isFound()
  }
  moveLeft() {
    if(this.playerPosition[0] > 0) {
      this.playerPosition[0]--
    }
    this.isFound()
  }
  moveRight() {
    if(this.playerPosition[0] < this.board[0].length - 1) {
      this.playerPosition[0]++
    }
    this.isFound()
  }

  static generateField(height, width, percentage) {
    // if(height >= 3 && height <= 10 && width >= 3 && width <= 10 && percentage >= 0 && percentage <=100) {
    this.height = height
    this.width = width
    const matrix = [];
    for(let i=0; i < height; i++) {
        matrix[i] = ['░'];
        for(let j=0; j  <width; j++) {
            matrix[i][j] = '░';
        }
    }
    return matrix
  }
}
// console.log(Field.generateField(3, 4, 10))

const myField = new Field(Field.generateField(5, 5, 10));

/*const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
])
 console.log(myField)
*/
const isWin = () => {
  const win = myField.win
  console.log('win = ', win)
  if(win) {
    return true
  }
  return false
}

const checkEnd = () => {
  const end = myField.end
  console.log('end = ', end)
  if(end) {
    return true
  } else {
    return false
  }
}

const isGameEnd = () => {
  const ended = checkEnd()
  if (ended) {
    const win = isWin()
    if(win) {
      console.log('Win')
    } else {
      console.log('Lose')
    }
    return true
  }
  return false
}

while(!isGameEnd()){
  myField.print()
  console.log('w:up a:left s:down d:right')
  const input = prompt('Which way ? ')

  switch (input) {
    case 'w':
      myField.moveUp()
      break;
    case 's':
      myField.moveDown()
      break;
    case 'a':
      myField.moveLeft()
      break;
    case 'd':
      myField.moveRight()
      break;
  
    default:
      console.log('Only W A S D')
      break;
  }
}
