import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import './dropdown.scss';
const Dropdown = () => {
	const { category } = useParams();
	const [active, setActive] = useState(false);
	const [selectedValue, setSelectedValue] = useState('all');
	const [genres, setGenres] = useState([]);
	useEffect(() => {
		const getGenres = async () => {
			const response = await tmdbApi.get(`/genre/${category}/list`, {
				params: {},
			});
			setGenres(response.genres);
		};
		getGenres();
	}, [category]);
	return (
		<div
			onClick={e => setActive(isActive => !isActive)}
			className={`dropdown ${active ? 'active' : ''}`}
		>
			<div className='dropdown-selected__option'>{selectedValue}</div>
			<div className='dropdown-menu'>
				{genres.map(item => {
					if (selectedValue !== item.name) {
						return (
							<Link
								to={`/${category}/genre/${item.id}`}
								key={item.name}
								className={`dropdown-menu__item`}
								onClick={() => setSelectedValue(item.name)}
							>
								{item.name}
							</Link>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Dropdown;
