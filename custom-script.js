const bodyCustomer = document.querySelector("#tbCustomer tbody");

async function fetchAllPerson() {
    const response = await fetch("http://localhost:3300/persons");
    const persons = await response.json();
    return persons;
}
const getAllPerson = async () => {
    const persons = await fetchAllPerson();
    persons.forEach((item) => {
        const str = renderPerson(item);
        bodyCustomer.insertAdjacentHTML("afterbegin", str);
    });
};
// let user = [];
// let currentPage = 1;
// let perPage = 1;
// let totalPage;
// let perUser = [];
// const ePagination = document.getElementById("pagination");

// function initPagination() {
//     getAllPerson();
// }

// function getAllPerson() {
//     fetchAllPerson()
//         .then(persons => {
//             user = persons;
//             renderPageNumber();
//             renderPage(currentPage);
//         });
// }

// function renderPageNumber() {
//     totalPage = Math.ceil(user.length / perPage);
//     ePagination.innerHTML = '';
//     let str = '';

//     // Xác định khoảng trang cần hiển thị (ví dụ: 5 trang xung quanh trang hiện tại)
//     let maxPagesToShow = 5;
//     let pagesToLeft = Math.floor(maxPagesToShow / 2);
//     let pagesToRight = maxPagesToShow - pagesToLeft;

//     // Tính toán trang đầu và trang cuối cần hiển thị
//     let startPage = Math.max(1, currentPage - pagesToLeft);
//     if (startPage < 1) {
//         startPage = 1;
//     }
//     let endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);
//     if (endPage > totalPage) {
//         endPage = totalPage;
//     }
//     str = `<li  ${currentPage === 1 ? "disabled" : ''}>
//         <a class="page-link" href="#" tabindex="-1" aria-disabled="true" >Previous</a>
//     </li>`;
//     console.log(startPage);
//     console.log(endPage);
//     for (let i = startPage; i <= endPage; i++) {
//         str += `<li ${i === currentPage ? 'class="active"' : ''} onclick="handlePageNumber(${i})" aria-current="page">
//             <a class="page-link" href="#">${i}</a>
//         </li>`;
//     }

//     str += `<li  ${currentPage === totalPage ? 'disabled' : ''}>
//         <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Next</a>
//     </li>`;

//     ePagination.innerHTML = str;
//     const ePages = ePagination.querySelectorAll('li');
//     const ePrevious = ePages[0];
//     const eNext = ePages[ePages.length - 1];

//     ePrevious.onclick = () => {
//         if (currentPage === 1) {
//             return;
//         }
//         currentPage -= 1;
//         renderPage(currentPage);

//     }

//     eNext.onclick = () => {
//         if (currentPage === totalPage) {
//             return;
//         }
//         currentPage += 1;
//         renderPage(currentPage);
//     }
// }
const fetchUpdatePerson = async (personId, obj) => {
    const response = await fetch("http://localhost:3300/persons/" + personId, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(obj)

    });
    if (response.ok) {
        Swal.fire({
            title: 'Edited',
            text: 'Sửa thành công.',
            icon: 'success',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900

        })
    }
    const person = await response.json();
    return person
}
const renderPerson = (obj) => {
    let transferButton = '';
    let withdrawButton = '';
    if (obj.balance > 0) {
        transferButton = `
            <td>
                <button class="btn btn-outline-primary" onclick="transferCustomer(${obj.id})">
                    <i class="fas fa-exchange-alt"></i>
                </button>
            </td>
        `;
        withdrawButton = `
            <td>
                <button class="btn btn-outline-warning" onclick="withdrawCustomer(${obj.id})">
                    <i class="fas fa-minus"></i>
                </button>
            </td>
        `;
    }

    return `
        <tr id="tr_${obj.id}">
            <td >${obj.id}</td>
            <td>${obj.fullName}</td>
            <td>${obj.email}</td>
            <td>${obj.phone}</td>
            <td>${obj.address}</td>
            <td>${Math.round(obj.balance * 100) / 100}</td>
            <td>
                <button class="btn btn-outline-secondary" onclick="showEditPerson(${obj.id})" >
                    <i class="far fa-edit"></i>
                    <a href=""></a>
                </button>
            </td>
            <td>
                <button class="btn btn-outline-success" onclick="depositCustomer(${obj.id})" >
                    <i class="fas fa-plus"></i>
                </button>
            </td>
            ${withdrawButton}
            ${transferButton}
            <td>
                <button class="btn btn-outline-danger" onclick="deletePerson(${obj.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
};


getAllPerson();
const modal = document.getElementById("addCustomerModal");
const modalEdit = document.getElementById("editCustomerModal");
const modalDeposit = document.getElementById("editCustomerModal");

const btn = document.getElementById("created");
const btnEdit = document.getElementById("edited");

const closeBtn = document.getElementById("closeModal");
const formData = {};

btn.addEventListener("click", function (e) {
    modal.style.display = "block";
});
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});


window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modalEdit) {
        modalEdit.style.display = "none"
    } else if (event.target == modalDeposit) {
        modalDeposit.style.display = "none"
    }
});


const customerForm = document.getElementById("addCustomerModal");
const fullName = customerForm.querySelector("#fullName");
const fullNameError = customerForm.querySelector("#fullNameError");
const email = customerForm.querySelector("#email");
const emailError = customerForm.querySelector("#emailError");
const phone = customerForm.querySelector("#phone");
const phoneError = customerForm.querySelector("#phoneError");
const address = customerForm.querySelector("#address");
const addressError = customerForm.querySelector("#addressError");
fullName.oninput = function () {
    if (fullName.value.trim() === "") {
        fullNameError.textContent = "Full Name không được trống.";
    } else {
        fullNameError.textContent = "";
    }
};
email.oninput = function () {
    if (email.value.trim() === "") {
        emailError.textContent = "Email không được trống.";
    } else {
        emailError.textContent = "";
    }
};
phone.oninput = function () {
    if (phone.value.trim() === "") {
        phoneError.textContent = "Số điện thoại không được trống.";
    } else {
        phoneError.textContent = "";
    }
};
address.oninput = function () {
    if (address.value.trim() === "") {
        addressError.textContent = "Địa chỉ không được trống.";
    } else {
        addressError.textContent = "";
    }
};
const editForm = document.getElementById("editCustomerModal");
const fullNameEdit = editForm.querySelector("#fullName");
const fullNameEditError = editForm.querySelector("#fullNameError");
const emailEdit = editForm.querySelector("#email");
const emailEditError = editForm.querySelector("#emailError");
const phoneEdit = editForm.querySelector("#phone");
const phoneEditError = editForm.querySelector("#phoneError");
const addressEdit = editForm.querySelector("#address");
const addressEditError = editForm.querySelector("#addressError");
fullNameEdit.oninput = function () {
    if (fullNameEdit.value.trim() === "") {
        fullNameEditError.textContent = "Full Name không được trống.";
    } else {
        fullNameEditError.textContent = "";
    }
};
emailEdit.oninput = function () {
    if (emailEdit.value.trim() === "") {
        emailEditError.textContent = "Email không được trống.";
    } else {
        emailEditError.textContent = "";
    }
};
phoneEdit.oninput = function () {
    if (phoneEdit.value.trim() === "") {
        phoneEditError.textContent = "Số điện thoại không được trống.";
    } else {
        phoneEditError.textContent = "";
    }
};
addressEdit.oninput = function () {
    if (addressEdit.value.trim() === "") {
        addressEditError.textContent = "Địa chỉ không được trống.";
    } else {
        addressEditError.textContent = "";
    }
};



customerForm.onsubmit = async function (event) {
    event.preventDefault();
    const inputFields = customerForm.querySelectorAll(".form-control");
    inputFields.forEach((input) => {
        const fieldName = input.id;
        const fieldValue = input.value;
        formData[fieldName] = fieldValue;
        formData.balance = 0;

    });
    if (fullName.value.trim() === "" || phone.value.trim() === "" || email.value.trim() === "" || address.value.trim() === "") {
        Swal.fire({
            title: 'Error',
            text: 'Tạo mới không thành công.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        })
        return;
    }
    const response = await fetch("http://localhost:3300/persons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const content = await response.json();

    const str = renderPerson(content)
    bodyCustomer.insertAdjacentHTML("afterbegin", str);

    customerForm.style.display = "none"
    inputFields.forEach((input) => {
        input.value = "";
    });
    if (response.ok) {
        Swal.fire({
            title: 'Đang xử lý',
            text: 'Vui lòng chờ...',
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            timer: 2000, // Đợi 2 giây (2000ms)
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                // Sau khi đợi 2 giây, hiển thị thông báo thành công
                Swal.fire({
                    title: 'Created',
                    text: 'Tạo thành công.',
                    icon: 'success',
                    showConfirmButton: false,
                    position: 'top-start',
                    timer: 1500 // Hiển thị thông báo thành công trong 1,5 giây (1500ms)
                });
            }
        });
    }

};
const deletePerson = async (personId) => {
    const { isConfirmed } = await Swal.fire({
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc chắn muốn xóa tài khoản này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
    });
    if (!isConfirmed) {
        return; // Người dùng đã hủy xóa
    }
    const response = await fetch(`http://localhost:3300/persons/${personId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const persons = await fetchAllPerson();
        bodyCustomer.innerHTML = "";
        persons.forEach((item) => {
            const str = renderPerson(item);
            bodyCustomer.insertAdjacentHTML("afterbegin", str);
        });
        Swal.fire({
            title: 'Đang xử lý',
            text: 'Vui lòng chờ...',
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            timer: 2000, // Đợi 2 giây (2000ms)
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    title: 'Deleted',
                    text: 'Xóa thành công.',
                    icon: 'success',
                    showConfirmButton: false,
                    position: 'top-start',
                    timer: 900
                })
            }
        });
    } else {
        Swal.fire({
            title: 'Deleted',
            text: 'Xóa không thành công.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        })
    }



}

async function findPersonById(personId) {
    const persons = await fetchAllPerson();

    return persons.find((person) => person.id === personId);
}
const data = {};
let currentEditPersonId;

async function showEditPerson(personId) {
    currentEditPersonId = personId;

    editForm.style.display = "block";
    const editClose = document.getElementById("closeModalEdit");
    editClose.addEventListener("click", function () {
        editForm.style.display = "none";
    });
    const customer = await findPersonById(personId);


    const inputFieldsEdit = editForm.querySelectorAll(".form-control");
    inputFieldsEdit.forEach((input) => {
        const fieldName = input.id;
        input.value = customer[fieldName];
    });
}
const dataEdit = {};
editForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const personId = currentEditPersonId;

    const inputFieldsEditNew = editForm.querySelectorAll(".form-control");
    inputFieldsEditNew.forEach((input) => {
        const fieldName = input.id;
        const fieldValue = input.value;
        dataEdit[fieldName] = fieldValue;
    });
    if (fullNameEdit.value.trim() === "" || phoneEdit.value.trim() === "" || emailEdit.value.trim() === "" || addressEdit.value.trim() === "") {
        Swal.fire({
            title: 'Error',
            text: 'Sửa không thành công.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        })
        return;
    }

    editForm.style.display = "none";
    const content = await fetchUpdatePerson(personId, dataEdit);
    const updateRow = document.getElementById('tr_' + personId);
    const str = renderPerson(content);
    updateRow.innerHTML = str;

});


const depositCustomerHT = document.getElementById("depositModal")
let currentDepositPersonId;
async function depositCustomer(personId) {
    currentDepositPersonId = personId

    depositCustomerHT.style.display = "block";
    const closeModalDeposit = document.getElementById("closeModalDeposit");
    closeModalDeposit.addEventListener("click", () => {
        depositCustomerHT.style.display = "none";
    })
    const customer = await findPersonById(personId);
    depositCustomerHT.querySelector("#fullName").value = customer.fullName;
    depositCustomerHT.querySelector("#id").value = customer.id;
    depositCustomerHT.querySelector("#balance").value = customer.balance;

}
depositCustomerHT.addEventListener("submit", async function (e) {
    e.preventDefault();
    personId = currentDepositPersonId;

    const customer = await findPersonById(personId);
    let balance = depositCustomerHT.querySelector("#balance").value
    let dateTime = depositCustomerHT.querySelector("#dateTime").value
    balance = parseFloat(depositCustomerHT.querySelector("#transactionAmount").value) + parseFloat(customer.balance)
    if (parseFloat(depositCustomerHT.querySelector("#transactionAmount").value) > 10 || parseFloat(depositCustomerHT.querySelector("#transactionAmount").value) < 1000000000) {
        dateTime = new Date()
        const timeDeposit = dateTime;
        const afterTransaction = balance
        const fullNameSender = document.querySelector("#depositForm #fullName").value;
        const beforeTransaction = document.querySelector("#depositForm #balance").value;
        const transactionAmountNumber = document.querySelector("#depositForm #transactionAmount").value;
        const response = await fetch(`http://localhost:3300/persons/${personId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ balance }),
        });
        const res = await fetch(`http://localhost:3300/deposit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ timeDeposit, fullNameSender, beforeTransaction, afterTransaction, transactionAmountNumber }),
        });
        if (response.ok) {
            document.getElementById("depositModal").style.display = "none";
            const content = await fetchUpdatePerson(personId, data);
            const updateRow = document.getElementById('tr_' + personId);
            const str = renderPerson(content);
            updateRow.innerHTML = str;
            const persons = await fetchAllPerson();
            bodyCustomer.innerHTML = "";
            persons.forEach((item) => {
                const str = renderPerson(item);
                bodyCustomer.insertAdjacentHTML("afterbegin", str);
            });
            Swal.fire({
                title: 'Đang xử lý',
                text: 'Vui lòng chờ...',
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
                timer: 2000, // Đợi 2 giây (2000ms)
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        title: 'Deposit',
                        text: 'Thêm tiền thành công.',
                        icon: 'success',
                        showConfirmButton: false,
                        position: 'top-start',
                        timer: 900
                    })
                }
            })
        }
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Thêm tiền thất bại.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        });

    }
});
const withdrawCustomerHT = document.getElementById("withdrawModal")
let idWithdraw;
async function withdrawCustomer(personId) {
    idWithdraw = personId
    withdrawCustomerHT.style.display = "block";
    const closeModalWithdraw = document.getElementById("closeModalWithdraw");
    closeModalWithdraw.addEventListener("click", () => {
        withdrawCustomerHT.style.display = "none";
    })
    const customer = await findPersonById(personId);
    const inputFieldsWithdraw = withdrawCustomerHT.querySelectorAll(".form-control");
    inputFieldsWithdraw.forEach((input) => {
        const fieldName = input.id;
        input.value = customer[fieldName];

    });
    withdrawCustomerHT.querySelector("#transactionAmount").value = 0;

}
withdrawCustomerHT.addEventListener("submit", async function (e) {
    e.preventDefault();
    personId = idWithdraw;
    const customer = await findPersonById(personId);

    let dateTime = withdrawCustomerHT.querySelector("#dateTime").value
    const transactionI = document.querySelector("#withdrawForm #transactionAmount").value
    const balanceCheck = document.querySelector("#withdrawForm #balance").value;

    let updateBalance = parseFloat(customer.balance) - parseFloat(withdrawCustomerHT.querySelector("#transactionAmount").value)
    balance = updateBalance

    if (transactionI < 10 || transactionI > 1000000000 || parseFloat(customer.balance) < parseFloat(transactionI)) {
        Swal.fire({
            title: 'Error',
            text: 'Tài khoản không đủ.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        });

    } else if (transactionI >= 10 || transactionI <= 1000000000 || parseFloat(customer.balance) > parseFloat(transactionI)) {

        dateTime = new Date()
        const afterTransaction = balance

        const timeDeposit = data.dateTime;
        const fullNameSender = document.querySelector("#withdrawForm #fullName").value;
        const beforeTransaction = document.querySelector("#withdrawForm #balance").value;
        const transactionAmountNumber = document.querySelector("#withdrawForm #transactionAmount").value;
        const response = await fetch(`http://localhost:3300/persons/${personId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ balance }),
        });
        const res = await fetch(`http://localhost:3300/withdraw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ timeDeposit, fullNameSender, beforeTransaction, afterTransaction, transactionAmountNumber }),
        });

        if (response.ok) {
            document.getElementById("withdrawModal").style.display = "none";
            const content = await fetchUpdatePerson(personId, data);
            const updateRow = document.getElementById('tr_' + personId);
            const str = renderPerson(content);
            updateRow.innerHTML = str;
            const persons = await fetchAllPerson();
            bodyCustomer.innerHTML = "";
            persons.forEach((item) => {
                const str = renderPerson(item);
                bodyCustomer.insertAdjacentHTML("afterbegin", str);
            });
            Swal.fire({
                title: 'Đang xử lý',
                text: 'Vui lòng chờ...',
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
                timer: 2000, // Đợi 2 giây (2000ms)
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        title: 'Withdraw',
                        text: 'Trừ tiền thành công.',
                        icon: 'success',
                        showConfirmButton: false,
                        position: 'top-start',
                        timer: 900
                    })
                }
            })

        } else {
            Swal.fire({
                title: 'Error',
                text: 'Trừ tiền thất bại.',
                icon: 'error',
                showConfirmButton: false,
                position: 'top-start',
                timer: 900
            });

        }
    }
});
const recipientData = {};
let transferId
async function transferCustomer(personID) {
    transferId = personID
    const transferCustomer = document.getElementById("transferModal");


    transferCustomer.style.display = "block";
    const closeModalTransfer = document.getElementById("closeModalTransfer")
    closeModalTransfer.addEventListener('click', () => {
        transferCustomer.style.display = "none";
        const selectElement = document.getElementById('selectFullNameNotId');
        while (selectElement.options.length > 0) {
            selectElement.remove(0);
        }

    })
    const customer = await findPersonById(personID);
    customer.transactionAmount = 0;
    customer.fees = 10;
    customer.transferAmount = 0;
    const filesInputTransfer = transferCustomer.querySelectorAll(".form-control")
    filesInputTransfer.forEach((e) => {
        const fieldName = e.id;
        e.value = customer[fieldName]
    })
    const persons = await fetchAllPerson();
    const selectedPersons = persons.filter((person) => person.id !== personID);
    const select = document.getElementById('selectFullNameNotId'); // Tạo phần tử select
    selectedPersons.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.fullName;
        option.id = item.id
        select.appendChild(option);
    });
    const selectContainer = document.getElementById('selectContainer');
    selectContainer.appendChild(select);
}
const transferCustomerI = document.getElementById("transferModal");
transferCustomerI.addEventListener("submit", async function (e) {
    e.preventDefault();
    personID = transferId
    const customer = await findPersonById(personID);

    const inputFieldsEditNew = transferCustomerI.querySelectorAll(".form-control");
    inputFieldsEditNew.forEach((input) => {
        const fieldName = input.id;
        const fieldValue = input.value;
        data[fieldName] = fieldValue;

    });
    let balance = transferCustomerI.querySelector("#balance").value;
    let dateTime = transferCustomerI.querySelector("#dateTime").value;

    let transactionAmount = transferCustomerI.querySelector("#transactionAmount").value
    const selectElement = document.getElementById('selectFullNameNotId');
    const selectedOptionValue = parseFloat(selectElement.value);
    transactionAmount = parseFloat(transferCustomerI.querySelector("#transferAmount").value) + parseFloat(transferCustomerI.querySelector("#transferAmount").value) * 10 / 100
    balance = (parseFloat(customer.balance) - data.transactionAmount);
    console.log(selectedOptionValue);
    if (isNaN(selectedOptionValue) || selectedOptionValue === null) {
        Swal.fire({
            title: 'Error',
            text: 'Thiếu thông tin người nhận.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        });
        return;
    }

    const customerNew = await findPersonById(selectedOptionValue)

    if (parseFloat(transferCustomerI.querySelector("#transferAmount").value) < 10 || data.transferAmount > 1000000000) {
        Swal.fire({
            title: 'Error',
            text: 'Số tiền bạn nhập phải bé hơn 10 là hơn hơn 1.000.000.000.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        });

    } else if (transactionAmount > customer.balance) {
        Swal.fire({
            title: 'Error',
            text: 'Số tiền trong tài khoản không đủ.',
            icon: 'error',
            showConfirmButton: false,
            position: 'top-start',
            timer: 900
        });

    } else {
        addBalance(customerNew.id, parseFloat(transferCustomerI.querySelector("#transferAmount").value))
        dateTime = new Date()
        const timeTransfer = dateTime;
        const fullNameSender = document.querySelector("#transferForm #fullName").value;
        const transferNumber = document.querySelector("#transferForm #transferAmount").value;
        const feeNumber = document.querySelector("#transferForm #fees").value;
        const transactionAmountNumber = document.querySelector("#transferForm #transactionAmount").value;
        const selectFullNameNotIdFullName = customerNew.fullName
        console.log(selectFullNameNotIdFullName);
        const response = await fetch(`http://localhost:3300/persons/${personID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ balance }),
        });

        const res = await fetch(`http://localhost:3300/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ timeTransfer, selectFullNameNotIdFullName, transactionAmountNumber, feeNumber, transferNumber, fullNameSender }),
        });

        if (response.ok) {
            const selectElement = document.getElementById('selectFullNameNotId');
            while (selectElement.options.length > 0) {
                selectElement.remove(0);
            }

            bodyCustomer.innerHTML = "";
            document.getElementById("transferModal").style.display = "none";
            getAllPerson()
            const persons = await fetchAllPerson();
            bodyCustomer.innerHTML = "";
            persons.forEach((item) => {
                const str = renderPerson(item);
                bodyCustomer.insertAdjacentHTML("afterbegin", str);
            });
            Swal.fire({
                title: 'Đang xử lý',
                text: 'Vui lòng chờ...',
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
                timer: 2000, // Đợi 2 giây (2000ms)
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        title: 'Transfer',
                        text: 'Chuyển tiền thành công.',
                        icon: 'success',
                        showConfirmButton: false,
                        position: 'top-start',
                        timer: 900
                    })
                }
            })

        } else {
            Swal.fire({
                title: 'Error',
                text: 'Chuyển tiền thất bại.',
                icon: 'error',
                showConfirmButton: false,
                position: 'top-start',
                timer: 900
            });

        }
    }
});
async function addBalance(id, amount) {
    const customer = await findPersonById(id);
    const newRecipientBalance = customer.balance + amount;
    const recipientData = {
        balance: newRecipientBalance
    };
    await fetch(`http://localhost:3300/persons/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipientData),
    });
}
function searchByName() {
    const searchInput = document.getElementById("searchName").value.toLowerCase();
    const rows = document.querySelectorAll("#tbCustomer tbody tr ");
    rows.forEach((row) => {
        const fullName = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        if (fullName.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
const sort = document.getElementById("balance");
let isAscendingSort = true;

sort.addEventListener("click", async () => {
    const bodyCustomer = document.querySelector("#tbCustomer tbody");
    const response = await fetch("http://localhost:3300/persons");
    const persons = await response.json();
    if (isAscendingSort) {
        persons.sort((a, b) => a.balance - b.balance);
        document.getElementById("sort-icon").classList.remove("desc");

    } else {
        persons.sort((a, b) => b.balance - a.balance);
        document.getElementById("sort-icon").classList.add("desc");

    }
    isAscendingSort = !isAscendingSort;
    bodyCustomer.innerHTML = "";
    persons.forEach((item) => {
        const str = renderPerson(item);
        bodyCustomer.innerHTML += str;
    });
});
const transferAmountInput = document.getElementById('transferAmount');
const feesInput = document.getElementById('fees');
const transferForm = document.getElementById('transferForm');

const transactionAmountInput = transferForm.querySelector('#transactionAmount');

transferAmountInput.addEventListener('input', updateTransactionAmount);

function updateTransactionAmount() {
    const transferAmount = parseFloat(transferAmountInput.value);
    const fees = 0.1 * transferAmount; // 10% fees
    const transactionAmount = transferAmount + fees;

    transactionAmountInput.value = transactionAmount.toFixed(2);
}

