"use client";

import { SideBar } from "@/components/side-bar";
import { useFetchGroups } from "@/app/react-queries/group";
import Link from "next/link";

export default function Home() {
  const { data, isLoading } = useFetchGroups();
  return (
    <main>
      <div className={"flex gap-2"}>
        <SideBar />
        <div>
          <h1 className={"text-lg font-bold"}>
            Welcome to the Group Management App
          </h1>
          <section>
            <h2 className={"font-semibold"}>All group</h2>
            {isLoading ? (
              <p>Loading groups...</p>
            ) : (
              <ul>
                {data?.map((group) => (
                  <li key={group.id}>
                    <Link href={`/groups/${group.id}`}>{group.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
