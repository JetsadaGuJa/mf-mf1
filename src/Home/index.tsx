import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import {
  Container,
  MainTitle,
  Pokemon as PPokemon,
  Pagination,
  Loading,
} from "./styles";
import PokemonLogo from "../assets/pokemon.png";
import LoadingIcon from "../assets/loading.png";
import { Link } from "react-router-dom";
import { GlobalStyle } from "../styles/GlobalStyles";

interface IPokemon {
  name: string;
  url: string;
}

interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: IPokemon[];
}

export default function Home(): JSX.Element {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<ApiResponse>(baseUrl + "&offset=0").then((response) => {
      setResponse(response.data);
      setLoading(false);
    });
  }, []);

  const changePage = useCallback(
    async (type: "next" | "previous") => {
      if (!response || !response[type]) {
        return;
      }

      setLoading(true);

      const { data } = await axios.get<ApiResponse>(response[type] as string);

      setResponse(data);

      setLoading(false);
    },
    [response, setResponse, setLoading]
  );

  return (
    <Container>
      <GlobalStyle />
      <MainTitle>
        <img src={PokemonLogo} alt="Pokemon logo" />
      </MainTitle>
      {!response || loading ? (
        <Loading>
          <img src={LoadingIcon} alt="Loading Icon" />
        </Loading>
      ) : (
        <>
          {response.results.map((pokemon) => (
            <PPokemon key={pokemon.url}>
              <Link to={"/" + pokemon.name}>{pokemon.name}</Link>
            </PPokemon>
          ))}

          <Pagination isFirstPage={!response.previous}>
            <p onClick={() => changePage("previous")}>Previous | </p>
            <p onClick={() => changePage("next")}>Next</p>
          </Pagination>
        </>
      )}
    </Container>
  );
}

const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";
