import Selectz from "./selectz/selectz.js"

const select = new Selectz('#mySelect', { 
    onchange: e => {
        console.log(e)
    } 
})

select.addOptions([
    {text: 'Opsi Tambahan', value: 'option_tambahan'},
    {text: 'Opsi Tambahan Kedua', value: 'option_tambahan_2'},
], 3)

select.removeOption(1)
select.removeOption(3)

const button = document.getElementById("btn")

button.addEventListener('click', function(){
    select.setSelectedOption()
})

console.log(select.options, 0)
