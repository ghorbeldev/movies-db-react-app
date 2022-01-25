import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/MovieCard';
import Input from '../input/Input';
import tmdbApi, {
	category as cate,
	movieType,
	tvType,
} from '../../api/tmdbApi';
import './movie-grid.scss';
import { useNavigate, useParams } from 'react-router';
import Button, { OutlineButton } from '../button/Button';
import { useCallback } from 'react';
import Dropdown from '../dropdown/Dropdown';
const MovieGrid = props => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(null);
	const { keyword, genre_id, category } = useParams();
	const loadMore = async () => {
		let response = null;
		if (keyword === undefined && genre_id === undefined) {
			const params = {
				page: page + 1,
			};
			switch (props.category) {
				case cate.movie:
					response = await tmdbApi.getMoviesList(movieType.upcoming, {
						params,
					});
					break;
				case cate.tv:
					response = await tmdbApi.getTvList(tvType.popular, { params });
					break;

				default:
					response = await tmdbApi.getMoviesList(movieType.popular, {
						params,
					});
			}
		} else if (keyword) {
			const params = {
				page: page + 1,
				query: keyword,
			};
			response = await tmdbApi.search(props.category, {
				params,
			});
		} else {
			const params = {
				page: page + 1,
				with_genres: genre_id,
			};
			response = await tmdbApi.get(`/discover/${category}`, { params });
			console.log(response);
		}

		setItems([...items, ...response.results]);
		setPage(page + 1);
	};
	useEffect(() => {
		const getList = async () => {
			let response = null;
			if (keyword === undefined && genre_id === undefined) {
				const params = {};
				switch (props.category) {
					case cate.movie:
						response = await tmdbApi.getMoviesList(movieType.upcoming, {
							params,
						});
						break;
					case cate.tv:
						response = await tmdbApi.getTvList(tvType.popular, { params });
						break;

					default:
						response = await tmdbApi.getMoviesList(movieType.popular, {
							params,
						});
				}
			} else if (keyword) {
				const params = {
					query: keyword,
				};
				response = await tmdbApi.search(props.category, {
					params,
				});
			} else {
				const params = {
					with_genres: genre_id,
				};
				response = await tmdbApi.get(`/discover/${category}`, { params });
				console.log(response);
			}

			setItems(response.results);
			setTotalPage(response.total_pages);
		};
		getList();
	}, [props.category, keyword, genre_id, category]);
	return (
		<>
			<div className='section mb-3'>
				<MovieSearch category={props.category} keyword={keyword} />
			</div>
			<div className='movie-grid'>
				{items.map((item, indx) => (
					<MovieCard category={props.category} item={item} key={indx} />
				))}
			</div>
			{page < totalPage ? (
				<div className='movie-grid__loadmore'>
					<OutlineButton className='small' onClick={loadMore}>
						Load More
					</OutlineButton>
				</div>
			) : null}
		</>
	);
};
const MovieSearch = props => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
	const goToSearch = useCallback(() => {
		if (keyword.trim().length > 0) {
			navigate(`/${cate[props.category]}/search/${keyword}`);
		}
	}, [keyword, props.category, navigate]);
	useEffect(() => {
		const enterEvent = e => {
			e.preventDefault();
			if (e.keyCode === 13) {
				goToSearch();
			}
		};
		document.addEventListener('keyup', enterEvent);
		return () => {
			document.removeEventListener('keyup', enterEvent);
		};
	}, [keyword, goToSearch]);
	return (
		<div className='sort'>
			<div className='movie-search'>
				<Input
					type='text'
					placeholder='Search...'
					value={keyword}
					onChange={e => setKeyword(e.target.value)}
				/>
				<Button className='small' onClick={goToSearch}>
					Search
				</Button>
			</div>
			<div className='gendre-select'>
				<Dropdown />
			</div>
		</div>
	);
};
export default MovieGrid;
