
import "./app.scss"

const canvas = document.createElement('canvas')
canvas.setAttribute("id", "canvas")
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(120, 20)
ctx.lineTo(120, 120)
ctx.lineTo(20, 120)
ctx.closePath()
ctx.stroke()