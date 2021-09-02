const App = function (rawData) {
  this.rawData = rawData
  this.setDataRollup()
  this.setDataRange()
  this.setDataTree()

  this.darkMode = true

  this.addSVGs()

  const edgeBundling = new EdgeBundling(this);

  const barChart = new BarChart(this)
}

App.prototype.setDataTree = function () {
  const prepared = prepareData(this.rawData.filter(d => d.similarity > 60));
  console.log(prepared)
  this.treeData = prepared.tree
  this.similarityDimensions = prepared.similarityDimensions

}

App.prototype.addSVGs = function () {
  this.svgBar = d3.select("#svg-bar")
    .append("svg")
    .attr("class", ".svg-bar")
    .style("position", "absolute")
    .style("z-index", "-1")
    .style("top", 0)
    .style("left", 0)
    .style("width", 500)
    .style("height", 230)
    .style("background-color", "none");

  this.svgEdgebundling = d3
    .select("#svg-edgebundling")
    .append("svg")
    .attr("class", ".edgebundling-svg")
    .style("position", "absolute")
    .style("z-index", "-1")
    .style("top", 0)
    .style("left", 0)
    .style("width", "100%")
    .style("height", "100%")
    .style("background-color", "none");
}

App.prototype.setDataRollup = function () {
  this.dataRolled = d3.rollup(
    this.rawData,
    (v) => {
      return {
        bundleSize: v.length
      }
    },
    d => d.similarity
  )
}

App.prototype.setDataRange = function () {
  this.dataRange = {
    start: d3.min(this.dataRolled.keys()),
    end: d3.max(this.dataRolled.keys())
  }
}

// App.prototype.prepareData = function () {
//     let _this = this

//     this.rawData = this.getUniquesBy(this.rawData, "url")

//     this.rawData.forEach(function (node, i) {
//         _this.keys.forEach((k) => {
//             if (node[k] === null) {
//                 _this.rawData[i][k] = "null";
//             } else if (node[k] === undefined) {
//                 _this.rawData[i][k] = "null";
//             }
//             _this.rawData[i]["type"] = "main";
//         });

//         const date = new Date(node.publish_date);
//         _this.rawData[i].date_published = date;
//         _this.rawData[i].date_string = date.toDateString();
//     });

//     this.dataRolled = d3.rollup(
//         this.rawData,
//         (v) => {
//             const random_num = 1 + Math.random() * 2;
//             return {
//                 length: v.length,
//                 closing_price: random_num.toFixed(2),
//                 bundle: v,
//             };
//         },
//         (d) => new Date(d.date_string)
//     );
// }

d3.json("static/fed-strong-labor.json")
  .then(function (rawData) {
    const app = new App(rawData)
  }).catch(function (error) {
    console.log(error);
  });