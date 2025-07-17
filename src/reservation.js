// Reservation form handling
document.addEventListener('DOMContentLoaded', function() {
  const reservationForm = document.getElementById('reservationForm');
  const successModal = document.getElementById('successModal');
  
  // Set minimum date to today
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  
  // Form submission
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reservationForm);
    const reservation = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
      occasion: formData.get('occasion'),
      specialRequests: formData.get('special-requests')
    };
    
    // Validate form
    if (validateReservation(reservation)) {
      // Save reservation (in a real app, this would send to a server)
      saveReservation(reservation);
      
      // Show success modal
      showSuccessModal();
      
      // Reset form
      reservationForm.reset();
    }
  });
  
  // Time validation based on selected date
  dateInput.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const today = new Date();
    const timeSelect = document.getElementById('time');
    
    // Clear existing options
    timeSelect.innerHTML = '<option value="">Select Time</option>';
    
    // If today, only show future times
    if (selectedDate.toDateString() === today.toDateString()) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      
      const timeSlots = [
        { value: '12:00', label: '12:00 PM' },
        { value: '12:30', label: '12:30 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '13:30', label: '1:30 PM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '18:00', label: '6:00 PM' },
        { value: '18:30', label: '6:30 PM' },
        { value: '19:00', label: '7:00 PM' },
        { value: '19:30', label: '7:30 PM' },
        { value: '20:00', label: '8:00 PM' },
        { value: '20:30', label: '8:30 PM' },
        { value: '21:00', label: '9:00 PM' }
      ];
      
      timeSlots.forEach(slot => {
        const [hour, minute] = slot.value.split(':').map(Number);
        if (hour > currentHour || (hour === currentHour && minute > currentMinute + 30)) {
          const option = document.createElement('option');
          option.value = slot.value;
          option.textContent = slot.label;
          timeSelect.appendChild(option);
        }
      });
    } else {
      // For future dates, show all time slots
      const timeSlots = [
        { value: '12:00', label: '12:00 PM' },
        { value: '12:30', label: '12:30 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '13:30', label: '1:30 PM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '18:00', label: '6:00 PM' },
        { value: '18:30', label: '6:30 PM' },
        { value: '19:00', label: '7:00 PM' },
        { value: '19:30', label: '7:30 PM' },
        { value: '20:00', label: '8:00 PM' },
        { value: '20:30', label: '8:30 PM' },
        { value: '21:00', label: '9:00 PM' }
      ];
      
      timeSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot.value;
        option.textContent = slot.label;
        timeSelect.appendChild(option);
      });
    }
  });
});

// Form validation
function validateReservation(reservation) {
  const errors = [];
  
  // Required fields
  if (!reservation.name.trim()) {
    errors.push('Name is required');
  }
  
  if (!reservation.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(reservation.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!reservation.phone.trim()) {
    errors.push('Phone number is required');
  }
  
  if (!reservation.date) {
    errors.push('Date is required');
  }
  
  if (!reservation.time) {
    errors.push('Time is required');
  }
  
  if (!reservation.guests) {
    errors.push('Number of guests is required');
  }
  
  // Date validation
  if (reservation.date) {
    const selectedDate = new Date(reservation.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push('Reservation date cannot be in the past');
    }
    
    // Check if reservation is within 3 months
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    
    if (selectedDate > threeMonthsFromNow) {
      errors.push('Reservations can only be made up to 3 months in advance');
    }
  }
  
  // Guest count validation
  if (reservation.guests && parseInt(reservation.guests) > 20) {
    errors.push('For groups larger than 20, please contact us directly');
  }
  
  // Display errors if any
  if (errors.length > 0) {
    showErrors(errors);
    return false;
  }
  
  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show validation errors
function showErrors(errors) {
  // Remove existing error messages
  const existingErrors = document.querySelectorAll('.error-message');
  existingErrors.forEach(error => error.remove());
  
  // Create error container
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-container';
  
  errors.forEach(error => {
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = error;
    errorContainer.appendChild(errorElement);
  });
  
  // Insert before the form
  const form = document.getElementById('reservationForm');
  form.parentNode.insertBefore(errorContainer, form);
  
  // Remove errors after 5 seconds
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

// Save reservation to localStorage (in a real app, this would go to a server)
function saveReservation(reservation) {
  const reservations = JSON.parse(localStorage.getItem('craveReservations') || '[]');
  reservation.id = Date.now(); // Simple ID generation
  reservation.status = 'confirmed';
  reservation.createdAt = new Date().toISOString();
  reservations.push(reservation);
  localStorage.setItem('craveReservations', JSON.stringify(reservations));
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'flex';
  
  // Add animation class
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Close modal
function closeModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('successModal');
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Form field animations
document.addEventListener('DOMContentLoaded', function() {
  const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  formFields.forEach(field => {
    // Add focus animation
    field.addEventListener('focus', function() {
      this.parentNode.classList.add('focused');
    });
    
    // Remove focus animation
    field.addEventListener('blur', function() {
      if (!this.value) {
        this.parentNode.classList.remove('focused');
      }
    });
    
    // Check if field has value on load
    if (field.value) {
      field.parentNode.classList.add('focused');
    }
  });
});

// Auto-format phone number
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phone');
  
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Format as (XXX) XXX-XXXX
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    e.target.value = value;
  });
});

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reservationForm');
  const fields = form.querySelectorAll('input, select, textarea');
  
  fields.forEach(field => {
    field.addEventListener('blur', function() {
      validateField(this);
    });
    
    field.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
});

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  
  // Clear previous error
  clearFieldError(field);
  
  // Validate based on field type
  switch (fieldName) {
    case 'name':
      if (!value) {
        showFieldError(field, 'Name is required');
      } else if (value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters');
      }
      break;
      
    case 'email':
      if (!value) {
        showFieldError(field, 'Email is required');
      } else if (!isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
      }
      break;
      
    case 'phone':
      if (!value) {
        showFieldError(field, 'Phone number is required');
      } else if (value.replace(/\D/g, '').length < 10) {
        showFieldError(field, 'Please enter a valid phone number');
      }
      break;
      
    case 'date':
      if (!value) {
        showFieldError(field, 'Date is required');
      }
      break;
      
    case 'time':
      if (!value) {
        showFieldError(field, 'Time is required');
      }
      break;
      
    case 'guests':
      if (!value) {
        showFieldError(field, 'Number of guests is required');
      }
      break;
  }
}

function showFieldError(field, message) {
  const errorElement = document.createElement('span');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
  field.parentNode.classList.add('has-error');
}

function clearFieldError(field) {
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
    field.parentNode.classList.remove('has-error');
  }
} 