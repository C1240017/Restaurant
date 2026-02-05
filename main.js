const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".explore__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".explore__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".explore__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".explore__content .explore__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".special__card", {
  ...scrollRevealOption,
  delay:500,
  interval: 500,
});


ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".chef__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".chef__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".chef__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".chef__list li", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});




const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");
const message = document.getElementById("message");

ScrollReveal().reveal(".order .section_container ", {
  ...scrollRevealOption,
  delay: 500,
});

let orders = [];

orderForm.addEventListener("submit", function(e) { 
  e.preventDefault();
    
  const customerName = document.getElementById("customerName").value.trim();
  const menu = document.getElementById("menuItem");
  const itemName = menu.value;
  const price = Number(menu.selectedOptions[0].dataset.price);
  const quantity = Number(document.getElementById("quantity").value);
  
  // Validation
  if (!customerName || !itemName || quantity <= 0) {
    showMessage("❌ Please fill all fields correctly", "red");
    return;
  }
  
  // Check existing pending order
  let existingOrder = orders.find(
    o => o.customerName === customerName && o.status === "Pending"
  );
  
  if (existingOrder) {
    // Add item to existing order
    existingOrder.items.push({
      name: itemName,
      price,
      quantity
    })
    saveData();
  } else {
    // Create new order
    orders.push({
      customerName,
      items: [{
        name: itemName,
        price,
        quantity
      }],
      status: "Pending"
    })
    saveData();
  }
  
  renderOrders();
  orderForm.reset();
  showMessage("✅ Item added successfully", "green");
});

function renderOrders() {
  
  orderList.innerHTML = "";
  
  orders.forEach((order, index) => {
    const total = order.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${order.customerName}</td>

      <td>
        ${order.items
          .map(i => `${i.name} × ${i.quantity}`)
          .join("<br>")}
      </td>

      <td>${total}</td>

      <td class="${
        order.status === "Pending"
          ? "status-pending"
          : "status-completed"
      }">
        ${order.status}
      </td>

      <td>
        ${
          order.status === "Pending"
            ? `<button onclick="completeOrder(${index})">Complete</button>`
            : ""
        }
        <button onclick="deleteOrder(${index})">Delete</button>
      </td>
    `;
    
    orderList.appendChild(row);
    saveData()
  });
}

function completeOrder(index) {
  orders[index].status = "Completed";
  renderOrders();
  saveData();
}

function deleteOrder(index) {
  orders.splice(index, 1);
  renderOrders();
  saveData();
}

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  setTimeout(() => message.textContent = "", 3000);
}

function saveData(){
  localStorage.setItem("data",orderList.innerHTML)
}

function showData(){
  orderList.innerHTML=localStorage.getItem("data")
}
showData()





