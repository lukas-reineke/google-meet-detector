browser.storage.local.get('webhookUrl').then((result) => {
    if (result.webhookUrl) {
        document.getElementById('webhookUrl').value = result.webhookUrl;
    }
});

document.getElementById('save').addEventListener('click', () => {
    const url = document.getElementById('webhookUrl').value;
    browser.storage.local.set({ webhookUrl: url }).then(() => {
        alert('Webhook URL saved!');
    });
});
