
import usersReducer, { InitialStateType, actions } from './usersReducer'


let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Seitkhan', followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Seitkhan', followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Seitkhan', followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Seitkhan', followed: true, photos: {small: null, large: null}, status: 'status 3'}
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        btnFollow: []
    }
})


test('follow success', () => {
    // Тест состоит из трех частей.
    // 1) Исходные данные, т.е. state.
    

    // 2) Делаем экшен. В моем случае Reducer.
    const newState = usersReducer(state, actions.followSuccess(1))

    // 3) expect. Тоест что-то такое что хотим, ожидаем видить
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('unfollow success', () => {
    // Тест состоит из трех частей.
    // 1) Исходные данные, т.е. state.
    

    // 2) Делаем экшен. В моем случае Reducer.
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    // 3) expect. Тоест что-то такое что хотим, ожидаем видить
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})
