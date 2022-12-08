import styles from './Desc.module.css'
import Preloader from "../../common/Preloader/Preloader";
import StatusWithHooks from "./StatusWithHooks";
import defaultAvatar from './../../../assets/img/avatar.jpg'

const Description = (props) => {
	if (!props.userProfile) {
		return <Preloader />
	}
	return (
		<div className={styles.container}>
			<div className={styles.background}>
				<img
					src='https://catherineasquithgallery.com/uploads/posts/2021-02/1612704873_4-p-zelenii-fon-park-12.jpg'
					alt="" />
			</div>
			<div className={styles.body}>
				<div className={styles.avatar}>
					<div>
						<img src={props.userProfile.photos.small || defaultAvatar} alt="avatar" />
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.fullName}>
						{props.userProfile.fullName}
					</div>
					<div className={styles.status}>
						<StatusWithHooks userStatus={props.userStatus} updateStatus={props.updateStatus} />
					</div>
					<div className={styles.item}>
						{props.userProfile.aboutMe}
					</div>
					<div className={styles.item}>
						{props.userProfile.lookingForAJobDescription}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Description;