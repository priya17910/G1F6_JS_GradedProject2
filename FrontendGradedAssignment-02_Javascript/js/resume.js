document.addEventListener('DOMContentLoaded', function () {
    // INITIALIZING THE SEARCH TEXT BOX WITH EMPTY STRING
    document.getElementById('jobFilter').innerText = "";

    // FUNCTION TO FETCH THE APPLICANTS DATA FROM DATA.JSON FILE
    function fetchApplicants(callback) {
        fetch('../data/data.json')
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    // VARIABLE TO STORE COMPLETE DATA TO DISPLAY
    var applicants = [];
    // VARIABLE TO TRACK THE CURRENT PAGE
    var currentApplicantIndex = 0;

    // FUNCTION TO FILTER THE APPLICATIONS BASED ON THE JOB TYPE ENTERED IN SEARCH TEXT BOX
    function filterApplicants(job) {
        return applicants?.resume.filter(function (applicant) {
            return applicant?.basics.AppliedFor?.toLowerCase().includes(job);
        });
    }

    // FUNCTION TO DISPLAY THE RESUME PAGE
    function displayApplicant(applicant) {
        /* RENDERING DATA FETCHED FROM DATA.JSON INTO VALID HTML ID ELEMENTS STARTS HERE */
        document.getElementById('applicantName').innerText = applicant?.basics.name;
        document.getElementById('applicantAppliedFor').innerText = applicant?.basics.AppliedFor;
        document.getElementById('applicantEmail').innerText = applicant?.basics.email;
        document.getElementById('applicantPhone').innerText = applicant?.basics.phone;
        document.getElementById('applicantNetwork').innerText = applicant?.basics.profiles.network;
        document.getElementById('networkLink').setAttribute('href', applicant?.basics.profiles.url);
        document.getElementById('position').innerText = applicant?.work?.Position;
        document.getElementById('companyName').innerText = applicant?.work?.CompanyName;
        document.getElementById('startDate').innerText = applicant?.work?.StartDate;
        document.getElementById('endDate').innerText = applicant?.work?.EndDate;
        document.getElementById('summary').innerText = applicant?.work?.Summary;
        document.getElementById('projectName').innerText = applicant?.projects.name;
        document.getElementById('projectDescription').innerText = applicant?.projects.description;
        document.getElementById('profileImage').setAttribute('src', applicant?.basics?.image ? applicant?.basics?.image : "../assets/user.png");


        var skillsHTML = '';
        applicant?.skills?.keywords?.forEach(function (skill) {
            skillsHTML += `<div>${skill}</div>`;
        });
        document.getElementById('applicantSkills').innerHTML = skillsHTML;

        var hobbiesHTML = '';
        applicant?.interests?.hobbies?.forEach(function (hobby) {
            hobbiesHTML += `<div>${hobby}</div>`
        });
        document.getElementById('applicantHobbies').innerHTML = hobbiesHTML;

        document.getElementById('highSchoolInstitute').innerText = applicant?.education?.HighSchool?.institute;
        document.getElementById('highSchoolCgpa').innerText = applicant?.education?.HighSchool?.cgpa;
        document.getElementById('seniorSecondaryInstitute').innerText = applicant?.education?.SeniorSecondary?.institute;
        document.getElementById('seniorSecondaryCgpa').innerText = applicant?.education?.SeniorSecondary?.cgpa;
        document.getElementById('ugInstitute').innerText = applicant?.education?.UG?.institute;
        document.getElementById('ugCgpa').innerText = applicant?.education?.UG?.cgpa;

        document.getElementById('internPosition').innerText = applicant?.Internship?.Position;
        document.getElementById('internCompanyName').innerText = applicant?.Internship?.CompanyName;
        document.getElementById('internStartDate').innerText = applicant?.Internship?.StartDate;
        document.getElementById('internEndDate').innerText = applicant?.Internship?.EndDate;
        document.getElementById('internSummary').innerText = applicant?.Internship?.Summary;

        var achievementHTML = '';
        applicant?.achievements?.Summary?.forEach(function (achievement) {
            achievementHTML += `<li>${achievement}</li>`;
        });
        document.getElementById('achievements').innerHTML = achievementHTML;
        /* RENDERING DATA FETCHED FROM DATA.JSON INTO VALID HTML ID ELEMENTS ENDS HERE */
    }

    // CALLING FETCH APPLICANTS FUNCTION
    fetchApplicants(function (data) {
        applicants = data;
        if (applicants?.resume.length > 0) {
            displayApplicant(applicants?.resume[currentApplicantIndex]);
            document.getElementById('resumeContainer').style.display = 'block';
            document.getElementById('error').style.display = 'none';
        }
        else {
            document.getElementById('resumeContainer').style.display = 'none';
            document.getElementById('error').style.display = 'block';
        }
    });

    // FUNCTION TO HANDLE PREVIOUS BUTTON CLICK
    function prevButtonClick() {
        if (currentApplicantIndex > 0) {
            currentApplicantIndex--;
            displayApplicant(applicants?.resume[currentApplicantIndex]);
            nextButton.style.display = 'block';
        }
        if (currentApplicantIndex === 0) {
            prevButton.style.display = 'none';
        }
    }

    // FUNCTION TO HANDLE NEXT BUTTON CLICK
    function nextButtonClick() {
        if (currentApplicantIndex < applicants?.resume.length - 1) {
            currentApplicantIndex++;
            displayApplicant(applicants?.resume[currentApplicantIndex]);
            prevButton.style.display = 'block';
        }
        if (currentApplicantIndex === applicants?.resume.length - 1) {
            nextButton.style.display = 'none';
        }
    }

    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');

    prevButton.addEventListener('click', prevButtonClick);
    nextButton.addEventListener('click', nextButtonClick);

    if (currentApplicantIndex === 0) {
        prevButton.style.display = 'none';
    }

    if (currentApplicantIndex === applicants.length - 1) {
        nextButton.style.display = 'none';
    }

    // FUNCTION TO UPDATE DISPLAY OF APPLICATIONS BASED ON JOB TYPE ENTERED IN SEARCH TEXT BOX
    function updateApplicantsByJob(job) {
        currentJob = job;
        var filteredApplicants = filterApplicants(job);
        prevButton.style.display = 'none';
        if (filteredApplicants.length === 0) {
            document.getElementById('resumeContainer').style.display = 'none';
            document.getElementById('error').style.display = 'block';
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            if (filteredApplicants.length === 1) {
                nextButton.style.display = 'none';
            }
            else {
                nextButton.style.display = 'block';
            }
            applicants.resume = filteredApplicants;
            currentApplicantIndex = 0;
            displayApplicant(applicants?.resume[currentApplicantIndex]);
        }
    }

    // CODE TO TARGET SEARCH FILTER TEXT BOX
    document.getElementById('jobFilter').addEventListener('input', function (event) {
        document.getElementById('resumeContainer').style.display = 'block';
        document.getElementById('error').style.display = 'none';
        var searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            updateApplicantsByJob(searchTerm);
        }
        else {
            fetchApplicants(function (data) {
                applicants = data;
                displayApplicant(applicants?.resume[currentApplicantIndex]);
            });
            nextButton.style.display = 'block';
        }
    });
});
