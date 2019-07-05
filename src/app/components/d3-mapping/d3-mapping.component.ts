import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

interface template  {
  text: string,
   col: string
}


@Component({
  selector: 'app-d3-mapping',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './d3-mapping.component.html',
  styleUrls: ['./d3-mapping.component.css']
})


export class D3MappingComponent implements OnInit {

inputs = [{"text": "inleaf1", "col": "red","outlest": [1,1]}, {"text": "inleaf2", "col": "blue","outlest": [1,1]}, {"text": "inleaf3", "col": "green","outlest": [1,1]}];
//outputs = [{"text": "outleaf1", "col": "blue","outlest": [1,1]}, {"text": "outleaf2", "col": "red","outlest": [1,1]}, {"text": "outleaf3", "col": "green","outlest": [1,1]}];

elementwidth = 120;
elementheight = 50;
inputstartx = 20;
inputstarty = 20;
outputstartx = 700;
outputstarty = 20;
verticalmargin = 20;
//dsd

   xx:any;
  yy: any;
canvas: any;
inputcontainer : any;
outputcontainer : any;
inputcontainer1 = "input-container";
outputcontainer1 = "output-container";
coordinates : any;
dragdot2  : any;
dragline: any;
dotpositionABS = [0, 0];
drawnode_cont:any;
data_list: any;
myline: any
pathid = 1;
active_pathid: number;
md: any;
cont_w = 1000;
cont_h = 500;

  constructor() {

   }

  ngOnInit() {
    this.canvas = d3.select(".canvas");
    this.inputcontainer = d3.select("#input-container");
    this.outputcontainer = d3.select("#output-container");
    console.log(this.inputcontainer);
    this.iinit();
  }

iinit() {
/*
this.canvas.append("g").attr("id", (d =>  {
    return this.inputcontainer.attr("id") + "-2";
}));

this.canvas.append("g").attr("id", (d => {
    return this.outputcontainer.attr("id") + "-2";
}));
*/
this.drawNodeStack(this.inputcontainer, this.elementwidth, this.elementheight, this.inputstartx, this.inputstarty, this.verticalmargin, this.inputs, "RIGHT", 0);

this.drawNodeStack(this.outputcontainer, this.elementwidth, this.elementheight, this.outputstartx, this.outputstarty, this.verticalmargin, this.outputs, "LEFT", 1);

}

drawNodeStack(container, elementwidth, elementheight, startX, startY, verticalmargin, data, dotposition, type) {
  let coordinates : any;
  // dragdot2, dragline: any;
  //this.drawnode_cont = container;
  this.data_list = data;
  let dotpositionABS = [0, 0];
  ////console.log(container);
  console.log(container.attr("id"))
  //let container =  d3.select("#" + container1 );
  //console.log(container);
  //let childcontainer = d3.select("#" + container1 + "-2");
  //let childcontainer = d3.select("#" + (container.attr("id") + "-2"));
  //console.log(childcontainer);

  if (dotposition === "RIGHT") {
      dotpositionABS[0] = startX + elementwidth;
  } else if (dotposition === "LEFT") {
      dotpositionABS[0] = startX;
  }

  dotpositionABS[1] = elementheight / 2 + startY; 
  //updated later;


  let mygroup = container.selectAll('g')
  .data(data)
  .enter().append("g")
    .attr("transform", 
        "translate(" + 10 + "," + 20 + ")")
  .call(d3.drag()
    .on("start", ((d,i, n) =>this.node_dragstarted(d, i, n)))
    .on("drag", ((d,i, n) =>this.node_dragged(d, i, n))) 
    .on("end", ((d,i, n) =>this.node_dragended(d,i,n)))
   );

   this.drawnode_cont = mygroup;
/*
  let mygroup = container.selectAll('g')
  .data(data)
  .enter().append("g")
  .attr("transform", 
        "translate(" + 10 + "," + 20 + ")")
  .call(d3.drag()
    .on("start", (() =>this.node_dragstarted()))
    .on("drag", ((d,i, n) =>this.node_dragged(d, i, n))) 
   // .on("end", this.node_dragended)
   );
*/
  let inputleaf = 
  /*container.selectAll("rect")                 
          .data(data)
          .enter().append("rect")*/
           mygroup.append("rect")
          .attr("class", "input-leaf")
          .attr("width", ((d) => {
              d.width = elementwidth;
              return elementwidth;
          }))
          .attr("height", ((d) => {
              d.height = elementheight;
              return elementheight;
          }))
          .attr("x", ((d) => {
              var myX = startX;
              d.x = myX;
              return myX;
          }))
          .attr("y", ((d, i) => {
              var myY = startY + ((elementheight + verticalmargin) * i);
              d.y = myY;
              d.dotposition = [0, 0];
              d.dotposition[0] = dotpositionABS[0]; //set the dot position
              d.dotposition[1] = myY + (d.height) / 2;
              d.type = type;  //set the type
              d.dotpositionr = dotposition;
              d.pt =[];
              return myY;
          }))
          .attr("rx", 10)         // set the x corner curve radius
          .attr("ry", 10)        // set the y corner curve radius
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("stroke", (d => d.col));

      let innerrect = mygroup.append("rect")
          .attr("class", "input-leaf1")
          .attr("width", ((d) => {
              d.width = elementwidth;
              return elementwidth/5;
          }))
          .attr("height", ((d) => {
              d.height = elementheight;
              return elementheight;
          }))
          .attr("x", ((d) => {
              var myX = startX;
              d.x = myX;
              return myX;
          }))
          .attr("y", ((d, i) => {
              var myY = startY + ((elementheight + verticalmargin) * i);
              d.y = myY;
              d.dotposition = [0, 0];
              d.dotposition[0] = dotpositionABS[0]; //set the dot position
              d.dotposition[1] = myY + (d.height) / 2;
              d.type = type;  //set the type
              d.dotpositionr = dotposition;
              d.pt =[];
              return myY;
          }))
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("stroke", (d => d.col));


          let innerrectout = mygroup.append("rect")
          .attr("class", "input-leaf2")
          .attr("width", ((d) => {
              d.width = elementwidth;
              return elementwidth/5;
          }))
          .attr("height", ((d) => {
              d.height = elementheight;
              return elementheight;
          }))
          .attr("x", ((d) => {
              var myX = startX;
              d.x = myX;
              return (myX +elementwidth)- (elementwidth/5);
          }))
          .attr("y", ((d, i) => {
              var myY = startY + ((elementheight + verticalmargin) * i);
              d.y = myY;
              d.dotposition = [0, 0];
              d.dotposition[0] = dotpositionABS[0]; //set the dot position
              d.dotposition[1] = myY + (d.height) / 2;
              d.type = type;  //set the type
              d.dotpositionr = dotposition;
              d.pt =[];
              return myY;
          }))
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("stroke", (d => d.col));

          let font =  mygroup.append("image")
                    .attr("x", (d => d.x))
                    .attr("y", ((d, i) =>  d.y))
                    .attr("fill","white")
                    .attr("xlink:href", "https://github.com/favicon.ico");

  let inputtext = /*container.selectAll("text")                  
          .data(data)
          .enter().append("text")*/
          mygroup.append("text")
          .attr("x", (d => d.x + elementwidth/3))
          .attr("y", ((d, i) =>  d.y + (d.height) / 2))
          .attr("text-anchor", "start")
          .attr("fill", "white")
          .text((d =>  d.text));


  let dragme_inputdoot = d3.drag()
        .on("start", ((d, i, n) => this.dotcircle_dragstarted(d, i, n)))
        .on("drag", ((d, i, n) => this.dotcircle_dragging(d, i, n)))
        .on("end", ((d, i, n) =>this.dotcircle_dragend(d, i, n)));


  let inputdragdot = /*container.selectAll("circle")
          .data(data)
          .enter().append("circle")*/
          mygroup.append("circle")
          .attr("class", "cicle1")
         // .data(d => d.outlest)
          //.enter()
          .attr("r", elementheight / 4)
          .attr("cx",  (d => {
            console.log(d);
            console.log(d.dotposition[0]);
              return d.dotposition[0];
          }))
          .attr("cy", ((d, i) => {
              return d.dotposition[1];
          }))
          .attr("r", (d => {
              return (d.height) / 15;
          }))
          .attr("fill", "green")
          .call(dragme_inputdoot);


  let inputdragdot1 = /*container.selectAll("circle")
          .data(data)
          .enter().append("circle")*/
          mygroup.append("circle")
          .attr("class", "cicle2")
         // .data(d => d.outlest)
          //.enter()
          .attr("r", elementheight / 4)
          .attr("cx",  (d => {
            console.log(d);
            console.log(d.dotposition[0]);
              return d.dotposition[0]- this.elementwidth;
          }))
          .attr("cy", ((d, i) => {
              return d.dotposition[1];
          }))
          .attr("r", (d => {
              return (d.height) / 15;
          }))
          .attr("fill", "green")
          .call(dragme_inputdoot);

  }



addInput() {
    this.inputs.push({"text": "newelement", "col": "white"});
    this.drawNodeStack(this.inputcontainer, this.elementwidth, this.elementheight, this.inputstartx, this.inputstarty, this.verticalmargin, this.inputs, "RIGHT", 0);


}

addOutput() {
    this.outputs.push({"text": "newelement", "col": "white"});
    this.drawNodeStack(this.outputcontainer, this.elementwidth, this.elementheight, this.outputstartx, this.outputstarty, this.verticalmargin, this.outputs, "LEFT", 1);
}

 
dotcircle_dragstarted(d, i, n) {
              let container = this.drawnode_cont;
              let thisdragY = parseFloat(d3.select(n[i]).attr("cy"));  
              let thisdragX = parseFloat(d3.select(n[i]).attr("cx"));
              let thisdragR = parseFloat(d3.select(n[i]).attr("r"));
              this.active_pathid = this.getpathid();
              //d.pt.push({[this.active_pathid] :[{x: thisdragX, y: thisdragY }]});
              d.pt.push({x: thisdragX, y: thisdragY });
              //d3.select(n[i]).attr("fill", "white");
              this.coordinates = [0, 0];
              console.log("testestet");
              console.log(d);
              console.log(container);

              
              this.dragdot2 = container.append("circle")
                      .attr("cx", thisdragX)
                      .attr("cy", thisdragY)
                      .attr("r",  thisdragR+5)
                      .attr("fill", "blue");

               this.myline = d3.line()
                  //.interpolate("bundle")
                  //.tension(1)
                   .curve(d3.curveBundle.beta(1))                  
                  .x((d, i) => { return d.x; })
                  .y((d, i) => { return d.y; });
                  //.curve(d3.curveMonotoneX);
                  console.log("ptdate");
                  console.log([d.pt]);

                  this.dragline = container.append("path") // start a new line
                    .data([d.pt])
                    .attr("class", "line")
                    .style("stroke", "white")
                    .style("stroke-width", "2")
                    .attr("d", this.myline);
                    //.attr("id", (d => { let s = this.pathid; this.pathid++; return s; }));
/*
              this.dragline = container.append("line")
                      .attr("x1", thisdragX)
                      .attr("x2", thisdragX)
                      .attr("y1", thisdragY)
                      .attr("y2", thisdragY)
                      .style("stroke", "white")
                      .style("stroke-width", "2");

                      */
}

dotcircle_dragging(d, i, n) {
  let coordinates = d3.mouse(n[i]);
  this.xx = coordinates[0];
  this.yy = coordinates[1];
  this.dragline.attr("tre","test");
  this.path_maintenance(d);
/*
  console.log(d.pt.length);
  if(d.pt.length >1 ) {
    d.pt.pop()
    };
      console.log(d);

  d.pt.push({ x: this.xx, y: this.yy });
*/

  //this.dragline.attr("d", this.myline);
      console.log("this.dragline2");

  //this.dragline.attr("x2", this.xx).attr("y2", this.yy);
  this.dragdot2.attr("cx", this.xx).attr("cy", this.yy);
  //if position is inside the outleafs - stroke color change
}

dotcircle_dragend(d, i, n) {
    console.log(this.data_list);
              let target = this.detectDropNode( this.xx, this.yy, this.data_list);
              if (target !== "null") {
                  this.path_maintenance(d,target);
                  this.dragdot2.remove();
              } else {
                console.log("inside else");
                  console.log(d.pt);
                  d.pt=[];
                  this.dragline.remove();
                  this.dragdot2.remove();
              }
}


  detectDropNode(xx, yy, data) {
    console.log("inside detectDropNode");
    console.log(xx);
    console.log(yy);
    console.log(data);

    let target = [{},{}];
    if (data[0].type === 1) {   //if root is from input target is outputs
        target = this.outputs;
    } else {
        target = this.inputs;
    }
    console.log(target);
    let i;
    for (i = 0; i < target.length; i++) {
        let x = target[i].x;
        let y = target[i].y;
        let width = target[i].width;
        let height = target[i].height;
        if (xx > x && xx < x + width) { //check whether horizontally in
            if (yy > y && yy < y + height) { //check whether vertically in
                return target[i];
            }
        }
    }
    return "null";
  }

node_dragstarted(d, i, n) {
  let rr = d3.select(n[i]).select(".input-leaf").raise().classed("active", true);
  console.log(rr);

  
}

node_dragged(d, i, n) {
  console.log(d);
    d.x = Math.max(0, Math.min((this.cont_w-d.width -20), d3.event.x));
    d.y = Math.max(-10, Math.min((this.cont_h-d.height)-25, d3.event.y));
  d3.select(n[i]).select(".input-leaf")
    .attr("x", d.x )
    //.attr("y", d.y = d3.event.y);
    .attr("y", ((d, i) => {
              //var myY = startY + ((d.height + verticalmargin) * i);
              //d.y = d3.event.y;
              //d.dotposition = [0, 0];
              d.dotposition[0] = this.getdotpositonr(d.dotpositionr,d.x,d.width); //set the dot position
              d.dotposition[1] = d.y + (d.height) / 2;
              //d.type = type;  //set the type
              return d.y;
          }));
  d3.select(n[i]).select(".input-leaf1")
    .attr("x", d.x )
    .attr("y", d.y );

  d3.select(n[i]).select(".input-leaf2")
    .attr("x", d.x = (d.x + d.width - (d.width/5)))
    .attr("y", d.y ) ;

  d3.select(n[i]).select("image")
    .attr("x", d.x )
    .attr("y", d.y );
  
  d3.select(n[i]).select("text")
    .attr("x", d.x )
    //.attr("y", d.y = d3.event.y);
    .attr("y", ((d, i) =>  d.y + (d.height) / 2))
  d3.select(n[i]).select(".cicle1")
    //.attr("cx", d.x = d3.event.x)
    //.attr("cy", d.y = d3.event.y);
    .attr("cx",  (d => {
              return d.dotposition[0];
          }))
    .attr("cy", ((d, i) => {
              return d.dotposition[1];
          }));

  d3.select(n[i]).select(".cicle2")
    //.attr("cx", d.x = d3.event.x)
    //.attr("cy", d.y = d3.event.y);
    .attr("cx",  (d => {
              return d.dotposition[0]-this.elementwidth;;
          }))
    .attr("cy", ((d, i) => {
              return d.dotposition[1]
          }));



}
node_dragended(d,i,n) {
 let rr = d3.select(n[i]).selectAll("rect").classed("active", false);
}

getdotpositonr (dotposition,startX, elementwidth) {
  let dotpositionABSc: any;
  if (dotposition === "RIGHT") {
      dotpositionABSc = startX + elementwidth;
  } else if (dotposition === "LEFT") {
      dotpositionABSc = startX;
  }
  return dotpositionABSc;
}

path_maintenance(d,target = null) {
    if(d.pt.length >1 ) {
    d.pt.pop()
    };
    console.log("inside maintenance");
      console.log(d);
  if(target == null) {
    console.log("inside null");
      d.pt.push({ x: this.xx, y: this.yy });
  } else {
    d.pt.push({ x: target.dotposition[0], y: target.dotposition[1] });
  }
  this.dragline.attr("d", this.myline);
  
}

getpathid() {
  let s =this.pathid; 
  this.pathid++; 
  return s; 
  }

}