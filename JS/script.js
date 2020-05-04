const cnv=document.getElementById("cnv")
const cntx=cnv.getContext("2d")
const scale=15
const rows=cnv.height/scale
const columns=cnv.width/scale
const score=document.getElementById("score")
var snake
var tempresult = true
var D
const imgN= new Image()
imgN.src = "IMAGES/egg.png"
console.log(imgN)

function Egg() {
    this.x
    this.y
    this.L=function() {
        this.x=(Math.floor(Math.random() * rows-1) +1 ) * scale
        this.y=(Math.floor(Math.random() * columns-1) +1 ) * scale
    }
    this.drawegg=function() {
        imgN.onload = cntx.drawImage(imgN,this.x,this.y,15,17.25) 
    }
}



function Snake() {
    this.x=rows*scale/2
    this.y=columns*scale/2
    this.xSpeed=0
    this.ySpeed=0
    this.total=0
    this.cordS=[]

    this.draw=function() {
        cntx.fillStyle="#a8eb34"

        for (let i = 0; i < this.cordS.length; i++) {
            cntx.fillRect(this.cordS[i].x,this.cordS[i].y,scale,scale)
            
        }

        cntx.fillRect(this.x,this.y,scale,scale)
    }
    this.update=function() {
        for (let i = 0; i < this.cordS.length-1; i++) {
            this.cordS[i]=this.cordS[i+1]   
        }
        this.cordS[this.total - 1]={ x: this.x , y: this.y };
        cntx.clearRect(0,0,cnv.width,cnv.height)
        this.x += this.xSpeed
        this.y += this.ySpeed

        for (let i = 0; i < this.cordS.length; i++) {
            if (this.x===this.cordS[i].x && this.y===this.cordS[i].y) {
                tempresult = false
                break
            }
            tempresult=true
        }
        if ((this.x===cnv.width || this.x===-scale || this.y===-scale || this.y===cnv.height) || tempresult===false) {
            alert('Votre score est: '+this.total)
            location.reload()
        }


    }
    this.changeD=function(D) {
        if (D==="ArrowLeft") {
            if (this.xSpeed!=scale) {
                this.xSpeed=-scale
                this.ySpeed=0 
            }
        }

        else if (D==="ArrowRight") {
            if (this.xSpeed!=-scale) {
                this.xSpeed=scale
                this.ySpeed=0                
            }
        }

        else if (D==="ArrowDown") {
            if (this.ySpeed!=-scale) {
                this.xSpeed=0
                this.ySpeed=scale   
            }
        }

        else if (D==="ArrowUp") {
            if (this.ySpeed!=scale) {
                this.xSpeed=0
                this.ySpeed=-scale   
            }
        }

    }
    this.grow=function(egg) {
        if (this.x===egg.x && this.y===egg.y) {
            this.total++
            console.log("okay")
            egg.L()
        }
    }
}

function Spawn() {
    egg= new Egg()
    snake=new Snake()
    egg.L()
    console.log(egg)
    setInterval(upd,150)
    snake.draw()
    alert("appuyer sur 'OK' pour commencez!!")
}
Spawn()



function upd() {
    snake.update()
    egg.drawegg()
    snake.draw()
    snake.grow(egg)
    console.log(snake.total)
    score.innerText='score: '+snake.total
}
addEventListener("keydown",mouvements)
function mouvements(e) {
    snake.changeD(e.code)

}