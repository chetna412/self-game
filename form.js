class Form{
  constructor(){
    this.input=createInput("YOUR NAME")
    this.button=createButton("PLAY");
    this.heading=createElement("h1");
    this.greeting=createElement("h2")
  }
  hide(){
    this.input.hide();
    this.button.hide();
    
  }
  display(){
    this.heading.html("FRUIT COLLECTOR");
    this.heading.position(200,300);
    this.heading.style('background','pink')

    this.input.position(250,450);
    
    this.input.style('background','yellow')

    this.button.position(250,500);
    this.button.style('background','Lightgreen');

    this.button.mousePressed(()=>{
      form.hide();
      var name=this.input.value();
    this.greeting.position(258,550)
    this.greeting.html("WELCOME : " + name);
    this.greeting.style('background','orange')
    test=2;
    })
    
  }
}