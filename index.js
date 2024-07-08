// Define the animation object with default values
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);


// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

// TODO: Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);

const updateCounter = (count) => {
  const counterElement = document.getElementById('counter');
  counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
}

let count = parseInt(localStorage.getItem('signatureCount')) || 1;

const addSignature = (person) => {
  const signatureText = `🖊️ ${person.name} from ${person.hometown} supports this.`;

  const newSignature = document.createElement('p');
  newSignature.textContent = signatureText;

  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.appendChild(newSignature);

  count++;
  saveSignatureToLocalStorage(person);
  updateCounter(count);
}

const saveSignatureToLocalStorage = (person) => {
  let signatures = JSON.parse(localStorage.getItem("signatures")) || [];
  signatures.push(person); // Store the person object directly
  localStorage.setItem("signatures", JSON.stringify(signatures));
  localStorage.setItem('signatureCount', count.toString());
}

const loadSignaturesFromLocalStorage = () => {
  let signatures = JSON.parse(localStorage.getItem("signatures")) || [];
  if (signatures.length > 0) {
    const signaturesSection = document.querySelector('.signatures');
    signatures.forEach(signature => {
      const newSignature = document.createElement('p');
      newSignature.textContent = `🖊️ ${signature.name} from ${signature.hometown} supports this.`;
      signaturesSection.appendChild(newSignature);
    });
  }
}

const signNowButton = document.getElementById('sign-now-button');

window.addEventListener("load", () => {
  loadSignaturesFromLocalStorage();
  updateCounter(count);
});

const validateForm = () => {
  let containsErrors = false;

  const nameInput = document.getElementById("name");
  const hometownInput = document.getElementById("hometown");
  const emailInput = document.getElementById("email");

  const person = {
    name: nameInput.value,
    hometown: hometownInput.value,
    email: emailInput.value
  };

  if (person.name.length < 2) {
    nameInput.classList.add('error');
    containsErrors = true;
  } else {
    nameInput.classList.remove('error');
  }

  if (person.hometown.length < 2) {
    hometownInput.classList.add('error');
    containsErrors = true;
  } else {
    hometownInput.classList.remove('error');
  }

  if (person.email.length < 2 || !person.email.includes('@') || !person.email.includes('.com')) {
    emailInput.classList.add('error');
    containsErrors = true;
  } else {
    emailInput.classList.remove('error');
  }
  return { isValid: !containsErrors, person };
}

signNowButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission by default

  const { isValid, person } = validateForm();
  if (isValid) {
    addSignature(person); 
    toggleModal(person); 
  }
});
// Define the scaleFactor and modalImage variables
let scaleFactor = 1;
const modalImage = document.querySelector('.modal-content img');

// Create the scaleImage function
const scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

// Call the scaleImage function within the toggleModal function
function toggleModal(person) {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('modal-text-container');

  // Set the display style of the modal to flex
  modal.style.display = 'flex';

  // Set the text content of the modal
  modalContent.innerHTML = `
    <p>Thank you so much, <br><span class="person-name">${person.name}</span> from <span class="hometown">${person.hometown}</span>!</p>
    <p>Your support means a lot to us.</p>
    <button id="close-modal-button">Close</button> <!-- Move the close button inside the modal content -->
  `;

  // Call the scaleImage function every 500 milliseconds (0.5 seconds)
  const intervalId = setInterval(scaleImage, 500);
  
  const closeButton = document.getElementById('close-modal-button');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    clearInterval(intervalId); // Clear the interval to stop the animation
  });

  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId); // Clear the interval to stop the animation
  }, 7000); // (7 seconds)
}

// Smooth scroll to top function
const scrollToTop = () => {
  const scrollStep = -window.scrollY / (500 / 15); 
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
};

const backToTopLink = document.getElementById('back-to-top');

backToTopLink.addEventListener('click', (event) => {
  event.preventDefault(); 
  scrollToTop(); 
});


/*
const resetLocalStorage = () => {
  console.log('Resetting localStorage...'); // Add this line for debugging
  localStorage.clear();
  count = 1; // Reset the count to 1 after clearing localStorage
  updateCounter(count); // Update the counter display
}
resetLocalStorage();

*/
