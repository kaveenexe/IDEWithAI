import React from "react";

function UserRetrieve() {

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="m-3">
      <h5 style={{textAlign:"center"}}>Hi, {userData.fname}</h5>
      <p style={{textAlign:"center", fontSize: "14px"}}>You can manage your notifications and personal information here</p>
    </div>
  );
}

export default UserRetrieve;
