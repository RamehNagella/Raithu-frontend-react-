import React from "react";

const ViewDetails = () => {
  return <div>ViewDetails</div>;
};

export default ViewDetails;
/*

import { useParams } from 'react-router-dom';

function ViewDetails() {
  const { id } = useParams(); // Gets the grain._id from URL
  
  // Fetch grain details using this id
  useEffect(() => {
    // API call to get grain details by id
    fetch(`/api/grains/${id}`)
      .then(res => res.json())
      .then(data => setGrain(data));
  }, [id]);
  
  return (
    <div>
//       {/* Show grain details /}
//     </div>
//   );
// }
*/
