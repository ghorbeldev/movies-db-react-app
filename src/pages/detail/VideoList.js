import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';

const VideoList = ({ id }) => {
	const { category } = useParams();
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const getCredits = async () => {
			const response = await tmdbApi.getVideos(category, id);
			console.log(response);
			setVideos(response.results);
		};
		getCredits();
	}, [category, id]);
	return (
		<>
			{videos.map((video, i) => (
				<Video item={video} key={i} />
			))}
		</>
	);
};
const Video = ({ item }) => {
	const iframeRef = useRef('');
	useEffect(() => {
		const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
		iframeRef.current.setAttribute('height', height);
	}, []);
	return (
		<div className='video'>
			<div className='video__title'>
				<h2>{item.name}</h2>
			</div>
			<iframe
				src={`https://www.youtube.com/embed/${item.key}`}
				title={item.name || 'Video'}
				width='100%'
				ref={iframeRef}
			></iframe>
		</div>
	);
};
export default VideoList;
