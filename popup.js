
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ toggle: false });
// });

const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const saveButton = document.getElementById("saveButton");

// document.addEventListener('DOMContentLoaded', checkState);//how to call function when page is loaded vs when popup is clicked?

document.addEventListener('DOMContentLoaded', updateUI)

function updateUI() {
    chrome.storage.sync.get(["toggle"], function(result) {
        if (result.toggle != null) {
            toggle.checked = result.toggle;
            updateToggleState(result.toggle);
        }
    });
}

const toggle = document.querySelector('.toggle input');
toggle.addEventListener('click', () => {
    const isOn = toggle.checked;
    updateToggleText(isOn);
    clickFunction(isOn);
});

function updateToggleText(isOn) {
    const onOff = toggle.parentNode.querySelector('.onoff');
    onOff.textContent = isOn ? 'ON' : 'OFF';
}

function updateToggleState(isOn) {
    toggle.checked = isOn;
    updateToggleText(isOn);
}

function clickFunction(isOn) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: isOn ? "turn_on" : "turn_off" });
    });
    // chrome.runtime.sendMessage({ type: 'toggle', state: isOn }, response => {
    //     if (response.status === 'success') {
    //         console.log('Toggle state saved successfully.');
    //     }
    // });
    //chrome.storage.sync.set({ toggle: isOn });
}

saveButton.onclick = function() {
    console.log("Start time:", startTime.value);
    console.log("End time:", endTime.value);
}
