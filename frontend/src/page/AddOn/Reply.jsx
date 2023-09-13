import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import configData from '../.././environments/config.json';
import moment from 'moment';
import { DataContext } from '../../context/DataContext';

function Reply(props) {
  const [replyData, setReplyData] = useState([]);
  const [stat, setStat] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { review, setReview, userData, setUserData } = useContext(DataContext);
  const getData = async (id) => {
    if (stat) {
      setReplyData([]);
      setStat(false);
      return;
    }
    await axios(`${configData.baseUrl}/commentReply/` + id)
      .then(response => {
        setReplyData(response.data.reviewData);
        setStat(true);
      });
  }
  const focusInput = (i) => {
    const inputField = document.getElementById('form4Example6');
    if (inputField) {
      setReview('@' + i.username + ' ');
      setUserData(i);
      props.refs.current.focus();
    }
  };


  useEffect(() => {
    setReview('');
    setUserData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div >
      <i className="fas fa-quote-left pe-2"></i>
      <small className='text-break'>
        {props.item.comment}
      </small>
      {
        props.item.replyCount > 0 &&
        <div>
          <div onClick={() => getData(props.item.id)}>
            <small>
              <div className='d-flex align-items-center' style={{ width: '130px' }}>
                <hr style={{ flex: 1, borderTop: '0px solid black', opacity: '0.2' }} />
                {stat ? "Hide replies" : "Show " + props.item.replyCount + " more"}
              </div>
            </small>
          </div>
        </div>
      }

      {
        replyData &&
        <table className='table'>
          <tbody>
            {
              replyData.map((item, i) => {
                return <tr key={i} className='d-flex border-bottom'>
                  <img src={`https://picsum.photos/200/300?random=${i + 1}`}
                    className="rounded-circle " width="50" height="50" alt='no_img' />
                  <small >
                    <b>{item.username}</b> <small> {moment(item.createdAt).fromNow()}</small>
                    <p className='text-break'>
                      <small>
                        {item.reply}
                      </small>
                    </p>

                  </small>
                  {/* {i < replyData.length && <hr style={{ flex: 1, borderTop: '0px solid black', opacity: '0.2', width: '100%' }} ></hr>} */}
                  <div onClick={() => focusInput(item)}>
                    <i className="fa fa-reply text-center pt-3" aria-hidden="true" style={{ fontSize: '15px' }}></i>
                  </div>
                </tr>
              })
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export default Reply;