chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url) && tab.active) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND STYLES.");

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./foreground.js"]
                })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
            })
            .catch(err => console.log(err));
    }
});

async function getCurrentTabUrl() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
  }

chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
    if (request.message === 'send_reminder') {
        const url =await getCurrentTabUrl();
            const response=await fetch('https://api.trello.com/1/cards?key=`APP-KEY`&token=`TOKEN`&&idList=`LISTID`&&name=Bill Gates&&due='+request.payload+'&&desc='+url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            })
            console.log(response);
        
        sendResponse({
            message: 'success',
        });
        return true;
    } 
});