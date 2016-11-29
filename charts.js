

// Load the Visualization API and the controls package.
google.charts.load('current', {'packages':['corechart', 'controls']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawDashboard);

// Callback that creates and populates a data table,
// instantiates a dashboard, a range slider and a pie chart,
// passes in the data and draws it.
function drawDashboard() {

    // Create our data table.
    var data = google.visualization.arrayToDataTable([
      ['Name', 'Donuts eaten', 'Fries Eaten', 'Millshakes Drunk'],
      ['Michael' , 5, 7, 3],
      ['Elisa', 7, 8, 3],
      ['Robert', 3, 65, 3],
      ['John', 2, 4, 6],
      ['Jessica', 6, 1, 8],
      ['Aaron', 1, 100, 1],
      ['Margareth', 8, 4, 3]
    ]);

    // Create a dashboard.
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // Create a range slider, passing some options
    var donutRangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'NumberRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnLabel': 'Donuts eaten'
      }
    });
    
    var categoryFilter = new google.visualization.ControlWrapper({
      'controlType': 'CategoryFilter',
      'containerId': 'colFilter_div',
      
      'options': {
        'filterColumnLabel': 'Name',
      }
    });

    // Create a pie chart, passing some options
    var chart = new google.visualization.ChartWrapper({
      'chartType': 'LineChart',
      'containerId': 'chart_div',
      'options': {
        'width': 500,
        'height': 300,
        'pieSliceText': 'value',
        'legend': 'right',
        'filterColumnLabel': 'Donuts eaten'
      }
    });
    


    // Establish dependencies, declaring that 'filter' drives 'pieChart',
    // so that the pie chart will only display entries that are let through
    // given the chosen slider range.
    //dashboard.bind(donutRangeSlider, pieChart);
    dashboard.bind(categoryFilter, chart);

    // Draw the dashboard.
    dashboard.draw(data);

    

}