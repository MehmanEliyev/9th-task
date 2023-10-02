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
                <th scope="row">${item.id}</th>
                <td>${item.userName}</td>
                <td>${item.userEmail}</td>
                <td>${item.userPassword}</td>
                <td><button onclick="updateItem(${item.id})" class="btn btn-primary">Update</button></td>
                <td><button onclick="deleteItem(${item.id})" class="btn btn-danger">Delete</button></td>
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
    console.log(id);
    
    createBtn.disabled = true;
    updateBtn.classList.remove("d-none");
    
    fetch(`${BASE_URL}/get-data:${id}`)
    .then((response) => response.json())
    .then((data) => {
        
    //   userName.value = updData.userName;
    //   userEmail.value = updData.userEmail;
    //   userPassword.value = updData.userPassword;
    });

//   fetch(`${BASE_URL}/update-data:${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
}
