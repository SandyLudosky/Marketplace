import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../lib/state/actions'

const Product = ({ id, name, price, category }) => {
    const dispatch = useDispatch()
    const addToCartAction = () => dispatch(addToCart({ id, name, price }))

    return (
    <div className="col-sm-4 col-6">
        <div className="card card-product-grid">
            <a href="#" className="img-wrap"> <img src={ `images/items/${id}.jpg`} /> </a>
            <figcaption className="info-wrap">
                <ul className="rating-stars mb-1">
                    <li style={{width: '80%'}} className="stars-active">
                        <img src="images/icons/stars-active.svg" alt="" />
                    </li>
                    <li>
                        <img src="images/icons/starts-disable.svg" alt="" />
                    </li>
                </ul>
                <div>
                    <a href="#" className="text-muted">{ category}</a>
                    <a href="#" className="title">{ name }</a>
                </div>
                <div className="price h5 mt-2">${ price }</div>
                    <div className="btn-group btn-group-toggle float-right" data-toggle="buttons">
                        <label className="btn btn-warning active">
                            <input type="radio" name="options" id="option1" checked /><i className="fas fa-heart"></i>
                        </label>

                        <label className="btn btn-success">
                            <input onClick={addToCartAction} type="radio" name="options" id="option3" /><i className="fas fa-shopping-cart"></i>
                        </label>
                    </div>        
            </figcaption>
        </div>
    </div>)
 }
export default Product