document.addEventListener('DOMContentLoaded', function () {
    // STORING USERNAME AND PASSWORD IN LOCAL STORAGE
    localStorage.setItem('username', "adminUser");
    localStorage.setItem('password', "adminPassword@123");
    var loginForm = document.getElementById('loginForm');
    var errorMessage = document.getElementById('error-message');
    errorMessage.style.display = "none";
    // CODE TO BE EXECUTED WHEN CLICKED ON SUBMIT BUTTON
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // CODE TO MATCH THE USERNAME, PASSWORD ENTERED IN THE FORM TO THE ONE THAT IS STORED IN LOCAL STORAGE
        if (username == localStorage.getItem('username') && password == localStorage.getItem('password')) {
            localStorage.setItem('isLoggedIn', true);
            window.location.href = '../html/resume.html';
        } else {
            localStorage.setItem('isLoggedIn', false);
            errorMessage.style.display = "block";
            errorMessage.innerText = "Invalid username/ password";
            // alert('Invalid username/password');
        }
    });
});
