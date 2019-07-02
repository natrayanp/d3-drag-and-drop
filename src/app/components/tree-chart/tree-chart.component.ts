import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

//https://observablehq.com/@d3/d3-hierarchy


@Component({
  selector: 'app-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.css']
})
export class TreeChartComponent implements OnInit {

data: any;
width = 520;
elementRef: ElementRef;


constructor (elementRef: ElementRef) {
      this.elementRef = elementRef;

      console.log("test");

    this.data= [
  {
    "name": "Top Level",
    "parent": "null",
    "children": [
      {
        "name": "Level 2: A",
        "parent": "Top Level",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A"
          }
        ]
      },
      {
        "name": "Level 2: B",
        "parent": "Top Level"
      }
    ]
  }
];
/*
this.data = {"name":"flare","children":[{"name":"analytics","children":[{"name":"cluster"},{"name":"graph","children":[{"name":"BetweennessCentrality","value":3534},{"name":"LinkDistance","value":5731},{"name":"MaxFlowMinCut","value":7840},{"name":"ShortestPaths","value":5914},{"name":"SpanningTree","value":3416}]},{"name":"optimization","children":[{"name":"AspectRatioBanker","value":7074}]}]}]};
*/

//this.data = JSON.parse(JSON.stringify(this.data));
console.log((this.data));
    console.log("test");
}

ngOnInit() {

let roots = d3.hierarchy(this.data);

//let treeLayout = d3.tree();
//treeLayout.size([400, 200]);
//treeLayout(root);

//console.log(root.links());
let marginLeft = 40
let dx = 12;
let dy = 120;
let label = d => d.data.id;
let highlight = () => false;

let tree = d3.tree().nodeSize([dx, dy]);
let treeLink = d3.linkHorizontal().x(d => d.y).y(d => d.x);
let root = tree(roots);
  console.log(root.links());
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

    let svg = d3.select('#svg');
    let container = d3.select('#container');

      const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${marginLeft},${dx - x0})`);


  // Update the nodes…
  let node = svg.selectAll("g.node")
	  .data(treeLink, (d => { return d.id || (d.id = ++i); }));

  // Enter any new nodes at the parent's previous position.
  let nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", (d => { return "translate(" + root.y0 + "," + root.x0 + ")"; }))
	  .on("click", this.click);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", (d => { return d._children ? "lightsteelblue" : "#fff"; }));
  nodeEnter.append("text")
	  .attr("x", (d => { return d.children || d._children ? -13 : 13; }))
	  .attr("dy", ".35em")
	  .attr("text-anchor", (d => { return d.children || d._children ? "end" : "start"; }))
	  .text((d => { return d.name }))
	  .style("fill-opacity", 1e-6);
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", (d => { return "translate(" + d.y + "," + d.x + ")"; }));
  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", (d => { return d._children ? "lightsteelblue" : "#fff"; }));
  nodeUpdate.select("text")
	  .style("fill-opacity", 1);





     // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });
  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });
  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);
  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();
  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });



/*
  /*
  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("stroke", d => highlight(d.source) && highlight(d.target) ? "red" : null)
      .attr("stroke-opacity", d => highlight(d.source) && highlight(d.target) ? 1 : null)
      .attr("d", treeLink);
  
  const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .on("click", d => this.click(d))
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      

  node.append("circle")
      .attr("fill", d => highlight(d) ? "red" : d.children ? "#555" : "#999")
      .attr("r", 2.5);

  node.append("text")
      .attr("fill", "white")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
    .clone(true).lower()
*/
}

click(d) {
  console.log(d);
  console.log("click");
  // Toggle children on click.
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  //update(d);

}

}