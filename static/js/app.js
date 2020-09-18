function init() {
	var data = d3.json("samples.json").then(function (data) {
		//console.log(data);
		names = data.names;
		metadata = data.metadata;
		samples = data.samples;

		var dataset = d3.select("#selDataset");

		names.forEach((element) => {
			dataset.append("option").text(element);
		});
		var value = dataset.property("value");
		console.log(value);

		//Adding Demographics for each sample.
		var metadata_to_be_filled = metadata.filter(
			(item) => item.id === parseInt(value)
		);
		//Converted it to array
		var metadata_final = Object.entries(metadata_to_be_filled[0]);
		var sample_metadata = d3.select("#sample-metadata");
		sample_metadata.html("");

		metadata_final.forEach((element) => {
			sample_metadata.append("h6").text(element[0] + ":" + element[1]);
		});

		//Adding Vertical Bar graph.
		var samples_to_be_filled = samples.filter((item) => item.id === value);
		var samples_final = samples_to_be_filled[0];

		var id = samples_final["id"];
		var values = samples_final["sample_values"].slice(0, 10).reverse();
		var labels = samples_final["otu_ids"].slice(0, 10).reverse();
		var hover_text = samples_final["otu_labels"].slice(0, 10);

		trace = {
			type: "bar",
			x: values,
			y: labels.map((item) => {
				return "OTP" + item;
			}),
			orientation: "h",
			hovertext: hover_text.map((item) => {
				return item;
			}),
		};
		data = [trace];
		layout = {
			title: "Bar chart for ID:" + id,
			font: { color: "purple", family: "Arial", size: 15 },
		};
		Plotly.newPlot("bar", data, layout);
		//Ploting the bubble chart

		var values_ = samples_final["sample_values"];
		var labels_ = samples_final["otu_ids"];
		var hover_text_ = samples_final["otu_labels"];
		trace = {
			x: labels_,
			y: values_,
			mode: "markers",
			text: hover_text_,
			marker: {
				size: values_,
				color: labels_,
			},
		};
		data = [trace];
		layout = {
			title: "Bubble Chart for ID:" + id,
			font: { color: "purple", family: "Arial", size: 20 },
		};
		Plotly.newPlot("bubble", data, layout);

		// Ploting the gauge
		console.log(metadata_to_be_filled);
		trace = {
			domain: { x: [0, 9], y: [0, 9] },
			value: metadata_to_be_filled[0].wfreq,
			title: { text: "Scrubs per week" },
			type: "indicator",
			mode: "gauge+number",
			gauge: {
				axis: { range: [null, 9] },
				steps: [
					{ range: [0, 5], color: "lightgray" },
					{ range: [5, 8], color: "gray" },
				],
				threshold: {
					line: { color: "red", width: 4 },
					thickness: 0.75,
					value: 9,
				},
			},
		};
		data = [trace];
		layout = {
			title: "Belly Button Washing frequency",
			font: { color: "purple", family: "Arial", size: 20 },
		};
		Plotly.newPlot("gauge", data, layout);
	});
}

var data = d3.json("samples.json").then(function (data) {
	//console.log(data);
	names = data.names;
	metadata = data.metadata;
	samples = data.samples;
	Washing_freq = data.metadata.map((item) => item.wfreq);
	Washing_freq = Washing_freq.map((item) => {
		if (item === null) return 0;
		else return item;
	});
	console.log(Washing_freq);

	var dataset = d3.select("#selDataset");

	names.forEach((element) => {
		dataset.append("option").text(element);
	});
	dataset.on("change", optionChanged);
	function optionChanged() {
		var value = dataset.property("value");
		console.log(value);

		//Adding Demographics for each sample.
		var metadata_to_be_filled = metadata.filter(
			(item) => item.id === parseInt(value)
		);
		//Converted it to array
		var metadata_final = Object.entries(metadata_to_be_filled[0]);
		var sample_metadata = d3.select("#sample-metadata");
		sample_metadata.html("");

		metadata_final.forEach((element) => {
			sample_metadata.append("h6").text(element[0] + ":" + element[1]);
		});

		//Adding Vertical Bar graph.
		var samples_to_be_filled = samples.filter((item) => item.id === value);
		var samples_final = samples_to_be_filled[0];

		var id = samples_final["id"];
		var values = samples_final["sample_values"].slice(0, 10).reverse();
		var labels = samples_final["otu_ids"].slice(0, 10).reverse();
		var hover_text = samples_final["otu_labels"].slice(0, 10);

		trace = {
			type: "bar",
			x: values,
			y: labels.map((item) => {
				return "OTP" + item;
			}),
			orientation: "h",

			hovertext: hover_text.map((item) => {
				return item;
			}),
		};
		data = [trace];
		layout = {
			title: "Bar chart for ID:" + id,
			font: { color: "purple", family: "Arial", size: 15 },
		};
		Plotly.newPlot("bar", data, layout);

		//Ploting the bubble chart

		var values_ = samples_final["sample_values"];
		var labels_ = samples_final["otu_ids"];
		var hover_text_ = samples_final["otu_labels"];
		trace = {
			x: labels_,
			y: values_,
			mode: "markers",
			text: hover_text_,
			marker: {
				size: values_,
				color: labels_,
			},
		};
		data = [trace];
		layout = {
			title: "Bubble Chart for ID:" + id,
			font: { color: "purple", family: "Arial", size: 20 },
		};
		Plotly.newPlot("bubble", data, layout);

		// Ploting the gauge
		console.log(metadata_to_be_filled);
		trace = {
			domain: { x: [0, 9], y: [0, 9] },
			value: metadata_to_be_filled[0].wfreq,
			title: { text: "Scrubs per week" },
			type: "indicator",
			mode: "gauge+number",
			gauge: {
				axis: { range: [null, 9] },
				steps: [
					{ range: [0, 5], color: "lightgray" },
					{ range: [5, 8], color: "gray" },
				],
				threshold: {
					line: { color: "red", width: 4 },
					thickness: 0.75,
					value: 9,
				},
			},
		};
		data = [trace];
		layout = {
			title: "Belly Button Washing frequency",
			font: { color: "purple", family: "Arial", size: 20 },
			textSize: "bold",
		};
		Plotly.newPlot("gauge", data, layout);
	}
});

init();
