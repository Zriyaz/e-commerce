import React, {useState} from 'react'
import {Form, Button,Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import {savePaymentMethod} from "../actions/cartActions"
import CheckOutStep from '../components/CheckOutStep'

const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress){
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckOutStep step1 step2 step3 />
            <h1>Payment Methods</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as ="legend">
                        Select Method
                    </Form.Label>
                
                <Col>
                    <Form.Check 
                     value="PayPal" 
                     checked 
                     onChange={(e)=>setPaymentMethod(e.target.value)} 
                     type="radio" 
                     label="PayPal or Credit Card" 
                     id="PayPal" 
                     name="paymentMethod"                     
                     ></Form.Check>

                     <Form.Check 
                     value="Strip" 
                     onChange={(e)=>setPaymentMethod(e.target.value)} 
                     type="radio" 
                     label="Strip or Debit or Credit Card" 
                     id="Strip" 
                     name="paymentMethod"                     
                     ></Form.Check>
                </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
