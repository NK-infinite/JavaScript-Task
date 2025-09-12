const From = document.getElementById("from");
const To = document.getElementById("to");
const SHOWDATA = document.querySelector(".SHOWDATA");
const Amount = document.getElementById("Amount");
// const Result = document.getElementById("result");


const buttons = ['0','1','2','3','4','5','6','7','8','9','.'];

buttons.forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        Amount.value += id;
    });
});
const getcureencyApi = () => {
         

    fetch(`https://hexarate.paikama.co/api/rates/latest/${From.value}?target=${To.value}`)
        // fetch(`https://countriesnow.space/api/v0.1/countries/currency/${From}`)
       
        .then(response => response.json())
      
        .then(data =>    {

            
            let rate = data?.data?.mid;// conversion rate
          
            
            let amount = parseFloat(Amount.value || 1); 
            let converted = (amount * rate);
            SHOWDATA.innerHTML = `${amount} ${data?.data?.base} = ${converted} ${ data?.data?.target}`;
          //  SHOWDATA.innerHTML = `${data?.data?.base} = ${data?.data?.mid} ${data?.data?.target}`
        }
        )
            
            .catch(error => console.error('Error fetching data:', error))    
     }

     document.getElementById('result').addEventListener('click', () => {    
        getcureencyApi();});

        
// remove all
document.getElementById('AC').addEventListener('click', () => {
    Amount.value = '';
    
});

// removw one by one 
document.getElementById('C').addEventListener('click', () => {
    Amount.value = Amount.value.slice(0, -1);
  
});

document.getElementById('Exchange').addEventListener('click', () => {   
    let temp = From.value;
    From.value = To.value;
    To.value = temp;
    getcureencyApi();
});

