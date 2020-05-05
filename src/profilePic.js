import React from "react";

// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function Presentational({ first, last, imageUrl }) {
    // console.log('props in Presentational: ', props);

    imageUrl = imageUrl || "default.png";
    return (
        <div>
            <h2>
                Hi there {first} {last}.
            </h2>

            <img
                width="200"
                alt={{ first } + { last }}
                className="profile-pic"
                src={imageUrl}
            />
        </div>
    );
}
