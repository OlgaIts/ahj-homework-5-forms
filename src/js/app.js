const tooltip = document.querySelector('.popover')
const button = document.querySelector('.btn')

button.addEventListener('click', (e) => {
    e.preventDefault()
    tooltip.classList.toggle('active')
    const tooltipPosition = tooltip.getBoundingClientRect()
    const tool = tooltipPosition.height + 7
    tooltip.setAttribute('style', `transform: translateY(-${tool}px);`)
})
