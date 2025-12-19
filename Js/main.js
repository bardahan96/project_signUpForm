const modal = document.querySelector('.signup-modal');
const signUpBtn = document.getElementById("signUp-openBtn");
const closeModalBtn = modal.querySelector('.close-btn');
const continueBtnModal = modal.querySelector('button[data-action="next"]');
const addMorePlatforms = document.getElementById("addMorePlatforms");
const socialPlatformsContainer = modal.querySelector('.social-platforms-container');
const modalBottom = modal.querySelector('.modal-bottom');
const overflowPlatform = modal.querySelector('.signup-step[data-step="2"]')
const signupForm = modal.querySelector('.form-content')


function validateField (input) {

    if(!input) return;
    const isValid = input.checkValidity()

    if(isValid && input.value.length > 0){ 
       return true;
    }

    if(input.parentElement.querySelector('.error-msg')) return;
    const errorTooltip = document.createElement('div');
    input.classList.add('invalid-input');
    errorTooltip.classList.add('error-msg');
    errorTooltip.classList.add('has-shown');
    errorTooltip.textContent = 'Almost there! Please fill the required fields.';

    input.parentElement.appendChild(errorTooltip)


    setTimeout(() => {
        errorTooltip.remove(); 
        input.classList.remove('invalid-input');
    }, 1000)

    return false
}

function addMoreSocialPlatform () {
    const socialPlatform = modal.querySelector(".social-platform");
    if(!socialPlatform) return;

    const newPlatform = socialPlatform.cloneNode(true);
    newPlatform.dataset.cloned = 'true';
    


  const hiddenInput = newPlatform.querySelector('.social-platform-store');
  if (hiddenInput) hiddenInput.value = '';

    // clean platforms
    newPlatform.querySelectorAll('input').forEach((i) => {
     i.value = ''
    })
    newPlatform.querySelector('.platform-name').textContent = 'Platform'
    

    const deletePlatform = document.createElement("div");
    deletePlatform.classList.add('delete-platform')
    deletePlatform.innerHTML = `
    <img src="./Assets/icons/garbage-icon.svg" alt="garbage-arrow">
    `

    newPlatform.appendChild(deletePlatform)
    
    
    socialPlatformsContainer.appendChild(newPlatform)

    handleOverflow(modalBottom, overflowPlatform)

    function deleteNewPlatform(e) {
        const platform = e.currentTarget.closest('.social-platform');
        if (!platform) return;
      
        handleOverflow(modalBottom, overflowPlatform)
        platform.remove();
      }

    deletePlatform.addEventListener("click", deleteNewPlatform)

}

function closeModal () {

    modal.querySelectorAll('input').forEach((i) => {
        i.value = '';
    })

    modal.querySelectorAll('.platform-name').forEach((platform) => {
        platform.textContent = 'Platform';
    })

    modal.querySelectorAll('[data-cloned="true"]').forEach((clone) => {
        clone.remove()
    })


    modal.close()

    modal.querySelectorAll('.signup-step')
    .forEach(step => step.classList.remove('is-visible'));

    modal.querySelectorAll('.custom-select.is-open')
    .forEach(select => select.classList.remove('is-open'));

    modal.style.setProperty('--progressBar', '0%');
}

function openModal () {
    const firstStep = modal.querySelector('[data-step="1"]')
    firstStep.classList.add("is-visible")
    modal.showModal()
    continueBtnModal.textContent= 'Continue'

    

    updateProgressBar(1 , modal.querySelectorAll('[data-step]').length);

}

function goToNextStep () {
    const steps = modal.querySelectorAll("[data-step]");
    const stepsArrays = Array.from(steps, step => 
        Number(step.dataset.step)
    );

    let currentStep = modal.querySelector('[data-step].is-visible');
    if(!currentStep) return;

    let currentStepNumber = Number(currentStep.dataset.step);
    let nextStepNumber = currentStepNumber + 1

    const stepInputs = currentStep.querySelectorAll('input, select, textarea');

    for (const input of stepInputs) {
      const isValid = validateField(input);
    
      if (!isValid) {
        input.focus();
        return;
      }
    }
    
    if(nextStepNumber <= stepsArrays.length){
        currentStep.classList.remove('is-visible');
        
        let nextStep = modal.querySelector(`[data-step="${nextStepNumber}"]`);
        if (!nextStep) return;
        nextStep.classList.add("is-visible");
        nextStep.removeAttribute('hidden')

        completeSignup(nextStep)
        updateProgressBar(nextStepNumber, stepsArrays.length)
    }
    
}

function updateProgressBar (currentStep, totalSteps) {
    let percentBar = ( currentStep / totalSteps) * 100;
    modal.style.setProperty('--progressBar', `${percentBar}%`)
}

function handleCustomSelect(e) {

    const opener = e.target.closest('.custom-select-opener');
    if (opener) {
        const select = opener.closest('.custom-select');

      select.classList.toggle('is-open');


    // close custom select
    document.addEventListener("click", (e) => {
        if(!select.contains(e.target)) {
            select.classList.remove('is-open')
        }
    })

    }
  
    const option = e.target.closest('.custom-select-options li');
    if (option) {
      const select = option.closest('.custom-select');
      const input = select.querySelector('.social-platform-store');
      const label = select.querySelector('.platform-name');
      const value = option.dataset.value;
  
      input.value = value;
      label.textContent = value;
      select.classList.remove('is-open');
    }

}

function handleOverflow(fixedElement, overflowEl) {
    if (!fixedElement || !overflowEl) return;
  
    const hasOverflow =
      overflowEl.scrollHeight > overflowEl.clientHeight;

          fixedElement.classList.toggle('has-shadow', hasOverflow);
   
  }

function completeSignup (currentStep) {
    if(!currentStep.hasAttribute('data-last-step')) return;

    const completeBtn = modal.querySelector('.primary-button[data-action="next"]');
    completeBtn.textContent = 'Close';
}
  
modal.addEventListener('click', handleCustomSelect);

signUpBtn.addEventListener("click" , openModal)

closeModalBtn.addEventListener("click" , closeModal)

continueBtnModal.addEventListener("click", (e) => {
    const currentStep = modal.querySelector('[data-step].is-visible');
    if(!currentStep) return;

    if(currentStep.hasAttribute('data-last-step')) {
        e.preventDefault();
        signupForm.requestSubmit();
        return;
    }

    goToNextStep()
})

addMorePlatforms.addEventListener("click" , (e) => {

    e.preventDefault();
    addMoreSocialPlatform();
})


signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
  
    const formData = new FormData(signupForm);
  
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    closeModal()
  });