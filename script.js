const translations = {
    en: {
        name: 'Dr.Kareem Ahmed',
        job: 'Handicrafts Instructor',
        'hero-products': 'Products',
        'hero-about': 'About',
        'media-label': 'Kareem Ahmed',
        'media-subtitle': 'Handicrafts',
        'problem-debug': 'Write your problem here then click Send',
        'body-placeholder': 'Describe your problem...',
        'bt-email': 'Send Email',
        'bt-debug': 'Debug',
        'bt-about': 'About',
        'bt-products': 'Products',
        'buy-title': 'Place Order',
        'phone-label': 'Phone number',
        'name-label': 'Name',
        'buy-submit': 'Send Order',
        'buy-cancel': 'Cancel',
        'products-eyebrow': 'COLLECTION',
        'products-title': 'Products',
        'products-intro': 'Browse the available handcrafted pieces.',
        'product1-name': 'Crystal Misbaha',
        'product1-price': 'Price: 40 EGP',
        'product2-name': 'Turquoise Bracelet',
        'product2-price': 'Price: 50 EGP',
        'product3-name': 'Turquoise Pendant',
        'product3-price': 'Price: 50 EGP'
    },

    ar: {
        name: 'د.كريم أحمد',
        job: 'مدرب حرف يدوية',
        'hero-products': 'المنتجات',
        'hero-about': 'من نحن',
        'media-label': 'كريم أحمد',
        'media-subtitle': 'حرف يدوية',
        'problem-debug': 'اكتب مشكلتك ثم اضغط إرسال',
        'body-placeholder': 'صف مشكلتك...',
        'bt-email': 'إرسال',
        'bt-debug': 'تصحيح',
        'bt-about': 'من نحن',
        'bt-products': 'المنتجات',
        'buy-title': 'طلب شراء',
        'phone-label': 'رقم الهاتف',
        'name-label': 'الاسم',
        'buy-submit': 'إرسال الطلب',
        'buy-cancel': 'إلغاء',
        'products-eyebrow': 'المجموعة',
        'products-title': 'المنتجات',
        'products-intro': 'تصفح المنتجات المصنوعة يدوياً المتاحة.',
        'product1-name': 'سبحة كريستال',
        'product1-price': 'السعر: 40 ج.م',
        'product2-name': 'غويشة فيروز',
        'product2-price': 'السعر: 50 ج.م',
        'product3-name': 'ميدالية فيروز',
        'product3-price': 'السعر: 50 ج.م'
    }
};


function getStoredSettings() {
    let theme = localStorage.getItem('theme');
    let language = localStorage.getItem('language');

    const params = new URLSearchParams(window.location.search);

    const urlTheme = params.get('theme');
    const urlLanguage = params.get('language');

    if (urlTheme === 'dark' || urlTheme === 'light') {
        theme = urlTheme;
        localStorage.setItem('theme', theme);
    }

    if (urlLanguage === 'en' || urlLanguage === 'ar') {
        language = urlLanguage;
        localStorage.setItem('language', language);
    }

    if (theme !== 'dark' && theme !== 'light') {
        theme = 'dark';
    }

    if (language !== 'en' && language !== 'ar') {
        language = navigator.language.toLowerCase().startsWith('ar')
            ? 'ar'
            : 'en';
    }

    return {
        theme: theme,
        language: language
    };
}


let settings = getStoredSettings();

let currentLanguage = settings.language;


function applyTranslation(language) {
    if (language !== 'en' && language !== 'ar') {
        language = 'en';
    }

    currentLanguage = language;

    localStorage.setItem('language', language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    const texts = translations[language];

    Object.keys(texts).forEach(function (id) {
        const element = document.getElementById(id);

        if (!element) return;

        if (
            element.tagName === 'INPUT' ||
            element.tagName === 'TEXTAREA'
        ) {
            element.placeholder = texts[id];
        } else {
            element.textContent = texts[id];
        }
    });

    document.querySelectorAll(
        '.language-button, .flag-button'
    ).forEach(function (button) {
        button.classList.toggle(
            'active',
            button.dataset.language === language
        );
    });

    updateProductTranslations();
}


function updateProductTranslations() {
    const product1 = document.getElementById('prodct-name');
    const product2 = document.getElementById('prodct-name1');
    const product3 = document.getElementById('prodct-name2');

    const price1 = document.getElementById('product-des');
    const price2 = document.getElementById('product-des1');
    const price3 = document.getElementById('product-des2');

    if (product1) {
        product1.textContent =
            translations[currentLanguage]['product1-name'];
    }

    if (product2) {
        product2.textContent =
            translations[currentLanguage]['product2-name'];
    }

    if (product3) {
        product3.textContent =
            translations[currentLanguage]['product3-name'];
    }

    if (price1) {
        price1.textContent =
            translations[currentLanguage]['product1-price'];
    }

    if (price2) {
        price2.textContent =
            translations[currentLanguage]['product2-price'];
    }

    if (price3) {
        price3.textContent =
            translations[currentLanguage]['product3-price'];
    }

    document.querySelectorAll('.cl-buy').forEach(function (button) {
        button.textContent =
            currentLanguage === 'ar' ? 'شراء' : 'Buy';
    });
}


function getText(key) {
    return translations[currentLanguage][key] || key;
}


function applyTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') {
        theme = 'dark';
    }

    document.documentElement.setAttribute(
        'data-theme',
        theme
    );

    localStorage.setItem('theme', theme);

    const themeButton =
        document.getElementById('theme-toggle');

    if (themeButton) {
        themeButton.setAttribute(
            'aria-label',
            theme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
        );

        themeButton.setAttribute(
            'title',
            theme === 'dark'
                ? 'Light mode'
                : 'Dark mode'
        );

        themeButton.setAttribute(
            'aria-pressed',
            theme === 'dark' ? 'true' : 'false'
        );
    }
}


function initializeTheme() {
    const savedTheme =
        localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
        applyTheme(savedTheme);
        return;
    }

    applyTheme('dark');
}


function navigateWithSettings(url) {
    const theme =
        document.documentElement.getAttribute('data-theme') ||
        localStorage.getItem('theme') ||
        'dark';

    const language =
        currentLanguage ||
        localStorage.getItem('language') ||
        'en';

    const separator =
        url.includes('?') ? '&' : '?';

    window.location.href =
        url +
        separator +
        'theme=' + encodeURIComponent(theme) +
        '&language=' + encodeURIComponent(language);
}


function setupNavigation() {
    document.querySelectorAll(
        'a[href$=".html"], button[onclick*=".html"]'
    ).forEach(function (element) {

        element.addEventListener(
            'click',
            function (event) {

                let url = null;

                if (element.tagName === 'A') {
                    url = element.getAttribute('href');
                } else {
                    const onclick =
                        element.getAttribute('onclick');

                    const match =
                        onclick &&
                        onclick.match(
                            /['"]([^'"]+\.html)['"]/
                        );

                    if (match) {
                        url = match[1];
                    }
                }

                if (!url) return;

                event.preventDefault();
                event.stopImmediatePropagation();

                navigateWithSettings(url);

            },
            true
        );
    });
}


document.addEventListener('DOMContentLoaded', function () {

    initializeTheme();

    applyTranslation(currentLanguage);

    setupNavigation();


    document.querySelectorAll(
        '.language-button, .flag-button'
    ).forEach(function (button) {

        button.addEventListener('click', function () {
            applyTranslation(
                button.dataset.language
            );
        });

    });


    const themeButton =
        document.getElementById('theme-toggle');

    if (themeButton) {

        themeButton.addEventListener('click', function () {

            const currentTheme =
                document.documentElement.getAttribute(
                    'data-theme'
                );

            applyTheme(
                currentTheme === 'dark'
                    ? 'light'
                    : 'dark'
            );

        });

    }


    document.querySelectorAll('.cl-buy').forEach(function (button) {

        button.addEventListener('click', function (event) {

            event.preventDefault();

            openBuyModal(button.id);

        });

    });

});


function openBuyModal(buttonId) {

    const oldModal =
        document.querySelector('.buy-modal-overlay');

    if (oldModal) {
        oldModal.remove();
    }


    let productName = '';


    if (buttonId === 'bt-buy1') {

        const element =
            document.getElementById('prodct-name');

        if (element) {
            productName = element.textContent.trim();
        }

    }


    if (buttonId === 'bt-buy2') {

        const element =
            document.getElementById('prodct-name1');

        if (element) {
            productName = element.textContent.trim();
        }

    }


    if (buttonId === 'bt-buy3') {

        const element =
            document.getElementById('prodct-name2');

        if (element) {
            productName = element.textContent.trim();
        }

    }


    const overlay =
        document.createElement('div');

    overlay.className =
        'buy-modal-overlay';


    overlay.innerHTML = `
        <div class="buy-modal">

            <div class="buy-modal-header">
                <h2>${getText('buy-title')}</h2>
                <div class="buy-modal-product">
                    ${productName}
                </div>
            </div>

            <div class="buy-modal-body">

                <div class="buy-modal-field">
                    <label for="buy-name">
                        ${getText('name-label')}
                    </label>

                    <input
                        id="buy-name"
                        type="text"
                        autocomplete="name"
                    >
                </div>

                <div class="buy-modal-field">
                    <label for="buy-phone">
                        ${getText('phone-label')}
                    </label>

                    <input
                        id="buy-phone"
                        type="tel"
                        autocomplete="tel"
                    >
                </div>

            </div>

            <div class="buy-modal-footer">

                <button
                    type="button"
                    class="buy-modal-cancel"
                >
                    ${getText('buy-cancel')}
                </button>

                <button
                    type="button"
                    class="buy-modal-submit"
                >
                    ${getText('buy-submit')}
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(overlay);


    const nameInput =
        overlay.querySelector('#buy-name');

    const phoneInput =
        overlay.querySelector('#buy-phone');

    const cancelButton =
        overlay.querySelector('.buy-modal-cancel');

    const submitButton =
        overlay.querySelector('.buy-modal-submit');


    nameInput.focus();


    cancelButton.addEventListener(
        'click',
        function () {
            overlay.remove();
        }
    );


    overlay.addEventListener(
        'click',
        function (event) {

            if (event.target === overlay) {
                overlay.remove();
            }

        }
    );


    submitButton.addEventListener(
        'click',
        function () {

            const name =
                nameInput.value.trim();

            const phone =
                phoneInput.value.trim();


            if (!name) {
                nameInput.focus();
                return;
            }


            if (!phone) {
                phoneInput.focus();
                return;
            }


            const orderMessage =
                'Product: ' + productName + '\n' +
                'Phone: ' + phone + '\n' +
                'Name: ' + name;


            sendEmail(orderMessage);

            overlay.remove();

        }
    );


    nameInput.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {
                phoneInput.focus();
            }

        }
    );


    phoneInput.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {
                submitButton.click();
            }

        }
    );
}


function sendEmail(body) {

    fetch(
        'https://telegram-worker.dronlymohamed112.workers.dev/',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                message: body
            })
        }
    )
    .then(function (response) {

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response.text();

    })
    .catch(function (error) {

        console.error(error);

    });
}
