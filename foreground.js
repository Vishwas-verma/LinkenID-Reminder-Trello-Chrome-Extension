const ce_input = document.createElement('INPUT');
const ce_button = document.createElement('DIV');

ce_input.id = 'ce_input';
ce_input.type='date';
ce_input.style.cssText="width:152px;border-radius:1.69rem;cursor:pointer";

ce_button.id = 'ce_button';

ce_button.innerHTML = `Set Reminder`;

const x=document.getElementsByClassName("pvs-profile-actions")[0]
x.appendChild(ce_input);
x.appendChild(ce_button);

async function showAToast(){
	iqwerty.toast.toast('Reminder Has Been Set', {
		style: {
			main: {
				'background': 'pink',
				'color': 'black',
			},
		},
	});
}

ce_button.addEventListener('click', async () => {
    chrome.runtime.sendMessage({ 
        message: "send_reminder",
        payload: ce_input.value
    }, response => {
        if (response.message === 'success') {
            console.log(ce_input.value);
        }
    });
    ce_input.value='';
    alert("Reminder Has Been Set !")
   // await showAToast();
});
