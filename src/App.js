import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import MainRoutes from './config/MainRoutes';

function App() {
	return (
		<BrowserRouter basename='/'>
			<Header />
			<MainRoutes />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
