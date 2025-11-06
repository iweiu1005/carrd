document.addEventListener("DOMContentLoaded", function () {
    // تاریخ رو آپدیت کن (قسمت اصلی تو)
    const today = new Date();
    const formattedDate = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");
    const dateElement = document.querySelector(".Datep");
    if (dateElement) {
        dateElement.innerHTML = `Date: ${formattedDate}`;
    }

    // پخش صدا فقط یک بار (با sessionStorage)
    if (!sessionStorage.getItem('receiptSoundPlayed')) {
        const audio = new Audio('https://uploadkon.ir/uploads/82a606_25receipt-printer-sound.mp3');
        audio.currentTime = 0;
        
        audio.play().catch(e => {
            console.log("خطا در پخش صدا (ممکنه مرورگر بلاک کرده باشه):", e);
            // اگه مرورگر به خاطر Autoplay Policy بلاک کرد، یه دکمه مخفی می‌زنیم که کاربر یه بار کلیک کنه
            const unblockBtn = document.createElement('button');
            unblockBtn.style.position = 'fixed';
            unblockBtn.style.opacity = '0';
            unblockBtn.style.pointerEvents = 'none';
            unblockBtn.innerText = 'Unblock Sound';
            document.body.appendChild(unblockBtn);
            unblockBtn.click();
            setTimeout(() => audio.play(), 100);
        });

        // علامت بزن که صدا پخش شده (تا رفرش بعدی دیگه پخش نشه)
        sessionStorage.setItem('receiptSoundPlayed', 'true');
    }
});
