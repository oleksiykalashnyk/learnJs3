window.addEventListener("DOMContentLoaded", () => {

    //First part practice TABS

    const
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //Part 2 practice TIMER

    const deadLine = "2022-10-14 00:01:01 GMT+0200";
    // const deadLine = "Oct 14, 2020 00:00:01 GMT+0200";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 500);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }

    setClock(".timer", deadLine);


    //Part 3 practice MODAL

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }

    function openModal() {
        //open modal
        modal.classList.add("show");
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        //if use this function clear timer
        clearInterval(modalTimerId);
        //if use this function remove event for scroll
        window.removeEventListener("scroll", showModalByScroll);
    }
    //3.1 Only one button
    const
        modalTrigger = document.querySelector("[data-modal]"),
        modal = document.querySelector(".modal");

    // modalTrigger.addEventListener("click", e => {
    //     modal.classList.toggle("show");
    //     document.body.style.overflow = "hidden";
    // });

    // modalCloseBtn.addEventListener("click", e => {
    //     modal.classList.toggle("show");
    //     document.body.style.overflow = "";
    // });

    //3.2 All buttons
    const modalTriggerAll = document.querySelectorAll("[data-modal]");

    modalTriggerAll.forEach(btn => {
        btn.addEventListener("click", openModal);
    });



    //3.3 Close modal if outside click 

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    //Close modal if use "ESCAPE"
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    //3.4 SetTimeOut show modal aafter 15 sec
    const modalTimerId = setTimeout(openModal, 15000);

    //3.5 window
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);





    //Part 4 practice USE CLASSes

    class MenuCard {
        constructor(src, alt, title, descr, prise, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.prise = prise;

            this.perent = document.querySelector(parentSelector);

            this.transfer = 27;
            this.changeToUAH();

            this.classes = classes;
        }

        changeToUAH() {
            this.prise = this.prise * this.transfer;
        }

        render() {
            const element = document.createElement("DIV");

            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.prise}</span> грн/день</div>
                </div>
            `;

            this.perent.append(element);
        }
    }

    //old used type (NEED USE!)
    // const div = new MenuCard();
    // div.render();


    //clear HTML
    document.querySelector(".menu .container").innerHTML = "";

    //fast but bad use type
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container"

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, равильное        количество белков за счет тофу и импортных вегетарианских стейков. ',
        21,
        ".menu .container"

    ).render();






    //Part 5 practice used POST and GET for server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "icons/spinner.svg",
        success: "Reary welcome",
        fail: "Wow!!! Error!!!"
    };

    forms.forEach(item => {
        postData(item);
    });

    //first type send data FORM-DATA
    function postData(form) {
        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;

            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                padding-top: 20px;
            `;

            // form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);


            //create new exempel class FormData
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            //old style REQUEST for server

            //     const request = new XMLHttpRequest();
            //     request.open("POST", "server.php");

            // const json = JSON.stringify(object);

            //     request.send(json);

            //     request.addEventListener("load", () => {
            //         if (request.status === 200) {

            //             console.log(request.response);

            //             showThanksModal(message.success);

            //             form.reset();

            //             statusMessage.remove();

            //         } else {
            //             showThanksModal(message.fail);
            //         }
            //     });

            // });

            //FETCH METHOD
            fetch("server.php", {
                method: "POST",
                headers: {
                    "Conten-type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.fail);
            })
            .finally(() => {
                form.reset();
            });
        });
    }




    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("DIV");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }


    //Use JSON DB
    fetch("http://localhost:3000/menu")
    .then(data => data.json())
    .then(json => console.log(json));
});