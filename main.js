const BASE_URL = "http://localhost:9000";

const table = document.querySelector(".tableBody");
const createBtn = document.querySelector("#create");
const updateBtn = document.querySelector("#update");
const userName = document.querySelector("#username");
const userEmail = document.querySelector("#useremail");
const userPassword = document.querySelector("#userpassword");

fetch(`${BASE_URL}/get-data`)
  .then((response) => response.json())
  .then((data) => {
    data.data.map((item) => {
      table.innerHTML += `
            <tr>
                <th scope="row"></th>
                <td>${item.userName}</td>
                <td>${item.userEmail}</td>
                <td>${item.userPassword}</td>
                <td><button onclick="updateItem(${item.id})" class="btn btn-primary updateBtn">Update</button></td>
                <td><button onclick="deleteItem(${item.id})" class="btn btn-danger deleteBtn">Delete</button></td>
            </tr>
            `;
    });
  });

//! ----------------- CREATE -----------------------

createBtn.addEventListener("click", () => {
  let data = {
    id: Date.now(),
    userName: userName.value,
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };

  if (
    userName.value != "" &&
    userEmail.value != "" &&
    userPassword.value != ""
  ) {
    fetch(`http://localhost:9000/create-data`, {
      method: "Post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          location.reload();
        }
      })
      .catch((error) => {
        alert(error);
      });

    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
  } else {
    alert("Fill the inputs");
  }
});

//! --------------- DELETE -----------------------

function deleteItem(id) {
  fetch(`${BASE_URL}/delete-data:${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  location.reload();
  // console.log(id);
}

//! --------------- UPDATE -----------------------

function updateItem(id) {
  
  const updateButton = document.querySelectorAll(".updateBtn");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  
  updateButton.forEach((item)=>{
    item.disabled = true;
    item.style.transition = "1s";
  })

  deleteBtn.forEach((elem)=>{
    elem.disabled = true;
    elem.style.transition = "1s";
  })
  createBtn.disabled = true;
  
  // updateButton.style.transform = "translateY(-100px)";
  // updateBtn.style.transition = "2s";

  updateBtn.style.opacity = "1";
  updateBtn.style.transition = "1s";


  fetch(`${BASE_URL}/get-data`)
    .then((response) => response.json())
    .then((updData) => {
      const { data } = updData;

      data.forEach((element) => {
        if (element.id === id) {
          userName.value = element.userName;
          userEmail.value = element.userEmail;
          userPassword.value = element.userPassword;
        }
      });
    });

  updateBtn.addEventListener("click", () => {

    if (
      userName.value != "" &&
      userEmail.value != "" &&
      userPassword.value != ""
    ) {
      
      let data = {
        id: id,
        userName: userName.value,
        userEmail: userEmail.value,
        userPassword: userPassword.value,
      };
  
      fetch(`${BASE_URL}/update-data:${id}`, {
        method: "Put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          location.reload();
        });



    }else{
      alert("Fill the inputs");
    }

  });
}
