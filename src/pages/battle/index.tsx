import { Link, useNavigate, useParams } from "react-router-dom";
import { PokemonDetail, getPokemonDetail } from "@/utils/apis/pokemon";
import React, { useEffect, useState } from "react";
import { getPokemonsFromLocalStorage, isNicknameUsed, savePokemonsToLocalStorage } from "@/utils/savePoke";

import Layout from "@/components/layout";

const Battle = () => {
  const navigate = useNavigate();
  const { pokeId } = useParams();
  const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
  const [poke, setPoke] = useState<PokemonDetail | null>(null);
  const [nickname, setNickname] = useState("")

  useEffect(() => {
    if (pokeId) {
      fetchPokemon(pokeId);
    }
  }, [pokeId]);

  const fetchPokemon = async (id: string) => {
    try {
      const result = await getPokemonDetail(id);
      setPoke(result);
    } catch (error) {
      console.log(error);
    }
  };

  const catchPoke = () => {
    const catchProbability = Math.random();
    if (catchProbability <= 0.5) {
      setToggleSuccess(true);
    } else {
      alert("The Pokemon Broke Free!");
    }
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value
    setNickname(value)
  }

  const onSubmitPokemon = () => {
    const pokemons = getPokemonsFromLocalStorage();

    if (isNicknameUsed(pokemons, nickname)) {
      alert("Nickname already in use");
      return;
    }

    const dataPoke = poke ? { ...poke, nickname } : null;

    if (dataPoke) {
      const updatedPokemons = [...pokemons, dataPoke];
      savePokemonsToLocalStorage(updatedPokemons);
    }

    setToggleSuccess(false);
    navigate("/mypokemon")
  };

  return (
    <Layout>
      {poke && (
        <div className="grid h-full w-full grid-flow-col grid-rows-2 bg-[url('@/assets/battleground.png')] bg-cover bg-center bg-repeat">
          <div className="grid place-content-between justify-self-center">
            <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 bg-green-900">
              <p className="text-center font-arcade text-xs tracking-wide text-white">
                Wild {pokeId} appear!
              </p>
            </div>
            <img
              alt={pokeId}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png?w=640&q=75`}
              className="place-self-center self-end"
              width="300"
              height="300"
            />
          </div>
          <div className="grid auto-rows-max grid-cols-2 self-end">
            <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 bg-cyan-900">
              <p className="text-left font-arcade text-xs tracking-wide text-white text-border">
                What will
              </p>
              <p className="text-left font-arcade text-xs tracking-wide text-white text-border">
                You do?
              </p>
            </div>
            <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 bg-indigo-100">
              <div className="grid auto-rows-max grid-cols-2 mt-1">
                <button
                  className="text-center font-arcade text-xs tracking-wide text-black border rounded border-black"
                  onClick={catchPoke}
                >
                  CATCH
                </button>
                <Link to={"/"} className="text-center font-arcade text-xs tracking-wide text-black border rounded border-black ml-3">
                  RUN
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {toggleSuccess && (
        <div className="fixed inset-y-0 z-50 flex h-full min-w-full max-w-full items-center justify-center bg-black/50 md:min-w-[480px] md:max-w-[480px]">
          <div className="w-1/2 rounded-xl border-2 border-black bg-white p-5 dark:border-white dark:bg-neutral-800">
            <div className="mb-5">
              <p className="text-center font-arcade text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
                Congratulation!
              </p>
              <p className="text-center font-arcade text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
                You caught {pokeId}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <label className="block">
                <span className="block font-arcade text-sm font-medium text-neutral-800 dark:text-white">
                  Nickname:
                </span>
                <input
                  className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 font-arcade text-xs shadow-sm placeholder:italic focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-black"
                  type="text"
                  onChange={handleNickname}
                />
              </label>
              <button className="mt-4 rounded-xl border p-3 text-center font-arcade text-xs tracking-wide text-neutral-800 dark:text-white" onClick={onSubmitPokemon}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Battle;
