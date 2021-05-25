const montoBoton = document.querySelector('div#conoce_monto')
const backNode = document.querySelector('a#volver')
const optionsNode = document.querySelector('div#options')
const optionSection = document.querySelector('section#section_option')
const cuotaBoton = document.querySelector('div#conoce_cuota')
const formdivNode = document.querySelector('div#forms')
const formsNode = document.querySelector('form#form_datos')
const cuotaNode = document.querySelector('input#cuota')
const montoNode = document.querySelector('input#monto_prestamo')
const boton_calcular = document.querySelector('button#calcular')
let estado= ""

const borrarForm=()=>{
    const mesesNode = document.querySelector('input#meses')
    const interesNode = document.querySelector('input#interes')
    try {
        
        const parent_form= formsNode.parentNode
        parent_form.removeChild(formsNode)
        cuotaNode.value=""
        montoNode.value=""
        mesesNode.value=""
        interesNode.value=""
      } catch (error) {
        // whatever
      }

}
const backClick= () => {
    borrarForm();
    optionSection.appendChild(optionsNode)
    
}
const conoceMonto= () => {
    
    optionSection.removeChild(optionsNode)
    optionSection.appendChild(formsNode)
    try {
        montoNode.disabled=false
        montoNode.setAttribute('type','number')
        montoNode.classList.remove("input--like-label")
        let reference_input=formsNode.firstChild
        formsNode.insertBefore(montoNode,reference_input)
        cuotaNode.disabled=true
        cuotaNode.classList.add("input--like-label")
        }
    catch (error){
        //
    }
    estado= "monto"
}
const conoceCuota= () => {
    try{
        cuotaNode.disabled=false
        cuotaNode.setAttribute('type','number')
        cuotaNode.classList.remove("input--like-label")
        optionSection.removeChild(optionsNode)
        optionSection.appendChild(formsNode)
        montoNode.disabled=true
        montoNode.classList.add("input--like-label")
    }
    catch{
        //
    }
    estado="cuota"

}

const calcular=() =>{
    const mesesNode = document.querySelector('input#meses')
    const interesNode = document.querySelector('input#interes')
    try{
        if (estado==="cuota"){
            let cuotaValue = parseFloat(cuotaNode.value); 
            let mesesValue = parseFloat(mesesNode.value); 
            let interesValue = parseFloat(interesNode.value)/100;
    
            let monto= (cuotaValue*(1-((1+interesValue)**(-1*mesesValue))))/interesValue
            monto_valor=Math.round(monto,1)
            console.log(monto_valor)
            montoNode.setAttribute('type','text')
            if (monto_valor==NaN){
                montoNode.value=""
            }
            else{
            montoNode.value=formatPrice(monto_valor);
            }
        }
        else if(estado==="monto"){
            let montoValue = parseFloat(montoNode.value); 
            let mesesValue = parseFloat(mesesNode.value); 
            let interesValue = parseFloat(interesNode.value)/100;
    
            let cuota= (interesValue*montoValue)/(1-((1+interesValue)**(-1*mesesValue)))  
            cuota_valor=Math.round(cuota,1)
            console.log(cuota_valor)
            cuotaNode.setAttribute('type','text')
            if (cuota_valor==NaN){
                cuotaNode.value=""
            }else{
            cuotaNode.value=formatPrice(cuota_valor); 
            } 
        }
    }
    catch{
        //
    }
    
};
const formatPrice = (price) => {
    const nuevoPrecio= new window.Intl.NumberFormat('es-CO',{
        style:'currency',
        currency:'COP',
        currencyDisplay: "symbol",
    }).format(price);
    return nuevoPrecio;
};



borrarForm();
montoBoton.addEventListener('click',conoceMonto)
cuotaBoton.addEventListener('click',conoceCuota)
backNode.addEventListener('click',backClick)
boton_calcular.addEventListener('click',calcular)
