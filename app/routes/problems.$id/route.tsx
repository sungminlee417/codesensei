import type { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";
import { useLoaderData, Link } from "@remix-run/react";
import type { Problem } from "@prisma/client";

type LoaderData = { problem: Problem | null };

export const loader: LoaderFunction = async ({ params }) => {
  const problem = await prisma.problem.findUnique({
    where: { id: params.id! },
  });
  return { problem };
};

export default function ProblemDetail() {
  const { problem } = useLoaderData<LoaderData>();

  if (!problem) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <p>Problem not found.</p>
        <Link to="/problems" className="text-blue-600 underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">{problem.title}</h1>
      <a
        href={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View on LeetCode
      </a>

      <p className="mt-4">
        <strong>Difficulty:</strong> {problem.difficulty}
      </p>
      <p>
        <strong>Enjoyment:</strong> {problem.enjoyment}
      </p>
      <p>
        <strong>Felt Difficulty:</strong> {problem.feltHard}
      </p>
      <p>
        <strong>Confidence:</strong> {problem.confidence}
      </p>

      {problem.notes && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Notes</h2>
          <p>{problem.notes}</p>
        </div>
      )}

      <Link
        to="/problems"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to list
      </Link>
    </div>
  );
}
