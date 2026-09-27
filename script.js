// ==========================================
// DATA
// ==========================================

let patients = [

    {
        id: "P001",
        name: "Rahul Sharma",
        phone: "9876543210",
        age: 32,
        blood: "O+"
    },

    {
        id: "P002",
        name: "Priya Patil",
        phone: "9823456712",
        age: 27,
        blood: "B+"
    },

    {
        id: "P003",
        name: "Amit Joshi",
        phone: "9765432180",
        age: 41,
        blood: "A+"
    },

    {
        id: "P004",
        name: "Sneha Kulkarni",
        phone: "9898989898",
        age: 36,
        blood: "AB+"
    }

];


let doctors = [

    {
        name: "Dr. Ananya Sharma",
        specialization: "Cardiologist",
        experience: "12 years",
        icon: "👩‍⚕️"
    },

    {
        name: "Dr. Rahul Mehta",
        specialization: "Neurologist",
        experience: "9 years",
        icon: "👨‍⚕️"
    },

    {
        name: "Dr. Priya Patil",
        specialization: "Pediatrician",
        experience: "8 years",
        icon: "👩‍⚕️"
    },

    {
        name: "Dr. Arjun Deshmukh",
        specialization: "Orthopedic",
        experience: "11 years",
        icon: "👨‍⚕️"
    },

    {
        name: "Dr. Neha Joshi",
        specialization: "Dermatologist",
        experience: "7 years",
        icon: "👩‍⚕️"
    },

    {
        name: "Dr. Karan Shah",
        specialization: "General Physician",
        experience: "10 years",
        icon: "👨‍⚕️"
    }

];


let appointments = [

    {
        id: "A1001",
        patient: "Rahul Sharma",
        doctor: "Dr. Ananya Sharma",
        date: "27 Sep 2026",
        time: "10:00 AM",
        status: "Confirmed"
    },

    {
        id: "A1002",
        patient: "Priya Patil",
        doctor: "Dr. Rahul Mehta",
        date: "27 Sep 2026",
        time: "11:30 AM",
        status: "Pending"
    },

    {
        id: "A1003",
        patient: "Amit Joshi",
        doctor: "Dr. Arjun Deshmukh",
        date: "27 Sep 2026",
        time: "02:00 PM",
        status: "Confirmed"
    }

];


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId, button) {

    // Hide pages

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });


    // Show selected page

    document.getElementById(pageId).classList.add("active");


    // Update active navigation

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }


    // Change title

    document.getElementById("pageTitle").textContent =
        pageId.charAt(0).toUpperCase() + pageId.slice(1);


    // Close mobile sidebar

    document.getElementById("sidebar").classList.remove("open");


    // Refresh data

    if (pageId === "patients") {
        renderPatients();
    }

    if (pageId === "doctors") {
        renderDoctors();
    }

    if (pageId === "appointments") {
        renderAppointments();
    }

}


function openPageFromButton(pageId) {

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        if (button.getAttribute("onclick") &&
            button.getAttribute("onclick").includes(pageId)) {

            showPage(pageId, button);

        }

    });

}


// ==========================================
// MOBILE SIDEBAR
// ==========================================

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


// ==========================================
// PATIENTS
// ==========================================

function renderPatients() {

    const table =
        document.getElementById("patientTable");

    table.innerHTML = "";


    patients.forEach(patient => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${patient.id}</td>

            <td>
                <strong>${patient.name}</strong>
            </td>

            <td>${patient.phone}</td>

            <td>${patient.age}</td>

            <td>${patient.blood}</td>

            <td>

                <button
                    class="small-btn"
                    onclick="viewPatient('${patient.name}')">

                    View

                </button>

            </td>

        `;

        table.appendChild(row);

    });

}


// ==========================================
// PATIENT SEARCH
// ==========================================

function searchPatients() {

    const search =
        document
        .getElementById("patientSearch")
        .value
        .toLowerCase();


    const rows =
        document.querySelectorAll("#patientTable tr");


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();


        if (text.includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


// ==========================================
// VIEW PATIENT
// ==========================================

function viewPatient(name) {

    showNotification(
        "Opening patient profile: " + name
    );

}


// ==========================================
// ADD PATIENT MODAL
// ==========================================

function openPatientModal() {

    document.getElementById("modalTitle").textContent =
        "Add New Patient";


    document.getElementById("modalContent").innerHTML = `

        <form onsubmit="addPatient(event)">

            <div class="form-grid">

                <div class="form-group">

                    <label>Full Name</label>

                    <input
                        type="text"
                        id="patientName"
                        required>

                </div>


                <div class="form-group">

                    <label>Phone Number</label>

                    <input
                        type="tel"
                        id="patientPhone"
                        required>

                </div>


                <div class="form-group">

                    <label>Age</label>

                    <input
                        type="number"
                        id="patientAge"
                        required>

                </div>


                <div class="form-group">

                    <label>Blood Group</label>

                    <select id="patientBlood">

                        <option>O+</option>
                        <option>A+</option>
                        <option>B+</option>
                        <option>AB+</option>
                        <option>O-</option>
                        <option>A-</option>
                        <option>B-</option>
                        <option>AB-</option>

                    </select>

                </div>

            </div>

            <br>

            <button class="primary-btn">
                Save Patient
            </button>

        </form>

    `;


    openModal();

}


function addPatient(event) {

    event.preventDefault();


    const patient = {

        id:
            "P" +
            String(patients.length + 1)
            .padStart(3, "0"),

        name:
            document.getElementById("patientName").value,

        phone:
            document.getElementById("patientPhone").value,

        age:
            document.getElementById("patientAge").value,

        blood:
            document.getElementById("patientBlood").value

    };


    patients.push(patient);


    closeModal();

    renderPatients();


    showNotification(
        "Patient added successfully"
    );

}


// ==========================================
// DOCTORS
// ==========================================

function renderDoctors() {

    const grid =
        document.getElementById("doctorGrid");


    grid.innerHTML = "";


    doctors.forEach(doctor => {

        grid.innerHTML += `

            <div class="doctor-card">

                <div class="doctor-photo">

                    ${doctor.icon}

                </div>

                <h3>
                    ${doctor.name}
                </h3>

                <p class="specialization">
                    ${doctor.specialization}
                </p>

                <small>
                    ${doctor.experience} experience
                </small>

                <br>

                <button
                    class="primary-btn"
                    onclick="openAppointmentModal('${doctor.name}')">

                    Book Appointment

                </button>

            </div>

        `;

    });

}


// ==========================================
// APPOINTMENTS
// ==========================================

function renderAppointments() {

    const table =
        document.getElementById(
            "appointmentTable"
        );


    table.innerHTML = "";


    appointments.forEach(appointment => {

        table.innerHTML += `

            <tr>

                <td>
                    ${appointment.id}
                </td>

                <td>
                    ${appointment.patient}
                </td>

                <td>
                    ${appointment.doctor}
                </td>

                <td>
                    ${appointment.date}
                </td>

                <td>
                    ${appointment.time}
                </td>

                <td>

                    <span class="badge ${
                        appointment.status === "Confirmed"
                        ? "success"
                        : "pending"
                    }">

                        ${appointment.status}

                    </span>

                </td>

            </tr>

        `;

    });


    renderDashboardAppointments();

}


function renderDashboardAppointments() {

    const table =
        document.getElementById(
            "dashboardAppointments"
        );


    table.innerHTML = "";


    appointments.slice(0, 3).forEach(appointment => {

        table.innerHTML += `

            <tr>

                <td>
                    ${appointment.patient}
                </td>

                <td>
                    ${appointment.doctor}
                </td>

                <td>
                    ${appointment.time}
                </td>

                <td>

                    <span class="badge ${
                        appointment.status === "Confirmed"
                        ? "success"
                        : "pending"
                    }">

                        ${appointment.status}

                    </span>

                </td>

            </tr>

        `;

    });

}


// ==========================================
// APPOINTMENT MODAL
// ==========================================

function openAppointmentModal(selectedDoctor = "") {

    document.getElementById("modalTitle").textContent =
        "Book Appointment";


    let doctorOptions = "";


    doctors.forEach(doctor => {

        doctorOptions += `

            <option
                ${doctor.name === selectedDoctor
                    ? "selected"
                    : ""}>

                ${doctor.name}

            </option>

        `;

    });


    let patientOptions = "";


    patients.forEach(patient => {

        patientOptions += `

            <option>
                ${patient.name}
            </option>

        `;

    });


    document.getElementById("modalContent").innerHTML = `

        <form onsubmit="addAppointment(event)">

            <div class="form-grid">

                <div class="form-group">

                    <label>Patient</label>

                    <select id="appointmentPatient">

                        ${patientOptions}

                    </select>

                </div>


                <div class="form-group">

                    <label>Doctor</label>

                    <select id="appointmentDoctor">

                        ${doctorOptions}

                    </select>

                </div>


                <div class="form-group">

                    <label>Date</label>

                    <input
                        type="date"
                        id="appointmentDate"
                        required>

                </div>


                <div class="form-group">

                    <label>Time</label>

                    <input
                        type="time"
                        id="appointmentTime"
                        required>

                </div>


                <div class="form-group full">

                    <label>Reason for Visit</label>

                    <textarea
                        rows="3"
                        placeholder="Enter reason..."></textarea>

                </div>

            </div>

            <br>

            <button class="primary-btn">

                Confirm Appointment

            </button>

        </form>

    `;


    openModal();

}


function addAppointment(event) {

    event.preventDefault();


    const newAppointment = {

        id:
            "A" +
            (1000 + appointments.length + 1),

        patient:
            document
            .getElementById(
                "appointmentPatient"
            ).value,

        doctor:
            document
            .getElementById(
                "appointmentDoctor"
            ).value,

        date:
            document
            .getElementById(
                "appointmentDate"
            ).value,

        time:
            document
            .getElementById(
                "appointmentTime"
            ).value,

        status: "Pending"

    };


    appointments.push(newAppointment);


    closeModal();

    renderAppointments();


    showNotification(
        "Appointment booked successfully"
    );

}


// ==========================================
// EMERGENCY
// ==========================================

function requestAmbulance() {

    const name =
        document
        .getElementById("emergencyName")
        .value;


    const phone =
        document
        .getElementById("emergencyPhone")
        .value;


    const location =
        document
        .getElementById("emergencyLocation")
        .value;


    if (
        name === "" ||
        phone === "" ||
        location === ""
    ) {

        showNotification(
            "Please fill all required fields"
        );

        return;

    }


    const requestId =
        "ER-" +
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    document.getElementById(
        "emergencyResult"
    ).innerHTML = `

        <div class="card"
             style="
                margin-top:25px;
                border:1px solid #fecaca;
             ">

            <h3>
                Emergency Request Created
            </h3>

            <br>

            <p>
                <strong>Request ID:</strong>
                ${requestId}
            </p>

            <p>
                <strong>Patient:</strong>
                ${name}
            </p>

            <p>
                <strong>Phone:</strong>
                ${phone}
            </p>

            <p>
                <strong>Location:</strong>
                ${location}
            </p>

            <br>

            <span class="badge pending">

                AMBULANCE REQUESTED

            </span>

            <p style="
                margin-top:15px;
                color:#6b7280;
            ">

                Demo tracking mode.
                Connect a real ambulance
                dispatch service for production.

            </p>

        </div>

    `;


    showNotification(
        "Emergency request created"
    );

}


// ==========================================
// MODAL
// ==========================================

function openModal() {

    document
        .getElementById("modal")
        .classList.add("show");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");

}


// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(message) {

    const notification =
        document.getElementById(
            "notification"
        );


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2500);

}


// ==========================================
// INITIAL LOAD
// ==========================================

renderPatients();

renderDoctors();

renderAppointments();