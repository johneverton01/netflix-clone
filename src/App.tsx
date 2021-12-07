import React, { useEffect, useState } from 'react';
import MovieRow, { Movie } from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import api from './services/api';

import './App.scss';
import Header from "./components/Header";

interface MovieList {
	slug: string;
	title: string;
	items: Movie[];
}

export default function App() {
	const [movieList, setMovieList] = useState<MovieList[]>([]);
	const [featureData, setFeatureData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);

	const getHomeList = async () => {
		return [
			{
				slug: 'originals',
				title: 'Originais do Netflix',
				items: await api.get(`/discover/tv?with_network=213&language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'trending',
				title: 'Recomendados para você',
				items: await api.get(`/trending/all/week?language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'toprated',
				title: 'Em alta na Netflix',
				items: await api.get(`/movie/top_rated?language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'action',
				title: 'Ação',
				items: await api.get(`/discover/movie?with_genres=28&language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'comedy',
				title: 'Comédia',
				items: await api.get(`/discover/movie?with_genres=35&language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'horror',
				title: 'Terror',
				items: await api.get(`/discover/movie?with_genres=27&language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'romance',
				title: 'Romance',
				items: await api.get(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
			{
				slug: 'documentary',
				title: 'Documentários',
				items: await api.get(`/discover/movie?with_genres=99&language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => { return response.data })
			},
		];
	}

	const loadAll = async () => {
		const list = await (await getHomeList()).map(listItem => {
			return {
				slug: listItem.slug,
				title: listItem.title,
				items: listItem.items.results.map((item: Movie) => {
					return {
						id: item.id,
						type: item.type,
						adult: item.adult,
						overview: item.overview,
						backdrop_path: item.backdrop_path,
						popularity: item.popularity,
						poster_path: item.poster_path,
						vote_average: item.vote_average,
						name: item.name,
						length: item.length,
						number_of_seasons: item.number_of_seasons
					}
				}),
			}
		});

		setMovieList(list);
		const originals = list.filter(item => item.slug === 'originals');
		const randomChosen = Math.floor(Math.random() * (originals[0].items.length - 1));
		const chosen = originals[0].items[randomChosen];
		setFeatureData(chosen);
	}

	const scrollListener = () => {

		if (window.scrollY > 10) {
			setBlackHeader(true);
		} else {
			setBlackHeader(false);
		}

		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		}



	}
	console.log(movieList.length)

	useEffect(() => {
		loadAll();
		scrollListener();
	}, []);

	return (
		<>
			{movieList.length === 0 &&
				<div className="loading">
					<img src="/images/Netflix_LoadTime.gif" alt="Carregando..." />
				</div>
			}
			<main className="page">
				<Header black={blackHeader} />
				{featureData &&
					<FeaturedMovie item={featureData} />
				}
				<section className="lists">
					{movieList.map((item: MovieList) => (
						<div key={item.title}>
							<MovieRow key={item.title} title={item.title} items={item.items} />
						</div>
					))}
				</section>
			</main>
			<footer>
				Feito com <span role="img" aria-label="coração">❤️</span> por John Everton <br />
				Deireitos de imagem para Netflix<br />
				Utilizando a API da Themoviedb.org
			</footer>
		</>
	)
}