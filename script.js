const flash_display = document.getElementById('flash_display')
const flash_controls_back = document.getElementById('flash_controls_back')
const flash_controls_reset = document.getElementById('flash_controls_reset')
const flash_controls_flip = document.getElementById('flash_controls_flip')
const flash_controls_next = document.getElementById('flash_controls_next')
const flash_count = document.getElementById('flash_count')
const flash_face = document.getElementById('flash_face')

if (!localStorage.getItem("persistedIndex")) {
    localStorage.setItem("persistedIndex", 0)
}

let fetchData = async() => {
    const response = await fetch('./azure_sc_900.json');
    const data = await response.json();
    return data
}

const initFlipper = data => {
    flash_display.innerText = data[localStorage.getItem("persistedIndex")].front
    flash_display.dataset.cardid = localStorage.getItem("persistedIndex")
    flash_display.addEventListener('click', () => {flipCard(data)})
    flash_controls_flip.addEventListener('click', () => {flipCard(data)})
    flash_controls_reset.addEventListener('click', () => {handleControls("reset", data)})
    flash_controls_back.addEventListener('click', () => {handleControls("prev", data)})
    flash_controls_next.addEventListener('click', () => {handleControls("next", data)})
    flash_count.innerText = `${parseInt(localStorage.getItem("persistedIndex"))+1}/${data.length}`
    flash_face.innerText = ' (front)'
}

let data = fetchData().then(data => initFlipper(data))

const playAnimation = () => {
    flash_display.classList.add("animate")
    setTimeout(() => {
        flash_display.classList.remove("animate")
    }, 150)
}

const flipCard = data => {
    playAnimation()
    if(flash_display.dataset.cardside == "back") {
        flash_display.innerText = data[flash_display.dataset.cardid].front
        flash_display.dataset.cardside = "front";
        flash_face.innerText = ` (${flash_display.dataset.cardside})`;
    } else {
        flash_display.innerText = data[flash_display.dataset.cardid].back
        flash_display.dataset.cardside = "back"
        flash_face.innerText = ` (${flash_display.dataset.cardside})`
    }
}

const handleControls = (action, data) => {
    let cardId = parseInt(flash_display.dataset.cardid)
    let newIndex = cardId;
    let cardSide = flash_display.dataset.cardside
    switch (action) {
        case 'reset':
            cardId = 0
            newIndex = ((cardId % data.length) + data.length) % data.length
            cardSide = "front"
            break;
        case 'next':
            newIndex = ((cardId+1 % data.length) + data.length) % data.length
            break;
        case 'prev':
            newIndex = ((cardId-1 % data.length) + data.length) % data.length
            break;
        default:
            console.log('default case');
    }
    // const cardId = parseInt(flash_display.dataset.cardid)
    // const cardSide = flash_display.dataset.cardside
    // const newIndex = (((action == "next" ? cardId+1 : action == "prev" ? cardId-1 : cardId) % data.length) + data.length) % data.length
    localStorage.setItem("persistedIndex", newIndex)
    flash_display.innerText = data[newIndex][cardSide]
    flash_display.dataset.cardid = newIndex
    flash_count.innerText = `${newIndex+1}/${data.length}`
}