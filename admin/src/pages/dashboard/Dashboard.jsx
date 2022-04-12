import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import './dashboard.scss'
const Dashboard = () => {
  
  // const [userStats, setUserStats] = useState([]);

  // const MONTHS = useMemo(
  //   () => [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Agu",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ],
  //   []
  // );

  // useEffect(() => {
    // const getStats = async () => {
    //   try {
    //     const res = await userRequest.get("/users/stats");
    //     res.data.map((item) =>
    //       setUserStats((prev) => [
    //         ...prev,
    //         { name: MONTHS[item._id - 1], "Active User": item.total },
    //       ])
    //     );
    //   } catch {

    //   }
    // };
    // getStats();
  // }, [MONTHS]);

  return (
    <>
    <Sidebar />
    <div className='dashboard' >
      
    </div>
    </>
  )
}

export default Dashboard