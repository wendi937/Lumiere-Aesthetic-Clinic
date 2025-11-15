function initializeServices() {

    const servicesData = [
        { id: 'lip_filler', name: 'Lip Filler', staff: ['Uendi Velaj'] },
        { id: 'nose_filler', name: 'Nose Filler', staff: ['Uendi Velaj'] },
        { id: 'jawline_filler', name: 'Jawline Filler', staff: ['Uendi Velaj'] },
        { id: 'chin_filler', name: 'Chin Filler', staff: ['Uendi Velaj'] },

        { id: 'masseter_botox', name: 'Masseter Botox', staff: ['Ajmi Capo'] },
        { id: 'forehead_botox', name: 'Forehead Botox', staff: ['Ajmi Capo'] },

        { id: 'skin_booster', name: 'Skin Booster', staff: ['Ajmi Capo', 'Renis Veliu'] },
        { id: 'mesotherapy', name: 'Mesotherapy', staff: ['Ajmi Capo'] },

        { id: 'hyperpigmentation', name: 'Hyperpigmentation Treatment', staff: ['Renis Veliu'] },
        { id: 'chemical_peel', name: 'Chemical Peel', staff: ['Renis Veliu'] },
        { id: 'microneedling', name: 'Microneedling', staff: ['Renis Veliu'] },
        { id: 'acne_facial', name: 'Acne Facial', staff: ['Renis Veliu'] }
    ];

    if (!localStorage.getItem('servicesData')) {
        localStorage.setItem('servicesData', JSON.stringify(servicesData));
    }
}

function loadServices() {
    const servicesData = JSON.parse(localStorage.getItem('servicesData')) || [];
    const $serviceSelect = $('#serviceSelect');

    $serviceSelect.html('<option value="">Select a service</option>');

    servicesData.forEach(service => {
        const option = $('<option></option>');
        option.val(service.id);      
        option.text(service.name);    
        $serviceSelect.append(option);
    });
}

function loadStaff(serviceId) {
    const servicesData = JSON.parse(localStorage.getItem('servicesData')) || [];
    const $staffSelect = $('#staffSelect');

    $staffSelect.html('<option value="">Select staff</option>');

    if (!serviceId) {
        $staffSelect.prop('disabled', true);
        return;
    }

    const selectedService = servicesData.find(s => s.id === serviceId);

    if (!selectedService) {
        $staffSelect.prop('disabled', true);
        return;
    }

    if (selectedService.staff && selectedService.staff.length > 0) {
        $staffSelect.prop('disabled', false);

        selectedService.staff.forEach(name => {
            const option = $('<option></option>');
            option.val(name);
            option.text(name);
            $staffSelect.append(option);
        });
    } else {
        $staffSelect.prop('disabled', true);
    }
}

function submitStep1() {

    const serviceId = $('#serviceSelect').val();
    const staffName = $('#staffSelect').val();

    if (!serviceId) {
        alert("Please select a service.");
        return;
    }
    if (!staffName) {
        alert("Please select a staff member.");
        return;
    }

    const servicesData = JSON.parse(localStorage.getItem('servicesData')) || [];
    const selectedService = servicesData.find(s => s.id === serviceId);

    if (!selectedService) {
        alert("Something went wrong. Please choose the service again.");
        return;
    }

    const step1Data = {
        serviceId: serviceId,
        serviceName: selectedService.name,
        staffName: staffName
    };

    localStorage.setItem('booking_step1', JSON.stringify(step1Data));

    // Move to Step 2
    $('#step1-section').hide();
    loadTimeSlots();
    $('#step2-section').show();
}

function loadTimeSlots() {
    const times = [
        "09:00", "09:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00", "13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "16:00", "16:30"
    ];

    const $timeSelect = $('#bookingTime');
    $timeSelect.html('<option value="">Select Time</option>');

    times.forEach(t => {
        const option = $('<option></option>');
        option.val(t);
        option.text(t);
        $timeSelect.append(option);
    });
}

function submitStep2() {

    const date = $('#bookingDate').val();
    const time = $('#bookingTime').val();

    if (!date) {
        alert("Please choose a date.");
        return;
    }
    if (!time) {
        alert("Please choose a time.");
        return;
    }

    const step2Data = { date, time };
    localStorage.setItem('booking_step2', JSON.stringify(step2Data));

    $('#step2-section').hide();
    loadSummary();
    $('#step3-section').show();
}


function loadSummary() {

    const s1 = JSON.parse(localStorage.getItem('booking_step1')) || {};
    const s2 = JSON.parse(localStorage.getItem('booking_step2')) || {};

    $('#summary-service').text(s1.serviceName || '');
    $('#summary-staff').text(s1.staffName || '');
    $('#summary-date').text(s2.date || '');
    $('#summary-time').text(s2.time || '');
}

function submitStep4() {

    const name = $('#userName').val();
    const email = $('#userEmail').val();
    const phone = $('#userPhone').val();

    if (!name || !email || !phone) {
        alert("Please fill all fields.");
        return;
    }

    const userData = { name, email, phone };
    localStorage.setItem('booking_user', JSON.stringify(userData));

    alert("Booking Confirmed! We will contact you soon.");
}

$(document).ready(function () {

    // Initialize services and dropdowns
    initializeServices();
    loadServices();

    $('#serviceSelect').on('change', function () {
        loadStaff($(this).val());
    });

    // Step 1 → Next
    $('#step1-next').on('click', submitStep1);

    // Step 2 → Back
    $('#step2-back').on('click', function () {
        $('#step2-section').hide();
        $('#step1-section').show();
    });

    // Step 2 → Next
    $('#step2-next').on('click', submitStep2);

    // Step 3 → Back
    $('#step3-back').on('click', function () {
        $('#step3-section').hide();
        $('#step2-section').show();
    });

    // Step 3 → Next
    $('#step3-next').on('click', function () {
        $('#step3-section').hide();
        $('#step4-section').show();
    });

    // Step 4 → Back
    $('#step4-back').on('click', function () {
        $('#step4-section').hide();
        $('#step3-section').show();
    });

    // Step 4 → Submit
    $('#step4-submit').on('click', submitStep4);
});
