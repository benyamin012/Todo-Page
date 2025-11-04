let form = document.getElementById("item-form");
let iteminput = document.getElementById("item-input");
let dangerspan = document.getElementById("input-invalid");
let itemul = document.getElementById("item-list");
let delicon = document.getElementById("bi-x");
let delallul = document.getElementById("items-clear");
let filter = document.getElementById("filter");
let liinput = document.querySelector("list-item");
let formbtn = form.querySelector("button");
let editmode = false;

function GivItemFromLocalToLoadInDom() {
  let local = norepeataddtolocalcode();
  local.forEach((item) => additemtoDom(item));

  foruidesin();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");

  let inputitemvalue = iteminput.value;
  if (!inputitemvalue) {
    dangerspan.innerHTML = "you shuld fill out the form input";
    return;
  } else {
    dangerspan.innerText = "";
  }

  if (editmode) {
    let GivEditLi = itemul.querySelector(".edit-mode");
    removeliitem(GivEditLi.textContent);
    GivEditLi.remove();
    formbtn.innerHTML = "<i class='bi bi-plus'></i>  Add Item";
    formbtn.classList.replace("btn-primary", "btn-dark");
    editmode = false;
  } else {
    if (checkrepeatulvalue(inputitemvalue)) {
      dangerspan.innerText = "this value has in the list";
      return;
    } else {
      dangerspan.innerHTML = "";
    }
  }

  additemtoDom(inputitemvalue);
  addtolocal(inputitemvalue);

  iteminput.value = "";
  foruidesin();
});
function checkrepeatulvalue(item) {
  let local = norepeataddtolocalcode();
  return local.includes(item);
}
function additemtoDom(item) {
  let createtask = document.createElement("li");
  createtask.className = "list-item";
  createtask.textContent = item;

  let icon = liicon("bi bi-x fs-5 text-danger");
  createtask.appendChild(icon);
  itemul.appendChild(createtask);
}

function addtolocal(item) {
  const local = norepeataddtolocalcode();

  local.push(item);
  localStorage.setItem("items", JSON.stringify(local));
}
function norepeataddtolocalcode() {
  let local;

  if (localStorage.getItem("items") === null) {
    local = [];
  } else {
    local = JSON.parse(localStorage.getItem("items"));
  }
  return local;
}
function liicon(classes) {
  let icon = document.createElement("i");
  icon.classList = classes;

  return icon;
}
itemul.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-x")) {
    removeItem(e.target.parentElement);
    removeliitem(e.target.parentElement.textContent);
    foruidesin();
  } else {
    setstyleforli(e.target);
  }
});

delallul.addEventListener("click", () => {
  itemul.innerHTML = "";
  localStorage.removeItem("items");
  foruidesin();
});

function removeItem(item) {
  item.remove();
  removeliitem(item.textContent);
  foruidesin();
}

function removeliitem(item) {
  let local = norepeataddtolocalcode();
  local = local.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(local));
  foruidesin();
}
function setstyleforli(item) {
  editmode = true;
  itemul
    .querySelectorAll("li")
    .forEach((item) => item.classList.remove("edit-mode"));

  let liTextContent = item.textContent;
  iteminput.value = liTextContent;
  item.classList.add("edit-mode");
  formbtn.innerHTML = "<i class='bi bi-pencil-fill'></i>  Update Item";
  formbtn.classList.replace("btn-dark", "btn-primary");
}

foruidesin = () => {
  let ultag = itemul.querySelectorAll("li");
  console.log(ultag);
  if (ultag.length === 0) {
    filter.style.display = "none";
    delallul.style.display = "none";
  } else {
    filter.style.display = "block";
    delallul.style.display = "block";
  }
};

filter.addEventListener("input", (e) => {
  let ultag = itemul.querySelectorAll("li");
  let filterinputvalue = e.target.value.toLowerCase();
  ultag.forEach((item) => {
    let allulvalue = item.firstChild.textContent.toLowerCase();
    if (allulvalue.indexOf(filterinputvalue) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
  console.log(filterinputvalue);
});
document.addEventListener("DOMContentLoaded", GivItemFromLocalToLoadInDom);

foruidesin();
