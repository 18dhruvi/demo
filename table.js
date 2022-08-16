var data = [{
        "name": "Abc",
        "email": "abc.@gmail.com",
        "gender": "Male",
        "hobby": "Traveling",
        "country": "India",
        "state": "Gujarat",
        "city": "Surat",
    },
    {
        "name": "Pqr",
        "email": "pqr@gmail.com",
        "gender": "Female",
        "hobby": "Sport,Reading",
        "country": "India",
        "state": "Mp",
        "city": "North mp",
    }
];

function addTable(len = 1) {
    try {
        var add = Object.keys(data[0]);
        for (let i = len - 1; i < data.length; i++) {
            var table = document.getElementById("details").getElementsByTagName('tbody')[0];
            var row = table.insertRow();
            for (let j = 0; j < 7; j++) {
                var col = row.insertCell(j);
                col.innerHTML = data[i][add[j]];
            }
            cell9 = row.insertCell(7);
            cell9.innerHTML = `<button onClick="editTable(${i})">Edit</button>
                        <button onClick="deleteTable(${i})">Delete</button>`;
        }
    } catch (err) {
        console.log(err);
    }
};

function clearTable() {
    var table = document.getElementById("details");
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
};

function searchName() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("details");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function ascedescName() {
    var dropDownVal = document.getElementById("dropDownSort");
    dropDownVal.onchange = function () {
        if (dropDownVal.value == "ascending") {
            try {
                data.sort(function (a, b) {
                    var name1 = a.name.toUpperCase();
                    var name2 = b.name.toUpperCase();
                    if (name1 < name2) {
                        return -1;
                    }
                    if (name1 > name2) {
                        return 1;
                    }
                    return 0;
                });
            } catch (err) {
                console.log(err);
            }
        } else if (dropDownVal.value == "descending") {
            try {
                data.sort(function (a, b) {
                    var name2 = b.name.toUpperCase();
                    var name1 = a.name.toUpperCase();
                    if (name1 > name2) {
                        return -1;
                    }
                    if (name1 < name2) {
                        return 1;
                    }
                    return 0;
                });
            } catch (err) {
                console.log(err);
            }
        }
        clearTable();
        addTable();
    };
};
ascedescName();