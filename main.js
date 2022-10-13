(() => {
	const main = document.querySelector('#MainSection');
	const jokeQuestion = document.querySelector('.joke_question');

	const getJokeButton = document.querySelector('.get_joke');
	getJokeButton.onclick = e => {
		e.preventDefault();
		e.target.style.display = 'none';
		startAssessment();
	};

	const refreshButton = document.querySelector('.refresh_button');
	refreshButton.onclick = () => {
		window.location.reload();
	};

	const closeModal = document.querySelector('.close_dialog');
	closeModal.onclick = () => {
		document.querySelector('dialog').close('Finished');
	};

	let punchline = null;
	if (window.localStorage.getItem('6876d86f-541e-4e87-a885-2bc0a6dde768')) {
		let jokeObj = JSON.parse(atob(window.localStorage.getItem('6876d86f-541e-4e87-a885-2bc0a6dde768')));
		punchline = jokeObj.punchline;
		window.localStorage.removeItem('6876d86f-541e-4e87-a885-2bc0a6dde768');
		jokeQuestion.innerText = jokeObj.question;
	}

	const submitButton = document.querySelector('.submit');
	submitButton.onclick = e => {
		e.preventDefault();

		if (punchline === document.querySelector('.xgen_answer').value) {
			setTimeout(() => (document.querySelector('.xgen_answer').style.background = '#1e9524'), 500);
			setTimeout(() => document.querySelector('dialog').showModal(), 1500);
		} else {
			document.querySelector('.xgen_answer').style.background = 'red';
			document.querySelector('.submit').animate(
				{
					transform: ['translateX(0px)', 'translateX(10px)', 'translateX(0px)', 'translateX(-10px)', 'translateX(0px)'],
					offset: [0, 0.2, 0.4, 0.6, 0.8, 1]
				},
				{ duration: 300, easing: 'ease' }
			);
		}
	};

	const button = document.createElement('button');
	button.classList.add('xgen_button');
	button.innerHTML = `<div>Variable has not been set.<img width="30px" src="/close.svg" /></div>`;

	const randomTime = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	async function getJoke() {
		let response = await fetch('https://backend-omega-seven.vercel.app/api/getjoke');
		let data = await response.json();
		return data[0];
	}

	async function startAssessment() {
		const jokeObj = await getJoke();
		window.localStorage.setItem('6876d86f-541e-4e87-a885-2bc0a6dde768', btoa(JSON.stringify(jokeObj)));

		let buttonClicked = false;
		//Coding Section 1 =================================================================================================
		async function CodingSection1() {
			console.log('Section 1 ----------------------------------------------------------------');
			return new Promise((res, rej) => {
				setTimeout(() => {
					main.appendChild(button);
					console.log('Button Available');
					button.onclick = async () => {
						console.log('Button Clicked');
						buttonClicked = true;
						await CodingSection2();
					};
					setTimeout(() => {
						if (buttonClicked) return;
						button.disabled = true;
						console.log('Need to click the button faster');
						button.innerText = 'Need to click the button faster';
					}, 50);
					res(true);
				}, randomTime(3000, 7000));
			});
		}
		await CodingSection1();

		// Coding Section 2 =================================================================================================
		async function CodingSection2() {
			console.log('Section 2 ----------------------------------------------------------------');
			const codingSection2 = document.querySelector('#CodingSection2');
			return new Promise((res, rej) => {
				setTimeout(() => {
					window.xgenVariable = jokeObj.punchline;
					console.log('Joke Answer Available');
					button.innerHTML = `<div>Variable has been set.<img width="30px" src="/check.svg" /></div>`;
					res(true);
				}, randomTime(3000, 7000));
			});
		}
	}
})();
