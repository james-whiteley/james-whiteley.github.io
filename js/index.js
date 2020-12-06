const nav = document.getElementsByTagName('nav')[0];
const mobileNavIcon = document.getElementById('mobile-nav');
const contactForm = document.getElementById('contactForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const messageField = document.getElementById('message');
const sendMessageButton = document.getElementById('sendMessageButton');
const sendMessageButtonChildren = sendMessageButton.childNodes;
const sendMessageText = sendMessageButtonChildren[0];
const sendMessageLoader = sendMessageButtonChildren[1];
const sendMessageSuccess = document.getElementById('sendMessageSuccess');
const sendMessageWarning = document.getElementById('sendMessageWarning');
const sendMessageFail = document.getElementById('sendMessageFail');
const messages = document.getElementsByClassName('messages');
const backToTopButton = document.getElementById('back-to-top');

// Listen for contactForm submission
contactForm.onsubmit = (event) => {
	// Prevent default submission
	event.preventDefault();

	// Disable form and show loader
	disableForm();

	// Get form values
	let data = {
		name: nameField.value || null,
		email: emailField.value || null,
		phone: phoneField.value || null,
		message: messageField.value || null
	}

	if (formIsValid(data)) {
		fetch('https://formspree.io/f/xvokdwjd', {
			method: 'POST',
			redirect: 'follow',
			headers: {
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(response => {
				let clearFields = false;
				if (response.ok) {
					// Show success message
					sendMessageSuccess.style.display = 'block';
					clearFields = true;
				} else {
					// Show fail message
					sendMessageFail.style.display = 'block';
				}

				// Enable form after 5 seconds
				setTimeout(() => enableForm(clearFields), 5000);
			})
			.catch(error => {
				// Show fail message
				sendMessageFail.style.display = 'block';

				// Enable form after 5 seconds
				setTimeout(enableForm, 5000);
			});
	} else {
		// Show validation warning message
		sendMessageWarning.style.display = 'block';

		// Enable form after 5 seconds
		setTimeout(enableForm, 5000);
	}
}

/**
 * Simple form validation to check required fields have been entered
 */
const formIsValid = (data) => {
	if (!data.name || (!data.email && !data.phone) || !data.message) {
		return false;
	}

	return true;
}

/**
 * Disables form elements and shows loader
 */
const disableForm = () => {
	// Disable fields and button
	nameField.disabled = true;
	emailField.disabled = true;
	phoneField.disabled = true;
	messageField.disabled = true;
	sendMessageButton.disabled = true;

	// Hide text and show loader
	sendMessageText.style.display = 'none';
	sendMessageLoader.style.display = 'inline';
}

/**
 * Enables form elements and hides loader
 */
const enableForm = (clearFields = false) => {
	// Hide all messages
	for (const message of messages) {
		message.style.display = 'none';
	}

	// Clear fields if flag true
	if (clearFields) {
		nameField.value = '';
		emailField.value = '';
		phoneField.value = '';
		messageField.value = '';
		sendMessageButton.value = '';
	}

	// Disable fields and button
	nameField.disabled = false;
	emailField.disabled = false;
	phoneField.disabled = false;
	messageField.disabled = false;
	sendMessageButton.disabled = false;

	// Show text and hide loader
	sendMessageText.style.display = 'inline';
	sendMessageLoader.style.display = 'none';
}

// Mobile navigation
mobileNavIcon.onclick = () => openMobileNav();

const openMobileNav = () => {
	// Set class for icon animation
  mobileNavIcon.classList.toggle('change');

	// Open menu
	nav.classList.toggle('open');
}

// When user scrolls, check if 'Back to the top' button should be displayed
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
}

/**
 * Scroll back to top of page
 */
const scrollBackToTop = () => {
	window.scrollTo({top: 0, behavior: 'smooth'});
}

// Attach onclick listener to 'Back to the top' button
backToTopButton.onclick = () => scrollBackToTop();

// Handle smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

		// If on mobile close nav
		nav.classList.remove('open');
		mobileNavIcon.classList.toggle('change');
		
		document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});