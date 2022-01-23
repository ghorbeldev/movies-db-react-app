import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';

export const MainRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path='/:category/search/:keyword' element={<Catalog />} />
				<Route path='/:category/:id' element={<Detail />} />
				<Route path='/:category/genre/:genre_id' element={<Catalog />} />
				<Route path='/:category' element={<Catalog />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</div>
	);
};
export default MainRoutes;
