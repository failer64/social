import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { initApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import React, { useEffect } from "react";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

const App = (props) => {
	useEffect(() => {
		props.initApp();
	});

	//if (!props.init) {
	//return <Preloader/>
	//}
	return (<div className='wrapper'>
		< HeaderContainer />
		<main className='main'>
			< Sidebar />
			<section className='content'>
				<div className='container'>
					<React.Suspense fallback={<Preloader />}>
						<Routes>
							<Route path="/profile/:userId" element={<ProfileContainer />} />
							<Route path="/profile/" element={<ProfileContainer />} />
							<Route path="/dialogs/*" element={<DialogsContainer />} />
							<Route path="/news" element={<News />} />
							<Route path="/music" element={<Music />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/users" element={<UsersContainer />} />
							<Route path="/login" element={<LoginPage />} />
						</Routes>
					</React.Suspense>
				</div>
			</section>
		</main>
	</div>
	);

}

const mapStateToProps = (state) => ({ init: state.app.init })

let AppContainer = compose(
	connect(mapStateToProps, { initApp })
)(App);

const MainApp = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	)
}

export default MainApp;