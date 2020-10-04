import request from "./request";

// сохранение токена
const saveToken = (token) => localStorage.setItem('token', token)

// удаление токена
const removeToken = () => localStorage.removeItem('token')

// авторизация
export const getToken = async (email: string, password: string): Promise<{ success: boolean, error: null }> => {
    const data = {email, password};

    try {
        const response = await request('api/v1/users/token/').post(data);
        const {access} = response.data
        saveToken(access)
        return {success: true, error: null}
    } catch (e) {
        const error = e.response.data.detail || 'Неопознанная ошибка';
        return {success: false, error: error}
    }
}
// регистрация
export const register = async (email: string, password: string): Promise<{ success: boolean, error: null }> => {
    const data = {email, password}

    try {
        const response = await request('api/v1/users/registration/').post(data)
        const {access} = response.data
        saveToken(access)
        return {success: true, error: null}
    } catch (e) {
        const error = e.response.data.detail || 'Неопознанная ошибка';
        return {success: false, error: error}
    }
}