import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { Bar } from "react-chartjs-2";

const Stats = () => {
	const [question, setQuestion] = useState("");
  const [names, setNames] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
    .get("/api/poll/" + id)
    .then(res => {
			setQuestion(res.data.question);
      const options = res.data.options;
      options.forEach(element => {
        setNames((prevNames) => [...prevNames, element.name]); // prevState is very important
        setCounts((prevCounts) => [...prevCounts, element.count]);
      });
      setLoaded(true);
    })
    .catch(err => console.error(err));
  }, [id]);

  const data = {
    labels: names,
    datasets: [{
        label: "# of Votes",
        data: counts,
        borderWidth: 1,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
    }]
  };

  const options = {		
		maintainAspectRatio: false,	// Removes aspect ratio
		responsive: true,	// Adjusts width and height according to container
    scales: {
      y: {
				ticks: {
					precision: 0	// To remove decimal labels
				}
      }
    },
		plugins: {
			legend: {
				display: false	// Remove chart legend
			},
			title: {
				display: true,
				text: question,
			}
		}
  };

  return (
    loaded ?
      <>
        <Link to={"/poll/" + id}>
          Back
        </Link>
				<div className="stats">
					<Bar
						data={data}
						options={options}
					/>
				</div>
			</> :
    <Loader />
  );
};

export default Stats;
