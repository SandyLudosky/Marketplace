	import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import Layout from './Layout'
import Row from "./Row";
import { selectCartTotal } from '../../lib/state/selectors'

const Cart = () => { 
	const { items } = useSelector(state => ({ ...state.cart }));
	const total = useSelector(selectCartTotal).toFixed(2)
	useEffect(() => { 
		localStorage.setItem('items', JSON.stringify(items))
		localStorage.setItem('total', total)
	}, [])
	return (
	<>
	<Layout>
		{items.length === 0 && <div className="d-flex align-items-center ml-3" style={{ fontSize: '22px'}}><p>Your Cart is Empty</p></div>}
				{items.map(item => <Row key={item.id} {...item} />)}	
	</Layout>
	</>
)}
export default Cart