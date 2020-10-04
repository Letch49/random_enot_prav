import request, {API_URL} from "./request";
import Cookies from 'js-cookie'
import axios from 'axios'
/*

data:
created: "2020-10-03T09:41:19.769810Z"
file: null
fio: ""
id: 4
reason: ""
status: "new"
text: "Я вчера гулял с собакой, но она обосралась и я её убил"
 */
export type appeal = {created: Date, file: string, fio: string, id: number | string, reason: string, status: string, text: string, description: string}

export const createAppeal = async (reason: string, fio: string, text: string, description: string): Promise<{ success: boolean, error: string | null, id: string | number , data: appeal | null}> => {
    const data = {reason, fio, text, description}

    try {
        const response = await request('api/v1/appeals/').post(data);
        const {id} = response.data;
        return {success: true, error: null, id: id, data: response.data}
    } catch (e) {
        const error = 'Произошла ошибка, проверьте правильность заполнения полей';
        return {success: false, error, id: null, data: null}
    }
};

export const getAppealsList = async () : Promise<appeal[]> => {
    try {
        const response = await request('api/v1/appeals/').get();
        console.log(response);
        return response.data
    } catch (e) {
        console.log(e)
    }
};
// сохраняем файл (доказательство) к обращению
export const saveAppealFile = async (appealId: string | number, formData) => {
    const csrf = Cookies.get('csrftoken');
    console.log(formData)
    // const response = await fetch(`${API_URL}api/v1/appeals/${appealId}/file`, {
    //     method: 'POST',
    //     headers: {
    //         'content-type': `multipart/form-data; boundary=`,
    //         // mode: 'no-cors',
    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         // 'x-csrftoken': csrf
    //     },
    //     body: {...formData}
    // })
    await request(`api/v1/appeals/${appealId}/file`).post(formData)
};

export const getAppealById = async (appealId: string | number) => {
    const response = await request(`api/v1/appeals/${appealId}`).get();
    return response.data
};