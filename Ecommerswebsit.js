
    let index = 0;
    const slides = document.getElementById("slideImages");
    const slideCount = slides.children.length;
    const dots = document.querySelectorAll(".dot");

    function showSlide(i) {
      slides.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active-dot"));
      dots[i].classList.add("active-dot");
    }
    function nextSlide() { index = (index + 1) % slideCount; showSlide(index); }
    function currentSlide(i) { index = i; showSlide(index); }
    setInterval(nextSlide, 2000);
    // ----------------- Overlay & Modal Control -----------------
const overlay = document.getElementById("overlay");
const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");
const cartBox = document.getElementById("cart-box");
const profileBox = document.getElementById("profile-box");
function closeAll(){
  overlay.style.display="none";
  loginBox.classList.remove("active");
  registerBox.classList.remove("active");
  cartBox.style.display="none";
  profileBox.style.display="none";
}
function openLogin(){overlay.style.display="block";loginBox.classList.add("active");}
function showRegister(){loginBox.classList.remove("active");registerBox.classList.add("active");}
function showLogin(){registerBox.classList.remove("active");loginBox.classList.add("active");}
// ----------------- User Management -----------------
function registerUser(){
  const name=document.getElementById("reg-name").value;
  const email=document.getElementById("reg-email").value;
  const pass=document.getElementById("reg-pass").value;
  if(!name||!email||!pass){alert("Fill all fields");return;}
  localStorage.setItem("mk_user",JSON.stringify({name,email,pass}));
  alert("Account created ✅ Please login");
  showLogin();
}
function loginUser(){
  const user=JSON.parse(localStorage.getItem("mk_user"));
  const email=document.getElementById("login-email").value;
  const pass=document.getElementById("login-pass").value;
  if(!user || user.email!==email || user.pass!==pass){alert("Invalid credentials ❌");return;}
  localStorage.setItem("mk_logged",JSON.stringify(true));
  alert("Login Successful ✅");
  closeAll();
}

// ----------------- Profile -----------------
function loadProfile(){
  const user=JSON.parse(localStorage.getItem("mk_user"));
  if(user){
    document.getElementById("profile-name").innerText="Name: "+user.name;
    document.getElementById("profile-email").innerText="Email: "+user.email;
  }
}

function openProfile(){
  loadProfile();
  closeAll();
  profileBox.style.display="block";
  overlay.style.display="block";
}

function logoutUser(){
  localStorage.removeItem("mk_logged");
  alert("Logged out");
  closeAll();
}

// ----------------- Cart -----------------
let cart=JSON.parse(localStorage.getItem("mk_cart")||"[]");

function updateCartCount(){document.getElementById("cart-count").innerText=cart.length;}
updateCartCount();

function addToCart(item){cart.push(item);localStorage.setItem("mk_cart",JSON.stringify(cart));updateCartCount();}
function loadCart(){
  const list=document.getElementById("cart-list");
  list.innerHTML="";
  if(cart.length===0){list.innerHTML="<li>No items.</li>";return;}
  cart.forEach(i=>{list.innerHTML+="<li>"+i+"</li>";});
}

function openCart(){loadCart();closeAll();cartBox.style.display="block";overlay.style.display="block";}
