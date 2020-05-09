import React from "react";

// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function ProfilePic({ first, last, image_url, toggleUploader }) {
    // console.log('props in Presentational: ', props);
    image_url = image_url || "default.png";
    return (
        <div>
            <img
                width="200"
                alt={`${first} ${last}`}
                className="profile-pic"
                src={image_url}
                onClick={toggleUploader}
            />
        </div>
    );
}
