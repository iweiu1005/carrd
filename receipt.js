document.addEventListener("DOMContentLoaded", function () {
                const today = new Date();
                const formattedDate = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");

                const dateElement = document.querySelector(".Datep");
                if (dateElement) {
                    dateElement.innerHTML = `Date: ${formattedDate}`;
                }
            });
