import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  //clear form
  const intialState = "";

  //useState
  const [array, setArray] = useState([]);
  const [numbers, setNumber] = useState(intialState);
  const [probabilityMean, setprobabilityMean] = useState("");
  const [probabilityMedian, setprobabilityMedian] = useState("");
  const [probabilityMode, setprobabilityMode] = useState("");
  const [probabilitySd, setProbabilitySd] = useState("");

  //Randomvalues
  const randomArray = () => {
    var temparray = [];
    for (let i = 0; i < 10; i++) {
      var number = Math.floor(Math.random() * (100 - 1) + 1);
      temparray.push(number);
    }
    setArray(temparray);
  };

  useEffect(() => {
    randomArray();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!numbers) {
      alert("please enter a number");
      setNumber(intialState);
    } else {
      var integer = parseInt(numbers, 10);
      array.push(integer);
      alert("add successfully");
      setNumber(intialState);
    }
  };
  var mean;
  function Mean() {
    var total = 0;

    for (let i = 0; i < array.length; i++) {
      total += array[i];
    }

    mean = total / array.length;

    setprobabilityMean(mean);
  }

  function Median() {
    var median = 0,
      arrlen = array.length;
    array.sort();

    if (arrlen % 2 === 0) {
      median = (array[arrlen / 2 - 1] + array[arrlen / 2]) / 2;
    } else {
      median = array[(arrlen - 1) / 2];
    }

    setprobabilityMedian(median);
  }

  function Mode() {
    var count = 0;
    var modes = [];
    var moded;

    for (let i = 0; i < array.length; i++) {
      for (var j = 0; j < i; j++) {
        if (array[j] === array[i]) {
          modes.push(array[j]);

          count++;
        }
      }
    }
    moded = [...new Set(modes)];

    setprobabilityMode(moded.toString());
    console.log(probabilityMode);
  }

  function standardDeviation() {
    let m = mean;
    let sdans = Math.sqrt(
      array.reduce(function (sq, n) {
        return sq + Math.pow(n - m, 2);
      }, 0) /
        (array.length - 1)
    );
    setProbabilitySd(Math.floor(sdans));
  }

  useEffect(() => {
    Mean();
    Median();
    Mode();
    standardDeviation();
  });

  return (
    <div className="App">
      <div className="sidebar"></div>
      <div className="dashboard">
        <h2>Statistics</h2>
        <div className="dashboard-input">
          <input
            type="number"
            placeholder="enter a number"
            value={numbers}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Add a number in array
          </button>
        </div>
        <div className="dashboard-array">
          {array.map((data, index) => (
            <div className="statisticsarray" key={index}>
              {data}
            </div>
          ))}
        </div>
        <div className="dashboard-tiles">
          <div className="dashboard-card">
            <p>mean:{probabilityMean}</p>
            <p> median:{probabilityMedian}</p>
            <p>Standarddeviation:{probabilitySd}</p>

            <p>Mode:{probabilityMode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
