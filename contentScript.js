const url = window.location.href;
// window.addEventListener('load', checkState);//how to call function when page is loaded vs when popup is clicked?
function invisible()  {
        if (url === "https://www.youtube.com/")
            {
            content = document.getElementById("primary");
            content.style.visibility = "hidden";
            shorts = document.getElementById("contents");
            shorts.style.display = "none";
        }
        
        else if (url === "https://www.yahoo.com/")
            {
            content = document.getElementById("Masterwrap");
            content.style.visibility = "hidden";
        }

}

function visible() {
    if (url === "https://www.youtube.com/")
        {
        content = document.getElementById("primary");
        content.style.visibility = "visible";
        shorts = document.getElementById("contents");
        shorts.style.display = "inline";
        
    }
    
    else if (url === "https://www.yahoo.com/")
        {
        content = document.getElementById("Masterwrap");
        content.style.visibility = "visible";
    }
}

checkState()
function checkState() {
    chrome.storage.sync.get(["toggle"]).then((result) => {
        console.log("Value is " + result.toggle);
        if (result.toggle) {
            invisible()
        }
      })
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //console.log(message);
    if (request.message === "turn_on") {
        invisible()
        chrome.storage.sync.set({ toggle: true })
        
    }
    else if (request.message === "turn_off") {
        visible()
        chrome.storage.sync.set({ toggle: false })
        
    }
})