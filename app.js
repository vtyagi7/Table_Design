var packaging

;(function(packaging) {
  packaging[(packaging["NotApplicable"] = 1)] = "NotApplicable"
  packaging[(packaging["Bag"] = 2)] = "Bag"
  packaging[(packaging["Box"] = 3)] = "Box"
  packaging[(packaging["Barrel"] = 4)] = "Barrel"
})(packaging || (packaging = {}))

let currentOrder = {
    id: false,
    chemicalName: false,
    vender: false,
    density: false,
    viscosity: false,
    packaging: false,
    packSize: false,
    unit: false,
    quantity: false
  }
  

let suppliesData = [
  {
    id: 1,
    chemicalName: "Ammonium Persulfate",
    vender: "LG Chem",
    density: 3525.92,
    viscosity: 60.63,
    packaging: packaging.Bag,
    packSize: 100,
    unit: "kg",
    quantity: 6495.18
  },
  {
    id: 2,
    chemicalName: "Sodium Hydroxide",
    vender: "Dow Chemicals",
    density: 2130.15,
    viscosity: 72.18,
    packaging: packaging.Box,
    packSize: 50,
    unit: "kg",
    quantity: 3280.5
  },
  {
    id: 3,
    chemicalName: "Acetic Acid",
    vender: "BASF",
    density: 1049.86,
    viscosity: 22.75,
    packaging: packaging.Barrel,
    packSize: 200,
    unit: "L",
    quantity: 850.2
  },
  {
    id: 4,
    chemicalName: "Calcium Chloride",
    vender: "Solvay",
    density: 2152.67,
    viscosity: 55.32,
    packaging: packaging.Bag,
    packSize: 25,
    unit: "kg",
    quantity: 5432.89
  },
  {
    id: 5,
    chemicalName: "Methanol",
    vender: "Mitsubishi Chemical",
    density: 791.8,
    viscosity: 0.59,
    packaging: packaging.Barrel,
    packSize: 180,
    unit: "L",
    quantity: 1725.63
  },
  {
    id: 6,
    chemicalName: "Sulfuric Acid",
    vender: "ICL Group",
    density: 1830.5,
    viscosity: 24.35,
    packaging: packaging.Barrel,
    packSize: 160,
    unit: "L",
    quantity: 2793.22
  },
  {
    id: 7,
    chemicalName: "Benzene",
    vender: "ExxonMobil",
    density: 876.6,
    viscosity: 0.65,
    packaging: packaging.Barrel,
    packSize: 200,
    unit: "L",
    quantity: 950.5
  },
  {
    id: 8,
    chemicalName: "Toluene",
    vender: "Sinopec",
    density: 867.0,
    viscosity: 0.59,
    packaging: packaging.Barrel,
    packSize: 200,
    unit: "L",
    quantity: 1245.88
  },
  {
    id: 9,
    chemicalName: "Ethanol",
    vender: "Shell Chemicals",
    density: 789.3,
    viscosity: 1.2,
    packaging: packaging.Barrel,
    packSize: 200,
    unit: "L",
    quantity: 1956.4
  },
  {
    id: 10,
    chemicalName: "Potassium Chloride",
    vender: "Olin Corporation",
    density: 1987.15,
    viscosity: 40.28,
    packaging: packaging.Bag,
    packSize: 50,
    unit: "kg",
    quantity: 3056.72
  },
  {
    id: 11,
    chemicalName: "Sodium Bicarbonate",
    vender: "Tata Chemicals",
    density: 2220.8,
    viscosity: 48.6,
    packaging: packaging.Bag,
    packSize: 25,
    unit: "kg",
    quantity: 4820.33
  },
  {
    id: 12,
    chemicalName: "Hydrogen Peroxide",
    vender: "Evonik",
    density: 1450.75,
    viscosity: 20.15,
    packaging: packaging.Barrel,
    packSize: 200,
    unit: "L",
    quantity: 743.25
  },
  {
    id: 13,
    chemicalName: "Sodium Hypochlorite",
    vender: "AkzoNobel",
    density: 1230.5,
    viscosity: 18.4,
    packaging: packaging.Barrel,
    packSize: 150,
    unit: "L",
    quantity: 978.55
  },
  {
    id: 14,
    chemicalName: "Ammonium Nitrate",
    vender: "Yara International",
    density: 1700.3,
    viscosity: 34.5,
    packaging: packaging.Bag,
    packSize: 25,
    unit: "kg",
    quantity: 6785.1
  },
  {
    id: 15,
    chemicalName: "Formic Acid",
    vender: "Perstorp",
    density: 1220.25,
    viscosity: 16.8,
    packaging: packaging.Barrel,
    packSize: 160,
    unit: "L",
    quantity: 1503.75
  }
]




const tableBody =
  document.getElementById("tbody") || document.createElement("div")
const moveDownBtn = document.getElementById("moveDown");
const moveUpBtn = document.getElementById("moveUp");
let selectedrow;
/**
 *
 * @param key
 * @param ascending
 */
let sortByKey = (key, ascending) => {
  const multiplyer = ascending ? 1 : -1
  suppliesData.sort((a, b) => {
    if (typeof a[key] === "string") {
      return a[key].localeCompare(b[key]) * multiplyer
    } else if (typeof a[key] === "number") {
      return (a[key] - b[key]) * multiplyer
    }

    return 0
  })
}


let editRow = (isDisabled = false) => {
    if(!selectedrow) return;
    let inputs = selectedrow.querySelectorAll("input");
    inputs.forEach((i) => {
        i.disabled = isDisabled;
    });
};

let findInSupplies = (key, value) => {
let ans = -1;
suppliesData.forEach((data,index) => {
    if(data[key] == value) {
        ans= index;
    }
})

return ans;
}

let saveRow = () => {
if(!selectedrow) return;
const id = selectedrow.dataset.id;
const index = findInSupplies("id", id);
if(id<0) return;
let inputs = selectedrow.querySelectorAll("input");
inputs.forEach((input) => {
    const key = input.dataset.key;
    suppliesData[index][key] = +input.value;
});

editRow(true);
}

const moveDownClickHandler = () => {
if(!selectedrow || moveDownBtn.classList.contains("disabled")) return;

selectedrow.nextSibling.insertAdjacentElement("afterend",selectedrow);
if(selectedrow == tableBody.lastChild) {
    moveDownBtn.classList.add("disabled");
}
}

const moveUpClickHandler = () => {
if(!selectedrow || moveUpBtn.classList.contains("disabled")) return;

selectedrow.previousElementSibling.insertAdjacentElement("beforebegin",selectedrow);
if(selectedrow == tableBody.firstChild) {
    moveUpBtn.classList.add("disabled");
}
}


let createTableData = value => {

  let newTd = document.createElement("td")
  var text = document.createTextNode(value);

  newTd.appendChild(text);
  return newTd
}

let createTableRow = data => {
  let newTr = document.createElement("tr")
  for (var key in data) {
    if(key=="id") continue;
    if(key=="density" || key=="viscosity" || key=="quantity"){
        let newInput = document.createElement("input")
        newInput.value = data[key];
        newInput.disabled = true;
        let newTd = document.createElement("td")
        newTd.appendChild(newInput);
        newTr.appendChild(newTd);
        continue;
    }
    let newTd = createTableData(data[key])
    newTr.appendChild(newTd)
  }
  return newTr;
}

/**
 * This function renders the data passed to it on the table
 */
let render = () => {
  // if any data exists, remove it
  tableBody.textContent = ""
  // write the data passed in the parameter in th table
  for (var i = 0; i < suppliesData.length; i++) {
    let tableRow = createTableRow(suppliesData[i])

    tableBody.append(tableRow)
  }
}


/**
 * This function initializes the application
 *  - shows the first render of the data
 *  - binds all the event handlers
 *  - unbinds on all the events on page unload
 *  -
 */
let init = () => {
    render()
  
    //bind sorting on heading clicks
    let tableHeads = document.querySelectorAll("#tableData tr th")
    tableHeads.forEach(th => {
      th.addEventListener("click", () => {
        tableHeads.forEach(th => th.classList.remove('active'));
        th.classList.add('active');
        let value = th.dataset.value || "id"
        
        currentOrder[value] = !currentOrder[value]
        let sort_asc= currentOrder[value];
        th.classList.toggle('asc', sort_asc);
        sort_asc = th.classList.contains('asc') ? false : true;
        sortByKey(value, currentOrder[value])

        render()
      })
    })


    //bind selection of table row
    let tableRows = document.querySelectorAll("#tbody tr");
    tableRows.forEach((tr) => {
        tr.addEventListener("focusin", ()=>{
            if(tr == selectedrow) return;

            if(selectedrow) {
                //editRow(true);
                selectedrow.classList.remove("selected");
            }

            selectedrow = tr;
            tr.classList.add("selected");

            //setup for moving the row up and down
            moveUpBtn.classList[selectedrow == tableBody.firstChild ? "add": "remove"]("disabled");
            moveDownBtn.classList[selectedrow == tableBody.lastChild? "add": "remove"]("disabled");
            
        });
    });

    //edit click binding
    let editIcon = document.querySelector("i#edit");
    editIcon.addEventListener("click", () =>{ return editRow(false)});

    //save button
    let saveIcon = document.getElementById("save");
    saveIcon.addEventListener("click", saveRow)

    //move down button click
    document.getElementById("moveDown").addEventListener("click", moveDownClickHandler);
    
    //move up button click
    document.getElementById("moveUp").addEventListener("click", moveUpClickHandler);


  }
  
  

  /**
   * add is clicked and the dialog box to fill details opens
   */
  let add_button= document.getElementById("add");
  add_button.addEventListener("click",()=>{
    const add_dialog=document.getElementById("addialog");
    add_dialog.showModal();


  })


  let delete_button=document.getElementById("delete");
  delete_button.addEventListener("click",()=>{
    const delete_dialog=document.getElementById("deleteDialog");
    delete_dialog.showModal();
  })



  init()