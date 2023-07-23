import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getPos (year, value, weight = 452, yearsRange) {
  const oneYearRange = weight / (yearsRange[1] - yearsRange[0] + 1)

  for (let i = 0; i < yearsRange[1] - yearsRange[0] + 1; i++) {
    if (i + yearsRange[0] === year) {
      return randomInteger(
        i * oneYearRange + Math.sqrt(value) * 2, 
        i * oneYearRange + oneYearRange - Math.sqrt(value) * 2
      )
    }
  }
}

const getXCenters = (length, width = 452) => {
  const xCenters = []
  const oneYearSize = width / length
  for (let i = 0; i < length; i++) {
    xCenters.push(oneYearSize * i)
  }
  return [xCenters.reverse(), oneYearSize]
}

const getYCenters = (length, height = 600) => {
  const yCenters = []
  const oneClusterSize = height / length
  for (let i = 0; i < length; i++) {
    yCenters.push(oneClusterSize * i + oneClusterSize / 2)
  }
  return yCenters
}

const getYears = (first, last) => {
    const years = []
    for (let i = 0; i < last - first + 1; i++) {
        years.push(first + i)
    }
    return years
}

function ForceGraph({ width, height, linkss, nodess, years, clusterLength }) {
  const svgRef = useRef();

  const links = linkss
    .map(link => ({ source: link["source"], target: link["target"], value: link["value"]}))

  const nodes = nodess
    .map(node => ({ 
        id: node["id"], 
        value: node["value"], 
        year: node["year"],
        xx: getPos(node["year"], node["value"], width, [years[0], years[years.length - 1]]), 
        cluster: node["cluster"]
    }))


//   const keywords = [[1,[["information security",42],["information security policy",15],["protection motivation theory",11],["compliance",11],["phishing",9]]],[2,[["information security",19],["information security awareness",9],["information security culture",9],["cyber security",7],["information security policy",6]]],[3,[["information security",32],["counting-based secret sharing",9],["key management",8],["shares generation",6],["image encryption",5]]],[4,[["information security",8],["information security investment",5],["information security management",3],["information sharing",3],["managed security service",3]]]]

//   console.log(keywords)
  const lastYear = years[years.length - 1]
  const yCenter = getYCenters(clusterLength)
  const firstYear = years[0]
  const timeLineYears = getYears(firstYear, lastYear)
  const [xCenter, oneYearSize] = getXCenters(timeLineYears.length, width)
  useEffect(() => {

    console.log(clusterLength)
    // console.log(links)


    var colors = [];
    while (colors.length < 100) {
      do {
        var color = Math.floor((Math.random()*1000000)+1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    // var xScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);
    // const color = d3.scaleOrdinal(d3.schemeCategory10);
    const colorScale = ['pink', 'lightblue', '#B19CD9', 'orange', 'green', '#6366F1', '#8B5CF6'];



    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(1))
      .force('y', d3.forceY().y(function(d) { return yCenter[d.cluster - 1]; }))
      .force('x', d3.forceX().x(function(d) { return d.xx}))
      .force("link", d3.forceLink(links).id(d => d.id).strength(link => {
        if (link.source.cluster === link.target.cluster) return 1 / Math.pow(link.value + 1, 3)
        return - 1 / Math.pow(link.value + 1, 16)
      }))
      .force('collision', d3.forceCollide().radius(function(d) {
        return Math.sqrt(d.value * 20);
      }))

      const drag = (simulation) => {
        const dragstarted = (d) => {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        };
  
        const dragged = (d) => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        };
  
        const dragended = (d) => {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        };
  
        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      };

    const svg = d3
      .select(svgRef.current)
      .attr("style", "outline: thin solid white;")   //This will do the job
      .attr("width", width)
      .attr("height", Number(height) + 100)
      // .append("svg")
      // .attr("viewBox", [0, 0, width, height + 200])
      // .call(d3.zoom().on("zoom", function () {
      //   svg.attr("transform", d3.event.transform);
      // }));

    const link = svg
        .join("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", d => d.value/Math.pow(10, d.value.toString().length))
        .attr("stroke-width", d => Math.sqrt(d.value))


    const node = svg
        .join("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("fill", function(d) {return colorScale[d.cluster];})
        .attr('r', function(d) {
            return Math.sqrt(d.value) * 2;
        })

    const timeLine = svg.append("g")
        .attr("class", "rects")
        .attr("fill", "#1E3A8A")
        .selectAll("rect")
        .data(timeLineYears)
        .join("rect")
        .attr("x", (year) => xCenter[lastYear - year])
        .attr("y", Number(height) + 50)
        .attr("width", width / (lastYear - firstYear + 1))
        .attr("height", 50)
        .attr("style", "outline: 1px solid #4490BE;")

    const text = svg.append("g")
        .selectAll("text")
        .data(timeLineYears)
        .join("text")
        .attr("x", (year) => xCenter[lastYear - year] + oneYearSize / 2)
        .attr("y", Number(height) + 75)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("fill", "white")
        .attr("font-size", 24)
        .text(year => year)

    simulation.on("tick", () => {
        nodes.forEach (function(nodePos,i) {
            nodePos.x = nodePos.xx

            if (nodePos.y - nodePos.value < 0) {
                nodePos.y = 0 + randomInteger(0, yCenter[0]) + Math.sqrt(nodePos.value) * 2
                nodePos.vy = 0;
            }

            if (nodePos.y + nodePos.value > height) {
                nodePos.y = height - randomInteger(0, yCenter[0]) - Math.sqrt(nodePos.value) * 2
                nodePos.vy = 0;
            }

        })

        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", function(d,i) { return "translate(" + d.x + "," + d.y + ")"; });
    });
    // for (let i = 0; i < 100; i++) {
    //     simulation.tick()
    // }


  }, [width, height, linkss, nodess, years, clusterLength]);

  return (<>
    <svg ref={svgRef} width={width} height={height} />
  </>
  );
}

export default ForceGraph;
