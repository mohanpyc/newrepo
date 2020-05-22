var formelm = document.getElementById("form_id");
var formelements = formelm.elements;
var formelementsArray = Array.from(formelements);
var detailArray = [];
var index = 0;
var dummyArray = [];
var updateid = "";

function save() {
  var newArray = [];
  var details = new Object();
  formelementsArray.forEach((elm) => {
    if (elm.value == "" || elm.value == "undefined") {
      elm.classList.add("is-invalid");
    } else {
      elm.classList.remove("is-invalid");

      if (elm.id == "usrname") {
        details.username = elm.value;
      } else if (elm.id == "mail") {
        if (details.username) {
          details.email = elm.value;
        }
      } else if (elm.id == "phnum") {
        if (details.email) {
          details.phone = elm.value;
        }
      } else if ((elm.id == "r1") & elm.checked) {
        if (details.phone) {
          details.radio = elm.value;
        }
      } else if ((elm.id == "r2") & elm.checked) {
        if (details.phone) {
          details.radio = elm.value;
        }
      }
    }
  });
  if (
    details.username == undefined ||
    details.phone == undefined ||
    details.email == undefined ||
    details.radio == undefined
  ) {
    details = new Object();
  } else {
    newArray.push(details);
    detailArray.push(newArray);
    getData();
  }

  // if(details.username!=undefined & details.email!=undefined & details.phone!=undefined & details.radio!=undefined){

  document.getElementById("form_id").reset();
}

let getData = () => {
  var tdata = document.getElementById("tdata");

  detailArray[index].forEach(function (value) {
    var tr = `
    <td>  ${index + 1} </td>
    <td>  ${value.username} </td>
    <td>  ${value.email} </td>
    <td>  ${value.phone} </td>
    <td>  ${value.radio} </td>
    <td> 
      <a data-toggle="modal" data-target="#update_modal" onclick="return toUpdate(this)" id=${index}> <i class="fas fa-edit text-primary"></i></a>
      <a onclick="return onDelete(this)" id=${index}> <i class="fas fa-trash text-danger"></i></a>
    </td>
    `;

    row = document.createElement("tr");
    row.id = "row" + index;
    row.innerHTML = tr;
    tdata.appendChild(row);
  });

  index = index + 1;
};

function toUpdate(up_id) {
  var c = 6;
  var idm = (updateid = up_id.id);
  var rowcap = document.getElementById("row" + idm);
  rowcap.querySelectorAll("td").forEach((n, i = 0) => {
    if ((i > 0) & (i < c)) {
      if (i == 1) {
        document.getElementById("usrname2").value = n.textContent.trim();
      } else if (i == 2) {
        document.getElementById("mail2").value = n.textContent.trim();
      } else if (i == 3) {
        var num = n.textContent;
        document.getElementById("phnum2").value = parseInt(num);
      } else if (i == 4) {
        var radio2 = n.textContent.trim();
        if (radio2 == "female") {
          document.getElementById("r12").checked = true;
        } else if (radio2 == "male") {
          console.log(radio2);
          document.getElementById("r22").checked = true;
        }
      }
    }
    i++;
  });
}

function newSave() {
  var formelm2 = document.getElementById("form_id2");
  var formelements2 = formelm2.elements;
  var formelementsArray2 = Array.from(formelements2);
  var newArray = [];
  var details = new Object();

  formelementsArray2.forEach((elm) => {
    if (elm.value == "" || elm.value == "undefined") {
      elm.classList.add("is-invalid");
    } else {
      elm.classList.remove("is-invalid");

      if (elm.id == "usrname2") {
        details.username = elm.value;
      } else if (elm.id == "mail2") {
        if (details.username) {
          details.email = elm.value;
        }
      } else if (elm.id == "phnum2") {
        if (details.email) {
          details.phone = elm.value;
        }
      } else if ((elm.id == "r12") & elm.checked) {
        if (details.phone) {
          details.radio = elm.value;
        }
      } else if ((elm.id == "r22") & elm.checked) {
        if (details.phone) {
          details.radio = elm.value;
        }
      }
    }
  });
  if (
    details.username == undefined ||
    details.phone == undefined ||
    details.email == undefined ||
    details.radio == undefined
  ) {
    details = new Object();
  } else {
    newArray.push(details);
    detailArray.splice(updateid, 1, newArray);
    commontask();
  }
}

function onDelete(del_id) {
  var idx = del_id.id;
  detailArray.splice(idx, 1);
  commontask();
}

function commontask() {
  dummyArray = detailArray;
  var node = document.getElementById("tdata");
  node.querySelectorAll("*").forEach((n) => n.remove());
  detailArray = [];
  index = 0;
  refreshe();
}

function refreshe() {
  dummyArray.forEach((ele) => {
    detailArray.push(ele);
    getData();
  });
}
