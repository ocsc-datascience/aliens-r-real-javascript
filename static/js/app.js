// from data.js
var tableData = data;

// helper function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// console.log(data);
var tbody = d3.select("tbody")

function loadData(searchString,scol) {

    var xdata = [];

    // filter the data if we need to
    if (searchString.length > 0) {
        var xdata = data.filter( el => {
            return el[scol].toUpperCase() === searchString;
        });
    } else {
        xdata = data;
    }

    xdata.forEach( (dataset) => {

        // this is leftover code I didn't have time
        // to clean up
        display = 1;
        if (display) {
            var row = tbody.append("tr");
            Object.entries(dataset).forEach(([key, value]) => {
                var cell = row.append("td");
                // beautify
                if (key === "city" || key === "shape") {
                    value = capitalizeFirstLetter(value);
                }
                if (key === "state" || key === "country") {
                    value = value.toUpperCase();
                }
                cell.text(value);
            });
        }
    });
}

loadData("","");

// Handle search evennts
var search = d3.select("#filter-btn");

search.on("click", function() {
    d3.event.preventDefault();

    var input = d3.select("#search");
    var search_selector = d3.select("#search_selector")
    var scol = search_selector.node().value;
    var sstring = input.node().value;

    // do some due diligence and do some basic input checking 
    // if we have a date
    if (scol === "datetime") {
        inputGood = true;
        splitted = sstring.split('/');
        console.log(splitted);
        inputGood &= (splitted.length === 3);
        var day = parseInt(splitted[0]);
        var month = parseInt(splitted[1]);
        var year = parseInt(splitted[2]);

        inputGood &= (month > 0 && month < 13);
        inputGood &= (day > 0 && day < 31);
        inputGood &= (year > 2000);
        if (!inputGood) {
            alert("Date format must be m/d/yyyy with yyyy > 2000. Valid date required!");
            return;
        }

        // search string without any zeros
        sstring = month.toString()+"/"+day.toString()+"/"+year.toString();
    }

    // remove data, load filtered data
    d3.select('tbody').selectAll('tr').remove();
    loadData(sstring,scol);

});
