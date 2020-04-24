let state_code = {
    "andaman and nicobar islands": "path1",
    "andhra pradesh": "path2",
    "arunachal pradesh": "path3",
    "assam": "path4",
    "bihar": "path5",
    "chandigarh": "path6",
    "chhattisgarh": "path7",
    "daman and diu": "path8",
    "delhi": "path9",
    "dadra nagar haveli": "path10",
    "goa": "path11",
    "gujarat": "path12",
    "himanchal pradesh": "path13",
    "haryana": "path14",
    "jharkhand": "path15",
    "jammu and kashmir": "path16",
    "karnataka": "path17",
    "kerala": "path18",
    "maharashtra": "path19",
    "meghalaya": "path20",
    "manipur": "path21",
    "madhya pradesh": "path22",
    "mizoram": "path23",
    "nagaland": "path24",
    "odisha": "path25",
    "punjab": "path26",
    "puducherry": "path27",
    "rajasthan": "path28",
    "sikkim": "path29",
    "telangana": "path30",
    "tamil nadu": "path31",
    "tripura": "path32",
    "uttar pradesh": "path34",
    "uttarakhand": "path35",
    "west bengal": "path36"
};

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};


function do_search() {
    var search_bar = document.getElementById("search_bar").value;
    let state_data = Object.keys(state_code);
    for (let i = 0; i < state_data.length; i++) {
        if (state_data[i].includes(search_bar)) {
            let c = document.getElementById(state_code[state_data[i]]);
            c.style.fill = "#FFF";
            sleep(2000).then(() => {
                c.style.fill = "#FF2424";
            });
        }
    }
}

var input = document.getElementById("search_bar");
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        if(input.value == ''){
            return
        }
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button").click();
  }
});