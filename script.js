const translations = {
    en: {
        name: 'Kareem Ahmed',
        job: 'Handicrafts Instructor',
        'problem-debug': 'write your problem here then click send'
    },
    ar: {
        name: 'كريم أحمد',
        job: 'مدرب حرف يدوية',
        'problem-debug': 'أكتب مشكلتك هنا ثم أضغط على أرسال'
    }
};

document.querySelectorAll('.flag-button').forEach(button => {
    button.addEventListener('click', function () {
        const selectedLanguage = button.getAttribute('data-language');
        const translation = translations[selectedLanguage];

        if (document.getElementById('name')) {
            document.getElementById('name').textContent = translation.name;
        }
        if (document.getElementById('job')) {
            document.getElementById('job').textContent = translation.job;
        }
        if (document.getElementById('problem-debug')) {
            document.getElementById('problem-debug').textContent = translation['problem-debug'];
        }
    });
});







function sendEmail() {
    const body = document.getElementById('body').value;

    if (!body) {
        alert('Please enter a message');
        return;
    }

    fetch("https://telegram-worker.dronlymohamed112.workers.dev/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: body })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message sent!');
            document.getElementById('body').value = '';
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message');
    });
}
