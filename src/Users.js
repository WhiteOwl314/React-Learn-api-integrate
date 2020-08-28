import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import useAsync from './useAsync';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 바환하는 함수 따로 만듬
async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;

}

function Users() {

    const [state, refetch] = useAsync(getUsers, [], true);

    const {loading, data: users, error} = state;

    if(loading) return <div>로딩중..</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!users) return <button onClick={refetch}>불러오기</button>;

    return(
        <>
            <ul>
                {users.map(user =>
                    (<li key={user.id}>
                        {user.username} ({user.name})
                    </li>)
                )}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
        </>
    )

}

export default Users;