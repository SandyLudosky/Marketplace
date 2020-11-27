import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Product from './Product'
import Pagination from './Pagination'
import { fetchProducts } from '../../lib/state/actions/index.js'

const Results = ({ items, pageIndex }) => !!items.length && items[pageIndex].map(product => <Product key={product.id} {...product}/>)
const Empty = ({ isVisible }) => !isVisible && <p style={{marginLeft: 18, fontSize: 18}}>No Listing available ... </p>
const Loading = ({ isLoading }) => isLoading && <p style={{marginLeft: 18, fontSize: 18}}>Loading... </p>

const Gallery = () => { 
	const dispatch = useDispatch()
	const state = useSelector(state => ({ ...state.products }));
	const { items, isLoading } = state
	React.useEffect(() => { 
		dispatch(fetchProducts())
	}, [])
	return (
	<>
		<section className="mt-3 mb-5">
			<header className="section-heading mb-5">
				<h3 className="title-section">Products</h3>
			</header>
			<div className="row">
				<Loading isLoading={isLoading} />
				<Results {...state}/>
				<Empty isVisible={!!items} />	
			</div> 
			<div className="clearfix"></div>
		</section>
		<Pagination />
	</>
	)
}
export default Gallery