
let initialState = {
	links: [
		{ link: 'profile/', name: 'profile' },
		{ link: 'dialogs/', name: 'messages' },
		{ link: 'news/', name: 'news' },
		{ link: 'music/', name: 'music' },
		{ link: 'settings/', name: 'settings' },
		{ link: 'users/', name: 'friends' },
	],
}

const sidebarReducer = (state = initialState, action = 1) => {
	switch (action.type) {
		default:
			return state;
	}
}


export default sidebarReducer;