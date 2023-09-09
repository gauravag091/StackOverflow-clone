import React from 'react'
import {useTranslation} from 'react-i18next'


const ProfileBio = ({currentProfile}) => {
    const {t} = useTranslation();
    const profile_data = t('profile').split('+');
    const[points,badges,tags_watched,About,No_bio] = profile_data;
  return (
    <div className='row  justify-content-end'>
    <div className="points">
        <h3>{points} {currentProfile?.points}</h3>
    </div>
    <div className="badges">
    { currentProfile?.badge.length !== 0 && <h2 >{badges}</h2>}
    
      {
        currentProfile?.badge.map((badge) => ([
          <span className="badge bg-primary py-2 px-3  d-inline-block mt-2" key = {badge}> {badge} </span>,<br/>
        ]))
      }
    </div>
        <div>
        {
            currentProfile?.tags.length !== 0 ? (
                <>
                    <h4 >{tags_watched}</h4>
                    {
                        currentProfile?.tags.map((tag) => (
                            <p key={tag}>{tag}</p>
                        ))
                    }
                </>
            ): (
                <p>0 {tags_watched}</p>
            )
        }
        </div>
        <div>
            {
                currentProfile?.about ? (
                    <>
                        <h4>{About}</h4>
                        <p>{currentProfile?.about}</p>
                    </>
                ) : (
                    <p>{No_bio}</p>
                )
            }
        </div>
    </div>
  )
}

export default ProfileBio
