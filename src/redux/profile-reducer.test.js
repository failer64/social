import profileReducer from "./profile-reducer";

let state = {
    posts: [
        {
            id: 1,
            image: 'https://shapka-youtube.ru/wp-content/uploads/2020/08/man-silhouette.jpg',
            postMessage: 'It\'s ms first post!',
            likesCount: '2',
        },
        {
            id: 2,
            image: 'https://uprostim.com/wp-content/uploads/2021/03/image086-77.jpg',
            postMessage: 'Hey bro, how are you?',
            likesCount: '5',
        },
    ]
}

it('length os posts should be incremented', () => {
    // 1. test data
    let action = addPost('new post');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(3);
});