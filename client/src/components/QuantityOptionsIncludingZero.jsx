import { v4 as uuid } from 'uuid';

function QuantityOptionsIncludingZero(){
  let quantityOptions = [];
  // creates an array with all quantity options
  quantityOptions.push({
    number: '0 (Delete)',
    id: uuid(),
  })
  for(let i = 1; i <= 29; i++){
    quantityOptions.push(
      {
        number: i,
        id: uuid()
      }
    );
  }
  quantityOptions.push({
    number: '30+',
    id: uuid()
  })

  return (
    <>
      {quantityOptions.map((obj) => (<option key = {obj.id}>{obj.number}</option>))}
    </>
  )
}

export default QuantityOptionsIncludingZero;