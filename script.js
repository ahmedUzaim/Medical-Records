/* =========================================
MEDITRACK – JAVASCRIPT
========================================= */

// =========================================
// USER DATA STORAGE
// =========================================

let currentUser = "";

let records = [];
let medicines = [];
let appointments = [];

// =========================================
// LOGIN
// =========================================

function login() {
const nameInput = document.getElementById("login-name");
const name = nameInput.value.trim();

if (name === "") {
showToast("Please enter your name");
return;
}

currentUser = name;

document.getElementById("nav-username").innerText = `Hello, ${currentUser}`;

document.getElementById("screen-welcome").classList.remove("active");
document.getElementById("screen-dashboard").classList.add("active");

renderAll();
showToast(`Welcome ${currentUser}`);
}

// =========================================
// SWITCH USER
// =========================================

function switchUser() {
currentUser = "";

document.getElementById("screen-dashboard").classList.remove("active");
document.getElementById("screen-welcome").classList.add("active");

document.getElementById("login-name").value = "";
}

// =========================================
// TABS
// =========================================

function showTab(tabId, button) {

// Hide all tabs
document.querySelectorAll(".tab-content").forEach(tab => {
tab.classList.remove("active");
});

// Remove active from buttons
document.querySelectorAll(".tab").forEach(tab => {
tab.classList.remove("active");
});

// Show selected tab
document.getElementById(tabId).classList.add("active");

// Activate clicked button
button.classList.add("active");
}

// =========================================
// MODALS
// =========================================

function openModal(id) {
document.getElementById(id).classList.add("open");
}

function closeModal(id) {
document.getElementById(id).classList.remove("open");
}

// =========================================
// SAVE RECORD
// =========================================

function saveRecord() {

const title = document.getElementById("rec-title").value.trim();
const date = document.getElementById("rec-date").value;
const doctor = document.getElementById("rec-doctor").value.trim();
const notes = document.getElementById("rec-notes").value.trim();

if (!title || !date || !doctor) {
showToast("Please fill all required fields");
return;
}

const record = {
id: Date.now(),
title,
date,
doctor,
notes
};

records.push(record);

renderRecords();

closeModal("modal-record");

clearRecordFields();

showToast("Medical record added");
}

// =========================================
// SAVE MEDICINE
// =========================================

function saveMedicine() {

const name = document.getElementById("med-name").value.trim();
const dose = document.getElementById("med-dose").value.trim();
const time = document.getElementById("med-time").value;
const freq = document.getElementById("med-freq").value;

if (!name || !dose || !time) {
showToast("Please fill all medicine fields");
return;
}

const medicine = {
id: Date.now(),
name,
dose,
time,
freq
};

medicines.push(medicine);

renderMedicines();
renderReminders();

closeModal("modal-medicine");

clearMedicineFields();

showToast("Medicine added");
}

// =========================================
// SAVE APPOINTMENT
// =========================================

function saveAppointment() {

const doctor = document.getElementById("apt-doctor").value.trim();
const hospital = document.getElementById("apt-hospital").value.trim();
const date = document.getElementById("apt-date").value;
const time = document.getElementById("apt-time").value;
const notes = document.getElementById("apt-notes").value.trim();

if (!doctor || !hospital || !date || !time) {
showToast("Please fill all appointment fields");
return;
}

const appointment = {
id: Date.now(),
doctor,
hospital,
date,
time,
notes
};

appointments.push(appointment);

renderAppointments();
renderReminders();

closeModal("modal-appointment");

clearAppointmentFields();

showToast("Appointment added");
}

// =========================================
// RENDER RECORDS
// =========================================

function renderRecords() {

const container = document.getElementById("records-list");

if (records.length === 0) {
container.innerHTML = `
<div class="empty-msg">
No medical records added yet
</div>
`;
return;
}

container.innerHTML = "";

records.forEach(record => {

container.innerHTML += `
<div class="card">
<button class="delete-btn" onclick="deleteRecord(${record.id})">✖</button>

<div class="badge">${record.date}</div>

<h4>${record.title}</h4>

<p><strong>Doctor:</strong> ${record.doctor}</p>

<p>${record.notes}</p>
</div>
`;
});
}

// =========================================
// RENDER MEDICINES
// =========================================

function renderMedicines() {

const container = document.getElementById("medicines-list");

if (medicines.length === 0) {
container.innerHTML = `
<div class="empty-msg">
No medicines added yet
</div>
`;
return;
}

container.innerHTML = "";

medicines.forEach(med => {

container.innerHTML += `
<div class="card">
<button class="delete-btn" onclick="deleteMedicine(${med.id})">✖</button>

<div class="badge">${med.freq}</div>

<h4>${med.name}</h4>

<p><strong>Dosage:</strong> ${med.dose}</p>

<p><strong>Time:</strong> ${med.time}</p>
</div>
`;
});
}

// =========================================
// RENDER APPOINTMENTS
// =========================================

function renderAppointments() {

const container = document.getElementById("appointments-list");

if (appointments.length === 0) {
container.innerHTML = `
<div class="empty-msg">
No appointments added yet
</div>
`;
return;
}

container.innerHTML = "";

appointments.forEach(apt => {

container.innerHTML += `
<div class="card">
<button class="delete-btn" onclick="deleteAppointment(${apt.id})">✖</button>

<div class="badge">${apt.date}</div>

<h4>Dr. ${apt.doctor}</h4>

<p><strong>Hospital:</strong> ${apt.hospital}</p>

<p><strong>Time:</strong> ${apt.time}</p>

<p>${apt.notes}</p>
</div>
`;
});
}

// =========================================
// RENDER REMINDERS
// =========================================

function renderReminders() {

const container = document.getElementById("reminders-list");

let reminderHTML = "";

medicines.forEach(med => {
reminderHTML += `
<div class="card reminder-med">
<div class="badge">Medicine Reminder</div>

<h4>${med.name}</h4>

<p>Take ${med.dose}</p>

<p>At ${med.time}</p>
</div>
`;
});

appointments.forEach(apt => {
reminderHTML += `
<div class="card reminder-apt">
<div class="badge">Appointment Reminder</div>

<h4>Dr. ${apt.doctor}</h4>

<p>${apt.hospital}</p>

<p>${apt.date} at ${apt.time}</p>
</div>
`;
});

if (reminderHTML === "") {
reminderHTML = `
<div class="empty-msg">
No reminders available
</div>
`;
}

container.innerHTML = reminderHTML;
}

// =========================================
// DELETE FUNCTIONS
// =========================================

function deleteRecord(id) {
records = records.filter(record => record.id !== id);

renderRecords();

showToast("Record deleted");
}

function deleteMedicine(id) {
medicines = medicines.filter(med => med.id !== id);

renderMedicines();
renderReminders();

showToast("Medicine deleted");
}

function deleteAppointment(id) {
appointments = appointments.filter(apt => apt.id !== id);

renderAppointments();
renderReminders();

showToast("Appointment deleted");
}

// =========================================
// CLEAR INPUT FIELDS
// =========================================

function clearRecordFields() {
document.getElementById("rec-title").value = "";
document.getElementById("rec-date").value = "";
document.getElementById("rec-doctor").value = "";
document.getElementById("rec-notes").value = "";
}

function clearMedicineFields() {
document.getElementById("med-name").value = "";
document.getElementById("med-dose").value = "";
document.getElementById("med-time").value = "";
}

function clearAppointmentFields() {
document.getElementById("apt-doctor").value = "";
document.getElementById("apt-hospital").value = "";
document.getElementById("apt-date").value = "";
document.getElementById("apt-time").value = "";
document.getElementById("apt-notes").value = "";
}

// =========================================
// TOAST NOTIFICATION
// =========================================

function showToast(message) {

const toast = document.getElementById("toast");

toast.innerText = message;

toast.classList.add("show");

setTimeout(() => {
toast.classList.remove("show");
}, 2500);
}

// =========================================
// INITIAL RENDER
// =========================================

function renderAll() {
renderRecords();
renderMedicines();
renderAppointments();
renderReminders();
}
