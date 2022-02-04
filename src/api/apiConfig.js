const apiConfig = {
	baseUrl: 'https://api.themoviedb.org/3/',
	apiKey: '8cd734cbad818ac364bbd1710510ae69',
	originalImage: imgPath => `https://image.tmdb.org/t/p/original/${imgPath}`,
	w500Image: imgPath => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
