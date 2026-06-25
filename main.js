// Кешируем элементы один раз, чтобы не искать их постоянно
const demo__button = document.querySelector(".creater-icon-photo");
const keeps_box = document.querySelector('.keeps-box');
const input = document.querySelector('.creater');
const keep__content = document.querySelector('#keepcontent');
const keep__head = document.querySelector('#keephead');
const pin = document.querySelector('.pin');

// Элементы формы создания для быстрой работы
const createrHead = document.querySelector('.creater-head');
const mainBlockButton = document.querySelector('.main-block-button');
const createrIconPhoto = document.querySelector('.creater-icon-photo');
const mainCreater = document.querySelector('.main-creater');
const mainBoxCreater = document.querySelector('.main-box-creater');
const createrInput = document.querySelector('.creater');
const photoSecond = document.querySelector('#photo-second');
const defaultContainer = document.querySelector('#default');
const pinedContainer = document.querySelector('#pined');
const arrLocal = JSON.parse(localStorage.getItem('history')) || [];

let shiftX = 0;
let shiftY = 0;
let draggedElement = null; 


const addPhantom = (element, height) => {
    const Phantom = document.createElement('div');
    Phantom.classList.add('phantom')
    Phantom.style.height = `${height}px`;
    element.insertAdjacentElement('afterend', Phantom);
}
// Делегирование удаления заметок
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const grandfather = event.target.closest('.keep'); 
        if (grandfather) grandfather.remove();
        const idToDelete = event.target.getAttribute('data-id'); 
        localStorage.removeItem(idToDelete);
        const allNotes = document.querySelectorAll('.keep');
        const idsArray = [];

        allNotes.forEach((noteElement) => {
        const noteId = noteElement.getAttribute('data-id');
        idsArray.push(noteId);
        });
        localStorage.removeItem('history')
        localStorage.setItem('history', JSON.stringify(idsArray))
    }
});

// Открытие формы (Фокус)
input.addEventListener('focus', () => {
    const elements = [createrHead, pin, mainBlockButton, createrIconPhoto, mainCreater, mainBoxCreater, createrInput];
    elements.forEach(el => el && el.classList.add('clicked'));
});

let pin_value = false;
// Клик по пину
pin.addEventListener('click', () => {
    pin_value = !pin_value;
    pin.classList.toggle('used');
});

// Закрытие формы и создание заметки
document.body.addEventListener('click', (event) => {
    const t = event.target;
    
    
    if (t === mainCreater || t === createrHead || t === pin || t === createrInput || 
        t === createrIconPhoto || t === mainBlockButton || t === mainBoxCreater || t === photoSecond) {
        return;
    }

    // Закрываем форму
    const elements = [createrHead, pin, mainBlockButton, createrIconPhoto, mainCreater, mainBoxCreater, createrInput];
    elements.forEach(el => el && el.classList.remove('clicked'));

    if (event.relatedTarget && event.relatedTarget.id === 'keepcontent') return;

    let keep__head__value = keep__head.value;
    let keep__content__value = keep__content.value;

    if (!keep__content__value.trim() && !keep__head__value.trim()) return;

    // Генерируем уникальный ID для новой заметки сразу
    const noteId = `note_${Date.now()}_${Math.round(Math.random() * 100000)}`;

    // Создание структуры новой заметки
    const buttondelete = document.createElement('div');
    buttondelete.classList.add('delete'); 
    buttondelete.setAttribute('data-tooltip', 'Удалить заметку');       
    buttondelete.setAttribute('data-id', noteId);
    
    const newKeep = document.createElement('div');
    newKeep.classList.add('keep');
    newKeep.setAttribute('data-id', noteId); // Добавляем id и на сам контейнер
    
    const keepBody = document.createElement('div');
    keepBody.classList.add('keep-content');
    keepBody.textContent = keep__content__value;
    
    const keepHeadEl = document.createElement('div');
    keepHeadEl.classList.add('keep-head');
    keepHeadEl.textContent = keep__head__value;

    newKeep.appendChild(buttondelete);
    newKeep.appendChild(keepHeadEl);
    newKeep.appendChild(keepBody);

    const noteData = {
        title: keep__head__value,
        content: keep__content__value,
        pin: pin_value
    };

    localStorage.setItem(noteId, JSON.stringify(noteData));

    // Добавление в нужный контейнер
    if (pin.classList.contains('used')) {
        if (pinedContainer) pinedContainer.insertAdjacentElement('afterbegin', newKeep);
        pin.classList.remove('used');
    } else {
        if (defaultContainer) defaultContainer.insertAdjacentElement('afterbegin', newKeep);
    }
    const allNotes = document.querySelectorAll('.keep');
    const idsArray = [];

    allNotes.forEach((noteElement) => {
    const noteId = noteElement.getAttribute('data-id');
    idsArray.push(noteId);
    });
    localStorage.removeItem('history')
    localStorage.setItem('history', JSON.stringify(idsArray))

    pin_value = false;
    keep__content.value = '';
    keep__head.value = '';
});

function moveElement(event) {
    if (!draggedElement) return;

    // Двигаем перетаскиваемый элемент за курсором
    draggedElement.style.top = `${event.clientY - shiftY}px`;
    draggedElement.style.left = `${event.clientX - shiftX}px`;

    // Находим DOM-элемент под курсором
    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
    if (!elementUnderCursor) return;

    // Ищем, является ли этот элемент заметкой .keep (или её внутренностью)
    const targetKeep = elementUnderCursor.closest('.keep');

    // Нам нужна чужая заметка, и это не должен быть сам фантом
    if (targetKeep && targetKeep !== draggedElement) {
        
        // Получаем размеры и координаты заметки, над которой парим
        const rect = targetKeep.getBoundingClientRect();
        
        // Вычисляем вертикальный центр этой заметки
        const targetCenterY = rect.top + rect.height / 2;

        // Находим наш фантом в DOM дереве
        const phantom = document.querySelector('.phantom');
        if (!phantom) return;

        // Сравниваем координату мыши Y с центром заметки
        if (event.clientY < targetCenterY) {
            // Если мышка выше центра — фантом прыгает ДО этой заметки
            targetKeep.insertAdjacentElement('beforebegin', phantom);
        } else {
            // Если мышка ниже центра — фантом прыгает ПОСЛЕ этой заметки
            targetKeep.insertAdjacentElement('afterend', phantom);
        }
    }
}


// Перетаскивание (Mousedown)
document.addEventListener('mousedown', (event) => {
    document.body.style.cursor = 'grabbing'
    const keepTarget = event.target.closest('.keep');
    let height = keepTarget ? keepTarget.offsetHeight : 0; 
    
    if (keepTarget && !event.target.classList.contains('delete')) {
        draggedElement = keepTarget; 
        
        // Получаем точные экранные координаты карточки прямо сейчас
        const rect = draggedElement.getBoundingClientRect();
        
        // Считаем сдвиг мыши относительно верхнего левого угла карточки
        shiftX = event.clientX - rect.left;
        shiftY = event.clientY - rect.top;

        // Создаем фантом НА МЕСТЕ карточки, пока она еще в потоке
        addPhantom(keepTarget, height);

        // Задаем фиксированные размеры и отключаем анимацию
        draggedElement.style.width = `${rect.width}px`; 
        draggedElement.style.height = `${rect.height}px`; // Фиксируем высоту
        draggedElement.style.transition = 'none';
        
        //. МГНОВЕННО позиционируем элемент в те же координаты, где он и стоял
        draggedElement.style.position = 'fixed'; 
        draggedElement.style.left = `${rect.left}px`;
        draggedElement.style.top = `${rect.top}px`;
        
        draggedElement.classList.add('shake');
        keepTarget.style.pointerEvents = 'none'
        window.addEventListener('mousemove', moveElement);
    }
});


document.addEventListener('mouseup', () => {
    document.body.style.cursor = 'auto'
    const allNotes = document.querySelectorAll('.keep');
    const idsArray = [];

    allNotes.forEach((noteElement) => {
    const noteId = noteElement.getAttribute('data-id');
    idsArray.push(noteId);
    });
    localStorage.removeItem('history')
    localStorage.setItem('history', JSON.stringify(idsArray))
    
    if (draggedElement) {
        window.removeEventListener('mousemove', moveElement);
        
        //  СНАЧАЛА находим фантом в DOM дереве
        const phantom = document.querySelector('.phantom');
        
        // Если фантом существует, заменяем его нашей карточкой
        if (phantom) {
            phantom.replaceWith(draggedElement);
        }
        
        // Сбрасываем стили и возвращаем карточку в обычный поток сетки
        draggedElement.classList.remove('shake');
        draggedElement.style.pointerEvents = 'auto'; // Возвращаем реакцию на мышь
        
        draggedElement.style.position = ''; 
        draggedElement.style.top = '';
        draggedElement.style.left = '';
        draggedElement.style.width = '';
        draggedElement.style.height = ''; // Возвращаем авто-высоту
        
        draggedElement.style.transition = 'all 0.1s ease'; 
        
        // Очищаем ссылку на перетаскиваемый элемент
        draggedElement = null; 
    }
});

// Рендеринг из LocalStorage
const renderingNote = () => {
    if (defaultContainer) defaultContainer.innerHTML = '';
    if (pinedContainer) pinedContainer.innerHTML = '';

    for (let i = 0; i < arrLocal.length; i++) {
        const key = arrLocal[i]

        const ArrayData = JSON.parse(localStorage.getItem(`${key}`))
        
        if (!key.startsWith('note_')) continue; 
        if (!ArrayData) continue;

        // Выбираем контейнер на основе флага pin
        const currentContainer = ArrayData.pin ? pinedContainer : defaultContainer;
        if (!currentContainer) continue;

        const buttondelete = document.createElement('div');
        buttondelete.classList.add('delete'); 
        buttondelete.setAttribute('data-tooltip', 'Удалить заметку'); 
        buttondelete.setAttribute('data-id', key);  

        const newKeep = document.createElement('div');
        newKeep.classList.add('keep');
        newKeep.setAttribute('data-id', key);

        const keepBody = document.createElement('div');
        keepBody.classList.add('keep-content');
        keepBody.textContent = ArrayData.content;

        const keepHeadEl = document.createElement('div');
        keepHeadEl.classList.add('keep-head');
        keepHeadEl.textContent = ArrayData.title;

        newKeep.appendChild(buttondelete);
        newKeep.appendChild(keepHeadEl);
        newKeep.appendChild(keepBody);
        
        currentContainer.appendChild(newKeep);
        newKeep.addEventListener('click', () => {

            
            const noteId = newKeep.getAttribute('data-id');
    
            openModal(noteId);
});
    }
};

renderingNote();
