// Load the Visualization API and the controls package.
google.charts.load('upcoming', {'packages': ['corechart', 'table', 'controls', 'map']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(dataQuery);

function dataQuery() {
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zXIAyAU20Gv3o6-iEvklz_Fjlh4voBENihcftgumsHo/gviz/tq?=');
	//select all data, format F as date and G as number
	query.setQuery("select * format F 'MM/yyyy', G '0', H '0', I '0'");
	query.send(drawDashboard);
}

function drawDashboard(response) {
	var data = response.getDataTable();

	//    var table = new google.visualization.Table(
	//        document.getElementById('table_div'));
	//    table.draw(data);

	// Create a dashboard.
	var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));


	// Create a chart, passing some options
	var chart = new google.visualization.ChartWrapper({
		'chartType': 'LineChart',
		'containerId': 'chart_div',
		'options': {
			'backgroundColor': {'strokeWidth': 2},
			'width': 550,
			'height': 300,
			'legend': 'right',
            'vAxis':{
                'title': 'Temperature(F)'
            },
            'hAxis':{
                'title': 'Date(MM/yyyy)',
                'slantedText': true,
                'showTextEvery': 1,
                gridlines: { count: 10 }
            }
            
		}
	});

	//location filter
	var categoryFilter = new google.visualization.ControlWrapper({
		'controlType': 'CategoryFilter',
		'containerId': 'categoryFilter_div',
		'options': {
			'filterColumnLabel': 'STATION_NAME',
		}
	});

	//date slider
	var chartRangeFilter = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': 'chartRangeFilter_div',
		'options': {
			'filterColumnLabel': 'DATE',
			'ui': {
				chartOptions: {
					'enableInteractivity': false,
					'chartArea': {
						'height': 50,
						'width': 548
					},
					'hAxis': {
						'textPosition': 'in'
					},
					'vAxis': {
						'textPosition': 'none',
						'gridlines': {
							'color': 'none'
						}
					}
				}
			}
		}
	});
    
    
    //map
    var mapView = new google.visualization.DataView(data);
    
    
    var map = new google.visualization.Map(document.getElementById('map_div'));
    var mapOptions = {
      mapType:'normal',
      showTooltip: true,
      showInfoWindow: true
    };
    
    
    //bind filters to chart
	dashboard.bind(categoryFilter, chart);
	dashboard.bind(chartRangeFilter, chart);

    
    
    var update = function(dataColumn, title){
        mapView.setColumns([3,4,1]);
        map.draw(mapView, mapOptions);
        //set the columns to be used for this chart/filter combo
	    chartRangeFilter.setView({columns: [5, dataColumn]});
        //change the title
        chart.setOption('title',title);
        // Draw the dashboard.
        dashboard.draw(data);
    }
    
    update(6, 'MLY-TMIN-NORMAL');
    
    google.visualization.events.addListener(map, 'select', function(){
        var placeName = data.getValue(map.getSelection()[0].row-1, 1);
        categoryFilter.setState({'selectedValues': [placeName] });
        dashboard.draw(data);
    });
    
    google.visualization.events.addListener(categoryFilter, 'statechange', function(){
        var placeName = categoryFilter.getState().selectedValues[0];
        console.log(placeName);
    });
    
    document.getElementById('6').onclick = function(){
        update(6, this.value);
    }
    document.getElementById('7').onclick = function(){
        update(7, this.value);
    }
    document.getElementById('8').onclick = function(){
        update(8, this.value);
    }

}

	