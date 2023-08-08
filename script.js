const flash_display = document.getElementById('flash_display')
const flash_controls_back = document.getElementById('flash_controls_back')
const flash_controls_flip = document.getElementById('flash_controls_flip')
const flash_controls_next = document.getElementById('flash_controls_next')
const flash_count = document.getElementById('flash_count')

let fetchData = async() => {
    const response = await fetch('./azure_sc_900.json');
    const data = await response.json();
    console.log(data)
    return data
}

const initFlipper = data => {
    flash_display.innerText = data[0].front
    flash_display.addEventListener('click', () => {flipCard(data)})
    flash_controls_flip.addEventListener('click', () => {flipCard(data)})
    flash_controls_back.addEventListener('click', () => {handleControls("prev", data)})
    flash_controls_next.addEventListener('click', () => {handleControls("next", data)})
    flash_count.innerText = `1/${data.length}`
}

let data = fetchData().then(data => initFlipper(data))

const flipCard = data => {
    console.log('flipCardCalled: ', flash_display.dataset)
    if(flash_display.dataset.cardside == "back") {
        flash_display.innerText = data[flash_display.dataset.cardid].front
        flash_display.dataset.cardside = "front"
    } else {
        flash_display.innerText = data[flash_display.dataset.cardid].back
        flash_display.dataset.cardside = "back"
    }
}

const handleControls = (direction, data) => {
    const cardId = parseInt(flash_display.dataset.cardid)
    const cardSide = flash_display.dataset.cardside
    const newIndex = (((direction == "next" ? cardId+1 : cardId-1) % data.length) + data.length) % data.length
    flash_display.innerText = data[newIndex][cardSide]
    flash_display.dataset.cardid = newIndex
    flash_count.innerText = `${newIndex+1}/${data.length}`
}