import React, { useState, useEffect } from "react";
import axios from "axios"
import Loader from "./Loader";
import { Link, useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const Stats = () => {

  // const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}]});
  const [names, setNames] = useState([]);
  const [counts, setCounts] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios
    .get("/api/poll/" + id)
    .then(res => {
      const options = res.data.options;
      options.forEach(element => {
        setNames((prevNames) => [...prevNames, element.name]); // prevState is very important
        setCounts((prevCounts) => [...prevCounts, element.count]);
      });
    })
    .catch(err => console.error(err));
  }, [id]);

  const data = {
    labels: names,
    datasets: [{
        label: '# of Votes',
        data: counts,
        borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Bar
        data={data}
        options={options}  
      />
    </div>
  );
}

export default Stats;
