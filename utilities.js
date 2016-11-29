function transposeDateDataTable (dt) {
    var ndt = new google.visualization.DataTable;
    ndt.addColumn ('string',dt.getColumnLabel(0));
    for (var x=1; x<dt.getNumberOfColumns(); x++)
        ndt.addRow ([dt.getColumnLabel(x)]);
    for (var x=0; x<dt.getNumberOfRows(); x++) {
        ndt.addColumn ('number', dt.getValue(x,0));
        for (var y=1; y<dt.getNumberOfColumns(); y++)
            ndt.setValue (y-1, x+1, dt.getValue (x,y));
    }
    return ndt;
}