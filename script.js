'use strict';

const display = document.getElementById('display');
const numero = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () =>  operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace('.', '').replace(',', '.'));
        novoNumero = true
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado)
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }
    else {
        display.textContent += texto.toLocaleString('BR');
    }
    document.querySelector('#igual').focus();
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace('.', '').replace(',', '.'));
    }
}


const ativarIgual = () =>{
    calcular()
    operador = undefined
}

const limparDisplay = () =>{
    display.textContent = ''
}


const limparCalculo = () =>{
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
    
}

const removerUltimoNumero = ()=>{
    display.textContent = display.textContent.slice(0, -1)
}

const inverteSinal = ()=>{
    novoNumero = true
    atualizarDisplay(display,textContent * -1)
}

const existeDecimal = ()=>display.textContent.indexOf(',') !== -1; 
const existeValor = ()=> display.textContent.length > 0;

const inserirDecimal = () =>{
    if(!existeDecimal()){
        if(novoNumero){
            atualizarDisplay(',')
        }else{
            atualizarDisplay('0,')
        }
    }
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo)
document.getElementById('backSpace').addEventListener('click', removerUltimoNumero)
document.getElementById('decimal').addEventListener('click', inserirDecimal)
document.getElementById('inverter').addEventListener('click', inverteSinal)
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)
document.getElementById('igual').addEventListener('click', ativarIgual)
operadores.forEach((operador => operador.addEventListener('click', selecionarOperador)))
numero.forEach((numero) => numero.addEventListener('click', inserirNumero));

const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '+': 'operdorSomar',
    '-': 'operdorSubtriar',
    '/': 'operdorDividir',
    '*': 'operdorMultiplicar',
    '=': 'igual',
    'Enter'    : 'igual',
    'Backspace': 'backSpace',
    'c'        : 'limparDisplay',
    'Escape'   : 'limparCalculo',
    ','        : 'decimal',

}

// const mapearTeclado = (evento) =>{
//     const tecla = evento.key

//     const teclapermitida = () =>{
//         Object.keys(mapaTeclado).indexOf(tecla) !== -1
//     }

//     if(teclapermitida()){

//         document.getElementById(mapaTeclado[tecla].click())   
//     }
// }
// document.addEventListener('keydown', mapearTeclado)