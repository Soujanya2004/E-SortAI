import React from "react";

const Workflow = () => {
  // List of workflow images (local or external URLs)
  const workflowImages = [
    "https://www.orientalmotor.com/images/applications/a_conv_strt_stp.gif", // Local image (placed in the /public folder)
    "https://discovertemplate.com/wp-content/uploads/2020/08/DT_G28_Electronic-Device-Animated-GIF-Icon-pack.gif", // Local image
    "https://esourcingsolutions.in/wp-content/uploads/2022/02/ScholarlyWindyGardensnake-size_restricted.gif", // Local image
    "https://intechchennai.com/upload/solutions/solution-by-product/E072.gif", // External image
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Workflow Process
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={image}
                alt={`Workflow step ${index + 1}`}
                className="w-full h-72 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
