document.addEventListener('DOMContentLoaded', function() {
    // Get all sections with the class 'scroll-section'
    const sections = document.querySelectorAll('.scroll-section');
    
    // Get the navigation element
    const nav = document.querySelector('nav');
    
    // Get all navigation links
    const navLinks = nav.querySelectorAll('a');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        // Get the bounding rectangle of the element
        const rect = element.getBoundingClientRect();
        
        // Check if the element is within the viewport boundaries
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll event
    function handleScroll() {
        // Iterate over each section
        sections.forEach(section => {
            // Check if the section is in the viewport
            if (isInViewport(section)) {
                // Add the 'active' class to the section
                section.classList.add('active');
                
                // Get the background color from the 'data-bgcolor' attribute
                const bgcolor = section.getAttribute('data-bgcolor');
                
                // Set the background color of the body to the retrieved color
                document.body.style.backgroundColor = bgcolor;

                // Update active navigation link
                const sectionId = section.getAttribute('id');
                
                // Iterate over each navigation link
                navLinks.forEach(link => {
                    // Remove the 'active' class from all navigation links
                    link.classList.remove('active');
                    
                    // Check if the link's href matches the current section's ID
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        // Add the 'active' class to the corresponding navigation link
                        link.classList.add('active');
                    }
                });
            } else {
                // Remove the 'active' class from the section if it's not in the viewport
                section.classList.remove('active');
            }
        });
    }

    // Function to handle learn more button click
    function handleLearnMoreClick(event) {
        // Get the closest section element to the clicked button
        const section = event.target.closest('.scroll-section');
        
        // Get the ID of the section
        const sectionId = section.getAttribute('id');
        
        // Display an alert with the section ID
        alert(`You clicked the learn more button for ${sectionId}`);
    }

    // Add event listener for scroll event
    window.addEventListener('scroll', handleScroll);
    
    // Get all learn more buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    
    // Iterate over each learn more button
    learnMoreButtons.forEach(button => {
        // Add event listener for click event on each button
        button.addEventListener('click', handleLearnMoreClick);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        // Add event listener for click event on each navigation link
        link.addEventListener('click', function(event) {
            // Prevent the default link behavior
            event.preventDefault();
            
            // Get the target section ID from the link's href attribute
            const targetId = this.getAttribute('href');
            
            // Get the target section element
            const targetSection = document.querySelector(targetId);
            
            // Scroll smoothly to the target section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});