import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Form, Row, Col, Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import { listProducts, deleteProduct, createProduct } from "../actions/productActions"
import {PRODUCT_CREATE_RESET} from "../constants/productConstants"
import Paginate from '../components/Paginate'

const ProductListScreen = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { products, page, pages, error, loading } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { success:successDelete, error:errorDelete, loading:loadingDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success:successCreate, error:errorCreate, loading:loadingCreate, product:createdProduct } = productCreate

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, history, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure to delete the record?")){
            dispatch(deleteProduct(id))
           
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }   
    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col>
                <h1>All Product List</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                      <i className=" mr-1 fas fa-plus"></i>Create Product  
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <Table striped borered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGRY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>

                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    {product.price}
                                </td>
                                <td>
                                   {product.category}
                                </td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button onClick={() => deleteHandler(product._id)} variant="danger" className="btn-sm" >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin = {true}/>
                </>
            )}
        </React.Fragment>
    )
}

export default ProductListScreen
