var dataSource = {
  datasets: [
    {
      data: [],
      backgroundColor: [
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#a05d56",
        "#d0743c",
        "#ff8c00",
      ],
    },
  ],

  labels: [],
};
createChart = () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myPieChart = new Chart(ctx, {
    type: "pie",
    data: dataSource,
  });
};

getBudget = () => {
  axios.get("/budget").then((res) => {
    //console.log(res);
    for (let i = 0; i < res.data.myBudget.length; i++) {
      dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
      dataSource.labels[i] = res.data.myBudget[i].title;
    }
    createChart();
  });
};

getBudget();
var myBudgetData = {};
var arrBudget;

//Load data from budget.json with d3.json
d3.json("/budget").then((data) => {
  console.log(data);
  arrBudget = data.myBudget;
  arrBudget.forEach((item) => {
    myBudgetData[item.title] = item.budget;
  });

  getDbuget();
});

getDbuget = () => {
  var width = 450;
  height = 450;
  margin = 40;

  var radius = Math.min(width, height) / 2 - margin;

  var svg = d3
    .select("#dChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = myBudgetData;
  var color = d3
    .scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
    .range(d3.schemeDark2);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    });
  var data_ready = pie(d3.entries(data));

  var arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  svg
    .selectAll("allSlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  svg
    .selectAll("allPolylines")
    .data(data_ready)
    .enter()
    .append("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("points", function (d) {
      var posA = arc.centroid(d);
      var posB = outerArc.centroid(d);
      var posC = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
    });

  svg
    .selectAll("allLabels")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function (d) {
      console.log(d.data.key);
      return d.data.key;
    })
    .attr("transform", function (d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    })
    .style("text-anchor", function (d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return midangle < Math.PI ? "start" : "end";
    });
};
