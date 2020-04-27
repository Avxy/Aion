//AION

const s1 = p => {
  let x = 100;
  let y = 100;
  
const particles = [];

let img1;
   
//mouse//
let bx;
let by;
let boxSize = 55;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
//mouse//
   
   

p.setup = function() {
  p.createCanvas(window.innerWidth, window.innerHeight);
//  createCanvas(windowWidth, windowHeight, WEBGL);
  
   p.imageMode(p.CENTER);
  img1 = p.loadImage('https://raw.githubusercontent.com/Avxy/Aion/gh-pages/images/Aion.png');
  
  
  
  const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 100);
  for(let i=0; i<particlesLength; i++) {
    particles.push(new Particle());
  }
  
//mouse//
  bx = p.width / 2.0;
  by = p.height / 8.0;
  p.rectMode(p.RADIUS);
  p.strokeWeight(2);
//mouse//  
  
  
  
  
}

p.draw = function () {
  p.background(0,108,144);
//p.background(0,89,108);  
  
  //push();
  //translate(0, 0, -34);
  //noStroke();
  //fill(255);
 // rotateZ(frameCount * -0.001);
 // texture(img1);
  //circle(windowWidth/2, windowHeight/2,233);
  //pop();
  
  p.image(img1, p.windowWidth/2, p.windowHeight/2, 377, 55);
  
  particles.forEach((particle, idx) => {
    particle.update();
    particle.draw();
    particle.checkParticles(particles.slice(idx));
  });
  
  
//mouse//
  if (
    p.mouseX > bx - boxSize &&
    p.mouseX < bx + boxSize &&
    p.mouseY > by - boxSize &&
    p.mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      p.stroke(255);
      p.fill(0, 108, 144);
    }
  } else {
    p.stroke(144);
    p.fill(0, 144, 199);
    overBox = false;
  }

  // Draw the box
  p.push();
//  p.translate(p.width / 2, p.height / 2);
 // p.rotate(p.PI);
  p.rect(bx, by, boxSize, boxSize);
  p.textSize(32);
  p.textAlign(p.CENTER, p.CENTER);
  p.fill(255);
  p.text('Beeats', bx, by);
  p.pop();
//mouse/////  
  
  
  
  
  
}

class Particle {
  constructor() {
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2));
    this.size = 5;
  }
  
  update() {
    this.pos.add(this.vel);
    this.edges();
  }
  
  draw() {
    p.noStroke();
    p.fill('rgba(255, 255, 255, 0.5)');
    p.circle(this.pos.x, this.pos.y, this.size * 2);
  }
  
  edges() {
    if(this.pos.x < 0 || this.pos.x > p.width) {
      this.vel.x *= -1;
    }
    
    if(this.pos.y < 0 || this.pos.y > p.height) {
      this.vel.y *= -1;
    }
    
//     if(this.pos.x > width) {
//       this.pos.x = 0;
//     }
    
//     if(this.pos.y > height) {
//       this.pos.y = 0;
//     }
  }
  
  checkParticles(particles) {
    particles.forEach(particle => {
      const d = p.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if(d < 120) {
        const alpha = p.map(d, 0, 120, 0, 0.25)
        p.stroke(`rgba(255, 255, 255, ${alpha})`);
        p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
      }
    });
  }
}

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

//floating_btn.addEventListener('click', () => {
//  social_panel_container.classList.toggle('visible')
//});

//close_btn.addEventListener('click', () => {
//  social_panel_container.classList.remove('visible')
//});
  
  
//mouse//
p.mousePressed = function() {
  if (overBox) {
    locked = true;
    p.fill(255, 255, 255);
    
  } else {
    locked = false;
  }
  xOffset = p.mouseX - bx;
  yOffset = p.mouseY - by;
}
p.mouseClicked = function()
{
window.open("https://avxy.github.io/Beeats/");
}

p.mouseDragged = function() {
  if (locked) {
    bx = p.mouseX - xOffset;
    by = p.mouseY - yOffset;
  }
}

p.mouseReleased = function() {
  locked = false;
}

//mouse//
  
  
  
}
new p5(s1); // invoke p5  



















const s2 = p => {
  let x = 100;
  let y = 100;
  
  
var theta;   

p.setup = function() {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.smooth();
}

p.draw = function () {
  p.background(0,108,144);
  // Let's pick an angle 0 to 90 degrees based on the mouse position
  theta = p.map(p.mouseX,0,p.width,0,p.PI/2);

  // Start the tree from the bottom of the screen
  p.translate(p.width/2, p.height);
  p.stroke(255);
  branch(144);
}

function branch(len) {
  // Each branch will be 2/3rds the createCanvas of the previous one

  var sw = p.map(len,2,120,1,10);
  p.strokeWeight(sw);
      
  p.line(0, 0, 0, -len);
  // Move to the end of that line
  p.translate(0, -len);

  len *= 0.66;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (len > 2) {
    p.push();    // Save the current state of transformation (i.e. where are we now)
    p.rotate(theta);   // Rotate by theta
    branch(len);       // Ok, now call myself to draw two new branches!!
    p.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    p.push();
    p.rotate(-theta);
    branch(len);
    p.pop();
  }
}  
  
  
  }
new p5(s2); // invoke p5  

//https://github.com/Avxy/Aion/blob/gh-pages/videos/Tree.avi






const s3 = p => {
  let x = 100;
  let y = 100;

let playing = false;
let fingers;
let button;

p.setup = function() {
  p.createCanvas(p.windowWidth, p.windowHeight);


  fingers = p.createVideo(['https://www.dropbox.com/s/lp1jave360lhcl4/Tree.avi?dl=0']);
  button = p.createButton('play');
  button.mousePressed(p.toggleVid); // attach button listeners
  
  
}

p.draw = function() {
  p.background(0,108,144);


  

}
  
  
p.toggleVid = function() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}
  
    }
new p5(s3); // invoke p5 
