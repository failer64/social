import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'

let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'It\'s ms first post!', img: 'https://shapka-youtube.ru/wp-content/uploads/2020/08/man-silhouette.jpg', likesCount: 5 },
				{ id: 2, message: 'Hey bro, how are you?', img: 'https://uprostim.com/wp-content/uploads/2021/03/image086-77.jpg', likesCount: 2 },
				{ id: 3, message: 'Lorem ipsum dolor sit amet.', img: 'https://phonoteka.org/uploads/posts/2021-07/1625674160_1-phonoteka-org-p-krutaya-panda-art-krasivo-1.jpg', likesCount: 15 },
			],
			newPostText: '',
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Andrew' },
				{ id: 2, name: 'Dmitry' },
				{ id: 3, name: 'Sasha' },
				{ id: 4, name: 'Lesha' },
				{ id: 5, name: 'Gena' },
			],
			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'How are you?' },
				{ id: 3, message: 'Yo' },
				{ id: 4, message: 'Yo' },
				{ id: 5, message: 'lorem' },
			],
			newMessageText: '',
		},
		sidebar: {
			links: [
				{ link: 'profile', name: 'profile' },
				{ link: 'dialogs', name: 'messages' },
				{ link: 'news', name: 'news' },
				{ link: 'music', name: 'music' },
				{ link: 'settings', name: 'settings' },
			],
			friends: [
				{ name: 'Andrew' },
				{ name: 'Sasha' },
				{ name: 'Gena' },
			],
		}
	},
	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);
	},
}

export default store;