import { Pokemon, getPokemon } from "@/utils/apis/pokemon";
import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import PokeCard from "@/components/poke-card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@/utils/useQuery";
import { useSearch } from "@/hooks/userSearch";

const Home = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { query: searchQuery } = useSearch(); // ⬅️ state global dari Header
  const [poke, setPoke] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon();
  }, [query, searchQuery]); // ⬅️ dengerin juga searchQuery

  const fetchPokemon = async () => {
    try {
      // 🔹 Kalau ada searchQuery → mode pencarian
      if (searchQuery && searchQuery.trim().length > 0) {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();

        const filtered = data.results.filter((p: Pokemon) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setPoke(filtered);
        return;
      }

      // 🔹 Kalau ga ada search → mode default (pagination)
      const offset = query.get("offset") === null ? 0 : query.get("offset");
      const result = await getPokemon(offset as number);
      setPoke(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    const offset =
      query.get("offset") === null
        ? 0
        : parseInt(query.get("offset") as string, 10);

    navigate(`/?offset=${offset + 20}`);
  };

  const handleBack = () => {
    const offset =
      query.get("offset") === null
        ? 0
        : parseInt(query.get("offset") as string, 10);

    if (offset > 0) {
      navigate(`/?offset=${offset - 20}`);
    }
  };

  return (
    <Layout>
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-3 p-6">
        {poke.map((item, index) => (
          <PokeCard data={item} key={index} />
        ))}

        {/* 🔹 Tombol pagination cuma muncul kalau lagi di mode default */}
        {!searchQuery && (
          <div className="col-span-2 flex justify-between">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 192 512"
              className="h-10 w-10 cursor-pointer text-black dark:text-white"
              onClick={handleBack}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path>
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 192 512"
              className="h-10 w-10 cursor-pointer text-black dark:text-white"
              onClick={handleNext}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
            </svg>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
