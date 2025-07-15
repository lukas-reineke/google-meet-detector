let previous_state = false;

function checkMeet(tabId) {
    browser.storage.local.get('webhookUrl').then((result) => {
        if (!result.webhookUrl) {
            console.warn('Webhook URL not set.');
            return;
        }

        browser.tabs.query({}, (tabs) => {
            const inMeeting = tabs.some(
                (tab) =>
                    tab.id !== tabId &&
                    tab.url.startsWith('https://meet.google.com/'),
            );

            if (inMeeting === previous_state) {
                return;
            }
            const hook = inMeeting ? 'join_meeting' : 'leave_meeting';
            fetch(`${result.webhookUrl}${hook}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ in_meeting: inMeeting }),
            }).catch(console.error);
            previous_state = inMeeting;
        });
    });
}

browser.tabs.onCreated.addListener(() => checkMeet());
browser.tabs.onUpdated.addListener(() => checkMeet());
browser.tabs.onRemoved.addListener((tabId) => checkMeet(tabId));
checkMeet();
