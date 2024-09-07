import React from "react";

interface WorksapceIdPage {
  params: {
    workspaceId: string;
  };
}

const WorksapceIdPage = ({ params }: WorksapceIdPage) => {
  return <div>Id: {params.workspaceId}</div>;
};

export default WorksapceIdPage;
