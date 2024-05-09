import React from "react";

export const PictureProfil = () => {

    const name = localStorage.getItem("name")

    return (
        <div >
            {name}
        </div>
    );
};
