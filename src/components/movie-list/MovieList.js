import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './movie-list.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../button/Button';
import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		const getList = async () => {
			let response = null;
			const params = {};
			try {
				if (props.type !== 'similar') {
					switch (props.category) {
						case category.movie:
							response = await tmdbApi.getMoviesList(props.type, { params });
							break;
						case category.tv:
							response = await tmdbApi.getTvList(props.type, { params });
							break;

						default:
							response = await tmdbApi.getMoviesList(props.type, { params });
							break;
					}
				} else {
					response = await tmdbApi.similar(props.category, props.id);
				}
				setItems(response.results);
			} catch (error) {
				console.log(error);
			}
		};
		getList();
	}, []);
	return (
		<div className='movie-list'>
			<Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
				{items.map((item, indx) => (
					<SwiperSlide key={indx}>
						<MovieCard item={item} category={props.category} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

MovieList.propTypes = {
	category: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default MovieList;
