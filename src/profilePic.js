import React from "react";

// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function ProfilePic({ first, last, image_url }) {
    // console.log('props in Presentational: ', props);

    image_url = image_url || "default.png";
    return (
        <div>
            <h2>
                Hi there {first} {last}.
            </h2>

            <img
                width="200"
                alt={{ first } + { last }}
                className="profile-pic"
                src={image_url}
            />
        </div>
    );
}
