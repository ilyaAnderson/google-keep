const demo__button = document.querySelector(".creater-icon-photo")
const keeps_box = document.querySelector('.keeps-box')
const keep = document.querySelectorAll('.keep')
const input = document.querySelector('.creater')

const keep__content = document.querySelector('#keepcontent');
const keep__head = document.querySelector('#keephead');

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const grandfather = event.target.closest('.keep'); 
        if (grandfather) {
            grandfather.remove();
        }
    }
});

input.addEventListener('focus', function() {
    document.querySelector('.creater-head').classList.add('clicked')
    document.querySelector('.pin').classList.add('clicked')
    document.querySelector('.main-block-button').classList.add('clicked')
    document.querySelector('.creater-icon-photo').classList.add('clicked')
    document.querySelector('.main-creater').classList.add('clicked')
    document.querySelector('.main-box-creater').classList.add('clicked')
    document.querySelector('.main-creater').classList.add('clicked')
    document.querySelector('.creater').classList.add('clicked')
});

document.body.addEventListener('click', (event) => {
    if(event.target === document.querySelector('.main-creater') | event.target === document.querySelector('.creater-head') | event.target === document.querySelector('.pin') | event.target === document.querySelector('.creater') | event.target === document.querySelector('.creater-icon-photo') | event.target === document.querySelector('.main-block-button') | event.target === document.querySelector('.main-box-creater') | event.target === document.querySelector('#photo-second') ) {
        return
    }
    console.log(event)

    document.querySelector('.creater-head').classList.remove('clicked')
    document.querySelector('.pin').classList.remove('clicked')
    document.querySelector('.main-block-button').classList.remove('clicked')
    document.querySelector('.creater-icon-photo').classList.remove('clicked')
    document.querySelector('.main-creater').classList.remove('clicked')
    document.querySelector('.main-box-creater').classList.remove('clicked')
    document.querySelector('.main-creater').classList.remove('clicked')
    document.querySelector('.creater').classList.remove('clicked')
    if (event.relatedTarget && event.relatedTarget.id === 'keepcontent') {
        return; 
    }
    const keep__head = document.querySelector('#keephead');
    let keep__head__value = keep__head.value;
    let keep__content__value = keep__content.value;

    if (!keep__content__value.trim() && !keep__head__value.trim()) return;
    if (pin.classList.contains('used')) {
    console.log('Класс used есть');
    const buttondelete = document.createElement('div');
    buttondelete.classList.add('delete') 
    buttondelete.setAttribute('data-tooltip', 'Удалить заметку');       
    const newKeep = document.createElement('div');
    const keep = document.createElement('div');
    newKeep.classList.add('keep');
    keep.classList.add('keep-content');
    keep.textContent = keep__content__value;
    
    const keepHead = document.createElement('div');
    keepHead.classList.add('keep-head');
    keepHead.textContent = keep__head__value

    newKeep.prepend(keep);
    newKeep.insertAdjacentElement('afterbegin', keepHead);
    newKeep.prepend(buttondelete);
    document.querySelector('#pined').insertAdjacentElement('afterbegin', newKeep);

    keep__content.value = '';
    keep__head.value = '';
    document.querySelector('.pin').classList.remove('used')
    return
    }
    const buttondelete = document.createElement('div');
    buttondelete.classList.add('delete') 
    buttondelete.setAttribute('data-tooltip', 'Удалить заметку');          
    const newKeep = document.createElement('div');
    const keep = document.createElement('div');
    newKeep.classList.add('keep');
    keep.classList.add('keep-content');
    keep.textContent = keep__content__value;
    
    const keepHead = document.createElement('div');
    keepHead.classList.add('keep-head');
    keepHead.textContent = keep__head__value

    newKeep.prepend(keep);
    newKeep.insertAdjacentElement('afterbegin', keepHead);
    newKeep.prepend(buttondelete);
    document.querySelector('#default').insertAdjacentElement('afterbegin', newKeep);

    keep__content.value = '';
    keep__head.value = '';
})
const pin = document.querySelector('.pin')
pin.addEventListener('click', () => {
    pin.classList.toggle('used')
});
document.addEventListener('mousedown', (event) => {
    console.log("внутри");
    if ( event.target == document.querySelector('.keep') || event.target == document.querySelector('.keep-head')) {
        console.log("внутри ифа")
        document.querySelector('.keep').classList.add('shake')
    }
});
document.addEventListener('mouseup', (event) => {
        console.log("снаружи ифа")
        document.querySelector('.keep').classList.remove('shake')
});

