import React, { Component } from 'react';
import './App.css';
class gamearea {
  constructor(gamewidth, gameheight) {
    this.canvas = document.getElementById("game")
    this.canvas.height = gameheight;
    this.canvas.width = gamewidth;
    this.ctx = this.canvas.getContext("2d");
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  
}
class pointer {
  constructor(gamearea) {
    this.height = 4;
    this.width = 60;
    this.color = "black";
    this.posx = gamearea.canvas.width / 2 + 7;
    this.posy = gamearea.canvas.height - 10;
    this.ctx = gamearea.ctx;
  }
  draw(angle) {
    angle = angle / 180 * Math.PI
    this.ctx.save()
    this.ctx.translate(this.posx, this.posy)
    this.ctx.rotate(angle);
    this.fillStyle = this.color;
    this.ctx.fillRect(-this.width, -this.height / 2, this.width, this.height);
    this.ctx.restore();
  }
}






class balls {
  constructor(posx, posy, area, image, value,size) {
    this.posx = posx;
    this.posy = posy;
    this.img = image;
    this.ctx = area.ctx;
    this.value = value;
    this.size=size;
  }
  draw() {
    this.ctx.drawImage(this.img, this.posx, this.posy, this.size, this.size);
  }
  check(posx, posy) {
    if ((this.posy + this.size >= posy) && (posx >= this.posx - this.size / 2) && (posx <= this.posx + this.size / 2)) {
      var fix = { val: true, pos: this.posy + this.size }
      return fix;
    }
    // this.setState({fix:true})
  }
  update(posx, posy) {
    this.ctx.drawImage(this.img, posx, posy, this.size, this.size);

  }
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
      ],
      gamewidth: 620,
      gameheight: 510,
      size: 30,
      speadx: 0,
      speady: 0,
      fix: false,
      mlf:0
    }
  }
  fix = { val: false };
  cposx = 0;
  cposy = 0;
  changeball = 0;
  change = (e) => {
    var key = e.keyCode;
    switch (key) {
      case 37: {
        var newang = this.state.angle - 8;
        if (newang < 10)
          newang = 10;
        this.setState({ angle: newang })
        break;
      }
      case 39: {
        var neang = this.state.angle + 8;
        if (neang > 170)
          neang = 170;
        this.setState({ angle: neang })
        break;
      }
      case 13: {
        // this.state.ball.send(this.state.angle)
        // this.changepos(this.state.angle);
        // this.setState({fix:false})
        // while(this.state.fix==true)
        // {

        //   this.changepos(this.state.angle)
        // }
        this.changeball = this.state.ball;
        var imgno = Math.floor((Math.random() * 6) + 1);
        var image = this.checkimg(imgno)
        this.setState({ ball: new balls(this.cposx, this.cposy, this.state.area, image, imgno,this.state.size) })
        this.setState({ speadx: 15 })
        this.setState({ speady: 15 })

        window.requestAnimationFrame(this.changepos)
        break;
      }
      default: {

      }
    }
  }
  changepos = (deltatime) => {
    // if (this.state.ballposy > 0)
    if (!this.fix.val && this.state.ballposy > 0) {
      var deg = 180 - this.state.angle;
      var rad = deg / 180 * Math.PI;
      if (this.state.ballposx + this.state.size > this.state.gamewidth || this.state.ballposx < 0) {
        this.setState({ speadx: -this.state.speadx })

      }
      if (this.state.ballposx + this.state.size < 20) {
        this.setState({ speadx: -this.state.speadx })
      }

      var posx = this.state.ballposx + this.state.speadx * Math.cos(rad);
      var posy = this.state.ballposy + this.state.speady * -1 * Math.sin(rad);
      this.setState({ ballposx: posx })
      this.setState({ ballposy: posy })
      requestAnimationFrame(this.changepos)
    }
    else {
      var nposx = Math.floor(this.state.ballposx / this.state.size);
      if(this.fix.posy)
      {
        var nposy = Math.floor(this.fix.posy / this.state.size);
      }
      else{
        nposy=0;
      }
      // console.log(nposy)
      // console.log(this.checkpos(nposx,nposy))
      // nposy=this.checkpos(nposx,nposy);
      this.state.arr[nposy].splice(nposx, 1, this.changeball.value);
      this.delelement(nposx, nposy, this.changeball.value);
      if(this.delar.length<3)
      {
        this.delar.forEach(obj=>{
          this.state.arr[obj.posy].splice(obj.posx,1,obj.no);
        })
      }
      else{
        this.delar.forEach(obj=>{
          for(var d=obj.posy+1;d<17;d++)
          {
            this.state.arr[d].splice(obj.posx,1,0);
          }
        })
      }
      this.delar=[];
      this.changeball = 0;
      this.setState({ ballposx: this.cposx })
      this.setState({ ballposy: this.cposy })
      this.fix.val = false;
      this.addrow();
    }
  }


  checkpos(posx,posy)
  {
    if(this.state.arr[posy][posx]!==0)
    {
      posy++;
      this.checkpos(posx,posy)
    }
    else
    {
      return posy;
    }
  }

  checkimg(no) {
    switch (no) {
      case 1: {
        return this.refs.img1;
      }
      case 2: {
        return this.refs.img2;
      }
      case 3: {
        return this.refs.img3;
      }
      case 4: {
        return this.refs.img4;
      }
      case 5: {
        return this.refs.img5;
      }
      case 6: {
        return this.refs.img6;
      }
      default: ;
    }
  }
  drawballs() {
    var x = 2;
    var y = 0;
    var boll;
    for (var i = 1; i < 18; i++) {
      if (i % 2 === 0)
        x += 15;

      for (var j = 0; j < 20; j++) {
        boll = this.state.arr[i - 1][j];
        switch (boll) {
          case 1: {
            this.state.ctx.drawImage(this.state.img1, x, y, this.state.size, this.state.size)
            break;
          }
          case 2: {
            this.state.ctx.drawImage(this.state.img2, x, y, this.state.size, this.state.size)
            break;
          }
          case 3: {
            this.state.ctx.drawImage(this.state.img3, x, y, this.state.size, this.state.size)
            break;
          }
          case 4: {
            this.state.ctx.drawImage(this.state.img4, x, y, this.state.size, this.state.size)

            break;
          }
          case 5: {
            this.state.ctx.drawImage(this.state.img5, x, y, this.state.size, this.state.size)

            break;
          }
          case 6: {
            this.state.ctx.drawImage(this.state.img6, x, y, this.state.size, this.state.size)
            break;
          }
          default: ;
        }
        if (boll !== 0) {

          // if((this.state.ballposy+this.state.size>=y)&&(this.state.ballposy<=y+this.state.size)&&(this.state.ballposx>=x)&&(this.state.ballposx+this.state.size<=x+this.state.size))
          if ((y<=this.state.ballposy)&&(y + this.state.size >= this.state.ballposy) && (this.state.ballposx >= x) && (this.state.ballposx <= x+this.state.size)) 
          {
            this.fix = { val: true, posy: y + this.state.size,posx:x }
          }
          // if()
          if(y>=this.state.gameheight)
          {
            console.log("game over")
          }
        }
        x += this.state.size;
      }
      x = 2;
      y += this.state.size;
    }
    // console.log(this.state.arr)
  }

delar=[];
elem=0;
score=0;
  delelement = (posx, posy, no) => {
    if(this.state.arr[posy][posx]!==no)
    {
    }
    else if(this.state.arr[posy][posx]===no)
    {
      
      this.state.arr[posy].splice(posx,1,0);
      this.score+=10;
      this.elem={posx:posx,posy:posy,no:no};
      this.delar.push(this.elem);
      if(posy<this.state.length-1)
  {
    this.delelement(posx,posy+1,no);
  }
  if(posx>0)
  {
    this.delelement(posx-1,posy,no);
  }
  if(posx<this.state.arr[posy].length-1)
  {
    this.delelement(posx+1,posy,no);
  }
  if(posy>0)
  {
    this.delelement(posx,posy-1,no);
  }
  if(posy%2===0)
  {
    if(posy>0&&posx>0)
    {
      this.delelement(posx-1,posy-1,no);
    }
  }
  else{
    if(posy>0&&posx<this.state.arr[posy].length-1)
    {
      this.delelement(posx+1,posy-1,no);
    }
  }
  if(posy<17)
  {
    this.delelement(posx,posy+1,no);
  }
  if(posy<17&&posx<this.state.arr[posy].length-1)
  {
    this.delelement(posx+1,posy+1,no);
  }
}
  }
  mousemovement=(e)=>{
    var canvas=this.refs.game;
    var rect=canvas.getBoundingClientRect();
    var pos={ x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
      y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
    }
    var mouseang=Math.atan2((pos.y-this.state.pointer.posy),(pos.x-this.state.ball.posx));
    mouseang=mouseang*180/Math.PI
      mouseang=-mouseang;
      mouseang=180-mouseang;
      if(mouseang>170)
      {
        mouseang=170;
      }
      if(mouseang<10)
      {
        mouseang=10;
      }
    this.setState({ angle: mouseang })
  }
  mouseclick=()=>{
    this.changeball = this.state.ball;
    var imgno = Math.floor((Math.random() * 6) + 1);
    var image = this.checkimg(imgno)
    this.setState({ ball: new balls(this.cposx, this.cposy, this.state.area, image, imgno,this.state.size) })
    this.setState({ speadx: 15 })
    this.setState({ speady: 15 })

    window.requestAnimationFrame(this.changepos)
  }
  addrow=()=>{
    var newarr=[];
    var i=0;
    var m;
    var rand;
    var nomber=0;
    this.state.arr.forEach(function(value,index){
      if(index<6)
      {
        value.forEach(ball=>{
          if(ball!==0)
          nomber++;
        })
      }
    })
    if(nomber<120)
    {
      for(i=0;i<10;i++)
      {
        m=0;
        rand=Math.floor((Math.random() * 6) + 1);
        while(m<2)
        {
          newarr.push(rand);
          m++;
        }

      }
      this.state.arr.splice(0,0,newarr);
      this.state.arr.pop();
    }
  }
componentWillMount(){
  var h=window.innerHeight;
  var w=window.innerWidth;
  if(w<800)
  {
    this.setState({gamewidth:520});
    this.setState({gameheight:430});
    this.setState({size:25});
  } 
  else{
  } 
}
  componentDidMount() {


    this.cposx = this.state.gamewidth / 2 - this.state.size / 2 + 7;
    this.setState({ ballposx: this.cposx })
    this.cposy = this.state.gameheight - this.state.size;
    this.setState({ ballposy: this.cposy })
    var area = new gamearea(this.state.gamewidth, this.state.gameheight);
    this.setState({ ctx: area.ctx });
    this.setState({ area: area });
    var imgno = Math.floor((Math.random() * 6) + 1);
    var image = this.checkimg(imgno)
    this.setState({ ball: new balls(this.cposx, this.cposy, area, image, imgno,this.state.size) })
    this.setState({ pointer: new pointer(area) })
    this.setState({ angle: 90 })
    window.addEventListener("keydown", (e) => {
      this.change(e);
    })
    this.refs.game.addEventListener("mousemove",(e)=>{
      this.mousemovement(e);
    })
    this.refs.game.addEventListener("mousedown",(e)=>{
      
      this.mouseclick();
    })
    // window.addEventListener("mou")
    this.setState({ img1: this.refs.img1 })
    this.setState({ img2: this.refs.img2 })
    this.setState({ img3: this.refs.img3 })
    this.setState({ img4: this.refs.img4 })
    this.setState({ img5: this.refs.img5 })
    this.setState({ img6: this.refs.img6 })
    var x = 2;
    var y = 0;
    var boll = 1;
    var nposx = 0;
    var nposy = 0;
    for (var i = 1; i < 10; i++) {
      if (i % 2 === 0)
        x += 15;
      for (var j = 0; j < 10; j++) {
        imgno = Math.floor((Math.random() * 6) + 1);
        var m = 0
        while (m < 2) {
          nposx = Math.floor(x / this.state.size);
          nposy = Math.floor(y / this.state.size);
          if (this.state.arr[nposy][nposx] === 0) {
            this.state.arr[nposy].splice(nposx, 1, imgno);
          }
          x += this.state.size;
          m++;
        }
        boll++;
        if (boll > 6)
          boll = 1;
      }
      x = 2;
      y += this.state.size;
    }
  }
  componentDidUpdate() {
    this.state.area.draw();
    this.state.pointer.draw(this.state.angle)
    this.state.ball.draw();
    this.drawballs();
    if (this.changeball !== 0) {
      this.changeball.update(this.state.ballposx, this.state.ballposy)
    }
  }
  render() {
    return (
      <div>
<div style={{backgroundColor:"rgb(0,0,0,0.5)",height:"50px",width:"620px",margin:"auto",marginTop:"40px"}} className="div">
<h2 style={{color:"white",display:"inline"}}>Bubble Shooter</h2>
<p style={{display:"inline",float:"right",marginRight:"80px",color:"white"}}>{"score:  "+this.score}</p>
</div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
        <img src={require("./component/image/red.png")} id="img1" alt="not found" ref="img1" style={{ display: "none" }} onLoad={() => { this.setState({ no1: true }); }}></img>
        <img src={require("./component/image/blue.png")} id="img2" alt="not found" ref="img2" style={{ display: "none" }} onLoad={() => { this.setState({ no1: true }); }}></img>
        <img src={require("./component/image/yellow.png")} id="img3" alt="not found" ref="img3" style={{ display: "none" }} onLoad={() => { this.setState({ no1: true }); }}></img>
        <img src={require("./component/image/skyblue.png")} id="img4" alt="not found" ref="img4" style={{ display: "none" }} onLoad={() => { this.setState({ no1: true }); }}></img>
        <img src={require("./component/image/white.png")} id="img5" alt="not found" ref="img5" style={{ display: "none" }} onLoad={() => { this.setState({ no1: true }); }}></img>
        <img src={require("./component/image/pink.png")} id="img6" alt="not found" ref="img6" style={{ display: "none" }} onLoad={() => { this.setState({ no1: true }); }}></img>

        <canvas ref="game" id="game" style={{ border:"5px solid red",backgroundColor:"white"}} className="canvas"> </canvas>
      </div>
      </div>
    );
  }
}

export default App;
