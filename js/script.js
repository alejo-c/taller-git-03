document.addEventListener("DOMContentLoaded", () => {
    var buttons = []

    let screen = document.getElementById("tela")
    let calculateButton = document.getElementById("calculate")
    let clearButton = document.getElementById("clearScreen")
    let deleteLastButton = document.getElementById("deleteLast")
    let convertDegreesButton = document.getElementById('degrees')

    for (let i = 0; i < 10; i++)
        buttons.push(document.getElementById(`num${i}`))

    buttons.push(document.getElementById("add"))
    buttons.push(document.getElementById("substraction"))
    buttons.push(document.getElementById("division"))
    buttons.push(document.getElementById("multiplication"))
    buttons.push(document.getElementById("dot"))

    const isOperator = operator => '+-*/'.includes(operator)

    const deleteLast = () => {
        if (screen.value.length > 0)
            screen.value = screen.value.substring(0, screen.value.length - 1)
    }

    const atClickButton = event => {
        let value = event.currentTarget.value
        if (isOperator(value)) {
            var aux = screen.value.substring(screen.value.length - 1, screen.value.length)

            if (isOperator(aux))
                deleteLast()
        }
        if (value)
            screen.value += value
    }

    const calculate = () => {
        try {
            var aux = screen.value.substring(screen.value.length - 1, screen.value.length)
            if (isOperator(aux))
                deleteLast()

            var valorCalculado = eval(screen.value) //calcular o conteúdo da string
            if (valorCalculado || valorCalculado == "0")
                screen.value = valorCalculado
            else
                throw "error"
        } catch (e) {
            console.error(e)
        }
    }

    const clear = () => screen.value = ''

    const atKeyPressed = event => {
        let key = event.key

        if (key.includes('Arrow') || key == 'Backspace' || key == 'Delete')
            return
        if (key == 'Enter')
            return calculate()
        if (key == 'Escape')
            return clear()
        if (!/^\d|\+|-|\*|\/|\.$/.test(key))
            return event.preventDefault()
    }

    const convertDegrees = () => {
        screen.value += '* 9/5 + 32'
        calculate()
    }

    buttons.forEach(button => button.addEventListener("click", atClickButton))
    screen.addEventListener('keydown', atKeyPressed)
    convertDegreesButton.addEventListener('click', convertDegrees)

    calculateButton.onclick = calculate
    deleteLastButton.onclick = deleteLast
    clearButton.onclick = clear
})
