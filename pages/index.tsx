import {
  Contact,
  Projects,
  Welcome,
} from "@/components";
import { Inter } from "next/font/google";
import { PinnedRepos } from "./api/pinned-repos";
import { RepoImage } from "@/models/project.model";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [imageUrls, setImageUrls] = useState<RepoImage[]>();
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepos[]>();

  useEffect(() => {
    const fetchRepos = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinned-repos`);
      const pinnedRepos = (await res.json()) as { data: PinnedRepos[] };
  
      let imageUrls: RepoImage[] = [];
      pinnedRepos.data.forEach((repo) => {
        imageUrls.push({ url: `${repo.url}/blob/main/demo.gif?raw=true`, repo: repo.name })
      });
  
      setImageUrls(imageUrls);
      setPinnedRepos(pinnedRepos.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchRepos();
  }, []);

  return (
    <main className={`${inter.className}`}>
      <Welcome />
      <Projects imageUrls={imageUrls ?? []} pinnedRepos={pinnedRepos ?? []}  />
      <Contact />
    </main>
  );
}
