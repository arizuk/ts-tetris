const canvas = document.createElement('canvas')
canvas.style.width = "400px"
canvas.style.height = "400px"
document.body.appendChild(canvas)
console.log('append child')

const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(120, 20)
ctx.lineTo(120, 120)
ctx.lineTo(20, 120)
ctx.closePath()
ctx.stroke()