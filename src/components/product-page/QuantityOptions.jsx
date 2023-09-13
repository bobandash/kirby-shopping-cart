import { v4 as uuid } from 'uuid';

function QuantityOptions(){
  let quantityOptions = [];
  // creates an array with all quantity options
  for(let i = 1; i <= 30; i++){
    quantityOptions.push(
      {
        number: i,
        id: uuid()
      }
    );
  }
  
  return (
    <>
      {quantityOptions.map((obj) => (<option key = {obj.id}>{obj.number}</option>))}
    </>
  )
}

export default QuantityOptions;