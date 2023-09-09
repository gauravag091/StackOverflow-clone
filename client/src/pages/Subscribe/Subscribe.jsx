import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useSelector, useDispatch } from 'react-redux'
import Auth from '../Auth/Auth';
import './subscribe.css'
import { subscribed } from '../../actions/users';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Subscribe = () => {
  const {t} = useTranslation();
  const [subscribed_to,card_details,subscribe_premium,select_plan,silver,gold,Amount,card_no,CVV,Submit] = t('subscribe').split('+');
  const[free_policy,silver_policy,gold_policy] = t('subscribe_policy').split('+');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[cardNumber,setCardNumber] = useState();
    const[cvv,setCvv] = useState();
    const[amount,setAmount] = useState(100);
    var user = useSelector((state)=> (state.currentUserReducer))
    // console.log(user);
    const handleChange1 = (e)=>{
        const amount = document.getElementById('amount');
        if(e.target.value === 'silver')
            setAmount(100)
        else if(e.target.value === 'gold')
            setAmount(1000);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const plan = document.getElementById('exampleFormControlSelect1').value;
        if(Number(cardNumber)=== 400010001 && cvv==100)
        {
            dispatch(subscribed(user.result._id,plan))
            alert(subscribed_to);
            navigate('/');
        }
        else
        {
            alert(card_details);
        }
    }
    if(user===null)
      {
        return(
            <>
                <Auth/>
            </>
        )
      }
    else
    {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
      <form className='subscribe-form w-lg-75' onSubmit={handleSubmit}>
      <h2>{subscribe_premium}</h2>
      <div className="form-group">
    <label for="exampleFormControlSelect1">{select_plan}</label>
    <select className="form-control" id="exampleFormControlSelect1" onSelect={handleChange1} onChange={handleChange1} defaultValue={'silver'}>
      <option value={'silver'} selected>{silver}</option>
      <option value={'gold'}>{gold}</option>
    </select>
  </div>
  <div className="form-group">
    <label for="amount">{Amount}</label>
    <input type="number" disabled value={amount} className="form-control" id="amount"/>
  </div>
  <div className="form-group">
    <label for="card-number">{card_no}</label>
    <input type="number" onChange={(e)=>{setCardNumber(e.target.value)}} className="form-control" id="card-number"/>
  </div>
  <div className="form-group">
    <label for="cvv">{CVV}</label>
    <input type="number" onChange={(e)=>{setCvv(e.target.value)}} className="form-control" id="cvv"/>
  </div>
  <button type="submit" className="btn btn-primary mt-3">{Submit}</button>
  <p className='mt-2'>
    <h4>{t('free')}</h4>
    <p>{free_policy}</p>
    <h4>{silver}</h4>
    <p>{silver_policy}</p>
    <h4>{gold}</h4>
    <p>{gold_policy}</p>
  </p>
</form>
      </div>
    </div>
  )
    }
}

export default Subscribe
