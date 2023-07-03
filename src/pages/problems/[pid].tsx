import Topbar from "@/components/Topbar/Topbar";
import React from "react";

type ProblemPageProps = {};
// work here
const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <div>
      <Topbar problemPage={true} />
    </div>
  );
};
export default ProblemPage;
