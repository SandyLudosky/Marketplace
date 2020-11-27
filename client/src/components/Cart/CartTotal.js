import React from 'react'; 
 import { useSelector } from "react-redux";
import { selectCartTotal, selectDeliveryCost } from '../../lib/state/selectors'

const CartTotal = () => { 
	const total = useSelector(selectCartTotal)
	const deliveryCost = useSelector(selectDeliveryCost)

    return (
   <>
		<div className="card mb-3">
			<div className="card-body">
			<form>
				<div className="form-group">
					<label>Have coupon?</label>
					<div className="input-group">
						<input type="text" className="form-control" name="" placeholder="Coupon code" />
						<span className="input-group-append"> 
							<button className="btn btn-primary">Apply</button>
						</span>
					</div>
				</div>
			</form>
			</div> 
		</div>  
		<div className="card">
			<div className="card-body">
					<dl className="dlist-align">
					  <dt>SubTotal:</dt>
                        <dd className="text-right">${total}</dd>
					</dl>
					<dl className="dlist-align">
					  <dt>Delivery:</dt>
						<dd className="text-right">${deliveryCost}</dd>
					</dl>
					<dl className="dlist-align">
					  <dt>Discount:</dt>
					  <dd className="text-right">---</dd>
					</dl>
					<dl className="dlist-align">
					  <dt>Total:</dt>
					  <dd className="text-right  h5"><strong>${(total + deliveryCost).toFixed(2)}</strong></dd>
					</dl>
					<hr />
					<p className="text-center mb-3">
						<img src="images/misc/payments.png" height="26" />
					</p>
					
			</div> 
		</div>  
    </>
)}
export default CartTotal