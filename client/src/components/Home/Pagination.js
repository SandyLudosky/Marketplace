import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from '../../lib/state/actions'

const Pagination = () => {
	const dispatch = useDispatch()
	const { items, pageIndex } = useSelector(state => ({ ...state.products }));
	const updatePage = (event, index) => {
		event.preventDefault()
		dispatch(setPage(index))
	}
	const Previous = React.useMemo(() => { 
		return { isDisabled: pageIndex === 0 }
	}, [pageIndex])
	const Next = React.useMemo(() => { 
		return { isDisabled: pageIndex === items.length - 1  }
	}, [pageIndex])
		
    return (
		!!items.length &&
		<nav aria-label="Page navigation example" className="float-right" style={{ marginBottom: '100px' }}>
			<ul className="pagination">
				<li className={`page-item ${ Previous.isDisabled ? 'disabled' : ''}`}><a className="page-link" href="#" onClick={(e) => updatePage(e, pageIndex - 1)}>Previous</a></li>
					{items.map((_, index) => <li key={index} className="page-item"><a className="page-link" onClick={(e) => updatePage(e, index)}>{ index + 1 }</a></li>)}						
				<li className={`page-item ${ Next.isDisabled ? 'disabled' : ''}`}><a className="page-link" href="#" onClick={(e) => updatePage(e, pageIndex + 1)}>Next</a></li>
			</ul>
		</nav>)
}
export default Pagination