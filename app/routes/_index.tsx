import { prisma } from "~/lib/prisma.server";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Problem } from "@prisma/client";

export const loader: LoaderFunction = async () => {
  const problems = await prisma.problem.findMany({
    orderBy: { createdAt: "desc" },
  });
  return problems;
};

export default function Index() {
  const problems = useLoaderData<Problem[]>();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your LeetCode Problems</h1>
      <Link
        to="/problems/new"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Log a New Problem
      </Link>
      {problems.length === 0 ? (
        <p>No problems logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {problems.map((p) => (
            <li
              key={p.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  {p.title}
                </a>{" "}
                <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded text-sm">
                  {p.difficulty}
                </span>
              </div>
              <div className="space-x-4 text-sm text-gray-700">
                <span>Enjoyment: {p.enjoyment}</span>
                <span>Difficulty: {p.feltHard}</span>
                <span>Confidence: {p.confidence}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
