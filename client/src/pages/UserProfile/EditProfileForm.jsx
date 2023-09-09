import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { updateProfile } from '../../actions/users'
import {useTranslation} from 'react-i18next'

const EditProfileForm = ({currentUser, setSwitch}) => {
  const {t} = useTranslation();
  const edit_form_data = t('edit_form').split('+');
  const [edit_profile,Public,Display,About,Tags,cancel,save]  = edit_form_data;

    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
      e.preventDefault();
      if(tags.length === 0){
        dispatch(updateProfile(currentUser?.result?._id, {name, about, tags:currentUser?.result?.tags}))
      }
      else{
        dispatch(updateProfile(currentUser?.result?._id, {name, about, tags}))
      }
      setSwitch(false)
    }

  return (
    <div>
      <h1 className="edit-profile-title">
        {edit_profile}
      </h1>
      <h2 className="edit-profile-title-2">
        {Public}
      </h2>
      <form className='edit-profile-form'>
  <div className="form-group">
    <label for="name">{Display}</label>
    <input type="text" className="form-control" id="name" value = {name} onChange={(e) => setName(e.target.value)} name='name' />
  </div>
  
  <div className="form-group">
    <label for="about">{About}</label>
    <textarea className="form-control" id="about" name='about' rows="3" value = {about} onChange={(e) => setAbout(e.target.value)}></textarea>
  </div>

  <div className="form-group">
    <label for="tags">{Tags}</label>
    <input type="text" className="form-control" id="tags" onChange={(e) => setTags(e.target.value.split(' '))} name='tags' />
  </div>
  <input type="submit" onClick={handleSubmit} value={save} className='btn btn-primary' />
        <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>{cancel}</button>
</form>
      
    </div>
  )
}

export default EditProfileForm
