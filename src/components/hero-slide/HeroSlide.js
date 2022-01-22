import React, { useState, useEffect, useRef } from 'react';
import './hero-slide.scss';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
const HeroSlide = props => {
	SwiperCore.use([Autoplay]);
	const [movieItems, setMovieItems] = useState([]);
	useEffect(() => {
		const getMovies = async () => {
			const params = { page: 1 };
			try {
				const response = await tmdbApi.getMoviesList(movieType.popular, {
					params,
				});
				setMovieItems(response.results.slice(0, 4));
			} catch (err) {}
		};
		getMovies();
	}, []);

	return (
		<div className='hero-slide'>
			<Swiper
				modules={[Autoplay]}
				grabCursor={true}
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{ delay: 3000 }}
			>
				{movieItems.map((movie, indx) => (
					<SwiperSlide key={indx}>
						{({ isActive }) => (
							<HeroSlideItem
								item={movie}
								className={isActive ? 'active' : ''}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>
			{movieItems.map((movie, indx) => (
				<TrailerModal key={indx} item={movie} />
			))}
		</div>
	);
};

const HeroSlideItem = ({ item, className }) => {
	const navigate = useNavigate();

	const setModalActive = async () => {
		const modal = document.getElementById(`modal_${item.id}`);
		let videos;
		try {
			videos = await tmdbApi.getVideos(category.movie, item.id);
		} catch (error) {
			console.log(error);
		}
		if (videos.results.length > 0) {
			const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
			modal
				.querySelector('.modal__content > iframe')
				.setAttribute('src', videoSrc);
		} else {
			modal.querySelector('.modal__content').innerHTML = 'No Trailer';
		}
		modal.classList.toggle('active');
	};
	const background = apiConfig.originalImage(
		item.backdrop_path ? item.backdrop_path : item.poster_path
	);

	return (
		<div
			className={`hero-slide__item ${className}`}
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<div className='hero-slide__item__content container'>
				<div className='hero-slide__item__content__info'>
					<h2 className='title'>{item.title}</h2>
					<div className='overview'>{item.overview}</div>
					<div className='btns'>
						<Button onClick={() => navigate('/movie/' + item.id)}>
							Watch now
						</Button>
						<OutlineButton onClick={setModalActive}>
							Watch trailer
						</OutlineButton>
					</div>
				</div>
				<div className='hero-slide__item__content__poster'>
					<img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
				</div>
			</div>
		</div>
	);
};

const TrailerModal = ({ item }) => {
	const iframeRef = useRef();
	const onClose = () => iframeRef.current.setAttribute('src', '');
	return (
		<Modal active={false} id={`modal_${item.id}`}>
			<ModalContent onClose={onClose}>
				<iframe
					ref={iframeRef}
					width='100%'
					height='500px'
					title='trailer'
				></iframe>
			</ModalContent>
		</Modal>
	);
};

export default HeroSlide;
