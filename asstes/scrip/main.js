var myIndex = 0;
        carousel();
        
        function carousel() {
          var i;
          var x = document.getElementsByClassName("mySlides");
          for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
          }
          myIndex++;
          if (myIndex > x.length) {myIndex = 1}    
          x[myIndex-1].style.display = "block";  
          setTimeout(carousel, 2000); // Change image every 2 seconds
        }

/*Login*/ 
const Btns = document.querySelectorAll('.js-login')
        const modal2 = document.querySelector('.js-modal2')
        const modal2Close = document.querySelector('.js-modal2-close')
        const modalContainer2 = document.querySelector('.js-modal-container2') 

        //hàm hiểm thị(thêm class open vào modal)
        function showLogIn() {
            modal2.classList.add('open2')
        }

        //hàm ẩn(gỡ bỏ class open vào modal)
        function hideLogIn() {
            modal2.classList.remove('open2')
        }

        //lặp qua từng thẻ button và nghe hành vi click
        for (const Btn of Btns ) {
            Btn .addEventListener('click', hideSignUp)
            Btn .addEventListener('click', showLogIn)
        }

        //nghe hành vi click vào nút button close
        modal2Close .addEventListener('click', hideLogIn)
        modal2 .addEventListener('click', hideLogIn)
        modalContainer2 .addEventListener('click', function(event) {
            event.stopPropagation()
        })


// sign up 
const buyBtns = document.querySelectorAll('.js-signUp')
        const modal = document.querySelector('.js-modal')
        const modalClose = document.querySelector('.js-modal-close')
        const modalContainer = document.querySelector('.js-modal-container') 

        //hàm hiểm thị(thêm class open vào modal)
        function showSignUp() {
            modal.classList.add('open')
        }

        //hàm ẩn(gỡ bỏ class open vào modal)
        function hideSignUp() {
            modal.classList.remove('open')
        }

        //lặp qua từng thẻ button và nghe hành vi click
        for (const buyBtn of buyBtns ) {
          buyBtn .addEventListener('click', hideLogIn)
            buyBtn .addEventListener('click', showSignUp)
        }

        modalClose .addEventListener('click', hideSignUp)
        modal .addEventListener('click', hideSignUp)
        modalContainer .addEventListener('click', function(event) {
            event.stopPropagation()
        })

        

//product list

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".container__category-btn");
const panes = $$(".container__product");

const tabActive = $(".container__category-btn.selected");
const line = $("container__category-list .line");


tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".container__category-btn.selected").classList.remove("selected");
    $(".container__product.selected").classList.remove("selected");
    
    
    this.classList.add("selected");
    pane.classList.add("selected");
  };
});

