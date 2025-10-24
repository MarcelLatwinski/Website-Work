import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

// Each project in the Projects.jsx file gets rendered with the project component

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  //   Tracks whether the modal is hidden or showing
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
    //   Image is Previewed when mouse hovers over project, but dissapears when leaves
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
                // Loops through tag array and outputs each as a span
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
        // Clicking triggers the conditional render of the ProjectDetails Modal
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-5" alt="arrow right" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {/* If isHidden is True (it was clicked) then it calls the projectdetails func and passes all the info into it. */}
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
        //   Passes closeModal so the modal can close itself when the X button is clicked
          closeModal={() => setIsHidden(false)} 
        />
      )}
    </>
  );
};

export default Project;
