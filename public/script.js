window.addEventListener('scroll', function(){
    //navbar
    var navbar = document.getElementById('navbar');

    if(window.scrollY > 0){
        navbar.classList.add('scrolled');
    }

    else{
        navbar.classList.remove('scrolled');
    }
});

// ***********************************************************************************
// const observer = new IntersectionObserver((entries)=>{
//     entries.forEach((entry)=>{
//         if(entry.isIntersecting){
//             entry.target.classList.add('show');
//         }
//         // else{
//         //     entry.target.classList.remove('show');
//         // }
//     });
// });

// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el)=>observer.observe(el));
// ***********************************************************************************

const inputs = document.getElementsByClassName('input');
for(const input of inputs){
    input.addEventListener('input', function(){
        this.style.color = "blue";
    });
}
