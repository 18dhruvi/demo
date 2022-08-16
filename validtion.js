function validation() {
    var name = document.querySelector("input[type='text']").value;
    var email = document.querySelector("input[type='email']").value;
    var gender = document.querySelectorAll('input[name=gender]');
    var hobby = document.getElementsByName("messageCheckbox");
    var country = document.getElementsByTagName("select")[0];
    var state = document.getElementsByTagName("select")[1];
    var city = document.getElementsByTagName("select")[2];
    var data_disp = document.getElementsByTagName("span");

    let name_err = email_err = gender_err = hobby_err = country_err = state_err = city_err = true;

    if (name == "") {
        data_disp[0].textContent = "Please Enter Your Name!";
        data_disp[0].style.color = "red";
    }
    else {
        let pattern = /^[a-zA-Z\s]+$/;
        if (pattern.test(name) === false) {
            data_disp[0].textContent = "Enter Valid Name!";
            data_disp[0].style.color = "red";
        }
        else { data_disp[0].textContent = ""; name_err = false; }
    }

    if (email == "") {
        data_disp[1].textContent = "Please Enter Valid Mail!";
        data_disp[1].style.color = "red";
    }
    else {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
        if (pattern.test(email) === false) {
            data_disp[1].textContent = "Enter Valid Mail!";
            data_disp[1].style.color = "red";
        }
        else { data_disp[1].textContent = ""; email_err = false; }
    }

    if (gender[0].checked == false && gender[1].checked == false) {
        data_disp[2].textContent = "Please Select Your Gender!";
        data_disp[2].style.color = "red";
    }
    else { data_disp[2].textContent = ""; gender_err = false; }

    if (hobby[0].checked == false && hobby[1].checked == false && hobby[2].checked == false) {
        data_disp[3].textContent = "Please Select One of the Checkboxes!";
        data_disp[3].style.color = "red";
    }
    else { data_disp[3].textContent = ""; hobby_err = false; }

    if (country.options[country.selectedIndex].value == "-") {
        data_disp[4].textContent = "Please Select the Country!";
        data_disp[4].style.color = "red";
    }
    else { data_disp[4].textContent = ""; country_err = false; }

    if (state.options[state.selectedIndex].value == "-") {
        data_disp[5].textContent = "Please Select the State!";
        data_disp[5].style.color = "red";
    }
    else { data_disp[5].textContent = ""; state_err = false; }

    if (city.options[city.selectedIndex].value == "-") {
        data_disp[6].textContent = "Please Select the City!";
        data_disp[6].style.color = "red";
    }
    else { data_disp[6].textContent = ""; city_err = false; }

    if ((name_err || email_err || gender_err || country_err || state_err || city_err) == true) {
        return false;
    }
    else { onFormSubmit(); }
};