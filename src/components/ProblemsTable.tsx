import { problems } from "@/mockProblems/problems";
import Link from "next/link";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
    <tbody className="text-white">
      {problems.map((doc, idx) => {
        return (
          <tr
            className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
            key={doc.id}
          >
            <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
              <BsCheckCircle fontSize={"18"} width="18" />
            </th>
            <td className="px-6 py-4">
              <Link className="hover:text-blue-600 cursor-pointer" href={`/problems/${doc.id}`}>
                {doc.title}
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
export default ProblemsTable;
