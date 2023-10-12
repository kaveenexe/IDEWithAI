import React from "react";

function UserRetrieve() {

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="bg-dark text-light" style={{margin: "10px"}}>
      <h5 style={{textAlign:"center"}}>Hi, {userData.fname}</h5>
      <p style={{textAlign:"center", fontSize: "14px"}}>You can manage your notifications and personal information here</p>
    </div>
  );
}

export default UserRetrieve;
