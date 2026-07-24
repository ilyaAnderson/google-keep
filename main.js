// 1. Кешируем элементы один раз, чтобы не искать их постоянно
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
const buttonColorCastom = document.querySelector('.button-color-castom')
const buttonExit = document.querySelector('.button-exit')
const tumbler = document.querySelector('.tumbler')
const searchBox = document.querySelector('.search-box')
const search = document.querySelector('.search')
const ButtonSearch = document.querySelector('.search-icon')
const computedStyles = window.getComputedStyle(document.documentElement);
const slideOne = document.querySelector('.slide-one')
const slideTwo = document.querySelector('.slide-two')
const buttonClear = document.querySelector('.clear-icon')
const tabs = document.querySelectorAll('.tab')
const buttonSubmitClear = document.querySelector('#submit-castom-clear')
const saves = document.querySelectorAll('.saveCastom')
const clearsaves = document.querySelectorAll('.ClearsaveCastom')
let isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
setInterval(() => {
    isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
}, 3000)
console.log(isSmallScreen);
let typeCastom = undefined
let ArrayCastom = new Object
let important = undefined
const setRender = []
let tumbler_value = false
console.log(localStorage);
console.log(arrLocal);
console.log(window.location);

let shiftX = 0;
let shiftY = 0;
let draggedElement = null; 

const SearchParse = () => {
    if ( window.location.search == '' ) return
    const string = decodeURIComponent(window.location.search.replaceAll('?', '').replaceAll('&', ' ').trim().toLowerCase())
    important = undefined
    if(string) {
        Object.keys(localStorage).forEach(key => {
        if ( key == 'history' ) return;
        if ( key == 'ArrayCastom' ) return;
        const value = JSON.parse(localStorage.getItem(key))
        if ( value.title.toLowerCase().includes(string) ) {
            setRender.push(key)
            important = true
        }
        });
    }
}

SearchParse()

const renderCastom = () => {
    if (localStorage.getItem('ArrayCastom') !== "[object Object]") {
    const ArrayColor = JSON.parse(localStorage.getItem('ArrayCastom'))
    if(ArrayColor) {
    const keys = Object.keys(ArrayColor)
    console.log(keys);
    console.log(ArrayColor);
    keys.forEach(key => {
        console.log(key, ArrayColor[key]);
        document.documentElement.style.setProperty(`${key}`, ArrayColor[key])
    })
}}
}
renderCastom()

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if ( tab.id == "keep-tab" ) {
            typeCastom = "keep"
            render()
        } else if ( tab.id == "search-tab" ) {
            typeCastom = "search"
            render()
        } else if ( tab.id == "creater-tab" ) {
            typeCastom = "creater"
            render()
        }
    })
})

saves.forEach(save => {
    save.addEventListener('click', () => {
    localStorage.setItem('ArrayCastom', JSON.stringify(ArrayCastom))
    console.log(localStorage.getItem('ArrayCastom'));
    console.log(ArrayCastom);
})})
clearsaves.forEach(clearsave => {
    clearsave.addEventListener("click", () => {
    event.preventDefault()
    localStorage.removeItem('ArrayCastom')
    window.location.reload()
})})    

search.addEventListener('input', () => {
    if(search.value !== '') {
    buttonClear.style.display = 'block'
    buttonClear.addEventListener('click', () => {
    search.value = ''
    buttonClear.style.display = 'none'
    })
    }
    else {
    buttonClear.style.display = 'none'
    }
});

ButtonSearch.addEventListener('click', () => {
    if (isSmallScreen && searchBox.classList.contains('clicked') == false ) {
        searchBox.classList.add('clicked')
        return console.log("add");
    }    
    let Arraay = search.value.replaceAll(' ', '&')
    console.log(window.location);
    slideTwo.style.transform = 'translateY(-100vh'
    slideOne.style.transform = 'translateY(-100vh'
    setTimeout(() => {
        window.location.search = Arraay
        SearchParse()
    }, 500)
})

const thumbs = document.querySelectorAll('.feature-range')

thumbs.forEach(thumb => {
    thumb.addEventListener('input', () => {
    thumb.style.setProperty('--thumb-rotate', `${thumb.value * 3}deg`);
})
})

const preloader = () => {
    slideOne.style.display = 'none'
    const block = document.createElement('div')
    block.classList.add('preloader-block')
    document.body.appendChild(block)
    const keeps = document.querySelectorAll('.keep')
    setTimeout(() => {
    const block = document.createElement('div')
    block.classList.add('preloader-block')
    block.style.transform = 'translateY(100vh) translateX(30vh)'
    block.style.width = '40vw'
    block.style.animation = 'woooouh2 1s ease forwards'
    document.body.appendChild(block)
    }, 300)
    setTimeout(() => {
    const block = document.createElement('div')
    block.classList.add('preloader-block')
    block.style.transform = 'translateY(100vh) translateX(70vw)'
    block.style.animation = 'woooouh3 1s ease forwards'
    document.body.appendChild(block)
    buttonColorCastom.classList.add('app')
    }, 450)
    setTimeout(() => {
        slideOne.style.display = 'inline'
    }, 800)
    setTimeout(() => {
        buttonColorCastom.classList.remove('app')
        buttonColorCastom.style.opacity = '1'
        buttonColorCastom.style.transform = 'translateY(0px)'
        buttonExit.style.opacity = '1'
        buttonExit.style.transform = 'translateY(0px)'
    }, 3000)
}

preloader()

const addPhantom = (element, height) => {
    const Phantom = document.createElement('div');
    Phantom.classList.add('phantom')
    Phantom.style.height = `${height}px`;
    element.insertAdjacentElement('afterend', Phantom);
}

// Делегирование удаления заметок
document.addEventListener('click', (event) => {
    console.log(event);
    if (event.target.classList.contains('delete')) {
        const grandfather = event.target.closest('.keep'); 
        const box = grandfather.querySelector('.buttonbox') 
        const shutdown_back = document.querySelector('.shutdown-back')
        if (grandfather) grandfather.remove();
        const idToDelete = event.target.getAttribute('data-id'); 
        localStorage.removeItem(idToDelete);
        if ( !important == true ) {
        const allNotes = document.querySelectorAll('.keep');
        const idsArray = [];

        allNotes.forEach((noteElement) => {
        const noteId = noteElement.getAttribute('data-id');
        idsArray.push(noteId);
        });
        localStorage.removeItem('history')
        localStorage.setItem('history', JSON.stringify(idsArray))
        }
        if ( document.body.contains( document.querySelector('.shutdown-back') ) ) {
            grandfather.classList.remove('fullscreen')
            document.body.removeChild(shutdown_back)
        }
    }  else if ( event.target.classList.contains('tab-burger-arrow')) {
        const t = event.target
        console.log(t.getAttribute('data-arrow'));
        console.log(t.classList.contains('left'));
        console.log(typeCastom);
        if ( typeCastom == 'keep' ) {
            if (t.classList.contains('left')) {
                console.log("left");
                typeCastom = "creater"
                const item = document.querySelector(`.tab-burger-item[data-arrow="${typeCastom}"`)
                item.textContent = "Создатель"
                return render()
            }
            typeCastom = "search"
            const item = document.querySelector(`.tab-burger-item[data-arrow="${typeCastom}"`)
            item.textContent = "Поиск"
            return render()
        } else if ( typeCastom == 'search' ) {
            if (t.classList.contains('left')) {
                console.log("left");
                typeCastom = "keep"
                const item = document.querySelector(`.tab-burger-item[data-arrow="${typeCastom}"`)
                item.textContent = "Заметка"
                return render()
            }
            typeCastom = "creater"
                const item = document.querySelector(`.tab-burger-item[data-arrow="${typeCastom}"`)
                item.textContent = "Создатель"
            return render()
        } else if ( typeCastom == 'creater' ) {
            if (t.classList.contains('left')) {
                console.log("left");
                typeCastom = "search"
                const item = document.querySelector(`.tab-burger-item[data-arrow="${typeCastom}"`)
                item.textContent = "Поиск"
                return render()
            }
            typeCastom = "keep"
                const item = document.querySelector(`.tab-burger-item[data-arrow="${typeCastom}"`)
                item.textContent = "Заметка"
            return render()
        }
    } else if ( event.target.classList.contains('pin-keep')) {
                    console.log("тут");
                    const g = event.target
                    const k = g.parentElement
                    let gArray = JSON.parse(localStorage.getItem(g.getAttribute('data-id')))
                    gArray['pin']  = !gArray['pin']
                    console.log(gArray['pin']);
                    if (gArray['pin'] == true) {
                        pinedContainer.appendChild(k)
                        g.classList.add('gess')
                        g.setAttribute('data-tooltip', "Открепить")
                    } else if (gArray['pin'] == false ) {
                        defaultContainer.appendChild(k)
                        g.setAttribute('data-tooltip', "Закрепить")
                        g.classList.remove('gess')
                    }
                    localStorage.setItem(g.getAttribute('data-id'), JSON.stringify(gArray) )
                    // renderingNote()
    } else if (event.target.classList.contains('screen')) {
            const grandfather = event.target.closest('.keep');
            // const box = grandfather.querySelector('.buttonbox') 
            // const child = box.querySelector('.screen');
            const shutdown_back = document.createElement('div')
            const content = grandfather.querySelector('.keep-content')
            const newContent = document.createElement('textarea')
            const data_id = grandfather.getAttribute('data-id')
            const data = JSON.parse(localStorage.getItem(data_id))

            if ( document.body.contains(document.querySelector(".shutdown-back"))) {
                return
            }
            if (content) {
                newContent.className = input.className;
                newContent.value = content.textContent.trim();
                content.replaceWith(newContent)
            }
            newContent.style.padding = '0px'
            const title = grandfather.querySelector('.keep-head')
            const newTitle = document.createElement('input')
            newTitle.type = 'text'
            newTitle.style.background = 'transparent'
            newTitle.style.border = 'transparent'
            newTitle.style.outline = 'transparent'
            newTitle.style.gridRow = '1 / 1'
            newTitle.style.gridColumn = '1 / 1'
            newTitle.style.height = '50px'
            if (title) {
                newTitle.className = title.className;
                newTitle.value = title.textContent.trim();
                title.replaceWith(newTitle);
            }
            shutdown_back.classList.add('shutdown-back')
            shutdown_back.addEventListener('click', () => {
                grandfather.classList.remove('fullscreen')
                document.body.removeChild(shutdown_back)
                const newData = {
                    "title": `${newTitle.value}`,
                    "content": `${newContent.value}`,
                    "pin": data.pin
                }
                localStorage.setItem(grandfather.getAttribute('data-id'), JSON.stringify(newData))
                if(!important == true){
                    const allNotes = document.querySelectorAll('.keep');
                    const idsArray = [];

                    allNotes.forEach((noteElement) => {
                    const noteId = noteElement.getAttribute('data-id');
                    idsArray.push(noteId);
                    });
                    localStorage.removeItem('history')
                    localStorage.setItem('history', JSON.stringify(idsArray))
                    renderingNote() 
                }
            })
            // 1. Включаем плавность
            grandfather.style.transition = 'all 0.3s ease'; // Исправлено: 'ease' вместо 'easy'
            grandfather.classList.add('fullscreen');
            document.body.append(shutdown_back)

            setTimeout(() => {
                grandfather.style.transition = 'all 0.1s ease'; 
            }, 300);
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
    
    
    if (t === mainCreater || t === ButtonSearch || t === search || t === createrHead || t === pin || t === createrInput || 
        t === createrIconPhoto || t === mainBlockButton || t === mainBoxCreater || t === photoSecond) {
        return;
    }

    if (isSmallScreen && searchBox.classList.contains('clicked')) {
        searchBox.classList.remove('clicked')
        console.log("remove");
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

    const buttonpinned = document.createElement('div');
    buttonpinned.classList.add('pin-keep');  
    buttonpinned.setAttribute('data-tooltip', 'Закрепить');
    if (pin_value == true) {
        buttonpinned.classList.add('gess')
        buttonpinned.setAttribute('data-tooltip', 'Открепить');
    }
    buttonpinned.setAttribute('data-id', noteId); 

    // Создание структуры новой заметки
    const buttondelete = document.createElement('div');
    buttondelete.classList.add('delete'); 
    buttondelete.setAttribute('data-tooltip', 'Удалить заметку');       
    buttondelete.setAttribute('data-id', noteId); // ИСПРАВЛЕНО: добавляем id новой кнопке удаления

    const buttonscreen = document.createElement('div');
    buttonscreen.classList.add('screen'); 
    buttonscreen.setAttribute('data-tooltip', 'Открыть заметку'); 
    
    const newKeep = document.createElement('div');
    newKeep.classList.add('keep');
    newKeep.setAttribute('data-id', noteId); // Добавляем id и на сам контейнер
    
    const keepBody = document.createElement('div');
    keepBody.classList.add('keep-content');
    keepBody.textContent = keep__content__value;
    
    const keepHeadEl = document.createElement('div');
    keepHeadEl.classList.add('keep-head');
    keepHeadEl.textContent = keep__head__value;

    newKeep.appendChild(buttonpinned);
    newKeep.appendChild(buttonscreen);
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

    // 1. Двигаем перетаскиваемый элемент за курсором
    draggedElement.style.top = `${event.clientY - shiftY}px`;
    draggedElement.style.left = `${event.clientX - shiftX}px`;

    // 2. Находим DOM-элемент под курсором
    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
    if (!elementUnderCursor) return;

    // 3. Ищем, является ли этот элемент заметкой .keep (или её внутренностью)
    const targetKeep = elementUnderCursor.closest('.keep');

    // Нам нужна чужая заметка, и это не должен быть сам фантом
    if (targetKeep && targetKeep !== draggedElement) {
        
        // 4. Получаем размеры и координаты заметки, над которой парим
        const rect = targetKeep.getBoundingClientRect();
        
        // Вычисляем вертикальный центр этой заметки
        const targetCenterY = rect.top + rect.height / 2;

        // Находим наш фантом в DOM дереве
        const phantom = document.querySelector('.phantom');
        if (!phantom) return;

        // 5. Сравниваем координату мыши Y с центром заметки
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
    const keepTarget = event.target.closest('.keep');
    let height = keepTarget ? keepTarget.offsetHeight : 0; 
    
    if ( document.body.contains( document.querySelector('.shutdown-back')) ) return

    if (keepTarget && !event.target.classList.contains('delete') && !event.target.classList.contains('screen') && !event.target.classList.contains('pin-keep') ) {
        draggedElement = keepTarget; 
        document.body.style.cursor = 'grabbing'
        
        // 1. Получаем точные экранные координаты карточки прямо сейчас
        const rect = draggedElement.getBoundingClientRect();
        
        // 2. Считаем сдвиг мыши относительно верхнего левого угла карточки
        shiftX = event.clientX - rect.left;
        shiftY = event.clientY - rect.top;

        // Создаем фантом НА МЕСТЕ карточки, пока она еще в потоке
        addPhantom(keepTarget, height);

        // 3. Задаем фиксированные размеры и отключаем анимацию
        draggedElement.style.width = `${rect.width}px`; 
        draggedElement.style.height = `${rect.height}px`; // Фиксируем высоту
        draggedElement.style.transition = 'none';
        
        // 4. МГНОВЕННО позиционируем элемент в те же координаты, где он и стоял
        draggedElement.style.position = 'fixed'; 
        draggedElement.style.left = `${rect.left}px`;
        draggedElement.style.top = `${rect.top}px`;
        
        draggedElement.classList.add('shake');
        keepTarget.style.pointerEvents = 'none'
        window.addEventListener('mousemove', moveElement);
    }
});
document.addEventListener('mouseup', () => {
    if (draggedElement) {
        window.removeEventListener('mousemove', moveElement);
        
        // 1. СНАЧАЛА находим фантом в DOM дереве
        const phantom = document.querySelector('.phantom');
        
        // 2. Если фантом существует, заменяем его нашей карточкой
        if (phantom) {
            phantom.replaceWith(draggedElement);
        }
        
        // 3. Сбрасываем стили и возвращаем карточку в обычный поток сетки
        draggedElement.classList.remove('shake');
        draggedElement.style.pointerEvents = 'auto'; // Возвращаем реакцию на мышь
        if ( defaultContainer.contains(draggedElement) ) {
            const id = draggedElement.getAttribute("data-id") 
            const data = localStorage.getItem(`${id}`)
            const newData = JSON.parse(data)
            console.log(newData);
            newData.pin = false 
            console.log(newData);
            localStorage.setItem(id, JSON.stringify(newData))

        }
        if ( pinedContainer.contains(draggedElement) ) {
            const id = draggedElement.getAttribute("data-id") 
            const data = localStorage.getItem(`${id}`)
            const newData = JSON.parse(data)
            console.log(newData);
            newData.pin = true 
            console.log(newData);
            localStorage.setItem(id, JSON.stringify(newData))

        }
        document.body.style.cursor = 'auto'
        if(!important == true){
            const allNotes = document.querySelectorAll('.keep');
            const idsArray = [];

            allNotes.forEach((noteElement) => {
            const noteId = noteElement.getAttribute('data-id');
            idsArray.push(noteId);
            });
            localStorage.removeItem('history')
            localStorage.setItem('history', JSON.stringify(idsArray))
        }
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
const render = () => {
    if (!typeCastom) {
       typeCastom = "keep"
       return render()
    } else if ( typeCastom == "keep" ) {
        const CastomKeep = document.querySelector('#keep-castom-feature')
        const CastomSearch = document.querySelector('#search-castom-feature')
        const CastomCreater = document.querySelector('#creater-castom-feature')
        // const CastomInterface = document.querySelector('#keep-castom-feature')
        const arrCastom = [CastomKeep, CastomSearch, CastomCreater]
        arrCastom.forEach(el => {
            el.style.display = "none"
        })
        CastomKeep.style.display = "grid"
    } else if ( typeCastom == "creater" ) {
        const CastomKeep = document.querySelector('#keep-castom-feature')
        const CastomSearch = document.querySelector('#search-castom-feature')
        const CastomCreater = document.querySelector('#creater-castom-feature')
        // const CastomInterface = document.querySelector('#keep-castom-feature')
        const arrCastom = [CastomKeep, CastomSearch, CastomCreater]
        arrCastom.forEach(el => {
            el.style.display = "none"
        })
        CastomCreater.style.display = "grid"
    } else if ( typeCastom == "search" ) {
        const CastomKeep = document.querySelector('#keep-castom-feature')
        const CastomSearch = document.querySelector('#search-castom-feature')
        const CastomCreater = document.querySelector('#creater-castom-feature')
        // const CastomInterface = document.querySelector('#keep-castom-feature')
        const arrCastom = [CastomKeep, CastomSearch, CastomCreater]
        arrCastom.forEach(el => {
            el.style.display = "none"
        })
        CastomSearch.style.display = "grid"
    }
}
render()



// Рендеринг из LocalStorage
const renderingNote = () => {

    if(important == true) {
        defaultContainer.innerHTML = '';
        pinedContainer.innerHTML = '';

        setRender.forEach(key => {
        const renderArray = JSON.parse(localStorage.getItem(key))
        const currentContainer = renderArray.pin ? pinedContainer : defaultContainer;
        if (!currentContainer) return;

        const buttonpinned = document.createElement('div');
        buttonpinned.classList.add('pin-keep'); 
        buttonpinned.setAttribute('data-tooltip', 'Закрепить');
        if(renderArray['pin']){
            buttonpinned.classList.add('gess')
            buttonpinned.setAttribute('data-tooltip', 'Открепить');
        }
        buttonpinned.setAttribute('data-id', key);  

        const buttondelete = document.createElement('div');
        buttondelete.classList.add('delete'); 
        buttondelete.setAttribute('data-tooltip', 'Удалить заметку'); 
        buttondelete.setAttribute('data-id', key);  

        const buttonscreen = document.createElement('div');
        buttonscreen.classList.add('screen'); 
        buttonscreen.setAttribute('data-tooltip', 'Открыть заметку'); 

        const newKeep = document.createElement('div');
        newKeep.classList.add('keep');
        newKeep.setAttribute('data-id', key);

        const keepBody = document.createElement('div');
        keepBody.classList.add('keep-content');
        keepBody.textContent = renderArray.content;

        const keepHeadEl = document.createElement('div');
        keepHeadEl.classList.add('keep-head');
        keepHeadEl.textContent = renderArray.title;

        newKeep.appendChild(buttonpinned);
        newKeep.appendChild(buttonscreen);
        newKeep.appendChild(buttondelete);
        newKeep.appendChild(keepHeadEl);
        newKeep.appendChild(keepBody);
        
        currentContainer.appendChild(newKeep);
        })
        return
    }
    const arrLocal =
        JSON.parse(localStorage.getItem('history')) || [];

    defaultContainer.innerHTML = '';
    pinedContainer.innerHTML = '';

    for (let i = 0; i < arrLocal.length; i++) {

        const key = arrLocal[i];

        const ArrayData =
            JSON.parse(localStorage.getItem(key));

        if (!ArrayData) continue;
        if (!key.startsWith('note_')) continue; 

        // Выбираем контейнер на основе флага pin
        const currentContainer = ArrayData.pin ? pinedContainer : defaultContainer;
        if (!currentContainer) continue;

        const buttonpinned = document.createElement('div');
        buttonpinned.classList.add('pin-keep'); 
        buttonpinned.setAttribute('data-tooltip', 'Закрепить');
        if(ArrayData['pin']){
            buttonpinned.classList.add('gess')
            buttonpinned.setAttribute('data-tooltip', 'Открепить');
        }
        buttonpinned.setAttribute('data-id', key);  

        const buttondelete = document.createElement('div');
        buttondelete.classList.add('delete'); 
        buttondelete.setAttribute('data-tooltip', 'Удалить заметку'); 
        buttondelete.setAttribute('data-id', key);  

        const buttonscreen = document.createElement('div');
        buttonscreen.classList.add('screen'); 
        buttonscreen.setAttribute('data-tooltip', 'Открыть заметку'); 

        const newKeep = document.createElement('div');
        newKeep.classList.add('keep');
        newKeep.setAttribute('data-id', key);

        const keepBody = document.createElement('div');
        keepBody.classList.add('keep-content');
        keepBody.textContent = ArrayData.content;

        const keepHeadEl = document.createElement('div');
        keepHeadEl.classList.add('keep-head');
        keepHeadEl.textContent = ArrayData.title;

        newKeep.appendChild(buttonpinned);
        newKeep.appendChild(buttonscreen);
        newKeep.appendChild(buttondelete);
        newKeep.appendChild(keepHeadEl);
        newKeep.appendChild(keepBody);
        
        currentContainer.appendChild(newKeep);
    }
};
renderingNote();



buttonColorCastom.addEventListener('click', () => {
    if(document.body.contains(document.querySelector('.preloader'))) {
        return
    }
    buttonColorCastom.classList.add('swapingDisplay')
    const preloader = document.createElement('div')
    const slideTwo = document.querySelector('.slide-two')
    preloader.classList.add('preloader')
    document.body.appendChild(preloader)
    preloader.classList.add('entry')
    setTimeout(() => {
        document.body.removeChild(preloader)
        buttonColorCastom.classList.remove('swapingDisplay')
    }, 1000)
    setTimeout(() => {
        slideOne.style.display = 'none'
        slideTwo.style.display = 'flex'
    }, 500)
})
buttonExit.addEventListener('click', () => {
    if(document.body.contains(document.querySelector('.preloader'))) {
        return
    }
    buttonExit.classList.add('swapingDisplay')
    const preloader = document.createElement('div')
    preloader.classList.add('preloader')
    document.body.appendChild(preloader)
    preloader.classList.add('exit')
    setTimeout(() => {
        document.body.removeChild(preloader)
        buttonExit.classList.remove('swapingDisplay')
    }, 1000)
    setTimeout(() => {
        slideOne.style.display = 'inline'
        slideTwo.style.display = 'none'
    }, 500)
})
const replacementColor = (type, id, name, root) => {
  const element = document.getElementById(id); 
  
  if (!element) return;

  if (type === "color") {
    element.addEventListener('input', () => {
      ArrayCastom[root] = element.value; 
      document.documentElement.style.setProperty(root, element.value);
    });
  }

  if (type === "range") {
    element.addEventListener('input', () => {
      const calculatedValue = element.value / 100;
      ArrayCastom[root] = calculatedValue;
      document.documentElement.style.setProperty(root, calculatedValue);
    });
  }
};
const color_keep_castom = document.querySelector('#color-keep-feature')
color_keep_castom.addEventListener('input', () => {
    ArrayCastom[`--color-keep`] = color_keep_castom.value
    document.documentElement.style.setProperty('--color-keep', color_keep_castom.value)
})
const range_keep = document.querySelector('#opacity-keep-feature')
range_keep.addEventListener('input', () => {
    ArrayCastom[`--keep-opacity`] = range_keep.value / 100
    document.documentElement.style.setProperty('--keep-opacity', range_keep.value / 100)
})
const color_border_keep_castom = document.querySelector('#color-border-keep-feature')
color_border_keep_castom.addEventListener('input', () => {
    ArrayCastom[`--color-border`] = color_border_keep_castom.value
    document.documentElement.style.setProperty('--color-border', color_border_keep_castom.value)
})
const range_border = document.querySelector('#opacity-border-feature')
range_border.addEventListener('input', () => {
    ArrayCastom[`--opacity-border`] = range_border.value / 100
    document.documentElement.style.setProperty('--opacity-border', range_border.value / 100)
})
// const range_shadow = document.querySelector('#opacity-shadow-feature')
// range_shadow.addEventListener('input', () => {
//     ArrayCastom[`--opacity-shadow`] = range_shadow.value / 100
//     document.documentElement.style.setProperty('--opacity-shadow', range_shadow.value / 100)
// })
// const color_shadow_feature = document.querySelector('#color-shadow-feature')
// color_shadow_feature.addEventListener('input', () => {
//     ArrayCastom[`--color-shadow`] = color_shadow_feature.value
//     document.documentElement.style.setProperty('--color-shadow', color_shadow_feature.value)
// })
// const brightness_shadow = document.querySelector('#brightness-shadow')
// brightness_shadow.addEventListener('input', () => {
//     ArrayCastom[`--brightness-shadow`] = brightness_shadow.value
//     console.log();
//     document.documentElement.style.setProperty('--brightness-shadow', `${brightness_shadow.value}px`)
// })
// const range_title = document.querySelector('#opacity-title')
// range_title.addEventListener('input', () => {
//     ArrayCastom[`--opacity-brand`] = range_title.value / 100
//     document.documentElement.style.setProperty('--opacity-brand', range_title.value / 100)
// })
// const color_title = document.querySelector('#color-title')
// color_title.addEventListener('input', () => {
//     ArrayCastom[`--color-text-title`] = color_title.value
//     document.documentElement.style.setProperty('--color-text-title', color_title.value)
// })
// const range_content = document.querySelector('#opacity-content')
// range_content.addEventListener('input', () => {
//     ArrayCastom[`--opacity-content`] = range_content.value / 100
//     document.documentElement.style.setProperty('--opacity-content', range_content.value / 100)
// })
// const color_content = document.querySelector('#color-content')
// color_content.addEventListener('input', () => {
//     ArrayCastom[`--color-text-keep-content`] = color_content.value
//     document.documentElement.style.setProperty('--color-text-keep-content', color_content.value)
// })
const range_search_feature = document.querySelector('#opacity-search')
range_search_feature.addEventListener('input', () => {
    ArrayCastom[`--bg-opacity`] = range_search_feature.value / 100
    document.documentElement.style.setProperty('--bg-opacity', range_search_feature.value / 100)
})
const color_search_feature = document.querySelector('#color-search')
color_search_feature.addEventListener('input', () => {
    ArrayCastom[`--main-color-search`] = color_search_feature.value
    document.documentElement.style.setProperty('--main-color-search', color_search_feature.value)
})
const range_search_border = document.querySelector('#opacity-border-search')
range_search_border.addEventListener('input', () => {
    ArrayCastom[`--opacity-border-search`] = range_search_border.value / 100
    document.documentElement.style.setProperty('--opacity-border-search', range_search_border.value / 100)
})
const color_search_border = document.querySelector('#color-border-search')
color_search_border.addEventListener('input', () => {
    ArrayCastom[`--color-border-search`] = color_search_border.value
    document.documentElement.style.setProperty('--color-border-search', color_search_border.value)
})
const brightness_search = document.querySelector('#brightness-search')
brightness_search.addEventListener('input', () => {
    ArrayCastom[`--brightness-search`] = brightness_search.value / 25
    document.documentElement.style.setProperty('--brightness-search', `${brightness_search.value / 25}`)
})
const range_search_text = document.querySelector('#opacity-text-search')
range_search_text.addEventListener('input', () => {
    ArrayCastom[`--opacity-text-search`] = range_search_text.value / 100
    document.documentElement.style.setProperty('--opacity-text-search', range_search_text.value / 100)
})
const color_search_text = document.querySelector('#color-text-search')
color_search_text.addEventListener('input', () => {
    ArrayCastom[`--color-text-search`] = color_search_text.value
    document.documentElement.style.setProperty('--color-text-search', color_search_text.value)
})
const range_search_text_active = document.querySelector('#opacity-text-search-active')
range_search_text_active.addEventListener('input', () => {
    ArrayCastom[`--color-text-search-focus-opacity`] = range_search_text_active.value / 100
    document.documentElement.style.setProperty('--color-text-search-focus-opacity', range_search_text_active.value / 100)
})
const color_search_text_active = document.querySelector('#color-text-search-active')
color_search_text_active.addEventListener('input', () => {
    ArrayCastom[`--color-text-search-focus`] = color_search_text_active.value
    document.documentElement.style.setProperty('--color-text-search-focus', color_search_text_active.value)
})
replacementColor("range", "opacity-creater", "opacity_creater_feature", "--color-creater-op")
replacementColor("color", "color-creater", "color_creater_feature", "--color-creater")
replacementColor("range", "opacity-border-creater", "opacity_border_creater_feautre", "--color-border-creater-op")
replacementColor("color", "border-color-creater", "border_color_creater_feature", "--color-border-creater")
replacementColor("range", "opacity-text-creater", "opacity_text_creater_feautre", "--opacity-text-creater")
replacementColor("color", "color-text-creater", "color_text_creater_feature", "--color-text-creater")
// const tumbler_circle = document.querySelector('.tumbler-circle')
// tumbler.addEventListener('click', () => {
//     tumbler.classList.toggle('clicked')
//     if(tumbler.classList.contains('clicked')) {
//         color_castom_fon.type = "file"
//         tumbler_value = true
//     } else {
//         color_castom_fon.type = "color"
//         tumbler_value = false
//     }
// })