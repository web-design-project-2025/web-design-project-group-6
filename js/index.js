   // scrolling navigation bar control
   const header = document.querySelector('header');
   let lastScrollTop = 0;
   
   window.addEventListener('scroll', () => {
       let scrollTop = window.scrollY || document.documentElement.scrollTop;
       
       // determine the scroll direction
       if (scrollTop > lastScrollTop) {
           // scroll down to hide the navigation bar
           header.classList.add('nav-hidden');
       } else {
           // scroll up to show the navigation bar
           header.classList.remove('nav-hidden');
       }
       
       // if it has returned to the top, always show the navigation bar
       if (scrollTop === 0) {
           header.classList.remove('nav-hidden');
       }
       
       lastScrollTop = scrollTop;
   });


// fade in
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});