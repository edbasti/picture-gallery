import React from "react";

const Photos = ({ data }) => {
    return (
        <div className="card-list">
            {data.map((pic) => (
                <div className="card" key={pic.id}>
                    <img
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.full}
                        width="50%"
                        height="50%"
                    ></img>
                </div>
            ))}{" "}
        </div>
    );
}

export default Photos;