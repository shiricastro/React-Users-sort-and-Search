import React from 'react';


export default (props) =>(
<div className="card">
  <img className="card-img-top" src={props.data.image} alt="Card image cap"/>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><span className="dis">id: </span>{props.data.id}</li>
    <li className="list-group-item"><span className="dis">Name: </span>{props.data.first_name}</li>
    <li className="list-group-item"><span className="dis">Last: </span>{props.data.last_name}</li>
    <li className="list-group-item"><span className="dis">Email: </span>{props.data.email}</li>
    <li className="list-group-item"><span className="dis">Gender: </span>{props.data.gender}</li>
  </ul>
</div>
);