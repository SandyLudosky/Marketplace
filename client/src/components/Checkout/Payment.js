
import { processPayment } from '../../lib/service'
import { useSelector } from "react-redux";
import { selectDeliveryCost } from '../../lib/state/selectors'

function Payment({ isValid }) {
  const { items } = useSelector(state => ({ ...state.cart }))
  const shippingCost = useSelector(selectDeliveryCost) * 100 // stripe processes payment in cents
  const shipping = { price_data: { currency: 'usd', product_data: {name: 'shipping'}, unit_amount: shippingCost}, quantity: 1} 
  const processItem = item => (
    {
        price_data: {
            currency: 'usd',
            product_data: {name: item.name},
            unit_amount: item.price * 100 
        }, 
        quantity: item.quantity
    }
 )
  const order = items.map(processItem)
  const orderWithShipping = order.concat(shipping)
  return (<button className="btn btn-outline-primary btn-lg mt-3 btn-block" onClick={() => processPayment(orderWithShipping)} disabled={isValid}>Checkout</button>);
}
export default Payment;
