import React, { useState } from 'react';
import {MdNavigateBefore, MdNavigateNext} from 'react-icons/md'
import './style.scss';

export interface Movie {
	id: number;
	type: number;
	adult: boolean;
	overview: string;
	backdrop_path: string;
	popularity: number;
	poster_path: string;
	vote_average: string;
	name: string;
	length: string;
	number_of_seasons: string;
}

interface MovieRowProps {
	title: string;
	items: Movie[];
}

export default function MovieRow({ title, items }: MovieRowProps) {
	const [scrollX, setScrollX] = useState<number>(0)
	const handlerLeftArrow = () => {
		let newScrollX = scrollX + Math.round(window.innerWidth / 2);
		if(newScrollX > 0) {
			newScrollX = 0
		}
		setScrollX(newScrollX);
	}

	const handlerRightArrow = () => {
		let newScrollX = scrollX - Math.round(window.innerWidth / 2);
		let listWidth = items.length * 150;
		if((window.innerWidth - listWidth) > newScrollX) {
			newScrollX = (window.innerWidth - listWidth) - 60;
		}

		setScrollX(newScrollX)
	}
	return (
		<div className="movieRow">
			<h2>{title}</h2>
			<div className="movieRowLeft" onClick={handlerLeftArrow}>
				<MdNavigateBefore size={50}/>
			</div>
			<div className="movieRowRight" onClick={handlerRightArrow}>
				<MdNavigateNext size={50} />
			</div>
			<div className="movieRowListArea">
				<div className="movieRowList" style={{
					marginLeft: scrollX,
					width: items.length * 150
				}}>
					{items.length > 0 && items.map((item) => (
						<div key={item.id} className="movieRowItem">
							<img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.name} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}