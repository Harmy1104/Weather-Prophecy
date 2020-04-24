var tmp_chart = document.getElementById("tmpChart").getContext("2d");
var prs_chart = document.getElementById("prsChart").getContext("2d");
var wnd_chart = document.getElementById("wndChart").getContext("2d");
var hmd_chart = document.getElementById("hmdChart").getContext("2d");
var tmp = document.getElementById("tmpChart");
var prs = document.getElementById("prsChart");
var wnd = document.getElementById("wndChart");
var hmd = document.getElementById("hmdChart");
var tmp_btn = document.getElementById("tmp");
var prs_btn = document.getElementById("prs");
var wnd_btn = document.getElementById("wnd");
var hmd_btn = document.getElementById("hmd");

let code = {
  "andaman and nicobar islands": 1278647,
  "andhra pradesh": 1278629,
  "arunachal pradesh": 1278341,
  "assam": 1278253,
  "bihar": 1275716,
  "chandigarh": 1274746,
  "chhattisgarh": 1444364,
  "dadra nagar haveli": 1273726,
  "daman and diu": 1271155,
  "delhi": 1273293,
  "goa": 1271157,
  "gujarat": 1270770,
  "haryana": 1270260,
  "himanchal pradesh": 1270101,
  "jammu and kashmir": 1269320,
  "jharkhand": 1444365,
  "karnataka": 1267701,
  "kerala": 1267254,
  "madhya pradesh": 1264542,
  "maharashtra": 1264418,
  "manipur": 1263706,
  "meghalaya": 1263207,
  "mizoram": 1262963,
  "nagaland": 1262271,
  "odisha": 1261029,
  "puducherry": 1259424,
  "punjab": 1259223,
  "rajasthan": 1258899,
  "sikkim": 1256312,
  "tamil nadu": 1255053,
  "telangana": NaN,
  "tripura": 1254169,
  "uttarakhand": 1444366,
  "uttar pradesh": 1253626,
  "west bengal": 1252881
};

let state = document
  .querySelector("title")
  .innerHTML.toString()
  .toLowerCase();

let API =
  "http://api.openweathermap.org/data/2.5/forecast?id=" +
  code[state] +
  "&APPID=875e6e23b64f755f60baeaeeddda7790";

let unix_timestamp;
let time_list = [];
let unix_list = [];
let temp_list = [];
let pres_list = [];
let wind_list = [];
let humd_list = [];

// convert time
function getTime(date) {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime.toString();
}

function getHour(date) {
  var date = new Date(unix_timestamp * 1000);
  var hour = date.getHours();
  return hour;
}

// linearRegression
function linearRegression(param) {
  xs = tf.tensor1d(param.slice(0, param.length - 1));
  ys = tf.tensor1d(param.slice(1));

  const xmin = xs.min();
  const xmax = xs.max();
  const xrange = xmax.sub(xmin);

  function norm(x) {
    return x.sub(xmin).div(xrange);
  }

  xsNorm = norm(xs);
  ysNorm = norm(ys);

  console.log(xsNorm.print());

  const m = tf.variable(tf.scalar(Math.random()));
  const b = tf.variable(tf.scalar(Math.random()));

  function predict(x) {
    return tf.tidy(function() {
      return m.mul(x).add(b);
    });
  }

  function loss(prediction, actualValues) {
    const error = prediction
      .sub(actualValues)
      .square()
      .mean();
    return error;
  }

  const learningRate = 0.1;
  const optimizer = tf.train.sgd(learningRate);

  const numIterations = 1000;
  const errors = [];

  for (let iter = 0; iter < numIterations; iter++) {
    optimizer.minimize(() => {
      const predsYs = predict(xsNorm);
      const e = loss(predsYs, ysNorm);
      errors.push(e.dataSync());
      return e;
    });
  }
  console.log(errors[0]);
  console.log(errors[numIterations - 1]);

  xTest = tf.tensor1d([param[3], param[param.length - 1]]);
  return predict(xTest);
}

// api call and graph plotting
fetch(API)
  .then(response => response.json())
  .then(json => {
    for (let i = 0; i < json.list.length; i++) {
      unix_timestamp = json.list[i]["dt"];
      unix_list.push(getHour(unix_timestamp));
      time_list.push(getTime(unix_timestamp));
      temp_list.push(json.list[i].main["temp"] - 273.15);
      pres_list.push(json.list[i].main["pressure"]);
      wind_list.push(json.list[i].wind["speed"]);
      humd_list.push(json.list[i].main["humidity"]);
    }

    haha = linearRegression(temp_list);
    console.log(haha.print());

    var myChart = new Chart(tmp_chart, {
      type: "line",
      data: {
        labels: time_list,
        datasets: [
          {
            data: temp_list,
            label: "Temperature",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {}
    });

    var myChart = new Chart(prs_chart, {
      type: "line",
      data: {
        labels: time_list,
        datasets: [
          {
            data: pres_list,
            label: "Pressure",
            borderColor: "#C039A0",
            fill: false
          }
        ]
      },
      options: {}
    });
    var myChart = new Chart(wnd_chart, {
      type: "line",
      data: {
        labels: time_list,
        datasets: [
          {
            data: wind_list,
            label: "Wind",
            borderColor: "#4349A1",
            fill: false
          }
        ]
      },
      options: {}
    });
    var myChart = new Chart(hmd_chart, {
      type: "line",
      data: {
        labels: time_list,
        datasets: [
          {
            data: humd_list,
            label: "Humidity",
            borderColor: "#42BC16",
            fill: false
          }
        ]
      },
      options: {}
    });
  })
  .catch(err => console.log(err));

prs.style.display = "none";
wnd.style.display = "none";
hmd.style.display = "none";

tmp_btn.onclick = function() {
  tmp.style.display = "block";
  prs.style.display = "none";
  wnd.style.display = "none";
  hmd.style.display = "none";
};

prs_btn.onclick = function() {
  tmp.style.display = "none";
  prs.style.display = "block";
  wnd.style.display = "none";
  hmd.style.display = "none";
};

wnd_btn.onclick = function() {
  prs.style.display = "none";
  tmp.style.display = "none";
  wnd.style.display = "block";
  hmd.style.display = "none";
};

hmd_btn.onclick = function() {
  prs.style.display = "none";
  wnd.style.display = "none";
  tmp.style.display = "none";
  hmd.style.display = "block";
};
