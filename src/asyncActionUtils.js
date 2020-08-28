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