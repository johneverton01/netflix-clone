import React, { useEffect, useState } from 'react';
import { FaPlay, FaPlus } from 'react-icons/fa'
import api from '../../services/api';
import { Movie } from "../MovieRow";

import './style.scss';

export interface FeaturedMovieProps {
	item: Movie;
}

interface Genres {
	name: string
}

interface MovieInfo {
	id: number,
	backdrop_path: string,
	original_name: string,
	first_air_date: string,
	vote_average: number,
	number_of_seasons: number
	overview: string,
	genres: Genres[]
}

export default function FeaturedMovie({ item }: FeaturedMovieProps) {
	const [movie, setMovie] = useState<MovieInfo>();
	const { id } = item;

	const getMovieInfo = async (movieId: number, type: string) => {
		let info: MovieInfo;
		if (movieId) {
			switch (type) {
				case 'movie':
					info = await api.get(`/movie/${movieId}?language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
						.then(response => {
							let genres = [];
							for (let i in response.data.genres) {
								genres.push(response.data.genres[i].name)
							}
							return {
								id: response.data.id,
								backdrop_path: response.data.backdrop_path,
								original_name: response.data.original_name,
								first_air_date: response.data.first_air_date,
								vote_average: response.data.vote_average,
								number_of_seasons: response.data.number_of_seasons,
								overview: response.data.overview,
								genres,
							}
						});
					break;
				case 'tv':
					info = await api.get(`/tv/${movieId}?language=pt-BR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
					.then(response => {
						let genres = [];
							for (let i in response.data.genres) {
								genres.push(response.data.genres[i].name)
							}
						return {
							id: response.data.id,
							backdrop_path: response.data.backdrop_path,
							original_name: response.data.original_name,
							first_air_date: response.data.first_air_date,
							vote_average: response.data.vote_average,
							number_of_seasons: response.data.number_of_seasons,
							overview: response.data.overview,
							genres
						}
					});
					break
				default:
					info = {} as MovieInfo;
			}

			setMovie(info);
		}
	}

	let description = item.overview;
	if (description.length > 200) {
		description = `${description.substring(0, 200)}...`
	}

	useEffect(() => {
		getMovieInfo(id, 'tv');
	}, [id]);

	const firstDate = new Date(movie?.first_air_date as string);

	return (
		<section
			className="featured"
			style={{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
			}}
		>
			<div className="featuredVertical">
				<div className="featuredHorizontal">
					<h1>{movie?.original_name}</h1>
					<div className="featuredInfo">
						<div className="featuredPoints">{movie?.vote_average} pontos</div>
						<div className="featuredYear">{firstDate.getFullYear()}</div>
						<div className="featuredSeasons">{movie?.number_of_seasons} {movie?.number_of_seasons !== 1 ? 'temporadas' : 'temporada'}</div>
					</div>
					<div className="featuredDescription">{description}</div>
					<div className="featuredButtons">
						<a className="featuredWatchButton" href={`/watch/${movie?.id}`}> <FaPlay size={ 15 }/> Assistir</a>
						<a className="featuredMyListButton" href={`/list/add/${movie?.id}`}> <FaPlus size={15} /> Minha Lista</a>
					</div>
					<div className="featuredGenres">
						<strong>Gêneros:</strong> {movie?.genres.join(', ')}
					</div>

				</div>
			</div>
		</section>
	);
}