// script to keep formspree submission, then redirect to submit.html

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop default form submission

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = "./submit.html"; // Redirect on success
        } else {
            alert("Error submitting form. Please try again.");
        }
    }).catch(() => {
        alert("Submission failed. Please check your connection.");
    });
});