function toggleJob(jobId) {
    // Hide all job descriptions
    var allJobs = document.querySelectorAll('.job');
    allJobs.forEach(function(job) {
        job.style.display = 'none';
    });

    // Show the clicked job description
    var jobToDisplay = document.getElementById(jobId);
    if (jobToDisplay) {
        jobToDisplay.style.display = 'block';
    }
}

// Initialize: Hide all job descriptions except the first one
document.addEventListener('DOMContentLoaded', function() {
    var allJobs = document.querySelectorAll('.job');
    allJobs.forEach(function(job, index) {
        if (index !== 0) { // Hide all jobs except the first one
            job.style.display = 'none';
        }
    });

    // Event listener for job title clicks
    document.querySelectorAll('.job_navigation a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            var jobId = this.getAttribute('href').substring(1); // Get the ID without the #
            toggleJob(jobId);
        });
    });

    // Initialize variables for touch event tracking
    var startX = 0;
    var endX = 0;
    var threshold = 20; // Minimum distance in pixels to trigger a swipe
    var currentJobIndex = 0; // Track the current job being displayed
    var jobs = document.querySelectorAll('.job'); // Get all job elements

    // Function to handle touch start
    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    // Function to handle touch move
    function handleTouchMove(event) {
        endX = event.touches[0].clientX;
    }

    // Function to handle touch end
    function handleTouchEnd() {
        var diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - move to the next job
                showNextJob();
            } else {
                // Swipe right - move to the previous job
                showPreviousJob();
            }
        }
    }

    // Function to show the next job
    function showNextJob() {
        jobs[currentJobIndex].style.display = 'none'; // Hide current job
        currentJobIndex = (currentJobIndex + 1) % jobs.length; // Increment and wrap around
        jobs[currentJobIndex].style.display = 'block'; // Show next job
    }

    // Function to show the previous job
    function showPreviousJob() {
        jobs[currentJobIndex].style.display = 'none'; // Hide current job
        currentJobIndex = (currentJobIndex - 1 + jobs.length) % jobs.length; // Decrement and wrap around
        jobs[currentJobIndex].style.display = 'block'; // Show previous job
    }

    // Event listeners for touch events
    document.querySelector('.job_container').addEventListener('touchstart', handleTouchStart, false);
    document.querySelector('.job_container').addEventListener('touchmove', handleTouchMove, false);
    document.querySelector('.job_container').addEventListener('touchend', handleTouchEnd, false);
});
