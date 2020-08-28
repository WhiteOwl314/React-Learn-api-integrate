//이 함수는 파라미터로 액션의 타입 (예: GET_USER) 과
// Promise 를 만들어주는 함수를 받아옵니다.
export default function createAsyncDispatcher(type, promiseFn) {
    //성공, 실패에 대한 액션 타입 문자열을 준비합니다.
    const SUCCESS = `${type}_SUCCESS`;
    const ERRER = `${type}_ERRER`;

    //새로운 함수를 만듭니다.
    //...rest 를 사용하여 나머지 파라미터를 rest 배열에 담습니다.
    async function actionHandler(dispatch, ...rest) {
        dispatch({type}); //요청이 시작됨
        try{
            const data = await promiseFn(...rest);
            dispatch({
                type: SUCCESS,
                data
            }); //성공함
        } catch (e) {
            dispatch({
                type: ERRER,
                error: e
            }); //실패함
        }
    }

    return actionHandler;
}

//UsersConrtext 에서 사용 할 기본 상태
const initialState = {
    users: {
        loading: false,
        data: null,
        error: null
    },
    user:{
        loading: false,
        data:null,
        error:null
    }
};

//로딩중일 때 바뀔 상태 객체
const loadingState = {
    loading: true,
    data: null,
    error: null
};

//성공했을 때의 상태 만들어주는 함수
const success = data => ({
    loading: false,
    data,
    error: null
});

//실패 했을 때의 상태 만들어주는 함수
const error = error => ({
    loading: false,
    data: null,
    error: error
});

//세가지 액션을 처리하는 리듀서
// type 은 액션, key 는 리듀서서 사용할 필드 이름
export function createAsyncHandler(type, key) {
    //성공, 실패에 대한 액션 타입 문자열을 준비합니다.
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    //새로운 함수
    function handler(state, action) {
        switch (action.type) {
            case type:
                return{
                    ...state,
                    [key]: loadingState
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: success(aciton.data)
                };
            case ERROR:
                return {
                    ...state,
                    [kay]: error(action.error)
                };
            default:
                return state;
        }
    }
    return handler
}