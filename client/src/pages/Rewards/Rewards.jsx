import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Rewards = () => {
    const {t} = useTranslation();
    const rewardsData = t('rewards').split('+');
    const [Points,crieteria,crieteria1,crieteria2,crieteria3,badges,bList,bl1,bd1,bl2,bd2,bl3,bd3,bl4,bd4,bl5,bd5] = rewardsData;
    // console.log(rewardsData);
    const navigate = useNavigate()
    let currentProfile = null;
    var user = useSelector((state)=> (state.currentUserReducer))
    if(user === null)
      navigate('/auth');
    // console.log("rewards page loaded");
      const users = useSelector((state) => state.usersReducer);
      currentProfile = users?.filter((use) => use._id === user?.result?._id)[0];

  return (
    <div>
      <LeftSidebar />
      <div className="row text-center">
      <div className="col-sm-4 d-flex justify-content-center align-items-center">
      <h2>{Points}: {currentProfile?.points}</h2>
      </div>
      <div className="col-sm-8 d-flex justify-content-center">
      <ul className="list-group ">
  <li className="list-group-item"><h4>{crieteria}</h4></li>
  <li className="list-group-item">{crieteria1}</li>
  <li className="list-group-item">{crieteria2}</li>
  <li className="list-group-item">{crieteria3}</li>
</ul>
        </div>
      </div>
      <div className="row text-center">
      <div className="badges col-sm-4 mt-5">
      {/* {console.log(currentProfile)} */}
      <h2 >{badges}</h2>
      {
        currentProfile?.badge.map((badge) => ([
          <span className="badge bg-primary py-2 px-3 ml-5 d-inline-block mt-2" key = {badge}> {badge} </span>,<br/>
        ]))
      }
      
      </div>
        <div className="col-sm-8 d-flex justify-content-center">
        <table className="table table-bordered mt-5">
  <thead>
    <tr>
      <td colSpan={2}>{bList}</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{bl1}</th>
      <td>{bd1} </td>
    </tr>
    <tr>
      <th scope="row">{bl2}</th>
      <td>{bd2}</td>
    </tr>
    <tr>
      <th scope="row">{bl3}</th>
      <td>{bd3}</td>
    </tr>
    <tr>
      <th scope="row">{bl4}</th>
      <td>{bd4}</td>
    </tr>
    <tr>
      <th scope="row">{bl5}</th>
      <td>{bd5}</td>
    </tr>
  </tbody>
</table>
        </div>

      </div>
        
    </div>
  )
}

export default Rewards
