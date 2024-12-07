import React,{useState,useEffect} from 'react'
import MeetingCard from './MeetingCard'

const Meeting = () => {

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    (async ()=>{
      try {
        let res = await fetch("http://localhost:4000/meeting/");
        res = await res.json()
        if(res){
          setMeetings(res?.data)
        }
      } catch (error) {
        console.log(error);
      }
    })()
}, [meetings]);


  return (
    <div>
      <h1 className='text-2xl capitalize px-10 text-white mb-10'>your meetings</h1>
      {meetings.map(meeting => <MeetingCard meeting={meeting} />)}
    </div>
  )
}

export default Meeting