// User data array
let userData = [];

// DOM elements
const addBtn = document.querySelector("#add-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-icon");
const idEle = document.getElementById("id");
const fullNameEle = document.getElementById("fullname");
const genderEle = document.getElementById("gender");
const dateEle = document.getElementById("date");
const timeEle = document.getElementById("time");
const emailEle = document.getElementById("email");
const phoneNumEle = document.getElementById("phoneNum");
const diagnoseEle = document.getElementById("diagnose");
const doctorEle = document.getElementById("doctor");
const registerBtn = document.querySelector('#register-btn');
const updateBtn = document.querySelector('#update-btn');
const registerForm = document.querySelector('#register-Form');
const tableData = document.querySelector("#table-data");
const allInput = registerForm.querySelectorAll("INPUT");

// Event handling for opening modal
addBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

// Event handling for closing modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");

  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
});

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
   // Check if any of the input fields is empty
   if (
    idEle.value.trim() === "" ||
    fullNameEle.value.trim() === "" ||
    genderEle.value.trim() === "" ||
    dateEle.value.trim() === "" ||
    timeEle.value.trim() === "" ||
    phoneNumEle.value.trim() === "" ||
    diagnoseEle.value.trim() === "" ||
    doctorEle.value.trim() === ""
  ) {
    Swal.fire({
      title: "Error!",
      text: "Please fill in all the fields.",
      icon: "error"
    });
    return; // Exit the function if any field is empty
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailInput = document.getElementById("email");
  const emailError = document.querySelector(".email-message");

  if (!emailRegex.test(emailInput.value)) {
    // Display custom error message below the email input
    emailError.textContent = "Invalid email address";
    emailError.style.display = "block";
    emailError.style.color = "red";
    emailError.style.marginTop = "-6px";
    emailError.style.marginLeft = "-105%";

    setTimeout(() => {
      // Clear email validation error message after 3 seconds (adjust the time as needed)
      emailError.textContent = "";
      emailError.style.display = "none"; // Hide the error message
      emailError.style.color = "initial"; // Reset the text color to its initial value
    }, 2000);

    return;
  }

  
  emailError.textContent = "";
  emailError.style.display = "none"; 
  emailError.style.color = "initial"; 

  // Proceed to registration if all validations pass
  registrationData();
  registerForm.reset();
  updateTableData();
  closeBtn.click();
});




// Check if there is existing user data in local storage
if (localStorage.getItem("userData") !== null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

// Function to handle registration and store data in local storage
function registrationData() {
  const newUser = {
    id: idEle.value,
    name: fullNameEle.value,
    gender: genderEle.value,
    date: dateEle.value,
    time: timeEle.value,
    email: emailEle.value,
    phone: phoneNumEle.value,
    diagnose: diagnoseEle.value,
    doctor: doctorEle.value
  };

  userData.push(newUser);
  localStorage.setItem("userData", JSON.stringify(userData));
  Swal.fire({
    title: "Good job!",
    text: "Add Data Successful!",
    icon: "success"
  });
}

// Function to update table data from local storage
const updateTableData = () => {
  tableData.innerHTML = " ";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
      <tr index='${index}'>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.gender}</td>
        <td>${data.date}</td>
        <td>${data.time}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.diagnose}</td>
        <td>${data.doctor}</td>
        <td>
          <button class="edit-btn" >
            <i class="fa fa-eye"></i>
          </button>
          <button class="del-btn">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });

  //---Delete-Section-Code-Section---
  const singleDelBtn = document.querySelectorAll(".del-btn");
  for (let i = 0; i < singleDelBtn.length; i++) {
    singleDelBtn[i].onclick = function () {
      const tr = this.parentElement.parentElement;
      const id = tr.getAttribute("index");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          Swal.fire({
            title: "Deleted!",
            text: "Your data has been deleted.",
            icon: "success"
          });
        }
      });
    };
  }

  //--- Edit-Section-Code----
  const allEdit = document.querySelectorAll(".edit-btn");
  for (let i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      const tr = this.parentElement.parentElement;
      const td = tr.getElementsByTagName("TD");
      const index = tr.getAttribute("index");
      const id = td[0].innerHTML;
      const fullName = td[1].innerHTML;
      const gender = td[2].innerHTML;
      const date = td[3].innerHTML;
      const time = td[4].innerHTML;
      const email = td[5].innerHTML;
      const phone = td[6].innerHTML;
      const diagnose = td[7].innerHTML;
      const doctor = td[8].innerHTML;

      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;

      // Assinging values to form
      idEle.value = id;
      fullNameEle.value = fullName;
      genderEle.value = gender;
      dateEle.value = date;
      timeEle.value = time;
      emailEle.value = email;
      phoneNumEle.value = phone;
      diagnoseEle.value = diagnose;
      doctorEle.value = doctor;

      updateBtn.onclick = function () {
        userData[index] = {
          id: idEle.value,
          name: fullNameEle.value,
          gender: genderEle.value,
          date: dateEle.value,
          time: timeEle.value,
          email: emailEle.value,
          phone: phoneNumEle.value,
          diagnose: diagnoseEle.value,
          doctor: doctorEle.value,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        updateTableData();
        registerBtn.disabled = false;
        updateBtn.disabled = true;

        registerForm.reset();
        closeBtn.click();
        Swal.fire({
          title: "Updated!",
          text: "Your data has been updated.",
          icon: "success"
        });
      };
    };
  }
};

updateTableData();   


//-----Search-Data-Section--------
const searchEle = document.querySelector("#empId");
searchEle.oninput = function () {
  searchFun();
};

function searchFun() {
  const tr = tableData.querySelectorAll("TR");
  const filter = searchEle.value.toLowerCase();
  for (let i = 0; i < tr.length; i++) {
    const id = tr[i].getElementsByTagName("TD")[0].innerHTML;
    const fullName = tr[i].getElementsByTagName("TD")[1].innerHTML;

    if (
      id.toLowerCase().indexOf(filter) > -1 ||
      fullName.toLowerCase().indexOf(filter) > -1
    ) {
      tr[i].style.display = ""; // to make visible
    } else {
      tr[i].style.display = "none"; // to make hide
    }
  }
}

const delAllBtn = document.querySelector("#del-all-btn");
const allDelBox = document.querySelector("#del-all-box");

delAllBtn.addEventListener('click', () => {
  if (allDelBox.checked) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userData");
        window.location.reload(); 
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  } else {
    Swal.fire({
      title: "Check the box!",
      text: "PLEASE CHECK THE BOX!",
      icon: "warning"
    });
  }
});

//---- Scroll Bar Section ----
document.addEventListener("DOMContentLoaded", function () {
  const scrollButton = document.querySelector(".scroll-to-top");

  window.onscroll = function () {
    showHideScrollButton();
  };

  function showHideScrollButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  }

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
  }

  scrollButton.addEventListener("click", scrollToTop);
});
