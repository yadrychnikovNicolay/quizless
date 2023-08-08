const cards = document.querySelectorAll('.SetPageTerm-wordText');
const backCards = document.querySelectorAll('.SetPageTerm-definitionText')
const flash_display = document.getElementById('flash_display')
const flash_controls_back = document.getElementById('flash_controls_back')
const flash_controls_flip = document.getElementById('flash_controls_flip')
const flash_controls_next = document.getElementById('flash_controls_next')
const flash_count = document.getElementById('flash_count')

let data = []

for(let i = 0; i < cards.length; i++) {
    data.push({
        "front": cards[i].innerText,
        "back": backCards[i].innerText
    })
}

const flipCard = () => {
    console.log('flipCardCalled: ', flash_display.dataset)
    if(flash_display.dataset.cardside == "back") {
        flash_display.innerText = data[flash_display.dataset.cardid].front
        flash_display.dataset.cardside = "front"
    } else {
        flash_display.innerText = data[flash_display.dataset.cardid].back
        flash_display.dataset.cardside = "back"
    }
}

const handleControls = direction => {
    const cardId = parseInt(flash_display.dataset.cardid)
    const cardSide = flash_display.dataset.cardside
    const newIndex = (((direction == "next" ? cardId+1 : cardId-1) % data.length) + data.length) % data.length
    flash_display.innerText = data[newIndex][cardSide]
    flash_display.dataset.cardid = newIndex
    flash_count.innerText = `${newIndex+1}/${data.length}`
}

const initFlipper = data => {
    flash_display.innerText = data[0].front
    flash_controls_flip.addEventListener('click', flipCard)
    flash_controls_back.addEventListener('click', () => {handleControls("prev")})
    flash_controls_next.addEventListener('click', () => {handleControls("next")})
    flash_count.innerText = `1/${data.length}`

}

initFlipper(data)
