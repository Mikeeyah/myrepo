const rate = 40;

const names = ["John","Tinashe","Sarah","Mike","Ashley","David","Prince","Anna"];
const plansNames = ["Starter","Basic","Pro","Premium","Ultimate"];

const plans = [
  {name:"Starter", price:40, features:["3 Pages","Mobile Responsive","Basic SEO"]},
  {name:"Basic", price:50, features:["5 Pages","Contact Form","Fast Speed","Free SSL Certificate","Links"]},
  {name:"Pro", price:100, features:["10 Pages","SEO Optimized","Free SSL Certificate","Links"], popular:true},
  {name:"Premium", price:120, features:["12 Pages","Animations","Modern UI","Free SSL Certificate","Links"]},
  {name:"Ecommerce", price:150, features:["Online Store","Payments","20 Products","Free SSL Certificate","Links"]},
  {name:"Business", price:180, features:["Booking System","Emails","Optimization","Free SSL Certificate","Links"]},
  {name:"Advanced", price:220, features:["Cart System","Admin Panel","20 Products"]},
  {name:"Corporate", price:250, features:["Analytics","High Speed","Security"]},
  {name:"Startup", price:300, features:["Branding","Logo Design","SEO Setup"]},
  {name:"Ultimate", price:400, features:["Automation","All Features","Priority Support","Free SSL Certificate","Links"]}
];

let currency = 'usd';

function renderPlans() {
  const container = document.getElementById('pricing-container');
  container.innerHTML = '';

  plans.forEach(plan => {
    let price = currency === 'usd' ? `$${plan.price}` : `ZWL ${plan.price * rate}`;

    container.innerHTML += `
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="pricing-card ${plan.popular ? 'popular' : ''}">
          ${plan.popular ? '<div class="badge-popular">HOT</div>' : ''}
          <h5>${plan.name}</h5>
          <div class="price">${price}</div>
          <ul class="list-unstyled mt-3 mb-4">
            ${plan.features.map(f => `<li> ${f}</li>`).join('')}
          </ul>
          <button class="btn btn-glow" onclick="order('${plan.name}', '${price}')"> Order Now</button>
        </div>
      </div>
    `;
  });
}

function setCurrency(cur) {
  currency = cur;
  renderPlans();
}

function order(name, price) {
  let message = `Hello, I'm interested in the ${name} package (${price})`;
  window.open(`https://wa.me/263714192084?text=${encodeURIComponent(message)}`, '_blank');
}

/*  FAKE SALES SYSTEM */
function showPopup() {
  const popup = document.getElementById('popup');
  const name = names[Math.floor(Math.random() * names.length)];
  const plan = plansNames[Math.floor(Math.random() * plansNames.length)];

  popup.style.backgroundColor = 'linear-gradient(45deg, #ff00ff, #00f2fe)'
  popup.innerHTML = `${name} just purchased the ${plan} plan`;
  popup.style.display = 'block';
  

  setTimeout(() => {
    popup.style.display = 'none';
  }, 4000);
}

setInterval(showPopup, 7000);

renderPlans();
