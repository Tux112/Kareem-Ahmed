const translations = {
    en: {
        name: 'Dr.Kareem Ahmed',
        job: 'Handicrafts Instructor',

        'problem-debug': 'Write your problem here then click Send',
        'body-placeholder': 'Describe your problem...',
        'bt-email': 'Send Email',

        'bt-debug': 'Debug',
        'bt-about': 'About',
        'bt-products': 'Products',

        'prodct-name': 'Crystal Tasbeeh',
        'product-des': 'Price: 40 EGP',

        'prodct-name1': 'Turquoise Bracelet',
        'product-des1': 'Price: 50 EGP',

        'prodct-name2': 'Turquoise Keychain',
        'product-des2': 'Price: 50 EGP',

        'bt-buy1': 'Buy',
        'bt-buy2': 'Buy',
        'bt-buy3': 'Buy'
    },

    ar: {
        name: 'د.كريم أحمد',
        job: 'مدرب حرف يدوية',

        'problem-debug': 'أكتب مشكلتك هنا ثم أضغط على إرسال',
        'body-placeholder': 'أكتب مشكلتك هنا...',
        'bt-email': 'إرسال',

        'bt-debug': 'تصحيح',
        'bt-about': 'من نحن',
        'bt-products': 'المنتجات',

        'prodct-name': 'سبحة كريستال',
        'product-des': 'السعر: 40 ج.م',

        'prodct-name1': 'غويشة فيروز',
        'product-des1': 'السعر: 50 ج.م',

        'prodct-name2': 'ميدالية فيروز',
        'product-des2': 'السعر: 50 ج.م',

        'bt-buy1': 'شراء',
        'bt-buy2': 'شراء',
        'bt-buy3': 'شراء'
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

        if (document.getElementById('body')) {
            document.getElementById('body').placeholder = translation['body-placeholder'];
        }

        if (document.getElementById('bt-email')) {
            document.getElementById('bt-email').textContent = translation['bt-email'];
        }

        if (document.getElementById('bt-debug')) {
            document.getElementById('bt-debug').textContent = translation['bt-debug'];
        }

        if (document.getElementById('bt-about')) {
            document.getElementById('bt-about').textContent = translation['bt-about'];
        }

        if (document.getElementById('bt-products')) {
            document.getElementById('bt-products').textContent = translation['bt-products'];
        }

        if (document.getElementById('prodct-name')) {
            document.getElementById('prodct-name').textContent = translation['prodct-name'];
        }

        if (document.getElementById('product-des')) {
            document.getElementById('product-des').textContent = translation['product-des'];
        }

        if (document.getElementById('prodct-name1')) {
            document.getElementById('prodct-name1').textContent = translation['prodct-name1'];
        }

        if (document.getElementById('product-des1')) {
            document.getElementById('product-des1').textContent = translation['product-des1'];
        }

        if (document.getElementById('prodct-name2')) {
            document.getElementById('prodct-name2').textContent = translation['prodct-name2'];
        }

        if (document.getElementById('product-des2')) {
            document.getElementById('product-des2').textContent = translation['product-des2'];
        }

        if (document.getElementById('bt-buy1')) {
            document.getElementById('bt-buy1').textContent = translation['bt-buy1'];
        }

        if (document.getElementById('bt-buy2')) {
            document.getElementById('bt-buy2').textContent = translation['bt-buy2'];
        }

        if (document.getElementById('bt-buy3')) {
            document.getElementById('bt-buy3').textContent = translation['bt-buy3'];
        }
    });
});

function sendEmail() {
    const body = document.getElementById('body').value;

    if (!body) {
        alert('Please enter a message');
        return;
    }

    fetch("https://telegram-worker.dronlymohamed112.workers.dev", {
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


window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-language="ar"]').click();
});
