document.addEventListener("DOMContentLoaded", function () {
    // تاریخ رو آپدیت کن
    const today = new Date();
    const formattedDate = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");
    const dateElement = document.querySelector(".Datep");
    if (dateElement) {
        dateElement.innerHTML = `Date: ${formattedDate}`;
    }

    // فقط یک بار تو جلسه پخش بشه
    if (sessionStorage.getItem('receiptSoundPlayed')) return;

    const audio = new Audio('https://uploadkon.ir/uploads/82a606_25receipt-printer-sound.mp3');
    audio.volume = 0.5;

    // تابع پخش
    const playSound = () => {
        audio.play().then(() => {
            sessionStorage.setItem('receiptSoundPlayed', 'true');
            console.log("✅ صدا با موفقیت پخش شد!");
        }).catch(err => {
            console.log("هنوز بلاکه، تلاش مجدد...", err);
        });
    };

    // ۱. اول مستقیم امتحان کن
    playSound();

    // ۲. اگه بعد ۰.۵ ثانیه هنوز پخش نشده، دکمه نامرئی بساز و خودکار کلیک کن
    setTimeout(() => {
        if (audio.paused) {
            const fakeBtn = document.createElement('button');
            fakeBtn.style.position = 'absolute';
            fakeBtn.style.opacity = '0';
            fakeBtn.style.width = '1px';
            fakeBtn.style.height = '1px';
            fakeBtn.style.left = '-100px';
            fakeBtn.style.pointerEvents = 'none'; // کاربر نتونه روش کلیک کنه
            document.body.appendChild(fakeBtn);

            // خودکار کلیک کن (این تعامل مصنوعی رو مرورگر قبول می‌کنه!)
            fakeBtn.onclick = () => {
                playSound();
                fakeBtn.remove();
            };

            // شبیه‌سازی کلیک واقعی
            fakeBtn.click();
            
            // اگه click() کار نکرد، dispatchEvent هم بزن
            const clickEvent = new Event('click', { bubbles: true });
            fakeBtn.dispatchEvent(clickEvent);

            // یه تلاش دیگه با تاخیر
            setTimeout(playSound, 200);
        }
    }, 500);
});
