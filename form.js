var person = null;

var button = document.createElement('button');
button.type = 'button';
button.id = 'cancel';
button.value = 'cancel';
button.className = 'btn';
button.innerHTML = 'Cancel';

var countryDropDown = document.getElementsByTagName("select")[0];
var stateDropDown = document.getElementsByTagName("select")[1];
var cityDropDown = document.getElementsByTagName("select")[2];

var indexes = JSON.parse('{"abc": [103, 11, 262], "pqr": [103, 21, 342]}');

function onFormSubmit() {
    var formData = readFormData();

    if (person == null) {
        data.push(formData);
        let len = data.length;
        addTable(len);
        person = -1;
        resetForm();
        person = null;
    } else {
        updateRecord(formData, person);
        person = null;
        resetForm();
    }
};

function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
};

function readFormData() {
    var formData = {};
    formData["name"] = document.querySelector("input[type='text']").value;
    formData["email"] = document.querySelector("input[type='email']").value;
    formData["gender"] = document.querySelector('input[name=gender]:checked').value;
    formData["hobby"] = getCheckedBoxes("messageCheckbox");
    formData["country"] = countryDropDown.options[countryDropDown.selectedIndex].text;
    formData["state"] = stateDropDown.options[stateDropDown.selectedIndex].text;
    formData["city"] = cityDropDown.options[cityDropDown.selectedIndex].text;

    if (document.querySelector("input[type='submit']").value === "Update") {
        delete indexes[formData["name"]];
        indexes[formData["name"]] = [countryDropDown.selectedIndex, stateDropDown.selectedIndex, cityDropDown.selectedIndex];
        indexes = JSON.stringify(indexes);
        indexes = JSON.parse(indexes);
    } else {
        indexes[formData["name"]] = [countryDropDown.selectedIndex, stateDropDown.selectedIndex, cityDropDown.selectedIndex];
        indexes = JSON.stringify(indexes);
        indexes = JSON.parse(indexes);
    }
    return formData;
};

function resetForm() {
    document.getElementById('form').reset();

    if (person == null) {
        var ele = document.getElementById("cancel");
        ele.parentNode.removeChild(ele);
    }
    var states_selected = document.getElementsByTagName("select")[1];
    var cities_selected = document.getElementsByTagName("select")[2];

    while (states_selected.firstChild) {
        states_selected.removeChild(states_selected.firstChild);
    }
    while (cities_selected.firstChild) {
        cities_selected.removeChild(cities_selected.firstChild);
    }

    var select_option = document.createElement("option");
    var select_option2 = document.createElement("option");
    var textNode = document.createTextNode("Select");
    var textNode2 = document.createTextNode("Select");

    select_option.appendChild(textNode);
    select_option2.appendChild(textNode2);
    select_option.value = '-';
    select_option2.value = '-';
    states_selected.appendChild(select_option);
    cities_selected.appendChild(select_option2);
    document.querySelector("input[type='submit']").value = "Save";
};

function genderChecked(i) {
    let male = document.getElementsByName("gender")[0].value;
    if (male === data[i].gender) {
        document.getElementsByName("gender")[0].checked = true;
    } else {
        document.getElementsByName("gender")[1].checked = true;
    }
};

function checkboxesChecked(i) {
    let checkboxes = data[i].hobby;
    let hobby = ["Traveling", "Sport", "Reading"];

    for (let j = 0; j < 3; j++) {
        if (checkboxes.indexOf(hobby[j]) > -1) {
            document.getElementsByName("messageCheckbox")[j].checked = true;
        }
    }
};

function editTable(i) {
    person = i;
    // if (searched === true) 
    for (let indx = 0; indx < data.length; indx++) {
        if (data[i]["name"] === data[indx]["name"]) {
            i = indx;
            break;
        }
    }
    if (i >= data.length) {
        for (let ind = 0; ind < data.length; ind++) {
            if (data[i - 1]["name"] == data[ind]["name"]) {
                i = ind;
                break;
            }
        }
    }
    resetForm();
    document.querySelector("input[type='submit']").value = "Update";
    document.querySelector("input[type='text']").value = data[i].name;
    document.querySelector("input[type='email']").value = data[i].email;
    genderChecked(i);
    checkboxesChecked(i);
    document.getElementsByTagName("select")[0].selectedIndex = indexes[data[i].name][0];
    country.onchange();
    document.getElementsByTagName("select")[1].selectedIndex = indexes[data[i].name][1];
    state.onchange();
    document.getElementsByTagName("select")[2].selectedIndex = indexes[data[i].name][2];
    
    button.onclick = function () {
        person = null;
        resetForm();
    };
    const form = document.getElementsByName('save')[0];
    form.appendChild(button);
};

function updateRecord(formData, i) {
    document.querySelector("input[type='submit']").value = "Save";
    for (const x in data[i]) {
        data[i][x] = formData[x];
    }
    clearTable();
    addTable();
};

function deleteTable(i) {
    if (confirm("Are you sure?")) {
        delete indexes[data[i].name];
        data.splice(i, 1);
        clearTable();
        addTable();
    }
};