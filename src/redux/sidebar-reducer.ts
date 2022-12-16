let initialState = {}

type InitialStateType = typeof initialState
type ActionsTypes = {
    type: string
}


const sidebarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
}


export default sidebarReducer;