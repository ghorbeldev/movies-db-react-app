import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
const CastList = ({ id }) => {
	const { category } = useParams();
	const [casts, setCasts] = useState([]);

	useEffect(() => {
		const getCredits = async () => {
			const response = await tmdbApi.credits(category, id);
			setCasts(response.cast.slice(0, 5));
		};
		getCredits();
	}, [category, id]);

	return (
		<div className='casts'>
			{casts.map((cast, indx) => (
				<div className='casts__item' key={indx}>
					<div
						className='casts__item__img'
						style={{
							backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`,
						}}
					></div>
					<p className='casts__item__name'>{cast.name}</p>
				</div>
			))}
		</div>
	);
};

export default CastList;
