import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import createNodesXMap from './lib/getXNodesPositions.js'
import randomInteger from './lib/getRandomInteger.js';
import {getBlockCenters, getLeftBorders, getOneBlockSize} from './lib/blockPositionGetters.js';
import {normalizeLinksFromJson, normalizeNodesFromJson} from './lib/normalizers.js'

function ForceGraph({ width, height, inputLinks, inputNodes, years, clusterLength }) {
  const svgRef = useRef();

  const links = normalizeLinksFromJson(inputLinks)
  const nodes = normalizeNodesFromJson(inputNodes)
  const nodesXMap = createNodesXMap(nodes, width, years)

  const lastYear = years[years.length - 1]
  const firstYear = years[0]
  const timeLineYears = [...years]

  const yCenters = getBlockCenters(clusterLength, height)
  const xLeftBorders = getLeftBorders(timeLineYears.length, width)
  const oneYearSize = getOneBlockSize(timeLineYears.length, width)

  useEffect(() => {

    var colors = [];
    while (colors.length < 100) {
      do {
        var color = Math.floor((Math.random()*1000000)+1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    const colorScale = ['pink', 'lightblue', '#B19CD9', 'orange', 'green', '#6366F1', '#8B5CF6'];


    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(1))
      .force('y', d3.forceY().y(function(d) { return yCenters[d.cluster - 1]; }))
      .force('x', d3.forceX().x(function(d) { return nodesXMap.get(d.id)}))
      .force("link", d3.forceLink(links).id(d => d.id).strength(link => {
        if (link.source.cluster === link.target.cluster) return 1 / Math.pow(link.value + 1, 3)
        return - 1 / Math.pow(link.value + 1, 16)
      }))
      .force('collision', d3.forceCollide().radius(function(d) {
        return Math.sqrt(d.value * 20);
      }))

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
      .attr("x", (year) => xLeftBorders[lastYear - year])
      .attr("y", Number(height) + 50)
      .attr("width", width / (lastYear - firstYear + 1))
      .attr("height", 50)
      .attr("style", "outline: 1px solid #4490BE;")

    const text = svg.append("g")
      .selectAll("text")
      .data(timeLineYears)
      .join("text")
      .attr("x", (year) => {
        return xLeftBorders[year - firstYear] + oneYearSize / 2
      })
      .attr("y", Number(height) + 75)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("fill", "white")
      .attr("font-size", 24)
      .text(year => year)

    simulation.on("tick", () => {
      nodes.forEach (function(nodePos,i) {
          nodePos.x = nodesXMap.get(nodePos.id) 


          // if (nodePos.x - nodePos.value < xCenter[lastYear - nodePos.year]) {
          //   nodePos.x = getPos(nodePos.year, nodePos.value, width, [years[0], years[years.length - 1]])
          //   nodePos.vx = 0
          // }
          
          
          // if (nodePos.x - nodePos.value > xCenter[lastYear - nodePos.year] + oneYearSize) {
          //   nodePos.x = getPos(nodePos.year, nodePos.value, width, [years[0], years[years.length - 1]])
          //   nodePos.vx = 0
          // }

          if (nodePos.y - nodePos.value < 0) {
              nodePos.y = 0 + randomInteger(0, yCenters[0]) + Math.sqrt(nodePos.value) * 2
              nodePos.vy = 0;
          }

          if (nodePos.y + nodePos.value > height) {
              nodePos.y = height - randomInteger(0, yCenters[0]) - Math.sqrt(nodePos.value) * 2
              nodePos.vy = 0;
          }

      })

      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("transform", function(d,i) { return "translate(" + d.x + "," + d.y + ")"; });
    });
    for (let i = 0; i < 100; i++) {
        simulation.tick()
    }


  }, [width, height, inputLinks, inputNodes, years, clusterLength]);

  return (<>
    <svg ref={svgRef} width={width} height={height} />
  </>
  );
}

export { ForceGraph };
