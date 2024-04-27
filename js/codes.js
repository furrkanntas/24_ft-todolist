let listDom = document.querySelector('#list');
let text = document.getElementById('task');

checkfunction();
addDeleteEl();

function checkfunction() {
    let listDomLi = listDom.querySelectorAll('li');

    if (listDomLi.length > 0) {
        listDomLi.forEach(function (li) {
            li.addEventListener('click', toggleChecked); // Göreve tıklanınca çizili hale gelmesi
        });
    }
}

function addDeleteEl() {
    let listDomLi = listDom.querySelectorAll('li');

    if (listDomLi.length > 0) {
        listDomLi.forEach(function (li) {
            let existingSpans = li.querySelectorAll('span');
            existingSpans.forEach(function (span) {
                span.remove();
            });
            let deleteEl = document.createElement('span');
            deleteEl.innerHTML = 'x';
            deleteEl.classList.add('removeEl');
            li.appendChild(deleteEl);
        });
    }
}

function newElement() {
    let inputVal = text.value.trim();

    if (inputVal === "") {
        $('.error').toast('show');
    } else {
        $('.success').toast('show');
        let liId = 'task_' + Date.now(); // Benzersiz ID oluştur
        let liDom = document.createElement('li');
        liDom.id = liId;
        liDom.innerHTML = inputVal;
        listDom.appendChild(liDom);
        text.value = "";

        // Yeni görevi local storage'a ekle
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push({ id: liId, text: inputVal, checked: false }); // checked durumu ekleniyor
        localStorage.setItem('items', JSON.stringify(items));

        // Göreve tıklama ve silme işlevlerini ekle
        liDom.addEventListener('click', toggleChecked);
        addDeleteEl();
        removeFunc();
    }
}

window.onload = function () {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(function (item) {
        let liDom = document.createElement('li');
        liDom.id = item.id;
        liDom.innerHTML = item.text;
        if (item.checked) { // Eğer görev önceden işaretlenmişse çizili hale getir
            liDom.classList.add('checked');
        }
        listDom.appendChild(liDom);
        liDom.addEventListener('click', toggleChecked);
        addDeleteEl();
        removeFunc();
    });
}

function toggleChecked() {
    this.classList.toggle('checked'); // Çizili hale getirme
    let itemId = this.id;

    // Görevin local storage'daki checked durumunu güncelleme
    let items = JSON.parse(localStorage.getItem('items')) || [];
    let updatedItems = items.map(item => {
        if (item.id === itemId) {
            item.checked = !item.checked; // Durumu tersine çevir
        }
        return item;
    });
    localStorage.setItem('items', JSON.stringify(updatedItems));
}

function removeFunc() {
    let removeEls = listDom.querySelectorAll('.removeEl');

    removeEls.forEach(function (el) {
        el.addEventListener('click', function (e) {
            let parentEl = e.target.parentNode;
            let itemId = parentEl.id;

            // Görevi DOM'dan kaldır
            parentEl.remove();

            // Görevi local storage'dan kaldır
            let items = JSON.parse(localStorage.getItem('items')) || [];
            let updatedItems = items.filter(item => item.id !== itemId);
            localStorage.setItem('items', JSON.stringify(updatedItems));
        });
    });
}

var today = new Date();
var dateElement = document.getElementById("date");
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = today.toLocaleDateString("tr-TR", options);

// Saat bilgisini al ve sayfaya ekle
function updateClock() {
    var now = new Date();
    var clockElement = document.getElementById("clock");
    var timeString = now.toLocaleTimeString("tr-TR");
    clockElement.textContent = timeString;
}
setInterval(updateClock, 1000); // Her saniye güncelle