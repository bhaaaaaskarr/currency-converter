const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdownSelects=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const msg=document.querySelector('.msg');


for(let selects of dropdownSelects){
    for(let currCode in countryList){
        // console.log(code,countryList[code]);
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        // console.log(selects);
        if(selects.name==="from" && currCode==='USD'){
            newOption.selected='selected';
        }else if(selects.name==='to' && currCode==='INR'){
            newOption.selected='INR';
        }
        selects.append(newOption);
    }
    selects.addEventListener('change',(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    // console.log(countryCode);
    let newImgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newImgSrc;
}

btn.addEventListener('click',async (event)=>{
    event.preventDefault();
    let amount= document.querySelector('.amount input');
    let amountVal=amount.value;
    if(amountVal==='' || amountVal<1){
        amountVal=1;
        amount.value='1';
    }
    // console.log(fromCurr.value,toCurr.value);
    const fromURL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const toURL=`${BASE_URL}/${toCurr.value.toLowerCase()}.json`;
    let fromResponse=await fetch(fromURL);
    let toResponse= await fetch(toURL);
    let fromData=await fromResponse.json();
    let toData=await toResponse.json();
    let fromRate=fromData[fromCurr.value.toLowerCase()];
    let toRate=toData[toCurr.value.toLowerCase()];
    // console.log(fromRate)
    let exRate=fromData[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt=amountVal*exRate;
    console.log(finalAmt);
    msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    // console.log(`${fromData}.${toCurr.value.toLowerCase()}`)
    // console.log(fromResponse,toResponse);
    

});
